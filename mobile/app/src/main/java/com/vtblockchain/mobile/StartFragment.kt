package com.vtblockchain.mobile


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.activity_main.*

/**
 * A simple [Fragment] subclass.
 *
 */
class StartFragment : Fragment() {
    private lateinit var model: MyViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_start, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

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

    override fun onStart() {
        super.onStart()
        model.professorEndpointId.value = ""
        model.selectedCRN.value = 0
        model.classesCRN.value = emptyList()
        model.studentsHere.value = mutableListOf()
        model.isInClass.value = false
        model.isStudent.value = false
        model.isDiscovering.value = false
        model.isAdvertising.value = false
    }
}
