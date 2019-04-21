package com.vtblockchain.mobile


import android.os.Bundle
import android.view.*
import androidx.fragment.app.Fragment
import android.widget.Button
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.activity_main.*

class StartFragment : Fragment() {
    private lateinit var model: MyViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_start, container, false)
        setHasOptionsMenu(true)

        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val prof : Button = v.findViewById(R.id.professorButton)
        val stud : Button = v.findViewById(R.id.studentButton)

        prof.setOnClickListener {
            if (model.classesCRN.value!!.isEmpty())
                Navigation.findNavController(v).navigate(R.id.action_start2_to_noClassesFragment)
            else
                Navigation.findNavController(v).navigate(R.id.action_start2_to_professor)
        }

        stud.setOnClickListener {
            if (model.classesCRN.value!!.isEmpty())
                Navigation.findNavController(v).navigate(R.id.action_start2_to_noClassesFragment)
            else
                Navigation.findNavController(v).navigate(R.id.action_start2_to_student)
        }

        return v
    }


    override fun onCreateOptionsMenu(menu: Menu, inflater : MenuInflater) {
        inflater.inflate(R.menu.main_menu, menu)
    }

    override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {
        R.id.action_settings -> {
            Navigation.findNavController(view!!).navigate(R.id.action_start2_to_settingsFragment)
            true
        }
        else -> {
            super.onOptionsItemSelected(item)
        }
    }

    override fun onStart() {
        super.onStart()
        model.professorEndpointId.value = ""
        model.selectedCRN.value = 0
        model.studentsHere.value = mutableListOf()
        model.isInClass.value = false
        model.isStudent.value = false
        model.isDiscovering.value = false
        model.isAdvertising.value = false
    }
}
