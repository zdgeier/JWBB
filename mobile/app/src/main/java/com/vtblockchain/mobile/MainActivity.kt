package com.vtblockchain.mobile

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.memtrip.eos.http.rpc.Api
import com.memtrip.eos.http.rpc.model.info.Info
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val okHttpClient = OkHttpClient.Builder()
            .connectTimeout(3, TimeUnit.SECONDS)
            .readTimeout(3, TimeUnit.SECONDS)
            .writeTimeout(3, TimeUnit.SECONDS)
        val api = Api("http://eos.greymass.com/", okHttpClient.build())
        api.chain.getInfo().subscribe ({ response ->
            if (response.isSuccessful) {
                val info: Info = response.body()!!
                Log.d("response", info.chain_id)
            } else {
                val errorBody = response.errorBody()!!
            }
        }, { error ->
            error.printStackTrace()
        })
    }
}
