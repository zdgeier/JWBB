package com.vtblockchain.mobile

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.Button
import android.widget.Spinner
import android.widget.TextView
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

        model.status.observe(this, Observer {
            v.findViewById<TextView>(R.id.studentModePrompt).text = it
        })

        v.findViewById<Button>(R.id.discoveryButton).setOnClickListener {
            (activity as MainActivity).startDiscovery()
        }

        v.findViewById<Spinner>(R.id.studentCRNSpinner).onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) { }
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                model.selectedCRN.value = position
            }
        }

        model.selectedCRN.observe(this, Observer {
            v.findViewById<Spinner>(R.id.studentCRNSpinner).setSelection(it)
        })

        return v
    }
}
