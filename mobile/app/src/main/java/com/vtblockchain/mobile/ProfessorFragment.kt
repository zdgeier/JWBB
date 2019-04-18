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
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor, container, false)
        val model = ViewModelProviders.of(this.activity!!).get(MyViewModel::class.java)

        model.status.observe(this, Observer {
            v.findViewById<Button>(R.id.professorStatusText).text = it
        })

        v.findViewById<Spinner>(R.id.professorCRNSpinner).onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) { }
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                model.selectedCRN.value = position
                (activity as MainActivity).startAdvertising()
            }
        }

        v.findViewById<EditText>(R.id.manualStudentAccountName).addTextChangedListener(object : TextWatcher{
            override fun afterTextChanged(s: Editable?) {}
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                model.studentName.value = s.toString()
            }
        })

        model.classesCRN.observe(this, Observer {
            val adapter = ArrayAdapter<String>(
                context!!,
                android.R.layout.simple_spinner_item,
                it
            )
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            v.findViewById<Spinner>(R.id.professorCRNSpinner).adapter = adapter
        })

        model.selectedCRN.observe(this, Observer {
            v.findViewById<Spinner>(R.id.professorCRNSpinner).setSelection(it)
        })

        v.findViewById<Button>(R.id.markButton).setOnClickListener {
            (activity as MainActivity).submitStudentLocation()
        }

        return v
    }
}
