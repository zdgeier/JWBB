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
class ProfessorSearch : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor_search, container, false)

        val prompt: TextView = v.findViewById(R.id.StudentSearching_Prompt)
        val cancel: Button = v.findViewById(R.id.StudentSearchCancelButton)

        prompt.text = getString(R.string.student_searching)
        cancel.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_studentSearch_to_roleChoice) }

        return v
    }


}
