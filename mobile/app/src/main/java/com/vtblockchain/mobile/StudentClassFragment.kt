package com.vtblockchain.mobile


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders

class StudentClassFragment : Fragment() {
    private lateinit var model: MyViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_student_class, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val studentCRN = v.findViewById<TextView>(R.id.studentCRN)
        model.selectedCRN.observe(this, Observer {
            if (model.classesCRN.value!!.isNotEmpty()) {
                studentCRN.text = "CRN: ${model.classesCRN.value!![it]}"
            }
        })

        val hereButton = v.findViewById<Button>(R.id.hereButton)
        hereButton.setOnClickListener {
            model.isStudent.value = true
            model.isDiscovering.value = !model.isDiscovering.value!!
        }
        model.isDiscovering.observe(this, Observer {
            if (it) hereButton.text = "Stop Discovery"
            else hereButton.text = "Start Discovery"
        })

        return v
    }
}
