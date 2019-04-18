package com.vtblockchain.mobile

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import com.vtblockchain.mobile.MainActivity.Companion.SERVICE_ID
import com.vtblockchain.mobile.MainActivity.Companion.TAG
import kotlinx.serialization.json.Json

class ProfessorFragment : Fragment() {
    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
            val payloadString = String(payload.asBytes()!!)
            status?.text = "Received payload from $endPointID: ${payloadString}"
            val locationPayload = Json.parse(LocationPayload.serializer(), payloadString)
            val baseUrl = "http://${ipAddress?.text}:8888/"
            attendanceMarker?.sendLocationToChain(baseUrl, locationPayload, locationProviderClient)
        }

        override fun onPayloadTransferUpdate(endpointID: String, update: PayloadTransferUpdate) {
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
                    status?.text = "Connection accepted ($endpointId)"
                }
                ConnectionsStatusCodes.STATUS_CONNECTION_REJECTED -> {
                    status?.text = "Connection rejected ($endpointId)"
                }
                ConnectionsStatusCodes.STATUS_ERROR -> {
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
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor, container, false)
        val model = ViewModelProviders.of(this.activity!!).get(MyViewModel::class.java)

        model.status.observe(this, Observer {
            v.findViewById<Button>(R.id.professorStatus).text = it
        })

        attendanceMarker = AttendanceMarker()
        locationProviderClient = FusedLocationProviderClient(context!!)

        ipAddress = v.findViewById(R.id.ipAddress)

        startAdvertising()
        attendanceMarker?.getChainClasses("http://${ipAddress?.text}:8888/")

        return v
    }
}
