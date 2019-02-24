package com.vtblockchain.mobile

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.memtrip.eos.http.rpc.Api
import com.memtrip.eos.core.crypto.EosPrivateKey
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        GlobalScope.launch {
            val okHttpClient = OkHttpClient.Builder()
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(3, TimeUnit.SECONDS)
                .writeTimeout(3, TimeUnit.SECONDS)

            val api = Api("http://10.0.0.52:8888/", okHttpClient.build())

            val signatureProviderPrivateKey = EosPrivateKey("5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5")

            /**
             * First account
             */
            val firstAccountPrivateKey = EosPrivateKey()
        }
    }
}
