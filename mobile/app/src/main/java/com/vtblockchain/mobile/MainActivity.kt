package com.vtblockchain.mobile

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

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val button : Button = findViewById(R.id.submit)
        val account : TextInputEditText = findViewById(R.id.account)
        val privateKey : TextInputEditText = findViewById(R.id.privateKey)
        val location : TextInputEditText = findViewById(R.id.location)

        button.setOnClickListener { GlobalScope.launch {
            val okHttpClient = OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(3, TimeUnit.SECONDS)
                .writeTimeout(3, TimeUnit.SECONDS)

            val api = Api(Config.LOCAL_HOST_API_BASE_URL, okHttpClient.build())

            NoteTransfer(api.chain).update(
                "notechainacc",
                NoteTransfer.Args(
                    account.text.toString(),
                    location.text.toString().split(",")[0].toFloat(),
                    location.text.toString().split(",")[1].toFloat()
                ),
                TransactionContext(
                    account.text.toString(),
                    EosPrivateKey(privateKey.text.toString()),
                    transactionDefaultExpiry()
                )
            ).blockingGet()
        } }


    }
}
