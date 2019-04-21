package com.vtblockchain.mobile


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.google.android.material.snackbar.Snackbar

class ManualStudentFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_manual_student, container, false)

        val fab: View = v.findViewById(R.id.markAction)
        fab.setOnClickListener {
            (activity as MainActivity).submitStudentLocation()
            fragmentManager?.popBackStack()
        }

        return v
    }


}
