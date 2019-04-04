package com.vtblockchain.mobile

import android.Manifest
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import java.util.*



class MainActivity : AppCompatActivity() {
    companion object {
        var MY_PERMISSIONS_REQUEST_COURSE_LOCATION : Int = 0
        var MY_PERMISSIONS_REQUEST_FINE_LOCATION : Int = 0
        const val LOCAL_HOST_API_BASE_URL = "http://192.168.1.14:8888/"
        const val SERVICE_ID = "vtblockchain"
        const val TAG = "JWBB"

        fun transactionDefaultExpiry(): Date = with(Calendar.getInstance()) {
            set(Calendar.MINUTE, get(Calendar.MINUTE) + 2)
            this
        }.time
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (ContextCompat.checkSelfPermission(this@MainActivity,
                Manifest.permission.ACCESS_COARSE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this@MainActivity,
                arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION),
                MY_PERMISSIONS_REQUEST_COURSE_LOCATION
            )
        }
        if (ContextCompat.checkSelfPermission(this@MainActivity,
                Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this@MainActivity,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                MY_PERMISSIONS_REQUEST_FINE_LOCATION
            )
        }
    }
}
