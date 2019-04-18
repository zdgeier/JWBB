package com.vtblockchain.mobile

import android.Manifest
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
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
import kotlinx.coroutines.launch
import kotlin.concurrent.fixedRateTimer


class MainActivity : AppCompatActivity() {
    companion object {
        var MY_PERMISSIONS_REQUEST_COURSE_LOCATION : Int = 0
        var MY_PERMISSIONS_REQUEST_FINE_LOCATION : Int = 0
        const val SERVICE_ID = "vtblockchain"
        const val TAG = "JWBB"
        const val nickname = "AttendItNetwork"

        fun transactionDefaultExpiry(): Date = with(Calendar.getInstance()) {
            set(Calendar.MINUTE, get(Calendar.MINUTE) + 2)
            this
        }.time
    }

    private lateinit var model : MyViewModel
    private lateinit var fusedLocationClient : FusedLocationProviderClient

    fun getBaseURL() = "http://${model.ipAddress.value}:8888/"

    fun sendStudentLocation(locationPayload: LocationPayload) {
        AttendanceMarker.sendLocationToChain(getBaseURL(), locationPayload, fusedLocationClient)
    }

    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
            val payloadString = String(payload.asBytes()!!)
            model.status.value = "Received payload from $endPointID: ${payloadString}"
            val locationPayload = Json.parse(LocationPayload.serializer(), payloadString)

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

    fun startAdvertising() {
        val advertisingOptions = AdvertisingOptions.Builder().setStrategy(Strategy.P2P_CLUSTER).build()
        Nearby.getConnectionsClient(this@MainActivity)
            .startAdvertising(
                nickname, SERVICE_ID, connectionLifecycleCallback, advertisingOptions
            )
    }

    fun submitStudentLocation() {
        sendStudentLocation(LocationPayload(model.studentName.value.orEmpty(), "", model.classesCRN.value!![model.selectedCRN.value!!].toLong()))
    }

    fun updateClassesCRN() {
        GlobalScope.launch {
            val recievedClasses: List<String> = AttendanceMarker.getChainClasses(getBaseURL())

            if (!recievedClasses.equals(model.classesCRN.value)) {
                val tempSelected = model.selectedCRN.value
                model.classesCRN.postValue(recievedClasses)
                model.selectedCRN.postValue(tempSelected)
            }
        }
    }

    fun sendLocation() {
        var locationPayload = LocationPayload(model.studentName.value.orEmpty(), "", model.classesCRN.value!![model.selectedCRN.value!!].toLong())
        val jsonData = Json.stringify(LocationPayload.serializer(), locationPayload)

        val payload : Payload = Payload.fromBytes(jsonData.toByteArray())
        Nearby.getConnectionsClient(this@MainActivity).sendPayload(model.professorId.value!!, payload)
        model.status.value = "Sent ${String(payload.asBytes()!!)} to ${model.professorId.value}"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        model = ViewModelProviders.of(this).get(MyViewModel::class.java)
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

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
