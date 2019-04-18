package com.example.capstone_wireframe
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.navigation.Navigation
import me.ibrahimsn.particle.ParticleView

/**
 * A simple [Fragment] subclass.
 *
 */
class RoleChoice : Fragment() {
    private lateinit var particleView: ParticleView
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_role_choice, container, false)
        particleView = v.findViewById(R.id.particleView)

        return v;
    }

    override fun onResume() {
        super.onResume()
        particleView.resume()
    }

    override fun onPause() {
        super.onPause()
        particleView.pause()
    }
}
