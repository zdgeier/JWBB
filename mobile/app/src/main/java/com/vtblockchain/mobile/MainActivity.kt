package com.vtblockchain.mobile

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.http.rpc.Api
import com.memtrip.eos.core.crypto.EosPrivateKey
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val button : Button = findViewById(R.id.button)
        button.setOnClickListener { GlobalScope.launch {
            val okHttpClient = OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(3, TimeUnit.SECONDS)
                .writeTimeout(3, TimeUnit.SECONDS)

            val api = Api(Config.LOCAL_API_BASE_URL, okHttpClient.build())

            val boi = EosPrivateKey("5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5")

            /**
             * First account
             */
            val transfer1 = NoteTransfer(api.chain).update(
                "notechainacc",
                NoteTransfer.Args(
                    "useraaaaaaaa",
                    "IT WORKS"
                ),
                TransactionContext(
                    "useraaaaaaaa",
                    boi,
                    transactionDefaultExpiry()
                )
            ).subscribe ({ response ->
                if (response.isSuccessful) {
                    val info = response.body!!
                } else {
                    val errorBody = response.errorBody!!
                }
            }, { error ->
                error.printStackTrace()
            })
        } }


    }
}
