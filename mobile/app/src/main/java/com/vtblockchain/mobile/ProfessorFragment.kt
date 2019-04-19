package com.vtblockchain.mobile

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.vtblockchain.mobile.MainActivity.Companion.TAG


class ProfessorFragment : Fragment() {
    private lateinit var model: MyViewModel

    class MyAdapter(var myDataset: Array<String>) :
        RecyclerView.Adapter<MyAdapter.MyViewHolder>() {

        open class MyViewHolder(parent: ViewGroup?, resId: Int)
            : RecyclerView.ViewHolder(LayoutInflater.from(parent?.context).inflate(resId, parent, false))

        // Provide a reference to the views for each data item
        // Complex data items may need more than one view per item, and
        // you provide access to all the views for a data item in a view holder.
        // Each data item is just a string in this case that is shown in a TextView.
        //class MyViewHolder(val textView: TextView) : RecyclerView.ViewHolder(textView)


        // Create new views (invoked by the layout manager)
        override fun onCreateViewHolder(parent: ViewGroup,
                                        viewType: Int): MyViewHolder {
            // create a new view
            //val textView = LayoutInflater.from(parent.context)
             //   .inflate(R.layout.professor_class_card, parent, false) as TextView
            // set the view's size, margins, paddings and layout parameters

            return MyViewHolder(parent, R.layout.professor_class_card)
        }

        // Replace the contents of a view (invoked by the layout manager)
        override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
            // - get element from your dataset at this position
            // - replace the contents of the view with that element
            //holder..text = myDataset[position]
            Log.d(TAG, myDataset[position])
            holder.itemView.findViewById<TextView>(R.id.primary_text).text = myDataset[position]
        }

        // Return the size of your dataset (invoked by the layout manager)
        override fun getItemCount() = myDataset.size
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val v = inflater.inflate(R.layout.fragment_professor, container, false)
        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")

        val viewManager = LinearLayoutManager(activity)
        val viewAdapter = MyAdapter(model.classesCRN.value!!.toTypedArray())

        val recyclerView = v.findViewById<RecyclerView>(R.id.recyclerView)
        recyclerView.apply {
            // use this setting to improve performance if you know that changes
            // in content do not change the layout size of the RecyclerView
            setHasFixedSize(true)

            // use a linear layout manager
            layoutManager = viewManager

            // specify an viewAdapter (see also next example)
            adapter = viewAdapter

        }

        model.classesCRN.observe(this, Observer {
            viewAdapter.myDataset = it.toTypedArray()
            viewAdapter.notifyDataSetChanged()
        })

        /*
        val professorStatusText = v.findViewById<TextView>(R.id.professorStatusText)
        model.status.observe(this, Observer {
            professorStatusText.text = it
        })

        val professorCRNSpinner = v.findViewById<Spinner>(R.id.professorCRNSpinner)
        professorCRNSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) { }
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                model.selectedCRN.value = position
            }
        }
        model.classesCRN.observe(this, Observer {
            val adapter = ArrayAdapter<String>(
                context!!,
                android.R.layout.simple_spinner_item,
                it
            )
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            professorCRNSpinner.adapter = adapter
        })
        model.selectedCRN.observe(this, Observer {
            professorCRNSpinner.setSelection(it)
        })

        val startAdvertising = v.findViewById<Button>(R.id.startAdvertising)
        startAdvertising.setOnClickListener {
            model.isAdvertising.value = !model.isAdvertising.value!!
        }
        model.isAdvertising.observe(this, Observer {
            if (it) startAdvertising.text = "Stop Advertising"
            else startAdvertising.text = "Start Advertising"
        })

        val manualStudentAccountName = v.findViewById<EditText>(R.id.manualStudentAccountName)
        manualStudentAccountName.addTextChangedListener(object : TextWatcher{
            override fun afterTextChanged(s: Editable?) {}
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                model.studentName.value = s.toString()
            }
        })

        val markButton = v.findViewById<Button>(R.id.markButton)
        markButton.setOnClickListener {
            (activity as MainActivity).submitStudentLocation()
        }
        */

        return v
    }

    override fun onResume() {
        super.onResume()
        model.isStudent.value = true
        model.isAdvertising.value = false
    }

    override fun onPause() {
        super.onPause()
        model.isStudent.value = false
        model.isAdvertising.value = false
    }
}
