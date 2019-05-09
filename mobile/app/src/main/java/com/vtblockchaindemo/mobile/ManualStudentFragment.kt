package com.vtblockchaindemo.mobile


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText

class ManualStudentFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_manual_student, container, false)

        val username = v.findViewById<EditText>(R.id.manualStudentName)
        val fab: View = v.findViewById(R.id.markAction)
        fab.setOnClickListener {
            (activity as MainActivity).submitStudentLocation(username.text.toString())
            fragmentManager?.popBackStack()
        }

        return v
    }


}
