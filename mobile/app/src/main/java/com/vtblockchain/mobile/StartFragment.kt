package com.vtblockchain.mobile


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.navigation.Navigation

/**
 * A simple [Fragment] subclass.
 *
 */
class StartFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_start, container, false)

        val prof : Button = v.findViewById(R.id.professorButton)
        val stud : Button = v.findViewById(R.id.studentButton)

        prof.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_start2_to_professor)
        }

        stud.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_start2_to_student)
        }

        return v
    }
}
