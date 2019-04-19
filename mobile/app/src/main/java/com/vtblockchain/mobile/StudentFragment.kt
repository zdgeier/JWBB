package com.vtblockchain.mobile

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class StudentFragment : Fragment() {
    private lateinit var model: MyViewModel

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
                Navigation.findNavController(holder.itemView).navigate(R.id.action_studentButton_to_studentClassFragment)
            }
        }

        override fun getItemCount() = myDataset.size
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_student, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val viewManager = LinearLayoutManager(activity)
        val viewAdapter = MyAdapter(model.classesCRN.value!!.toTypedArray(), model)

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
        model.isStudent.value = true
    }

    override fun onPause() {
        super.onPause()
        model.isStudent.value = false
    }
}
