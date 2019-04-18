package com.vtblockchain.mobile

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class MyViewModel : ViewModel() {
    // Professor
    val ipAddress = MutableLiveData<String>()
    val studentName = MutableLiveData<String>()

    // Student
    val status = MutableLiveData<String>()
    val selectedCRN = MutableLiveData<Int>()
    val professorId = MutableLiveData<String>()

    // General
    val classesCRN = MutableLiveData<List<String>>()
    val isInClass = MutableLiveData<Boolean>()

    init {
        ipAddress.value = "192.168.1.242"
        selectedCRN.value = 0
        isInClass.value = false
    }
}