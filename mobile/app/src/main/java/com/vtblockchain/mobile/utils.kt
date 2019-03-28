package com.vtblockchain.mobile

import java.util.Date
import java.util.Calendar

class Config {
    companion object {
        const val LOCAL_HOST_API_BASE_URL = "http://192.168.1.14:8888/"
        const val SERVICE_ID = "vtblockchain"
    }
}

fun transactionDefaultExpiry(): Date = with(Calendar.getInstance()) {
    set(Calendar.MINUTE, get(Calendar.MINUTE) + 2)
    this
}.time