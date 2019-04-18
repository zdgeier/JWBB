package com.example.capstone_wireframe

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment

class ProfessorSelectionFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor_selection, container, false)

        val selectionButtonP: Button = v.findViewById(R.id.roleChoice_ButtonProfessor)
        val selectionRoleP: TextView = v.findViewById(R.id.professorRoleText)
        val selectionRoleDescriptionP: TextView = v.findViewById(R.id.professorRoleDescriptionText)

        selectionButtonP.text = "Professor"
        selectionRoleP.text = "Professor"
        selectionRoleDescriptionP.text = "Professor gets to start a class blabla"
        return v
    }
}
