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
    dbApi.userByEmail       = (e)    => UserProfile.findOne({email: e}).exec();
    dbApi.updateUserByEmail = (e, u) => UserProfile.findOneAndUpdate({email: e}, u, ()=>{});
    dbApi.createUser  = (f,l,u,e,pw)   => {
        const newUser = new UserProfile({
            firstName: f,
            lastName : l,
            userName : u,
            email    : e,
            pwhash   : pw
        }).save();
    };

    dbApi.allCities   = ()         => CityData.find();
    dbApi.cityByName  = (n)        => CityData.findOne({name: n});
    dbApi.createCity  = (cName, cState, cCountry)  => {
        const newCity = new CityData({
            name    : cName,
            state   : cState,
            country : cCountry,
            averageRating  : mkBrRating(5)
        }).save();
    };
    dbApi.addRating = async (uEmail, cityName, uRating, review) => {
        var city = (await dbApi.cityByName(cityName));
        var cId = city._id;
        var uId = (await dbApi.userByEmail(uEmail))._id;
        var curAvgRating = city.averageRating;
        
        //Should compute something meaningful here

        var newAvgRating = curAvgRating;
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






app.get('/', (req, res) => {
    res.json({ message: "Welcome to a simple hello-world application.", additional: "This is additional text."});
})


//*********Example Endpoints, to be deleted*************
app.get('/mkTestUsers', (req, res) => {
    dbApi.createUser("Robert","Dottingham","bob@example.com","notarealhash");
    dbApi.createUser("John","Doe","jd@example.com","notarealhash");
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
    
    dbApi.createCity("ExampleVille", "ExampleState", "ExampleCountry");
    dbApi.createCity("JaunVille", "ExampleState", "ExampleCountry");
    
    res.send("Update Complete");
})
app.get('/getCityByName', (req, res) => {
    (async() => 
        res.send(JSON.stringify(await dbApi.cityByName("ExampleVille")))
    )();
})
app.get('/addRating', (req, res) => {
    var cityName = "ExampleVille";
    var userEmail= "billybobjoe@example.com";
    var rating = mkBrRating(3);
    (async() => {
        dbApi.addRating(userEmail, cityName, rating, "Could be worse.");
        res.send(JSON.stringify(await dbApi.cityByName("ExampleVille"))+"<br />Update Complete");
    })();
})
//*******************************************************




app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})