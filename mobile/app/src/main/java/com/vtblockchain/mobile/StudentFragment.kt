package com.vtblockchain.mobile

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
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import com.google.android.material.textfield.TextInputEditText
import kotlinx.serialization.json.Json
import com.vtblockchain.mobile.MainActivity.Companion.SERVICE_ID

class StudentFragment : Fragment() {
    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
        }

        override fun onPayloadTransferUpdate(endpointID: String, update: PayloadTransferUpdate) {
        }
    }

    fun sendLocation() {
        if (professorId != null) {
            var locationPayload = LocationPayload(
                account?.text.toString(), privateKey?.text.toString(), crn?.text.toString().toLong())
            val jsonData = Json.stringify(LocationPayload.serializer(), locationPayload)

            val payload : Payload = Payload.fromBytes(jsonData.toByteArray())
            Nearby.getConnectionsClient(context!!).sendPayload(professorId!!, payload)
            status?.text = "Sent ${String(payload.asBytes()!!)} to $professorId"
        }
        else {
            status?.text = "Not connected to ProfessorFragment, cannot send payload"
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
                    professorId = endpointId
                }
                ConnectionsStatusCodes.STATUS_CONNECTION_REJECTED -> {
                }
                ConnectionsStatusCodes.STATUS_ERROR -> {
                    professorId = null
                }
            }
        }

        override fun onDisconnected(endpointId: String) {
        }
    }

    val endpointDiscoveryCallback = object : EndpointDiscoveryCallback() {
        override fun onEndpointFound(endpointId: String, info: DiscoveredEndpointInfo) {
            // An endpoint was found. We request a connection to it.
            Nearby.getConnectionsClient(context!!)
                .requestConnection(nickname, endpointId, connectionLifecycleCallback)
        }

        override fun onEndpointLost(endpointId: String) {
            // A previously discovered endpoint has gone away.
        }
    }

    fun startDiscovery() {
        val discoveryOptions = DiscoveryOptions.Builder().setStrategy(Strategy.P2P_CLUSTER).build()
        Nearby.getConnectionsClient(context!!)
            .startDiscovery(SERVICE_ID, endpointDiscoveryCallback, discoveryOptions)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v =  inflater.inflate(R.layout.fragment_student, container, false)

        button = v.findViewById(R.id.submit)
        status = v.findViewById(R.id.studentStatus)
        account = v.findViewById(R.id.account)
        privateKey = v.findViewById(R.id.privateKey)
        crn = v.findViewById(R.id.crn)

        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        button!!.setOnClickListener { sendLocation() }

        startDiscovery()

        return v
    }
}
