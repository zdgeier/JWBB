package com.vtblockchain.mobile

@kotlinx.serialization.Serializable
data class LocationPayload(var account : String, var privateKey: String, var crn : Long)