package com.vtblockchain.mobile

import android.util.Log
import com.google.android.gms.location.FusedLocationProviderClient
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.core.crypto.EosPrivateKey
import com.memtrip.eos.http.rpc.Api
import com.memtrip.eos.http.rpc.model.contract.request.GetTableRows
import com.vtblockchain.mobile.MainActivity.Companion.TAG
import com.vtblockchain.mobile.actions.attend.AttendTransfer
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.serialization.json.JSON
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit

class AttendanceMarker {
    val CONTRACT_NAME : String = "lokchain"

    var okHttpClient : OkHttpClient = OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
            .connectTimeout(3, TimeUnit.SECONDS)
            .readTimeout(3, TimeUnit.SECONDS)
            .writeTimeout(3, TimeUnit.SECONDS)
            .build()

    fun sendLocationToChain(baseUrl : String, locationPayload: LocationPayload, client : FusedLocationProviderClient?) {
        val api = Api(baseUrl, okHttpClient)

        try {
            client?.lastLocation?.addOnSuccessListener { location ->
                GlobalScope.launch {
                    if (location != null) {
                        AttendTransfer(api.chain).record(
                            CONTRACT_NAME,
                            AttendTransfer.Args(
                                locationPayload.account,
                                location.latitude.toFloat(),
                                location.longitude.toFloat(),
                                locationPayload.crn,
                                0,
                                0
                            ),
                            TransactionContext(
                                locationPayload.account,
                                EosPrivateKey(locationPayload.privateKey),
                                MainActivity.transactionDefaultExpiry()
                            )
                        ).blockingGet()
                    } else {
                        Log.d(TAG, "Location not found!")
                    }
                }
            }
        }
        catch (e : SecurityException) {
            e.printStackTrace()
        }
    }

    fun getChainClasses(baseUrl: String) {
        val api = Api(baseUrl, okHttpClient)

        GlobalScope.launch {
            val tableRows = api.chain.getTableRows(GetTableRows(
                "lokchain",
                "lokchain",
                "classes",
                "",
                true,
                10,
                "",
                "",
                "",
                "",
                ""
            )).blockingGet()
            Log.d(TAG, tableRows.toString())


            //JSON.parse(tableRows.body())
        }
    }
}
