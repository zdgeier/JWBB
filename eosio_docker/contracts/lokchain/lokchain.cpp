#include "bounds.cpp"
#include <eosiolib/eosio.hpp>
#include <iterator>
#include <list>
#include <time.h>
#include <vector>
using namespace eosio;

// Smart Contract Name: lokchain
// Tables:
//   attendance: multi index table to store attendance records
//   classes: multi-index table to store class and boundaries
// Public actions:
//   recordAttendance => put the attendance record into the table
//   createClass => create a class with given CRN and coordinate bounds
//   populate => debug action to create a default set of classes

CONTRACT lokchain : public eosio::contract {
  private:
    TABLE attendance {
        uint64_t prim_key;  // primary key
        name user;          // name of user
        float xval;         // current x-coord
        float yval;         // current y-coord
        uint64_t crn;       // crn of the attended class
        uint64_t timestamp; // timestamp of attendance record

        auto primary_key() const { return prim_key; }
        uint64_t get_by_user() const { return user.value; }
    };

    TABLE classes {
        uint64_t crn;                                   // class crn
        std::string courseName;                         // name of the course
        std::list<std::pair<float, float>> coordinates; // list of coordinates
        uint64_t startTime; // start time of course in 24-hour format
        uint64_t endTime;   // end time of course in 24-hour format

        auto primary_key() const { return crn; }
        uint64_t get_by_starttime() const { return startTime; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index<
        name("attendance"), attendance,
        indexed_by<name("getbyuser"), const_mem_fun<attendance, uint64_t,
                                                    &attendance::get_by_user>>>
        attendance_table;

    typedef eosio::multi_index<
        name("classes"), classes,
        indexed_by<
            name("getbystime"),
            const_mem_fun<classes, uint64_t, &classes::get_by_starttime>>>
        class_table;

    attendance_table _attendance;
    class_table _classes;

  public:
    using contract::contract;

    // constructor
    lokchain(name receiver, name code, datastream<const char *> ds)
        : contract(receiver, code, ds), _attendance(receiver, receiver.value),
          _classes(receiver, receiver.value) {}

    ACTION record(name actor, name user, float xval, float yval, uint64_t crn) {
        // make sure the actor is a professor
        require_auth2(actor.value, name("professor").value);
        std::pair<float, float> location = std::make_pair(xval, yval);
        for (auto &item : _classes) {
            if (item.crn == crn) {
                // check if the student is inside the class boundaries
                if (inside(item.coordinates, location)) {
                    _attendance.emplace(_self, [&](auto &new_user) {
                        new_user.prim_key = _attendance.available_primary_key();
                        new_user.user     = user;
                        new_user.xval     = xval;
                        new_user.yval     = yval;
                        new_user.timestamp = now();
                        new_user.crn       = crn;
                    });
                    eosio::print("Attendance recorded!");
                }
                else {
                    eosio::print("Outside of class bounds!");
                }
                return;
            }
        }
        eosio::print("CRN ", crn, " doesn't exist...");
    }

    ACTION create(name user, uint64_t crn, std::string courseName,
                  std::vector<float> xs, std::vector<float> ys,
                  uint64_t startTime, uint64_t endTime) {
        // to sign the action with the given account
        require_auth(user);

        std::list<std::pair<float, float>> coordinates;
        // Assumes every x has a matching y
        for (int i = 0; i < xs.size(); i++) {
            coordinates.push_back(std::make_pair(xs[i], ys[i]));
            eosio::print("<", xs[i], " , ", ys[i], ">\n");
        }

        _classes.emplace(_self, [&](auto &new_class) {
            new_class.crn         = crn;
            new_class.courseName  = courseName;
            new_class.coordinates = coordinates;
            new_class.startTime   = startTime;
            new_class.endTime     = endTime;
        });
        eosio::print("New class created:  ", crn);
    }

    // populates to classes table with set values
    // TODO:REMOVE FOR FINAL SUBMISSION
    ACTION populate(name user) {
        require_auth(user);

        std::list<std::pair<float, float>> coordinates1;
        std::list<std::pair<float, float>> coordinates2;
        std::list<std::pair<float, float>> coordinates3;

        coordinates1.push_back(std::make_pair(0.0, 0.0));
        coordinates1.push_back(std::make_pair(0.0, 100.0));
        coordinates1.push_back(std::make_pair(100.0, 100.0));
        coordinates1.push_back(std::make_pair(100.0, 0.0));

        coordinates2.push_back(std::make_pair(200.0, 200.0));
        coordinates2.push_back(std::make_pair(200.0, 250.0));
        coordinates2.push_back(std::make_pair(250.0, 250.0));
        coordinates2.push_back(std::make_pair(250.0, 200.0));

        coordinates3.push_back(std::make_pair(500.0, 500.0));
        coordinates3.push_back(std::make_pair(500.0, 600.0));
        coordinates3.push_back(std::make_pair(600.0, 600.0));
        coordinates3.push_back(std::make_pair(600.0, 500.0));

        _classes.emplace(_self, [&](auto &new_class) {
            new_class.crn         = 100;
            new_class.coordinates = coordinates1;
            new_class.courseName  = "Cabbage Psychology";
            new_class.startTime   = 800;
            new_class.endTime     = 850;
        });

        _classes.emplace(_self, [&](auto &new_class) {
            new_class.crn         = 200;
            new_class.coordinates = coordinates2;
            new_class.courseName  = "Intro to Art";
            new_class.startTime   = 1325;
            new_class.endTime     = 1415;
        });

        _classes.emplace(_self, [&](auto &new_class) {
            new_class.crn         = 500;
            new_class.coordinates = coordinates3;
            new_class.courseName  = "Systems and Networking Capstone";
            new_class.startTime   = 200;
            new_class.endTime     = 2300;
        });

        eosio::print("Classes populated");
    }
};

// specify the contract name, and export a public action: update and create
EOSIO_DISPATCH(lokchain, (record)(create)(populate))
