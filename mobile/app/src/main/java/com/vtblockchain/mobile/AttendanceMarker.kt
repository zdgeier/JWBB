package com.vtblockchain.mobile

import android.util.Log
import com.google.android.gms.location.FusedLocationProviderClient
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.core.crypto.EosPrivateKey
import com.memtrip.eos.http.rpc.Api
import com.vtblockchain.mobile.MainActivity.Companion.TAG
import com.vtblockchain.mobile.actions.note.NoteTransfer
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit

class AttendanceMarker {
    val CONTRACT_NAME : String = "lokchain"
    var api : Api

    init {
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
            .connectTimeout(3, TimeUnit.SECONDS)
            .readTimeout(3, TimeUnit.SECONDS)
            .writeTimeout(3, TimeUnit.SECONDS)

        api = Api(MainActivity.LOCAL_HOST_API_BASE_URL, okHttpClient.build())
    }

    fun sendLocationToChain(locationPayload: LocationPayload, client : FusedLocationProviderClient?) {
        GlobalScope.launch {
            try {
                client?.lastLocation?.addOnSuccessListener { location ->
                    if (location != null) {
                        NoteTransfer(api.chain).record(
                            CONTRACT_NAME,
                            NoteTransfer.Args(
                                locationPayload.account,
                                location.latitude.toFloat(),
                                location.longitude.toFloat(),
                                locationPayload.crn
                            ),
                            TransactionContext(
                                locationPayload.account,
                                EosPrivateKey(locationPayload.privateKey),
                                MainActivity.transactionDefaultExpiry()
                            )
                        ).timeout(3, TimeUnit.SECONDS)
                    } else {
                        Log.d(TAG, "Location not found!")
                    }
                }
            }
            catch (e : SecurityException) {
                e.printStackTrace()
            }
        }
    }
}
