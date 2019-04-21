package com.vtblockchain.mobile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions


class ProfessorFragment : Fragment() {
    private lateinit var model: MyViewModel

    /*
    class MyAdapter(var myDataset: Array<String>, var model: MyViewModel) :
        RecyclerView.Adapter<MyAdapter.MyViewHolder>() {

        open class MyViewHolder(parent: ViewGroup?, resId: Int)
            : RecyclerView.ViewHolder(LayoutInflater.from(parent?.context).inflate(resId, parent, false))

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder =
            MyViewHolder(parent, R.layout.professor_class_card)

        override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
            holder.itemView.findViewById<TextView>(R.id.student_name).text = myDataset[position]
            holder.itemView.setOnClickListener {
                model.selectedCRN.value = position
                Navigation.findNavController(holder.itemView).navigate(R.id.action_professorButton_to_class1)
            }
        }

        override fun getItemCount() = myDataset.size
    }
    */

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val viewManager = LinearLayoutManager(activity)
        val viewAdapter = MapAdapter(model.classesCRN.value!!.toTypedArray(), model)

        val recyclerView = v.findViewById<RecyclerView>(R.id.recyclerView)
        recyclerView.apply {
            setHasFixedSize(true)
            layoutManager = viewManager
            adapter = viewAdapter
        }
        model.classesCRN.observe(this, Observer {
            viewAdapter.myDataset = it.toTypedArray()
            viewAdapter.notifyDataSetChanged()
        })

        return v
    }

    override fun onResume() {
        super.onResume()
        model.isStudent.value = false
        model.isAdvertising.value = false
    }

    override fun onPause() {
        super.onPause()
        model.isStudent.value = false
        model.isAdvertising.value = false
    }

    /**
     * Adapter that displays a title and [com.google.android.gms.maps.MapView] for each item.
     * The layout is defined in `lite_list_demo_row.xml`. It contains a MapView
     * that is programatically initialised when onCreateViewHolder is called.
     */
    inner class MapAdapter(var myDataset: Array<Class>, var model: MyViewModel) : RecyclerView.Adapter<MapAdapter.ViewHolder>() {

        private fun handleClick(position : Int, holder : ViewHolder) {
            model.selectedCRN.value = position
            Navigation.findNavController(holder.itemView).navigate(R.id.action_professorButton_to_class1)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            holder.bindView(position)
            holder.itemView.setOnClickListener {
                handleClick(position, holder)
            }
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val inflated = LayoutInflater.from(parent.context)
                .inflate(R.layout.professor_class_card, parent, false)
            return ViewHolder(inflated)
        }

        override fun getItemCount() = myDataset.size

        /** A view holder for the map and crn. */
        inner class ViewHolder(view: View) :
            RecyclerView.ViewHolder(view),
            OnMapReadyCallback {

            private val layout: View = view
            private val mapView: MapView = layout.findViewById(R.id.lite_listrow_map)
            private val className: TextView = layout.findViewById(R.id.class_crn)
            private val crn: TextView = layout.findViewById(R.id.student_sub)
            private lateinit var map: GoogleMap
            private lateinit var latLng: LatLng

            /** Initialises the MapView by calling its lifecycle methods */
            init {
                with(mapView) {
                    // Initialise the MapView
                    onCreate(null)
                    // Set the map ready callback to receive the GoogleMap object
                    getMapAsync(this@ViewHolder)
                }
            }

            private fun setMapLocation() {
                if (!::map.isInitialized) return
                with(map) {
                    moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, 18f))
                    addMarker(MarkerOptions().position(latLng))
                    mapType = GoogleMap.MAP_TYPE_NORMAL
                    setOnMapClickListener {
                        view?.callOnClick()
                    } // dont do anything
                }
            }

            override fun onMapReady(googleMap: GoogleMap?) {
                MapsInitializer.initialize(context)
                // If map is not initialised properly
                map = googleMap ?: return
                setMapLocation()
            }

            /** This function is called when the RecyclerView wants to bind the ViewHolder. */
            fun bindView(position: Int) {
                myDataset[position].let {
                    latLng = it.coordinates[0]
                    mapView.tag = this
                    className.text = it.courseName
                    crn.text = "CRN: ${it.crn}"
                    // We need to call setMapLocation from here because RecyclerView might use the
                    // previously loaded maps
                    setMapLocation()
                }
            }

            /** This function is called by the recycleListener, when we need to clear the map. */
            fun clearView() {
                with(map) {
                    // Clear the map and free up resources by changing the map type to none
                    clear()
                    mapType = GoogleMap.MAP_TYPE_NONE
                }
            }
        }
    }
}
