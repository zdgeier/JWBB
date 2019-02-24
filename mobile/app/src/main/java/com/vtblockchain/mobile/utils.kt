package com.vtblockchain.mobile

import java.util.Date
import java.util.Calendar

class Config {
    companion object {
        const val LOCAL_API_BASE_URL = "http://10.0.0.52:8888/"
    }
}

fun transactionDefaultExpiry(): Date = with(Calendar.getInstance()) {
    set(Calendar.MINUTE, get(Calendar.MINUTE) + 2)
    this
}.time