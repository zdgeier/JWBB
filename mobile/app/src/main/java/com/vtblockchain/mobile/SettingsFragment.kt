package com.vtblockchain.mobile


import android.content.SharedPreferences
import android.os.Bundle
import androidx.lifecycle.ViewModelProviders
import androidx.preference.PreferenceFragmentCompat

class SettingsFragment : PreferenceFragmentCompat(), SharedPreferences.OnSharedPreferenceChangeListener {
    private lateinit var model: MyViewModel

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.preferences, rootKey)

        model = activity?.run {
            ViewModelProviders.of(this).get(MyViewModel::class.java)
        } ?: throw Exception("Invalid Activity")
    }

    override fun onSharedPreferenceChanged(sharedPreferences: SharedPreferences?, key: String?) {
        when(key) {
            "endpoint" -> {
                model.ipAddress.value = sharedPreferences?.getString(key, resources.getString(R.string.defaultEndpoint))
            }
            "student_username" -> {
                model.studentUsername.value = sharedPreferences?.getString(key, resources.getString(R.string.defaultStudentUsername))
            }
            "professor_username" -> {
                model.professorUsername.value = sharedPreferences?.getString(key, resources.getString(R.string.defaultProfessorUsername))
            }
        }
    }

    override fun onResume() {
        super.onResume()

        preferenceScreen.sharedPreferences
            .registerOnSharedPreferenceChangeListener(this)
    }

    override fun onPause() {
        super.onPause()

        preferenceScreen.sharedPreferences
            .unregisterOnSharedPreferenceChangeListener(this)
    }
}
