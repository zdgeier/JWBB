package com.example.capstone_wireframe

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.navigation.Navigation

/**
 * A simple [Fragment] subclass.
 *
 */
class ProfessorCheckIn : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor_check_in, container, false)

        val prompt: TextView = v.findViewById(R.id.professorCheckIn_Prompt)
        val yesButton: Button = v.findViewById(R.id.professorCheckIn_YesButton)
        val noButton: Button = v.findViewById(R.id.professorCheckIn_NoButton)

        prompt.text = getString(R.string.professor_checkin)
        noButton.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_professorCheckIn_to_roleChoice) }
        yesButton.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_professorCheckIn_to_professorSearch)}

        return v
    }


}
