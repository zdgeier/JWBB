#include <eosiolib/eosio.hpp>
#include <list>
#include <iterator>
#include <vector>
using namespace eosio;

// Smart Contract Name: notechain
// Table struct:
//   attendance: multi index table to store attendance records
//     prim_key(uint64): primary key
//     user(name): account name for the user
//     xval(float): current x-coordinate
//	   yval(float): current y-coordinate
//     timestamp(uint64): the store the last update block time
//   classes: multi-index table to store class and boundaries 
//     crn(uint64_t): class's crn; primary key
//     x_min(float): minimum bound in the x-plane
//     x_max(float): maximum bound in the x-plane
//     y_min(float): minimum bound in the y-plane
//     y_max(float): maximum bound in the y-plane
// Public actions:
//   recordAttendance => put the attendance record into the table
//   createClass => create a class with given CRN and coordinate bounds

CONTRACT lokchain : public eosio::contract {
  private:

    TABLE attendance {
      uint64_t      prim_key;  // primary key
      name          user;	   // name of user
      float         xval;      // current x-coord
      float         yval;      // current y-coord
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      // only supports uint64_t, uint128_t, uint256_t, double or long double
      uint64_t get_by_user() const { return user.value; }
    };

    TABLE classes {
      uint64_t 		crn; //class crn
      std::list<std::pair<float,float>> coordinates; //list of coordinates

      // set crn as primary key
      auto primary_key() const { return crn; }
    };

    TABLE global {
    	uint64_t primary_key() const { return 0; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("attendance"), attendance,
      indexed_by< name("getbyuser"), const_mem_fun<attendance, uint64_t, &attendance::get_by_user> >
      > attendance_table;

    typedef eosio::multi_index< name("classes"), classes> class_table;

    typedef eosio::multi_index< name("global"), classes> global_table;

    attendance_table _attendance;
    class_table _classes;
    global_table _global;

  public:
    using contract::contract;

    // constructor
    lokchain( name receiver, name code, datastream<const char*> ds ):
                contract( receiver, code, ds ),
                _attendance( receiver, receiver.value ),
                _classes( receiver, receiver.value ) ,
                _global( receiver, receiver.value ) {}

    ACTION record( name user, float xval, float yval, uint64_t crn ) {
      // to sign the action with the given account
      require_auth( user );

      for (auto& item : _classes) {
      	if(item.crn == crn) {
      		auto iter = item.coordinates.begin();
      		auto a = *iter;
      		auto b = *(std::next(iter));
      		//check if the student is inside the class boundaries
      		//TODO: Update so it work with all polygons
      		if(xval >= a.first && xval <= b.first 
      			&& yval >= a.second && yval <= b.second){
		        _attendance.emplace( _self, [&]( auto& new_user ) {
			        new_user.prim_key    = _attendance.available_primary_key();
			        new_user.user        = user;
			        new_user.xval        = xval;
			        new_user.yval        = yval;
			        new_user.timestamp   = now();
		        });     
		        eosio::print("Attendance recorded!"); 			
      		}
      		else{
      			eosio::print("TRUANT: Outside of class bounds!");	
      		}
      		return;
      	}
      }
      eosio::print("Given CRN doesn't exist...");
    }

    ACTION create(name user, uint64_t crn, std::vector<float> xs, std::vector<float> ys) {
    	// to sign the action with the given account
    	require_auth( user );

    	std::list<std::pair<float,float>> coordinates;
    	//Assumes every x has a matching y 
    	for (int i = 0; i < xs.size(); i++){
    		coordinates.push_back(std::make_pair(xs[i], ys[i]));
    	}

    	_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = crn;
	        new_class.coordinates  = coordinates;
      	});
      	eosio::print("New class created");
    }

    //populates to classes table with set values
    ACTION populate(name user){
    	require_auth( user );

    	std::list<std::pair<float,float>> coordinates1;
    	std::list<std::pair<float,float>> coordinates2;
    	std::list<std::pair<float,float>> coordinates3;
			std::list<std::pair<float,float>> coordinates4;
			std::list<std::pair<float,float>> coordinates5;
			std::list<std::pair<float,float>> coordinates6;

    	coordinates1.push_back(std::make_pair(0, 0));
    	coordinates1.push_back(std::make_pair(100, 100));

    	coordinates2.push_back(std::make_pair(200, 200));
    	coordinates2.push_back(std::make_pair(250, 250));

    	coordinates3.push_back(std::make_pair(500, 500));
    	coordinates3.push_back(std::make_pair(600, 600));

    	coordinates4.push_back(std::make_pair(36, -81));
			coordinates4.push_back(std::make_pair(38, -79));

			coordinates5.push_back(std::make_pair(37.229405, -80.425249));
			coordinates5.push_back(std::make_pair(37.232590, -80.419741));

			coordinates6.push_back(std::make_pair(37.2302487, -80.4221991));
			coordinates6.push_back(std::make_pair(37.2308967, -80.4214124));

    	_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = 100;
	        new_class.coordinates  = coordinates1;
      	});

    	_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = 200;
	        new_class.coordinates  = coordinates2;
      	});

    	_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = 500;
	        new_class.coordinates  = coordinates3;
      	});

			_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = 420;
	        new_class.coordinates  = coordinates4;
      	});

			_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = 1;
	        new_class.coordinates  = coordinates5;
      	});
			
			_classes.emplace( _self, [&]( auto& new_class ) {
	        new_class.crn    	   = 12826;
	        new_class.coordinates  = coordinates6;
      	});

      	eosio::print("Classes populated");
    }
};

// specify the contract name, and export a public action: update and create
EOSIO_DISPATCH( lokchain, (record) (create) (populate))
