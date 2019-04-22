package com.vtblockchain.mobile

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class MyViewModel : ViewModel() {
    // Professor
    val isAdvertising = MutableLiveData<Boolean>()
    val studentsHere = MutableLiveData<MutableList<Student>>()
    val manualStudent = MutableLiveData<String>()

    // Student
    val status = MutableLiveData<String>()
    val selectedCRN = MutableLiveData<Int>()
    val professorEndpointId = MutableLiveData<String>()
    val isStudent = MutableLiveData<Boolean>()
    val isDiscovering = MutableLiveData<Boolean>()

    // General
    val classesCRN = MutableLiveData<List<Class>>()
    val isInClass = MutableLiveData<Boolean>()

    // Preferences
    val ipAddress = MutableLiveData<String>()
    val studentUsername = MutableLiveData<String>()
    val professorUsername = MutableLiveData<String>()

    fun addStudent(s: Student) {
        val temp = studentsHere.value
        temp?.add(s)
        studentsHere.postValue(temp)
    }

    init {
        ipAddress.value = "172.29.5.63"
        studentUsername.value = "jiayiwanglee"
        professorUsername.value = "kirkkcameron"
        manualStudent.value = ""
        professorEndpointId.value = ""
        selectedCRN.value = 0
        classesCRN.value = emptyList()
        studentsHere.value = mutableListOf()
        isInClass.value = false
        isStudent.value = false
        isDiscovering.value = false
        isAdvertising.value = false
    }
}