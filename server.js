const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express()

let port = process.env.PORT;
if (port == null || port == "")
  port = 8080;

let uri = process.env.MONGODB_URI;
if (uri == null || uri == "")
  uri = "mongodb://localhost:27017/rate-my-city";


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
       firstName: String,
       lastName : String,
       userName : String,
       email    : String,
       pwhash   : String,
       ratings  : [{cityid: String}]
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
    dbApi.updateUserBySetting = (id, u) => UserProfile.findOneAndUpdate({_id: id}, { "$set": u}, ()=>{});
    dbApi.createUser  = (f,l,u,e,pw)   => {
        const newUser = new UserProfile({
            firstName: f,
            lastName : l,
            userName : u,
            email    : e,
            pwhash   : pw
        }).save();
    };

    //dbApi.allCities    = ()        => CityData.find().sort({"name": 1});
    dbApi.searchCityAndState = async (city, state) => {
      var res = await CityData.find({$and: [
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
          }
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
            {
            "$project": {
             "name" : 1,
             "state" : 1,
             "averageRating" : 1,
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
    dbApi.allStates   = async ()   => {
        //Get the raw state data from Mongo
        var states = await CityData.find().select('state -_id').sort({"state": 1})
        let arraySerialized = states.map(e => JSON.stringify(e));
        const setSerialized = new Set(arraySerialized);
        const newArrSerialized = [...setSerialized];
        const newArr = newArrSerialized.map(e => JSON.parse(e));

        return newArr;
    };
    dbApi.allCities = async () => {
      //Get the raw city data from Mongo
      var cities = await CityData.find().select('name -_id').sort({"name": 1})
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
            averageRating  : mkBrRating(5)
        }).save();
    };
    dbApi.deleteRating = async (uEmail, cityName) => {
        var city = (await dbApi.cityByName(cityName));
        var cId = city._id;
        var uId = (await dbApi.userByEmail(uEmail))._id;

        console.log("Attempting to pull rating from city "+cId+" by user "+uId);

        CityData.updateOne({_id: cId}, {
            "$pull": { "ratings" : {userid: uId}}
        }, { safe: true, multi:true }, (err, obj)=>{
            console.log(err);
        });
    };

    dbApi.addComment = async (cityName, ratingUserName, timePosted, uEmail, uComment) => {
        var uId = (await dbApi.userByEmail(uEmail))._id;

        CityData.findOneAndUpdate({"name" : cityName, "ratings.userid" : rating_uId, "ratings.time" : timePosted}, {
            $push: {comments : {
                userid:     uId,
                comment:    uComment,
                time:       new Date().toISOString()
            }}
        }, ()=>{});
    };

    dbApi.addRating = async (uEmail, cityName, uRating, review) => {
        var city = (await dbApi.cityByName(cityName));
        var cId = city._id;
        var uId = (await dbApi.userByEmail(uEmail))._id;
        var curAvgRating = city.averageRating;


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

	    var newAvgRating =
      {
        entertainment : newEntertainmentAvgRating,
        nature        : newNatureAvgRating,
        cost          : newCostAvgRating,
        safety        : newSafetyAvgRating,
        culture       : newCultureAvgRating,
        transportation: newTranspAvgRating,
        food          : newFoodAvgRating
      }/* mkRating(
            newEntertainmentAvgRating,
            newNatureAvgRating,
            newCostAvgRating,
            newSafetyAvgRating,
            newCultureAvgRating,
            newTranspAvgRating,
            newFoodAvgRating
          );*/



        //var newAvgRating = curAvgRating;
        UserProfile.findOneAndUpdate({email: uEmail}, {
            $push: {ratings : {cityid: cId} }
        }, ()=>{});
        CityData.findOneAndUpdate({_id: cId}, {
            averageRating: newAvgRating,
            $push: {ratings : {
                userid:       uId,
                rating:       uRating,
                description:  review,
                time:         new Date().toISOString()
            }}
        }, ()=>{});
    };


}
dbInit().catch(err => console.log(err));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Serve up static content from the public subdirectory
app.use(express.static("public"));

var api = require('./api.js');
api.setApp( app, dbApi );


app.get('/', (req, res) => {
     res.json({ message: "Welcom to a simple hello-world application.", additional: "This is additional text."});
})



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
        res.send(JSON.stringify(await dbApi.cityByName("ExampleVille")))
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
