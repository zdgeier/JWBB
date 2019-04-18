package com.vtblockchain.mobile

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class MyViewModel : ViewModel() {
    // Professor
    lateinit var ipAddress : MutableLiveData<String>

    // Student
    lateinit var status : MutableLiveData<String>
    lateinit var account : MutableLiveData<String>
    lateinit var privateKey : MutableLiveData<String>
    lateinit var crn : MutableLiveData<String>
}