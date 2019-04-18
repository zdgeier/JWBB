package com.example.capstone_wireframe

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment

class StudentSelectionFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_student_selection, container, false)

        val selectionButtonP: Button = v.findViewById(R.id.roleChoice_ButtonStudent)
        val selectionRoleP: TextView = v.findViewById(R.id.studentRoleText)
        val selectionRoleDescriptionP: TextView = v.findViewById(R.id.studentRoleDescriptionText)

        selectionButtonP.text = "Student"
        selectionRoleP.text = "Student"
        selectionRoleDescriptionP.text = "Student gets to start a class blabla"
        return v
    }
}