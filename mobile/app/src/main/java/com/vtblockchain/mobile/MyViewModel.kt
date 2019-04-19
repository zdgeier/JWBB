package com.vtblockchain.mobile

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class MyViewModel : ViewModel() {
    // Professor
    val ipAddress = MutableLiveData<String>()
    val studentName = MutableLiveData<String>()
    val isAdvertising = MutableLiveData<Boolean>()

    // Student
    val status = MutableLiveData<String>()
    val selectedCRN = MutableLiveData<Int>()
    val professorEndpointId = MutableLiveData<String>()
    val isStudent = MutableLiveData<Boolean>()
    val isDiscovering = MutableLiveData<Boolean>()

    // General
    val classesCRN = MutableLiveData<List<String>>()
    val isInClass = MutableLiveData<Boolean>()

    init {
        ipAddress.value = "192.168.1.242"
        professorEndpointId.value = ""
        selectedCRN.value = 0
        isInClass.value = false
        isStudent.value = false
        isDiscovering.value = false
        isAdvertising.value = false
    }
}