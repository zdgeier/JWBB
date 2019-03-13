package com.vtblockchain.mobile

import android.Manifest
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.google.android.material.textfield.TextInputEditText
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.http.rpc.Api
import com.memtrip.eos.core.crypto.EosPrivateKey
import com.vtblockchain.mobile.actions.note.NoteTransfer
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit
import android.widget.Toast
import com.google.android.gms.location.LocationServices
import androidx.core.app.ActivityCompat
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import android.os.StrictMode
import android.widget.EditText

class MainActivity : AppCompatActivity() {
    fun checkPermission() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION),
                123
            )
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkPermission()

        val button : Button = findViewById(R.id.submit)
        val account : TextInputEditText = findViewById(R.id.account)
        val privateKey : TextInputEditText = findViewById(R.id.privateKey)
        val crn : EditText = findViewById(R.id.crn)

        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        val mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        button.setOnClickListener { GlobalScope.launch {
            val okHttpClient = OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(3, TimeUnit.SECONDS)
                .writeTimeout(3, TimeUnit.SECONDS)

            val api = Api(Config.LOCAL_HOST_API_BASE_URL, okHttpClient.build())

            try {
                mFusedLocationClient.lastLocation.addOnSuccessListener { location ->
                    if (location != null) {
                        // GPS location can be null if GPS is switched off
                        val currentLat = location.latitude
                        val currentLong = location.longitude
                        Toast.makeText(
                            this@MainActivity,
                            "lat " + currentLat + "\nlong " + currentLong,
                            Toast.LENGTH_SHORT
                        ).show()

                        NoteTransfer(api.chain).record(
                            "lokchain",
                            NoteTransfer.Args(
                                account.text.toString(),
                                currentLat.toFloat(),
                                currentLong.toFloat(),
                                crn.text.toString().toLong()
                            ),
                            TransactionContext(
                                account.text.toString(),
                                EosPrivateKey(privateKey.text.toString()),
                                transactionDefaultExpiry()
                            )
                        ).blockingGet()
                    }
                    else {
                        Toast.makeText(
                            this@MainActivity,
                            "GPS unavailable",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
                    .addOnFailureListener { e -> e.printStackTrace() }
            }
            catch(e : SecurityException) {
                e.printStackTrace()
            }
        } }


    }
}
