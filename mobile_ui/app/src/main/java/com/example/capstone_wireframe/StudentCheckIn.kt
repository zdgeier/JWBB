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
class StudentCheckIn : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_student_check_in, container, false)

        val prompt: TextView = v.findViewById(R.id.StudentCheckIn_Prompt)
        val yesButton: Button = v.findViewById(R.id.StudentCheckIn_YesButton)
        val noButton: Button = v.findViewById(R.id.StudentCheckIn_NoButton)

        prompt.text = getString(R.string.student_checkin)
        noButton.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_studentCheckIn_to_roleChoice) }
        yesButton.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_studentCheckIn_to_studentSearch)}

        return v;
    }


}
