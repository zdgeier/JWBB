package com.vtblockchain.mobile

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import android.widget.ArrayAdapter
import android.widget.Spinner



class ProfessorFragment : Fragment() {
    private lateinit var model: MyViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val professorStatusText = v.findViewById<TextView>(R.id.professorStatusText)
        model.status.observe(this, Observer {
            professorStatusText.text = it
        })

        val professorCRNSpinner = v.findViewById<Spinner>(R.id.professorCRNSpinner)
        professorCRNSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) { }
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
            professorCRNSpinner.adapter = adapter
        })
        model.selectedCRN.observe(this, Observer {
            professorCRNSpinner.setSelection(it)
        })

        val startAdvertising = v.findViewById<Button>(R.id.startAdvertising)
        startAdvertising.setOnClickListener {
            model.isAdvertising.value = !model.isAdvertising.value!!
        }
        model.isAdvertising.observe(this, Observer {
            if (it) startAdvertising.text = "Stop Advertising"
            else startAdvertising.text = "Start Advertising"
        })

        val manualStudentAccountName = v.findViewById<EditText>(R.id.manualStudentAccountName)
        manualStudentAccountName.addTextChangedListener(object : TextWatcher{
            override fun afterTextChanged(s: Editable?) {}
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                model.studentName.value = s.toString()
            }
        })

        val markButton = v.findViewById<Button>(R.id.markButton)
        markButton.setOnClickListener {
            (activity as MainActivity).submitStudentLocation()
        }

        return v
    }

    override fun onResume() {
        super.onResume()
        model.isStudent.value = true
        model.isAdvertising.value = false
    }

    override fun onPause() {
        super.onPause()
        model.isStudent.value = false
        model.isAdvertising.value = false
    }
}
