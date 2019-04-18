package com.vtblockchain.mobile

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import com.vtblockchain.mobile.MainActivity.Companion.SERVICE_ID
import com.vtblockchain.mobile.MainActivity.Companion.TAG
import kotlinx.serialization.json.Json

class ProfessorFragment : Fragment() {
    var nickname : String = "ProfessorFragment nickname"
    var status : TextView? = null
    var attendanceMarker : AttendanceMarker? = null
    var ipAddress : EditText? = null
    var locationProviderClient : FusedLocationProviderClient? = null

    val payloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endPointID: String, payload: Payload) {
            var payloadString = String(payload.asBytes()!!)
            status?.text = "Received payload from $endPointID: ${payloadString}"
            Log.d("ProfessorFragment", payloadString)
            var locationPayload = Json.parse(LocationPayload.serializer(), payloadString)
            val baseUrl = "http://${ipAddress?.text}:8888/"
            Log.d(TAG, "Marking location at $baseUrl")
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

        attendanceMarker = AttendanceMarker()
        locationProviderClient = FusedLocationProviderClient(context!!)

        ipAddress = v.findViewById(R.id.ipAddress)

        startAdvertising()

        return v
    }
}
