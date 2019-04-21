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
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class ProfessorClassFragment : Fragment() {
    private lateinit var model: MyViewModel

    class MyAdapter(var myDataset: Array<Student>) :
        RecyclerView.Adapter<MyAdapter.MyViewHolder>() {

        open class MyViewHolder(parent: ViewGroup?, resId: Int)
            : RecyclerView.ViewHolder(LayoutInflater.from(parent?.context).inflate(resId, parent, false))

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder =
            MyViewHolder(parent, R.layout.student_card)

        override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
            holder.itemView.findViewById<TextView>(R.id.class_crn).text = myDataset[position].name
            holder.itemView.findViewById<TextView>(R.id.student_sub).text = myDataset[position].connectionId
        }

        override fun getItemCount() = myDataset.size
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_professor_class, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val startAdvertising = v.findViewById<Button>(R.id.startAdvertising)
        startAdvertising.setOnClickListener {
            model.isAdvertising.value = !model.isAdvertising.value!!
        }
        model.isAdvertising.observe(this, Observer {
            if (it) startAdvertising.text = "Stop attendance"
            else startAdvertising.text = "Start attendance"
        })

        val emptyView = v.findViewById<TextView>(R.id.noStudentsMarked)
        val viewManager = LinearLayoutManager(activity)
        val viewAdapter = MyAdapter(model.studentsHere.value!!.toTypedArray())

        val recyclerView = v.findViewById<RecyclerView>(R.id.recyclerView2)
        recyclerView.apply {
            // use this setting to improve performance if you know that changes
            // in content do not change the layout size of the RecyclerView
            setHasFixedSize(true)

            // use a linear layout manager
            layoutManager = viewManager

            // specify an viewAdapter (see also next example)
            adapter = viewAdapter

        }
        model.studentsHere.observe(this, Observer {
            if (it.isEmpty()) {
                recyclerView.visibility = View.GONE
                emptyView.visibility = View.VISIBLE
            }
            else {
                recyclerView.visibility = View.VISIBLE
                emptyView.visibility = View.GONE
            }

            viewAdapter.myDataset = it.toTypedArray()
            viewAdapter.notifyDataSetChanged()
        })

        val fab: View = v.findViewById(R.id.floatingActionButton2)
        fab.setOnClickListener {
            Navigation.findNavController(v).navigate(R.id.action_class1_to_manualStudentFragment)
        }

        return v
    }

    override fun onPause() {
        super.onPause()
        model.studentsHere.value = mutableListOf()
    }
}
