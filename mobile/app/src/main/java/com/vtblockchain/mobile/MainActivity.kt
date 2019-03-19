package com.vtblockchain.mobile

import android.os.Bundle;
import android.util.Log;
import com.ramotion.circlemenu.CircleMenuView;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.Manifest
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

        //val button : Button = findViewById(R.id.submit)
        //val account : TextInputEditText = findViewById(R.id.account)
        //val privateKey : TextInputEditText = findViewById(R.id.privateKey)
        val account = "useraaaaaaaa"
        val privateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5"
        val crn: EditText = findViewById(R.id.crn)
        var crnValue : Long = 0
        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)
        val mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        fun send() {
            GlobalScope.launch {


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

                            if(crn.text.toString() != ""){
                                crnValue = crn.text.toString().toLong()
                            }
                            NoteTransfer(api.chain).record(
                                "lokchain",
                                NoteTransfer.Args(
                                    //account.text.toString(),
                                    account,
                                    currentLat.toFloat(),
                                    currentLong.toFloat(),
                                    crnValue
                                ),
                                TransactionContext(
                                    //account.text.toString(),
                                    account,
                                    //EosPrivateKey(privateKey.text.toString()),
                                    EosPrivateKey(privateKey),
                                    transactionDefaultExpiry()
                                )
                            ).blockingGet()
                        } else {
                            Toast.makeText(
                                this@MainActivity,
                                "GPS unavailable",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }
                        .addOnFailureListener { e -> e.printStackTrace() }
                } catch (e: SecurityException) {
                    e.printStackTrace()
                }
            }
        }

        val menu: CircleMenuView = findViewById(R.id.circle_menu);
        menu.setEventListener(object : CircleMenuView.EventListener() {
            override fun onMenuOpenAnimationStart(view: CircleMenuView) {
                Log.d("D", "onMenuOpenAnimationStart")
            }

            override fun onMenuOpenAnimationEnd(view: CircleMenuView) {
                Log.d("D", "onMenuOpenAnimationEnd")
            }

            override fun onMenuCloseAnimationStart(view: CircleMenuView) {
                Log.d("D", "onMenuCloseAnimationStart")
            }

            override fun onMenuCloseAnimationEnd(view: CircleMenuView) {
                Log.d("D", "onMenuCloseAnimationEnd")
            }

            override fun onButtonClickAnimationStart(view: CircleMenuView, index: Int) {
                send()
                Log.d("D", "onButtonClickAnimationStart| index: $index")
            }

            override fun onButtonClickAnimationEnd(view: CircleMenuView, index: Int) {
                Log.d("D", "onButtonClickAnimationEnd| index: $index")
            }

            override fun onButtonLongClick(view: CircleMenuView, index: Int): Boolean {
                Log.d("D", "onButtonLongClick| index: $index")
                return true
            }

            override fun onButtonLongClickAnimationStart(view: CircleMenuView, index: Int) {
                Log.d("D", "onButtonLongClickAnimationStart| index: $index")
            }

            override fun onButtonLongClickAnimationEnd(view: CircleMenuView, index: Int) {
                Log.d("D", "onButtonLongClickAnimationEnd| index: $index")
            }
        })
    }
}
