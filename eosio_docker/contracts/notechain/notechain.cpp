#include <eosiolib/eosio.hpp>

using namespace eosio;

// Smart Contract Name: notechain
// Table struct:
//   notestruct: multi index table to store the notes
//     prim_key(uint64): primary key
//     user(name): account name for the user
//     note(string): the note message
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has note in table or not
// Public actions:
//   update => put the note into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
CONTRACT notechain : public eosio::contract {
  private:
    bool isnewuser( name user ) {
      // get notes by using secordary key
      auto note_index = _notes.get_index<name("getbyuser")>();
      auto note_iterator = note_index.find(user.value);

      return note_iterator == note_index.end();
    }

    TABLE notestruct {
      uint64_t      prim_key;  // primary key
      name          user;
      float         xval;      // account name for the user
      float         yval;      // account name for the user
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      // only supports uint64_t, uint128_t, uint256_t, double or long double
      uint64_t get_by_user() const { return user.value; }
    };

    TABLE classbounds {
      uint64_t 		crn; //class crn
      float			x_min; //min x coord
      float			x_max; //max x coord
      float			y_min; //min y coord
      float			y_max; //max y coord

      // set crn as primary key
      auto primary_key() const { return crn; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("notestruct"), notestruct,
      indexed_by< name("getbyuser"), const_mem_fun<notestruct, uint64_t, &notestruct::get_by_user> >
      > note_table;

    typedef eosio::multi_index< name("classbounds"), classbounds> class_table;


    note_table _notes;
    class_table _classes;

  public:
    using contract::contract;

    // constructor
    notechain( name receiver, name code, datastream<const char*> ds ):
                contract( receiver, code, ds ),
                _notes( receiver, receiver.value ),
                _classes( receiver, receiver.value ) {}

    ACTION update( name user, float xval, float yval, uint64_t crn ) {
      // to sign the action with the given account
      require_auth( user );

      for (auto& item : _classes) {
      	if(item.crn == crn) {
      		if(xval >= item.x_min && xval <= item.x_max && yval >= item.y_min && yval <= item.y_max){
      				  	  // insert new location
		      _notes.emplace( _self, [&]( auto& new_user ) {
		        new_user.prim_key    = _notes.available_primary_key();
		        new_user.user        = user;
		        new_user.xval        = xval;
		        new_user.yval        = yval;
		        new_user.timestamp   = now();
		      });      			
      		}
      		else{
      			eosio::print("Outside of class bounds");	
      		}
      		return;
      	}
      }
      eosio::print("Given CRN doesn't exist");
    }

    ACTION create(name user, uint64_t crn, float x_min, float x_max, float y_min, float y_max) {

    	require_auth( user );

    	_classes.emplace( _self, [&]( auto& new_class ) {
        new_class.crn    	   = crn;
        new_class.x_min        = x_min;
        new_class.x_max        = x_max;
        new_class.y_min        = y_min;
        new_class.y_max        = y_max;
      });
      eosio::print("New class created");
    }

};

// specify the contract name, and export a public action: update and create
EOSIO_DISPATCH( notechain, (update) (create))
