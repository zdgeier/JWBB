package com.vtblockchain.mobile


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng

class StudentClassFragment : Fragment(), OnMapReadyCallback {
    private lateinit var model: MyViewModel

    override fun onMapReady(googleMap : GoogleMap) {
        MapsInitializer.initialize(context)

        val latlng : LatLng = model.classesCRN.value!![model.selectedCRN.value!!].coordinates[0]
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latlng, 18f))
        googleMap.addMarker(com.google.android.gms.maps.model.MarkerOptions().position(latlng))
        googleMap.mapType = GoogleMap.MAP_TYPE_NORMAL
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_student_class, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val mapView = v.findViewById<MapView>(R.id.studentMap)
        mapView.onCreate(null)
        mapView.getMapAsync(this)

        val studentCRN = v.findViewById<TextView>(R.id.studentCRN)
        val studentClassName = v.findViewById<TextView>(R.id.studentClassName)
        model.selectedCRN.observe(this, Observer {
            if (model.classesCRN.value!!.isNotEmpty()) {
                studentCRN.text = "CRN: ${model.classesCRN.value!![it].crn}"
                studentClassName.text = "${model.classesCRN.value!![it].courseName}"
            }
        })

        val hereButton = v.findViewById<Button>(R.id.hereButton)
        hereButton.setOnClickListener {
            model.isStudent.value = true
            model.isDiscovering.value = !model.isDiscovering.value!!
        }
        model.isDiscovering.observe(this, Observer {
            if (it) hereButton.text = "Stop looking for professor"
            else hereButton.text = "Start looking for professor"
        })

        return v
    }
}
