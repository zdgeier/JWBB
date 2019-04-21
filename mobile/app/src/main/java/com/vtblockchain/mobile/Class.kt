package com.vtblockchain.mobile

import com.google.android.gms.maps.model.LatLng

data class Class(
    val crn : Int,
    val courseName : String,
    val coordinates : List<LatLng>,
    val startTime : Int,
    val endTime: Int
)