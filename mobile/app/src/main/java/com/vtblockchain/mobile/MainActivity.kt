package com.vtblockchain.mobile

import android.Manifest
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProviders
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import kotlinx.serialization.json.Json
import java.util.*
import com.vtblockchain.mobile.AttendanceMarker.Companion.LocationPayload
import kotlinx.coroutines.GlobalScope
import androidx.lifecycle.Observer
import com.vtblockchain.mobile.AttendanceMarker.Companion.makeLocationPayload
import kotlinx.coroutines.launch
import me.ibrahimsn.particle.ParticleView
import kotlin.concurrent.fixedRateTimer
import android.content.DialogInterface
import android.content.DialogInterface.BUTTON_NEUTRAL
import android.content.SharedPreferences
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.widget.Toolbar
import androidx.preference.PreferenceManager


class MainActivity : AppCompatActivity() {
    companion object {
        var MY_PERMISSIONS_REQUEST_COURSE_LOCATION : Int = 0
        var MY_PERMISSIONS_REQUEST_FINE_LOCATION : Int = 0
        const val SERVICE_ID = "vtblockchain"
        const val TAG = "JWBB"
        const val nickname = "AttendItNetwork"
        const val professorUsername = "kirkkcameron"
        const val professorPrivateKey = "5KCi3BQBXzk7maHmzeaiHRjUCmcT74Qe2qMv6kQy17u9m42g1sP" // TODO: DON'T USE IN PRODUCTION THIS IS REALLY DUMB

        fun transactionDefaultExpiry(): Date = with(Calendar.getInstance()) {
            set(Calendar.MINUTE, get(Calendar.MINUTE) + 2)
            this
        }.time
    }

    private lateinit var particleView: ParticleView
    private lateinit var model : MyViewModel
    private lateinit var fusedLocationClient : FusedLocationProviderClient

    fun getBaseURL() = "http://${model.ipAddress.value}:8888/"

    fun sendStudentLocation(locationPayload: LocationPayload) =
        AttendanceMarker.sendLocationToChain(getBaseURL(), professorUsername, locationPayload, fusedLocationClient)

    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
            val payloadString = String(payload.asBytes()!!)
            model.status.value = "Received payload from $endPointID: ${payloadString}"
            val locationPayload = Json.parse(LocationPayload.serializer(), payloadString)

            model.addStudent(Student(locationPayload.user, "Device ID: $endPointID"))
            sendStudentLocation(locationPayload)
        }

        override fun onPayloadTransferUpdate(endpointID: String, update: PayloadTransferUpdate) {
        }
    }

    val connectionLifecycleCallback = object : ConnectionLifecycleCallback() {
        override fun onConnectionInitiated(endpointId: String, connectionInfo: ConnectionInfo) {
            // Automatically accept the connection on both sides.
            Nearby.getConnectionsClient(this@MainActivity).acceptConnection(endpointId, payloadCallback)
        }

        override fun onConnectionResult(endpointId: String, result: ConnectionResolution) {
            when (result.status.statusCode) {
                ConnectionsStatusCodes.STATUS_OK -> {
                    model.status.value = "Connection accepted ($endpointId)"
                    if (model.isDiscovering.value!!) {
                        model.professorEndpointId.value = endpointId
                        model.status.value = "Sending student location"
                        sendLocation()
                        val alertDialog = AlertDialog.Builder(this@MainActivity).create()
                        alertDialog.setTitle("Marked!")
                        alertDialog.setMessage("Your attendance has been recorded")
                        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                            DialogInterface.OnClickListener { dialog, which -> dialog.dismiss() })
                        alertDialog.show()
                        model.isDiscovering.value = false
                    }
                }
                ConnectionsStatusCodes.STATUS_CONNECTION_REJECTED -> {
                    model.status.value = "Connection rejected ($endpointId)"
                }
                ConnectionsStatusCodes.STATUS_ERROR -> {
                    model.status.value = "Connection error ($endpointId)"
                }
            }
        }

        override fun onDisconnected(endpointId: String) {
            model.status.value = "Disconnected from $endpointId"
        }
    }

    val endpointDiscoveryCallback = object : EndpointDiscoveryCallback() {
        override fun onEndpointFound(endpointId: String, info: DiscoveredEndpointInfo) {
            // An endpoint was found. We request a connection to it.
            Nearby.getConnectionsClient(this@MainActivity)
                .requestConnection(nickname, endpointId, connectionLifecycleCallback)
        }

        override fun onEndpointLost(endpointId: String) {
            // A previously discovered endpoint has gone away.
        }
    }

    fun startDiscovery() {
        val discoveryOptions = DiscoveryOptions.Builder().setStrategy(Strategy.P2P_CLUSTER).build()
        Nearby.getConnectionsClient(this@MainActivity)
            .startDiscovery(SERVICE_ID, endpointDiscoveryCallback, discoveryOptions)
    }

    fun stopDiscovery() {
        Nearby.getConnectionsClient(this@MainActivity).stopDiscovery()
    }

    fun startAdvertising() {
        val advertisingOptions = AdvertisingOptions.Builder().setStrategy(Strategy.P2P_CLUSTER).build()
        Nearby.getConnectionsClient(this@MainActivity)
            .startAdvertising(nickname, SERVICE_ID, connectionLifecycleCallback, advertisingOptions)
    }

    fun stopNetwork() {
        Nearby.getConnectionsClient(this@MainActivity).stopAdvertising()
        Nearby.getConnectionsClient(this@MainActivity).stopAllEndpoints()
    }

    fun submitStudentLocation(username : String) {
        if (username != "") {
            GlobalScope.launch {
                val payload: LocationPayload? =
                    makeLocationPayload(username, model.classesCRN.value!![model.selectedCRN.value!!].crn.toLong(), fusedLocationClient)
                sendStudentLocation(payload!!)
                model.addStudent(Student(username, "Manually marked"))
            }
        }
    }

    fun updateClassesCRN() {
        GlobalScope.launch {
            val receivedClasses: List<Class> = AttendanceMarker.getChainClasses(getBaseURL())
            if (receivedClasses != model.classesCRN.value) {
                val tempSelected = model.selectedCRN.value
                model.classesCRN.postValue(receivedClasses)
                model.selectedCRN.postValue(tempSelected)
            }
        }
    }

    fun sendLocation() {
        GlobalScope.launch {
            val locationPayload : LocationPayload? = makeLocationPayload(
                model.studentUsername.value!!,
                model.classesCRN.value!![model.selectedCRN.value!!].crn.toLong(),
                fusedLocationClient
            )

            val jsonData = Json.stringify(LocationPayload.serializer(), locationPayload!!)

            val payload : Payload = Payload.fromBytes(jsonData.toByteArray())
            Nearby.getConnectionsClient(this@MainActivity).sendPayload(model.professorEndpointId.value!!, payload)
            model.status.postValue("Sent ${String(payload.asBytes()!!)} to ${model.professorEndpointId.value}")
        }
    }

    override fun onResume() {
        super.onResume()
        particleView.resume()
    }

    override fun onPause() {
        super.onPause()
        particleView.pause()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar : Toolbar = findViewById(R.id.toolbar2)
        toolbar.title = ""
        setSupportActionBar(toolbar)
        toolbar.title = "Attend.it!"

        particleView = findViewById(R.id.particleView)

        model = ViewModelProviders.of(this).get(MyViewModel::class.java)
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        model.isDiscovering.observe(this, Observer {
            if (it) startDiscovery()
            else stopDiscovery()
        })
        model.isAdvertising.observe(this, Observer {
            if (it) startAdvertising()
            else stopNetwork()
        })
        model.status.observe(this, Observer {
            Log.d(TAG, "Status: $it")
        })

        updateClassesCRN()
        fixedRateTimer(
            name = "crn-updater",
            initialDelay = 0L,
            period = 5000L
        ) {
            updateClassesCRN()
        }

        if (ContextCompat.checkSelfPermission(this@MainActivity,
                Manifest.permission.ACCESS_COARSE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this@MainActivity,
                arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION),
                MY_PERMISSIONS_REQUEST_COURSE_LOCATION
            )
        }
        if (ContextCompat.checkSelfPermission(this@MainActivity,
                Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this@MainActivity,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                MY_PERMISSIONS_REQUEST_FINE_LOCATION
            )
        }
    }
}
