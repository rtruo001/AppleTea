/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    CONFIG/Database: explore.js

    Used to store the initial data from mongoose that gets sent for server side
    rendering. This file is needed in order to load the data in main.js to
    do client side rendering.
    ========================================================================== */

var exploreData = {
  db: null
}

// Setter function 
exports.set = function(dbData) {
  console.log('Setting client Explore data');
  console.log(dbData);
  exploreData.db = dbData;
}

// Getter function
exports.get = function() {
  console.log('Getting client Explore data');
  console.log(exploreData.db);
  return exploreData.db;
}