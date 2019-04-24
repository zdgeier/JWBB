package com.vtblockchain.mobile

import android.accounts.NetworkErrorException
import android.location.Location
import android.util.Log
import android.widget.Toast
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.tasks.Tasks
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.core.crypto.EosPrivateKey
import com.memtrip.eos.http.rpc.Api
import com.memtrip.eos.http.rpc.model.contract.request.GetTableRows
import com.vtblockchain.mobile.MainActivity.Companion.TAG
import com.vtblockchain.mobile.MainActivity.Companion.professorPrivateKey
import com.vtblockchain.mobile.MainActivity.Companion.professorUsername
import com.vtblockchain.mobile.actions.attend.AttendTransfer
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.lang.Exception
import java.net.ConnectException
import java.util.concurrent.TimeUnit

class AttendanceMarker {
    companion object {
        @kotlinx.serialization.Serializable
        data class LocationPayload(var user: String,  var xval : Float, var yval : Float, var crn : Long)

        val CONTRACT_NAME : String = "attendit"

        var okHttpClientVerbose : OkHttpClient = OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
            .connectTimeout(3, TimeUnit.SECONDS)
            .readTimeout(3, TimeUnit.SECONDS)
            .writeTimeout(3, TimeUnit.SECONDS)
            .build()

        var okHttpClient : OkHttpClient = OkHttpClient.Builder()
            .connectTimeout(3, TimeUnit.SECONDS)
            .readTimeout(3, TimeUnit.SECONDS)
            .writeTimeout(3, TimeUnit.SECONDS)
            .build()

        fun makeLocationPayload(user : String, crn : Long, client: FusedLocationProviderClient?) : LocationPayload {
            try {
                val location : Location? = Tasks.await(client?.lastLocation!!)
                return LocationPayload(user, location?.latitude?.toFloat()!!, location.longitude.toFloat(), crn)
            }
            catch (e: SecurityException) {
                throw e
            }
        }


        fun sendLocationToChain(
            baseUrl: String,
            actor : String,
            locationPayload: LocationPayload,
            client: FusedLocationProviderClient?
        ) {
            val api = Api(baseUrl, okHttpClientVerbose)

            try {
                client?.lastLocation?.addOnSuccessListener { location ->
                    GlobalScope.launch {
                        if (location != null) {
                            AttendTransfer(api.chain).record(
                                CONTRACT_NAME,
                                AttendTransfer.Args(
                                    professorUsername,
                                    locationPayload.user,
                                    locationPayload.xval,
                                    locationPayload.yval,
                                    locationPayload.crn
                                ),
                                TransactionContext(
                                    professorUsername,
                                    EosPrivateKey(professorPrivateKey),
                                    MainActivity.transactionDefaultExpiry()
                                )
                            ).blockingGet()
                        } else {
                            Log.d(TAG, "Location not found!")
                        }
                    }
                }
            } catch (e: SecurityException) {
                e.printStackTrace()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        fun getChainClasses(baseUrl: String) : List<Class> {
            val api = Api(baseUrl, okHttpClient)

            try {
                val tableRows = api.chain.getTableRows(
                    GetTableRows(
                        "attendit",
                        "attendit",
                        "classes",
                        "",
                        true,
                        10,
                        "",
                        "",
                        "",
                        "",
                        ""
                    )
                ).blockingGet()


                return tableRows.body()!!.rows.map {
                    rowToClass(it)
                }
            }
            catch (e : NetworkErrorException) {
                System.err.println("Error getting classes at $baseUrl")
            }

            return listOf()
        }

        private fun rowToClass(row: Map<String, Any>) : Class {

            val coordinates: List<LatLng> = (row["coordinates"] as List<Map<String, String>>).map {
                LatLng(it.getValue("first").toDouble(), it.getValue("second").toDouble())
            }

            return Class(
                row["crn"].toString().toDouble().toInt(),
                row["courseName"].toString(),
                coordinates,
                row["startTime"].toString().toDouble().toInt(),
                row["endTime"].toString().toDouble().toInt()
            )
        }
    }
}
