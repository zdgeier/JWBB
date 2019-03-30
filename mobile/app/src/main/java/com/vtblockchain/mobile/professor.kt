package com.vtblockchain.mobile

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import com.vtblockchain.mobile.Config.Companion.SERVICE_ID
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

/**
 * A simple [Fragment] subclass.
 *
 */
class professor : Fragment() {
    val TAG = "Professor"

    var nickname : String = "professor nickname"
    var status : TextView? = null

    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
            status?.text = "Received payload from $endPointID: ${payload.asBytes().toString()}"
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

                    val payload : Payload = Payload.fromBytes("HELLO THIS IS YOUR PROFESSOR SPEAKING".toByteArray())
                    Nearby.getConnectionsClient(context!!).sendPayload(endpointId, payload)
                    status?.text = "Sent payload to $endpointId"
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

    fun startAdvertising() {
        val advertisingOptions = AdvertisingOptions.Builder().setStrategy(Strategy.P2P_CLUSTER).build()
        Nearby.getConnectionsClient(context!!)
            .startAdvertising(
                nickname, SERVICE_ID, connectionLifecycleCallback, advertisingOptions
            )
        status?.text = "Advertising $nickname"
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor, container, false)
        status = v.findViewById(R.id.professorStatus)

        startAdvertising()

        return v
    }
}
