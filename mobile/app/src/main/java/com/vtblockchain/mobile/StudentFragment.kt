package com.vtblockchain.mobile

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders

class StudentFragment : Fragment() {

    private lateinit var model: MyViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v =  inflater.inflate(R.layout.fragment_student, container, false)

        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val studentModePrompt = v.findViewById<TextView>(R.id.studentModePrompt)
        model.status.observe(this, Observer {
            studentModePrompt.text = it
        })

        val studentCRNSpinner = v.findViewById<Spinner>(R.id.studentCRNSpinner)
        studentCRNSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {}
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                model.selectedCRN.value = position
            }
        }
        model.classesCRN.observe(this, Observer {
            val adapter = ArrayAdapter<String>(
                context!!,
                android.R.layout.simple_spinner_item,
                it
            )
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            studentCRNSpinner.adapter = adapter
        })
        model.selectedCRN.observe(this, Observer {
            studentCRNSpinner.setSelection(it)
        })

        val discoveryButton = v.findViewById<Button>(R.id.discoveryButton)
        discoveryButton.setOnClickListener {
            model.isDiscovering.value = !model.isDiscovering.value!!
        }
        model.isDiscovering.observe(this, Observer {
            if (it) discoveryButton.text = "Stop Discovery"
            else discoveryButton.text = "Start Discovery"
        })

        return v
    }

    override fun onResume() {
        super.onResume()
        model.isStudent.value = true
        model.isDiscovering.value = false
    }

    override fun onPause() {
        super.onPause()
        model.isStudent.value = false
        model.isDiscovering.value = false
    }
}
