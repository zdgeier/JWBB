package com.vtblockchain.mobile


import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.os.StrictMode
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import com.google.android.material.textfield.TextInputEditText
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.core.crypto.EosPrivateKey
import com.memtrip.eos.http.rpc.Api
import com.vtblockchain.mobile.Config.Companion.SERVICE_ID
import com.vtblockchain.mobile.actions.note.NoteTransfer
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit

/**
 * A simple [Fragment] subclass.
 *
 */
class student : Fragment() {
    val TAG = "student"

    var mFusedLocationClient : FusedLocationProviderClient? = null
    var nickname : String = "student nickname"

    var button : Button? = null
    var status : TextView? = null
    var account : TextInputEditText? = null
    var privateKey : TextInputEditText? = null
    var crn : EditText? = null

    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
            status?.text = "Received payload from $endPointID: ${String(payload.asBytes()!!)}"
        }

        override fun onPayloadTransferUpdate(endpointID: String, update: PayloadTransferUpdate) {
            //TODO("not implemented")
        }
    }

    val connectionLifecycleCallback = object : ConnectionLifecycleCallback() {
        override fun onConnectionInitiated(endpointId: String, connectionInfo: ConnectionInfo) {
            // Automatically accept the connection on both sides.
            Nearby.getConnectionsClient(context!!).acceptConnection(endpointId, payloadCallback)
        }

        override fun onConnectionResult(endpointId: String, result: ConnectionResolution) {
            when (result.status.statusCode) {
                ConnectionsStatusCodes.STATUS_OK -> {
                    Log.d("asdf", "Connection accepted")
                    status?.text = "Connection accepted ($endpointId)"
                }
                ConnectionsStatusCodes.STATUS_CONNECTION_REJECTED -> {
                    Log.d("asdf", "Connection rejected")
                    status?.text = "Connection rejected ($endpointId)"
                }
                ConnectionsStatusCodes.STATUS_ERROR -> {
                    Log.d("asdf", "Connection error")
                    status?.text = "Connection error ($endpointId)"
                }
            }
        }

        override fun onDisconnected(endpointId: String) {
            status?.text = "Disconnected from $endpointId"
        }
    }

    val endpointDiscoveryCallback = object : EndpointDiscoveryCallback() {
        override fun onEndpointFound(endpointId: String, info: DiscoveredEndpointInfo) {
            // An endpoint was found. We request a connection to it.
            Nearby.getConnectionsClient(context!!)
                .requestConnection(nickname, endpointId, connectionLifecycleCallback)
            status?.text = "Endpoint found ($endpointId)"
            Log.d("student", "Endpoint found ($endpointId)")
        }

        override fun onEndpointLost(endpointId: String) {
            // A previously discovered endpoint has gone away.
        }
    }

    fun startDiscovery() {
        val discoveryOptions = DiscoveryOptions.Builder().setStrategy(Strategy.P2P_CLUSTER).build()
        Nearby.getConnectionsClient(context!!)
            .startDiscovery(SERVICE_ID, endpointDiscoveryCallback, discoveryOptions)
        status?.text = "Starting discovery $nickname"
        Log.d("student", "Starting discovery $nickname")
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v =  inflater.inflate(R.layout.fragment_student, container, false)

        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(context!!)

        button = v.findViewById(R.id.submit)
        status = v.findViewById(R.id.studentStatus)
        account = v.findViewById(R.id.account)
        privateKey = v.findViewById(R.id.privateKey)
        crn = v.findViewById(R.id.crn)

        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        button!!.setOnClickListener { sendLocationToChain() }

            startDiscovery()


        return v
    }

    fun sendLocationToChain() {
        GlobalScope.launch {
            val okHttpClient = OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(3, TimeUnit.SECONDS)
                .writeTimeout(3, TimeUnit.SECONDS)

            val api = Api(Config.LOCAL_HOST_API_BASE_URL, okHttpClient.build())

            try {
                mFusedLocationClient?.lastLocation?.addOnSuccessListener { location ->
                    if (location != null) {
                        // GPS location can be null if GPS is switched off
                        val currentLat = location.latitude
                        val currentLong = location.longitude
                        Toast.makeText(
                            context,
                            "lat " + currentLat + "\nlong " + currentLong,
                            Toast.LENGTH_SHORT
                        ).show()

                        NoteTransfer(api.chain).record(
                            "lokchain",
                            NoteTransfer.Args(
                                account?.text.toString(),
                                currentLat.toFloat(),
                                currentLong.toFloat(),
                                crn?.text.toString().toLong()
                            ),
                            TransactionContext(
                                account?.text.toString(),
                                EosPrivateKey(privateKey?.text.toString()),
                                transactionDefaultExpiry()
                            )
                        ).blockingGet()
                    }
                    else {
                        Toast.makeText(
                            context,
                            "GPS unavailable",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }?.addOnFailureListener { e -> e.printStackTrace() }
            }
            catch(e : SecurityException) {
                e.printStackTrace()
            }
        }
    }
}
