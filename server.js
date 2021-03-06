const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.MONGODB_URI;
if (uri == null || uri == "")
  uri = "mongodb://localhost:27017/rate-my-city";

//testing
function mkBrRating(v){
    return mkRating(v, v, v, v, v, v, v);
}

function mkRating(e, n, co, s, cu, t, f){
    return {
        entertainment : e,
        nature        : n,
        cost          : co,
        safety        : s,
        culture       : cu,
        transportation: t,
        food          : f
    }
}



dbApi = {};

async function dbInit(){
    await mongoose.connect(uri);
    const UserProfile = mongoose.model('UserProfile', new mongoose.Schema({
       firstName : String,
       lastName  : String,
       userName  : String,
       email     : String,
       pwhash    : String,
       ratings   : [{cityid: String}],
       isVerified: Boolean,
       emailToken: String
    }));
    const CityData = mongoose.model('CityData', new mongoose.Schema({
       name    : String,
       state   : String,
       country : String,
       averageRating  : {
           entertainment : Number,
           nature        : Number,
           cost          : Number,
           safety        : Number,
           culture       : Number,
           transportation: Number,
           food          : Number
       },
       ratings : [{
           userid     : String,
           rating     : {
               entertainment : Number,
               nature        : Number,
               cost          : Number,
               safety        : Number,
               culture       : Number,
               transportation: Number,
               food          : Number
           },
           description: String,
           time       : Date,
           upvotes: [{userid: String}],
           comments:[{
                userid : String,
                comment: String,
                time   : Date
           }]
        }]
    }));


    dbApi.allUsers          = ()     => UserProfile.find();
    dbApi.userByEmail       = (e)    => UserProfile.findOne({email: e});
    dbApi.userByUserName    = (u)    => UserProfile.findOne({userName: u});
    dbApi.updateUserByEmail = (e, u) => UserProfile.findOneAndUpdate({email: e}, u, ()=>{});
    dbApi.userByToken = (e) => UserProfile.findOne({emailToken: e});
    dbApi.updateByToken = (e, u) => UserProfile.findOneAndUpdate({emailToken: e}, {"$set" : u}, ()=>{});
    dbApi.updateUserBySetting = (id, u) => UserProfile.findOneAndUpdate({_id: id}, { "$set": u}, ()=>{});
    dbApi.createUser  = (f,l,u,e,pw, token)   => {
        const newUser = new UserProfile({
            firstName: f,
            lastName : l,
            userName : u,
            email    : e,
            pwhash   : pw,
            isVerified: false,
            emailToken: token
        }).save();
        return newUser
    };

    //dbApi.allCities    = ()        => CityData.find().sort({"name": 1});
    dbApi.searchCityAndState = async (city, state) => {
      var res =  await CityData.aggregate([
          {
          "$match": {
           $and: [
           {"name" : { "$regex": new RegExp(city, 'i' )}},
           {"state" : {"$regex": new RegExp(state, 'i')}}
         ]}
          },
          {"$unwind" : {"path": "$ratings",
            "preserveNullAndEmptyArrays": true}},
          {
          "$group": {
           "_id" : "$name",
           "state" : {"$first" : "$state"},
           "averageEntertainment": {
             "$avg" : "$ratings.rating.entertainment"
           },
           "averageNature" : {
             "$avg" : "$ratings.rating.nature"
           },
           "averageCost" : {
             "$avg" : "$ratings.rating.cost"
           },
           "averageSafety" : {
             "$avg" : "$ratings.rating.safety"
           },
           "averageCulture" : {
             "$avg" : "$ratings.rating.culture"
           },
           "averageTransportation" : {
             "$avg" : "$ratings.rating.transportation"
           },
           "averageFood" : {
             "$avg" : "$ratings.rating.food"
           },
           "ratings" : {"$push" : "$ratings"}
           /*"ratings": {
             "$filter": {
               "input": "$ratings",
               "as": "ratings",
               "cond": {
                 "$eq": [
                   "$$ratings.userid",
                   userId
                 ]
               }
             }
           }*/
          }
        },
        { "$sort" : { "_id" : 1} },
        {"$project" : {
          "_id" : 1,
          "state" : 1,
          "averageEntertainment": 1,
          "averageNature" : 1,
          "averageCost" : 1,
          "averageSafety" : 1,
          "averageCulture" :1,
          "averageTransportation" : 1,
          "averageFood" : 1,
          "ratings": { "$cond": [
            { "$eq": [{ "$size": { "$ifNull": [ "$ratings",[]] }}, 0] },
            { "$ifNull": [ "$ratings", [] ] },
            { "$setDifference": [
                { "$map": {
                    "input": "$ratings",
                    "as": "i",
                    "in": "$$i"/*{ "$cond": [
                      { "$eq": [ "$$i.deleted", null ] },
                     "$$i",
                        false
                    ]}*/
                }},
                [false]
            ]}
          ]}
        }
        }

      ])
      for (city of res)
        for (rating of city.ratings){
            var userid = rating.userid;
            console.log("Finding user with id "+userid);
            var user = await UserProfile.findOne({_id: userid}).lean();
            console.log("Result: "+JSON.stringify(user));
            if(user == null)
                rating.userdetails = {
                   firstName: "",
                   lastName: "",
                   userName: ""
                };
            else
                rating.userdetails = {
                   firstName: user.firstName,
                   lastName: user.lastName,
                   userName: user.userName
                };
        }
        for (city of res)
        {
          if (city.ratings.length == 0)
          {
            city.averageEntertainment = 0,
            city.averageNature = 0,
            city.averageCost = 0,
            city.averageSafety = 0,
            city.averageCulture = 0,
            city.averageTransportation = 0,
            city.averageFood = 0
          }
        }
      /*var res = await CityData.find({$and: [
                            {name: {$regex: new RegExp(city, 'i')}},
                            {state: {$regex: new RegExp(state, 'i')}}
                            ]}).lean();
      for (city of res)
          for (rating of city.ratings){
              var userid = rating.userid;
              console.log("Finding user with id "+userid);
              var user = await UserProfile.findOne({_id: userid}).lean();
              console.log("Result: "+JSON.stringify(user));
              if(user == null)
                  rating.userdetails = {
                     firstName: "",
                     lastName: "",
                     userName: ""
                  };
              else
                  rating.userdetails = {
                     firstName: user.firstName,
                     lastName: user.lastName,
                     userName: user.userName
                  };
          }*/
      return res;
    };

    dbApi.searchUsername = async (userId, city, state)   => {
        /*let regex = new RegExp(query,'i');
        return CityData.find({$or: [{name: regex },
                                    {state: regex},
                                    {country: regex},]
         });*/
        var res =  await CityData.aggregate([
            {
            "$match": {
             $and: [
             {"ratings": {
               "$elemMatch": {
                 "userid": userId
               }
             }},
             {"name" : { "$regex": new RegExp(city, 'i' )}},
             {"state" : {"$regex": new RegExp(state, 'i')}}
            ]}
            },
            {"$unwind" : "$ratings"},
            {
            "$group": {
             "_id" : "$name",
             "state" : {"$first" : "$state"},
             "averageEntertainment": {
               "$avg" : "$ratings.rating.entertainment"
             },
             "averageNature" : {
               "$avg" : "$ratings.rating.nature"
             },
             "averageCost" : {
               "$avg" : "$ratings.rating.cost"
             },
             "averageSafety" : {
               "$avg" : "$ratings.rating.safety"
             },
             "averageCulture" : {
               "$avg" : "$ratings.rating.culture"
             },
             "averageTransportation" : {
               "$avg" : "$ratings.rating.transportation"
             },
             "averageFood" : {
               "$avg" : "$ratings.rating.food"
             },
             "ratings" : {"$push" : "$ratings"}
             /*"ratings": {
               "$filter": {
                 "input": "$ratings",
                 "as": "ratings",
                 "cond": {
                   "$eq": [
                     "$$ratings.userid",
                     userId
                   ]
                 }
               }
             }*/
            }
          },
          { "$sort" : { "_id" : 1} },
          {"$project" : {
            "_id" : 1,
            "state" : 1,
            "averageEntertainment": 1,
            "averageNature" : 1,
            "averageCost" : 1,
            "averageSafety" : 1,
            "averageCulture" :1,
            "averageTransportation" : 1,
            "averageFood" : 1,
            "ratings": {
              "$filter": {
                "input": "$ratings",
                "as": "ratings",
                "cond": {
                  "$eq": [
                    "$$ratings.userid",
                    userId
                  ]
                }
              }
            }
          }
        }
        ])
        for (city of res)
          for (rating of city.ratings){
              var userid = rating.userid;
              console.log("Finding user with id "+userid);
              var user = await UserProfile.findOne({_id: userid}).lean();
              console.log("Result: "+JSON.stringify(user));
              if(user == null)
                  rating.userdetails = {
                     firstName: "",
                     lastName: "",
                     userName: ""
                  };
              else
                  rating.userdetails = {
                     firstName: user.firstName,
                     lastName: user.lastName,
                     userName: user.userName
                  };
          }
      return res;
    };
    dbApi.cities = async(city) =>{
      var res =  await CityData.aggregate([
          {
          "$match": {
           $and: [
           {"name" : { "$regex": new RegExp(city, 'i' )}},
           {"state" : {"$regex": new RegExp("", 'i')}}
          ]}
          },
          {"$unwind" : {"path": "$ratings",
            "preserveNullAndEmptyArrays": true}},
          {
          "$group": {
           "_id" : "$name",
           "state" : {"$first" : "$state"},
           "averageEntertainment": {
             "$avg" : "$ratings.rating.entertainment"
           },
           "averageNature" : {
             "$avg" : "$ratings.rating.nature"
           },
           "averageCost" : {
             "$avg" : "$ratings.rating.cost"
           },
           "averageSafety" : {
             "$avg" : "$ratings.rating.safety"
           },
           "averageCulture" : {
             "$avg" : "$ratings.rating.culture"
           },
           "averageTransportation" : {
             "$avg" : "$ratings.rating.transportation"
           },
           "averageFood" : {
             "$avg" : "$ratings.rating.food"
           },
           //"ratings" : {"$push" : "$ratings"}
          }
        },
        { "$sort" : { "_id" : 1} },
        {"$project" : {
          "_id" : 1,
          "state" : 1,
          "averageEntertainment": 1,
          "averageNature" : 1,
          "averageCost" : 1,
          "averageSafety" : 1,
          "averageCulture" :1,
          "averageTransportation" : 1,
          "averageFood" : 1,
          /*"ratings": { "$cond": [
            { "$eq": [{ "$size": { "$ifNull": [ "$ratings",[]] }}, 0] },
            { "$ifNull": [ "$ratings", [] ] },
            { "$setDifference": [
                { "$map": {
                    "input": "$ratings",
                    "as": "i",
                    "in": "$$i"
                }},
                [false]
            ]}
          ]}*/
        }
        }

      ])
      /*for (city of res)
        for (rating of city.ratings){
            var userid = rating.userid;
            console.log("Finding user with id "+userid);
            var user = await UserProfile.findOne({_id: userid}).lean();
            console.log("Result: "+JSON.stringify(user));
            if(user == null)
                rating.userdetails = {
                   firstName: "",
                   lastName: "",
                   userName: ""
                };
            else
                rating.userdetails = {
                   firstName: user.firstName,
                   lastName: user.lastName,
                   userName: user.userName
                };
        }*/
        for (city of res)
        {
          if (city.averageEntertainment == null)
          {
            city.averageEntertainment = "0.0";
            city.averageNature = "0.0";
            city.averageCost = "0.0";
            city.averageSafety = "0.0";
            city.averageCulture = "0.0";
            city.averageTransportation = "0.0";
            city.averageFood = "0.0";
          }
          else {
            /*city.averageEntertainment = Math.round(city.averageEntertainment * 10) / 10;
            city.averageNature = Math.round(city.averageNature * 10) / 10;
            city.averageCost = Math.round(city.averageCost * 10) / 10;
            city.averageSafety = Math.round(city.averageSafety * 10) / 10;
            city.averageCulture = Math.round(city.averageCulture * 10) / 10;
            city.averageTransportation = Math.round(city.averageTransportation * 10) / 10;
            city.averageFood = Math.round(city.averageFood * 10) / 10;*/

            city.averageEntertainment = city.averageEntertainment.toFixed(1);
            city.averageNature =   city.averageNature.toFixed(1);
            city.averageCost = city.averageCost.toFixed(1);
            city.averageSafety = city.averageSafety.toFixed(1);
            city.averageCulture = city.averageCulture.toFixed(1);
            city.averageTransportation = city.averageTransportation.toFixed(1);
            city.averageFood = city.averageFood.toFixed(1);
          }
        }
        /*for (city of res)
          for (rating of city.ratings){
            rating.ent = rating.rating.entertainment;
            rating.nat = rating.rating.nature;
            rating.co = rating.rating.cost;
            rating.saf = rating.rating.safety;
            rating.cult = rating.rating.culture;
            rating.tran = rating.rating.transportation;
            rating.f = rating.rating.food;
          }*/
      return res;
  };

  dbApi.states = async (state) => {
    var res =  await CityData.aggregate([
        {
        "$match": {
          $and: [
          {"name" : { "$regex": new RegExp("", 'i' )}},
          {"state" : {"$regex": new RegExp(state, 'i')}}
         ]}
        },
        {"$unwind" : {"path": "$ratings",
          "preserveNullAndEmptyArrays": true}},
        {
        "$group": {
         "_id" : "$name",
         "state" : {"$first" : "$state"},
         "averageEntertainment": {
           "$avg" : "$ratings.rating.entertainment"
         },
         "averageNature" : {
           "$avg" : "$ratings.rating.nature"
         },
         "averageCost" : {
           "$avg" : "$ratings.rating.cost"
         },
         "averageSafety" : {
           "$avg" : "$ratings.rating.safety"
         },
         "averageCulture" : {
           "$avg" : "$ratings.rating.culture"
         },
         "averageTransportation" : {
           "$avg" : "$ratings.rating.transportation"
         },
         "averageFood" : {
           "$avg" : "$ratings.rating.food"
         },
         "ratings" : {"$push" : "$ratings"}
        }
      },
      { "$sort" : { "_id" : 1} },
      {"$project" : {
        "_id" : 1,
        "state" : 1,
        "averageEntertainment": 1,
        "averageNature" : 1,
        "averageCost" : 1,
        "averageSafety" : 1,
        "averageCulture" :1,
        "averageTransportation" : 1,
        "averageFood" : 1,
        "ratings": { "$cond": [
          { "$eq": [{ "$size": { "$ifNull": [ "$ratings",[]] }}, 0] },
          { "$ifNull": [ "$ratings", [] ] },
          { "$setDifference": [
              { "$map": {
                  "input": "$ratings",
                  "as": "i",
                  "in" : "$$i"
              }},
              [false]
          ]}
        ]}
      }
      }

    ])
    for (city of res)
      for (rating of city.ratings){
          var userid = rating.userid;
          console.log("Finding user with id "+userid);
          var user = await UserProfile.findOne({_id: userid}).lean();
          console.log("Result: "+JSON.stringify(user));
          if(user == null)
              rating.userdetails = {
                 firstName: "",
                 lastName: "",
                 userName: ""
              };
          else
              rating.userdetails = {
                 firstName: user.firstName,
                 lastName: user.lastName,
                 userName: user.userName
              };
      }
      for (city of res)
      {
        if (city.ratings.length == 0)
        {
          city.averageEntertainment = 0,
          city.averageNature = 0,
          city.averageCost = 0,
          city.averageSafety = 0,
          city.averageCulture = 0,
          city.averageTransportation = 0,
          city.averageFood = 0
        }
      }
      for (city of res)
      {
        if (city.averageEntertainment == 0)
        {
          city.averageEntertainment = "0";
          city.averageNature = "0";
          city.averageCost = "0";
          city.averageSafety = "0";
          city.averageCulture = "0";
          city.averageTransportation = "0";
          city.averageFood = "0";
        }
        /*else {
          city.averageEntertainment = city.averageEntertainment.toString();
          city.averageNature =   city.averageNature.toString();
          city.averageCost = city.averageCost.toString();
          city.averageSafety = city.averageSafety.toString();
          city.averageCulture = city.averageCulture.toString();
          city.averageTransportation = city.averageTransportation.toString();
          city.averageFood = city.averageFood.toString();
        }*/
        city.averageEntertainment = city.averageEntertainment.toFixed(1);
        city.averageNature =   city.averageNature.toFixed(1);
        city.averageCost = city.averageCost.toFixed(1);
        city.averageSafety = city.averageSafety.toFixed(1);
        city.averageCulture = city.averageCulture.toFixed(1);
        city.averageTransportation = city.averageTransportation.toFixed(1);
        city.averageFood = city.averageFood.toFixed(1);
      }
      for (city of res)
        for (rating of city.ratings){
          rating.ent = rating.rating.entertainment;
          rating.nat = rating.rating.nature;
          rating.co = rating.rating.cost;
          rating.saf = rating.rating.safety;
          rating.cult = rating.rating.culture;
          rating.tran = rating.rating.transportation;
          rating.f = rating.rating.food;
        }
    return res;
  };
  dbApi.usernames = async (userId) => {
    var res =  await CityData.aggregate([
        {
        "$match": {
         $and: [
         {"ratings": {
           "$elemMatch": {
             "userid": userId
           }
         }},
         {"name" : { "$regex": new RegExp("", 'i' )}},
         {"state" : {"$regex": new RegExp("", 'i')}}
        ]}
        },
        {"$unwind" : "$ratings"},
        {
        "$group": {
         "_id" : "$name",
         "state" : {"$first" : "$state"},
         "averageEntertainment": {
           "$avg" : "$ratings.rating.entertainment"
         },
         "averageNature" : {
           "$avg" : "$ratings.rating.nature"
         },
         "averageCost" : {
           "$avg" : "$ratings.rating.cost"
         },
         "averageSafety" : {
           "$avg" : "$ratings.rating.safety"
         },
         "averageCulture" : {
           "$avg" : "$ratings.rating.culture"
         },
         "averageTransportation" : {
           "$avg" : "$ratings.rating.transportation"
         },
         "averageFood" : {
           "$avg" : "$ratings.rating.food"
         },
         "ratings" : {"$push" : "$ratings"}
        }
      },
      { "$sort" : { "_id" : 1} },
      {"$project" : {
        "_id" : 1,
        "state" : 1,
        "averageEntertainment": 1,
        "averageNature" : 1,
        "averageCost" : 1,
        "averageSafety" : 1,
        "averageCulture" :1,
        "averageTransportation" : 1,
        "averageFood" : 1,
        "ratings": {
          "$filter": {
            "input": "$ratings",
            "as": "ratings",
            "cond": {
              "$eq": [
                "$$ratings.userid",
                userId
              ]
            }
          }
        }
      }
    }
    ])
    for (city of res)
      for (rating of city.ratings){
          var userid = rating.userid;
          console.log("Finding user with id "+userid);
          var user = await UserProfile.findOne({_id: userid}).lean();
          console.log("Result: "+JSON.stringify(user));
          if(user == null)
              rating.userdetails = {
                 firstName: "",
                 lastName: "",
                 userName: ""
              };
          else
              rating.userdetails = {
                 firstName: user.firstName,
                 lastName: user.lastName,
                 userName: user.userName
              };
      }
      for (city of res)
        for (rating of city.ratings){
          rating.ent = rating.rating.entertainment;
          rating.nat = rating.rating.nature;
          rating.co = rating.rating.cost;
          rating.saf = rating.rating.safety;
          rating.cult = rating.rating.culture;
          rating.tran = rating.rating.transportation;
          rating.f = rating.rating.food;
        }
        /*for (city of res)
        {

          city.averageEntertainment = Math.round(city.averageEntertainment * 10) / 10;
          city.averageNature = Math.round(city.averageNature * 10) / 10;
          city.averageCost = Math.round(city.averageCost * 10) / 10;
          city.averageSafety = Math.round(city.averageSafety * 10) / 10;
          city.averageCulture = Math.round(city.averageCulture * 10) / 10;
          city.averageTransportation = Math.round(city.averageTransportation * 10) / 10;
          city.averageFood = Math.round(city.averageFood * 10) / 10;

          city.averageEntertainment = city.averageEntertainment.toFixed(1);
          city.averageNature = city.averageNature.toFixed(1);
          city.averageCost = city.averageCost.toFixed(1);
          city.averageSafety = city.averageSafety.toFixed(1);
          city.averageCulture = city.averageCulture.toFixed(1);
          city.averageTransportation = city.averageTransportation.toFixed(1);
          city.averageFood = city.averageFood.toFixed(1);
        }*/
  return res;
};

    dbApi.allStates   = async ()   => {
        //Get the raw state data from Mongo
        var states = await CityData.find().select('state -_id').sort({"state": 1})
        //var realStates = states.filter(function (e) {return e.state != null});
        let arraySerialized = states.map(e => JSON.stringify(e));
        const setSerialized = new Set(arraySerialized);
        const newArrSerialized = [...setSerialized];
        const newArr = newArrSerialized.map(e => JSON.parse(e));

        return newArr;
    };
    dbApi.allCities = async () => {
      //Get the raw city data from Mongo
      var cities = await CityData.find().select('name -_id').sort({"name": 1})
      //var realCities = cities.filter(function (e) {return e.name != null});
      let arraySerialized = cities.map(e => JSON.stringify(e));
      const setSerialized = new Set(arraySerialized);
      const newArrSerialized = [...setSerialized];
      const newArr = newArrSerialized.map(e => JSON.parse(e));

      return newArr;
    };
    dbApi.allUsers = async () => {
      //Get the raw state data from Mongo
      /*var users = await UserProfile.find().select('userName -_id').sort({"userName": 1});
      //De-duplicate it
      var distinct = new Set();
      for (a of users)
      {
          if (a.userName != null)
            distinct.add(a.userName);
      }
      //Format it in an array for the result
      var res = [];
      distinct.forEach(k => res.push(k));
      return res;*/

      var users = await UserProfile.find().select('userName -_id').sort({"userName": 1})
      var realUsers = users.filter(function (e) {return e.userName != null});
      let arraySerialized = realUsers.map(e => JSON.stringify(e));
      const setSerialized = new Set(arraySerialized);
      const newArrSerialized = [...setSerialized];
      const newArr = newArrSerialized.map(e => JSON.parse(e));

      return newArr;
    };
    dbApi.cityByName  = (n)        => CityData.findOne({name: n});
    dbApi.createCity  = (cName, cState, cCountry)  => {
        const newCity = new CityData({
            name    : cName,
            state   : cState,
            country : cCountry,
            averageRating  : mkBrRating(0)
        }).save();
    };
    dbApi.deleteRating = async (uEmail, cityName) => {
        var city = (await dbApi.cityByName(cityName));
        var cId = city._id;
        var user = (await dbApi.userByEmail(uEmail));
        var uId = user._id;
        /*var curAvgRating = city.averageRating;


        var curNumRatings = city.ratings.length;
        var newNumRatings = curNumRatings - 1;

        var oldEntertainmentAvgRating;
  	    var oldNatureAvgRating;
          var oldCostAvgRating;
          var oldSafetyAvgRating;
          var oldCultureAvgRating;
          var oldTranspAvgRating;
          var oldFoodAvgRating;

        for (a of city.ratings)
        {
          if (a.userid == uId)
          {
            oldEntertainmentAvgRating = a.rating.entertainment;
      	    oldNatureAvgRating = a.rating.nature;
            oldCostAvgRating = a.rating.cost;
            oldSafetyAvgRating = a.rating.safety;
            oldCultureAvgRating = a.rating.culture;
            oldTranspAvgRating = a.rating.transportation;
            oldFoodAvgRating = a.rating.food;
          }
        }
  	    // Old Average ratings
  	    var curEntertainmentAvgRating = curAvgRating.entertainment;
  	    var curNatureAvgRating = curAvgRating.nature;
          var curCostAvgRating = curAvgRating.cost;
          var curSafetyAvgRating = curAvgRating.safety;
          var curCultureAvgRating = curAvgRating.culture;
          var curTranspAvgRating = curAvgRating.transportation;
          var curFoodAvgRating = curAvgRating.food;

          var newEntertainmentAvgRating;
          var newNatureAvgRating;
          var newCostAvgRating;
          var newSafetyAvgRating;
          var newCultureAvgRating;
          var newTranspAvgRating;
          var newFoodAvgRating;

          var newAvgRating;

          if (newNumRatings != 0)
          {
  	    // Delete user rating from old average and compute new average
           newEntertainmentAvgRating = ((curEntertainmentAvgRating * curNumRatings) - oldEntertainmentAvgRating) / newNumRatings;
           newNatureAvgRating = ((curNatureAvgRating * curNumRatings) - oldNatureAvgRating) / newNumRatings;
           newCostAvgRating = ((curCostAvgRating * curNumRatings) - oldCostAvgRating) / newNumRatings;
           newSafetyAvgRating = ((curSafetyAvgRating * curNumRatings) - oldSafetyAvgRating) / newNumRatings;
           newCultureAvgRating = ((curCultureAvgRating * curNumRatings) - oldCultureAvgRating) / newNumRatings;
           newTranspAvgRating = ((curTranspAvgRating * curNumRatings) - oldTranspAvgRating) / newNumRatings;
           newFoodAvgRating = ((curFoodAvgRating * curNumRatings) - oldFoodAvgRating) / newNumRatings;

            newAvgRating = mkRating(
                 newEntertainmentAvgRating,
                 newNatureAvgRating,
                 newCostAvgRating,
                 newSafetyAvgRating,
                 newCultureAvgRating,
                 newTranspAvgRating,
                 newFoodAvgRating
               );
          }
          else {
            newAvgRating = mkRating(
                 0,
                 0,
                 0,
                 0,
                 0,
                 0,
                 0
               );
          }
          */
        console.log("Attempting to pull rating from city "+cId+" by user "+uId);

        CityData.updateOne({_id: cId}, {
            "$pull": { "ratings" : {userid: uId}}
        }, { safe: true, multi:true }, (err, obj)=>{
            console.log(err);
        });
         /*CityData.findOneAndUpdate({_id: cId}, {
            averageRating: newAvgRating
        }, ()=>{});*/
    };

    dbApi.addComment = async (cityName, ratingUserName, timePosted, uEmail, uComment) => {
        // User that wants to comment.
        var uId = (await dbApi.userByEmail(uEmail))._id;
        // User that already made a rating.
        var rating_uId = (await dbApi.userByUserName(ratingUserName))._id;
        var cId = (await dbApi.cityByName(cityName))._id;

        CityData.findOneAndUpdate({_id: cId, "ratings.userid": rating_uId}, {
            $push: {
                "ratings.0.comments": {
                    "userid":   uId,
                    "comment":  uComment,
                    "time":     new Date().toISOString()
                }
            }
        });
    };


    //     CityData.findOneAndUpdate({"name" : cityName, "ratings.userid" : rating_uId, "ratings.time" : timePosted}, {
    //         $push: {comments : {
    //             userid:     uId,
    //             comment:    uComment,
    //             time:       new Date().toISOString()
    //         }}
    //     }, ()=>{});
    // };

    dbApi.addRating = async (uEmail, cityName, uRating, review) => {
        var city = (await dbApi.cityByName(cityName));
        var cId = city._id;
        var uId = (await dbApi.userByEmail(uEmail))._id;
        /*var curAvgRating = city.averageRating;


	    var curNumRatings = city.ratings.length;
	    var newNumRatings = curNumRatings + 1;

	    // Old Average ratings
	    var curEntertainmentAvgRating = curAvgRating.entertainment;
	    var curNatureAvgRating = curAvgRating.nature;
        var curCostAvgRating = curAvgRating.cost;
        var curSafetyAvgRating = curAvgRating.safety;
        var curCultureAvgRating = curAvgRating.culture;
        var curTranspAvgRating = curAvgRating.transportation;
        var curFoodAvgRating = curAvgRating.food;

	    // New user rating to add to new average
        var userEntertainmentRating = uRating.entertainment;
        var userNatureRating = uRating.nature;
        var userCostRating = uRating.cost;
        var userSafetyRating = uRating.safety;
        var userCultureRating = uRating.culture;
        var userTranspRating = uRating.transportation;
        var userFoodRating = uRating.food;

	    // Add new user rating to old average and compute new average
        var newEntertainmentAvgRating = ((curEntertainmentAvgRating * curNumRatings) + userEntertainmentRating) / newNumRatings;
        var newNatureAvgRating = ((curNatureAvgRating * curNumRatings) + userNatureRating) / newNumRatings;
        var newCostAvgRating = ((curCostAvgRating * curNumRatings) + userCostRating) / newNumRatings;
        var newSafetyAvgRating = ((curSafetyAvgRating * curNumRatings) + userSafetyRating) / newNumRatings;
        var newCultureAvgRating = ((curCultureAvgRating * curNumRatings) + userCultureRating) / newNumRatings;
        var newTranspAvgRating = ((curTranspAvgRating * curNumRatings) + userTranspRating) / newNumRatings;
        var newFoodAvgRating = ((curFoodAvgRating * curNumRatings) + userFoodRating) / newNumRatings;

	    var newAvgRating = mkRating(
            newEntertainmentAvgRating,
            newNatureAvgRating,
            newCostAvgRating,
            newSafetyAvgRating,
            newCultureAvgRating,
            newTranspAvgRating,
            newFoodAvgRating
          );*/

        //var newAvgRating = curAvgRating;
        /*CityData.findOneAndUpdate({_id: cId}, {
         averageRating: newAvgRating
       }, ()=>{})*/
       /*var city2 = await CityData.findOne({_id: cId});
        city2.averageRating = newAvgRating;
        city2.save();*/
        //return newAvgRating;

        UserProfile.findOneAndUpdate({email: uEmail}, {
            $push: {ratings : {cityid: cId} }
        }, ()=>{});

         await CityData.findOneAndUpdate({_id: cId}, {
            //averageRating: newAvgRating,
            $push: {ratings : {
                userid:       uId,
                rating:       uRating,
                description:  review,
                time:         new Date().toISOString()
            }}
        }, ()=>{});

        /*CityData.findOneAndUpdate({_id: cId}, {"$set" :
        {averageRating: newAvgRating,
        $push: {ratings : {
            userid:       uId,
            rating:       uRating,
            description:  review,
            time:         new Date().toISOString()
          }}}}, ()=>{});*/
    };
    dbApi.editRating = async(uEmail, cityName, uRating, review) => {
      var city = (await dbApi.cityByName(cityName));
      var cId = city._id;
      var user = (await dbApi.userByEmail(uEmail));
      var uId = user._id;
      var curAvgRating = city.averageRating;

      /*var curNumRatings = city.ratings.length;
	    var newNumRatings = curNumRatings - 1;

      var oldEntertainmentAvgRating;
	    var oldNatureAvgRating;
        var oldCostAvgRating;
        var oldSafetyAvgRating;
        var oldCultureAvgRating;
        var oldTranspAvgRating;
        var oldFoodAvgRating;

      for (a of city.ratings)
      {
        if (a.userid == uId)
        {
          oldEntertainmentAvgRating = a.rating.entertainment;
    	    oldNatureAvgRating = a.rating.nature;
          oldCostAvgRating = a.rating.cost;
          oldSafetyAvgRating = a.rating.safety;
          oldCultureAvgRating = a.rating.culture;
          oldTranspAvgRating = a.rating.transportation;
          oldFoodAvgRating = a.rating.food;
        }
      }
	    // Old Average ratings
	    var curEntertainmentAvgRating = curAvgRating.entertainment;
	    var curNatureAvgRating = curAvgRating.nature;
        var curCostAvgRating = curAvgRating.cost;
        var curSafetyAvgRating = curAvgRating.safety;
        var curCultureAvgRating = curAvgRating.culture;
        var curTranspAvgRating = curAvgRating.transportation;
        var curFoodAvgRating = curAvgRating.food;

	    // New user rating to add to new average
        var userEntertainmentRating = uRating.entertainment;
        var userNatureRating = uRating.nature;
        var userCostRating = uRating.cost;
        var userSafetyRating = uRating.safety;
        var userCultureRating = uRating.culture;
        var userTranspRating = uRating.transportation;
        var userFoodRating = uRating.food;

	    // Add new user rating to old average and compute new average
        var newEntertainmentAvgRating = ((curEntertainmentAvgRating * curNumRatings) - oldEntertainmentAvgRating) / newNumRatings;
        var newNatureAvgRating = ((curNatureAvgRating * curNumRatings) - oldNatureAvgRating) / newNumRatings;
        var newCostAvgRating = ((curCostAvgRating * curNumRatings) - oldCostAvgRating) / newNumRatings;
        var newSafetyAvgRating = ((curSafetyAvgRating * curNumRatings) - oldSafetyAvgRating) / newNumRatings;
        var newCultureAvgRating = ((curCultureAvgRating * curNumRatings) - oldCultureAvgRating) / newNumRatings;
        var newTranspAvgRating = ((curTranspAvgRating * curNumRatings) - oldTranspAvgRating) / newNumRatings;
        var newFoodAvgRating = ((curFoodAvgRating * curNumRatings) - oldFoodAvgRating) / newNumRatings;

        newEntertainmentAvgRating = ((newEntertainmentAvgRating * newNumRatings) + userEntertainmentRating) / curNumRatings;
        newNatureAvgRating = ((newNatureAvgRating * newNumRatings) + userNatureRating) / curNumRatings;
        newCostAvgRating = ((newCostAvgRating * newNumRatings) + userCostRating) / curNumRatings;
        newSafetyAvgRating = ((newSafetyAvgRating * newNumRatings) + userSafetyRating) /curNumRatings;
        newCultureAvgRating = ((newCultureAvgRating * newNumRatings) + userCultureRating) / curNumRatings;
        newTranspAvgRating = ((newTranspAvgRating * newNumRatings) + userTranspRating) / curNumRatings;
        newFoodAvgRating = ((newFoodAvgRating * newNumRatings) + userFoodRating) / curNumRatings;

	    var newAvgRating = mkRating(
            newEntertainmentAvgRating,
            newNatureAvgRating,
            newCostAvgRating,
            newSafetyAvgRating,
            newCultureAvgRating,
            newTranspAvgRating,
            newFoodAvgRating
          );*/

          CityData.updateOne({_id: cId}, {
               "$pull": { "ratings" : {userid: uId}}
           }, { safe: true, multi:true }, (err, obj)=>{
               console.log(err);
           });
         //var newAvgRating = curAvgRating;
         UserProfile.findOneAndUpdate({email: uEmail}, {
             $push: {ratings : {cityid: cId} }
         }, ()=>{});
         await CityData.findOneAndUpdate({_id: cId}, {
             //averageRating: newAvgRating,
             $push: {ratings : {
                 userid:       uId,
                 rating:       uRating,
                 description:  review,
                 time:         new Date().toISOString()
             }}
         }, ()=>{});

    }

}
dbInit().catch(err => console.log(err));

//Add CORS to parser
app.use(cors());

app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Serve up static content from the public subdirectory
app.use(express.static("public"));

var api = require('./api.js');
api.setApp( app, dbApi );


app.get('/*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



//*********Example Endpoints, to be deleted*************
app.get('/mkTestUsers', (req, res) => {
    dbApi.createUser("Robert","Dottingham","bobuser","bob@example.com","notarealhash");
    dbApi.createUser("John","Doe", "johnuser","jd@example.com","notarealhash");
    res.send("Users Created");
})
app.get('/listUsers', (req, res) => {
    dbApi.allUsers().lean().exec(function (err, users) {
        return res.send(JSON.stringify(users));
    });
})
app.get('/listCities', (req, res) => {
    dbApi.allCities().lean().exec(function (err, users) {
        return res.send(JSON.stringify(users));
    });
})
app.get('/findByEmail', (req, res) => {
    var email = "jd@example.com"
    dbApi.userByEmail(email).lean().exec(function (err, users) {
        return res.send(JSON.stringify(users));
    });
})
app.get('/editUserByEmail', (req, res) => {
    var email = "jd@example.com"

    dbApi.updateUserByEmail(email, {firstName: "Johnny"});

    res.send("Update Complete");
})
app.get('/mkTestCitys', (req, res) => {

    //dbApi.createCity("ExampleVille", "ExampleState", "ExampleCountry");
    //dbApi.createCity("JaunVille", "ExampleState", "ExampleCountry");
    //dbApi.createCity("West Palm Beach", "Florida", "USA");
    dbApi.createCity("Hello", "California", "USA")

    res.send("Update Complete");
})
app.get('/getCityByName', (req, res) => {
    (async() =>
        res.send(JSON.stringify(await dbApi.cityByName("Orlando")))
        //var city = JSON.stringify(await dbApi.cityByName("Los Angeles"));
    )();
})
app.get('/addRating', (req, res) => {
    var cityName = "ExampleVille";
    var userEmail= "obloom@example.com";
    var rating = mkBrRating(3);
    (async() => {
        await dbApi.addRating(userEmail, cityName, rating, "Could be worse.");
        res.send(JSON.stringify(await dbApi.cityByName("ExampleVille"))+"<br />Update Complete");
    })();
})
app.get('/deleteRating', (req, res) => {
    var cityName = "ExampleVille";
    var userEmail= "bob@example.com";
    (async() => {
        await dbApi.deleteRating(userEmail, cityName);
        res.send(JSON.stringify(await dbApi.cityByName("ExampleVille"))+"<br />Update Complete");
    })();
})
app.get('/allStates', (req, res) => {
    (async() =>
        res.send(JSON.stringify(await dbApi.allStates()))
    )();
})
app.get('/searchCityAndState', (req, res) => {
    var q = "exam";
    (async() =>
        res.send(JSON.stringify(await dbApi.searchCityAndState("","")))
    )();
})
//*******************************************************




app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})
