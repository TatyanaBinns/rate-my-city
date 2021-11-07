
exports.setApp = function(app, dbApi)
{

  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    // HASH PASSWORD VERIFY
    var ret;
    //var passwordHash = require('./lib/password-hash');
    const { email, password } = req.body;
    dbApi.userByEmail(email).lean().exec(function (err, users) {
      if (users && users.pwhash == password/*&& passwordHash.verify(users.pwhash, password)*/)
      {
        //ret = { id:users._id, firstName:users.firstName, lastName:users.lastName, userName: users.userName, pwhash: users.pwhash, error:''};
        //res.status(200).json(ret);
        try
        {
          const token = require("./createJWT.js");
          ret = token.createToken( users.firstName, users.lastName, users._id );
        }
        catch(e)
        {
          ret = {error:e.message};
        }
      }
      else
      {
        ret = {error : "Login/Password incorrect"};
        //res.status(200).json(ret);
      }
      res.status(200).json(ret);
    });
  });

  app.post('/api/register', async (req, res, next) =>
  {
    //incoming: firstName, lastName, userName, email, password
    //outgoing: message
    //var passwordHash = require ('password-hash');
    var ret;
    // ADD EMAIL VERIFICATION
    // HASH PASSWORD
    const {firstName, lastName, userName, email, password, confirmpassword} = req.body;

    /*try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }*/

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

    if (password != confirmpassword)
    {
      ret = {error : "Passwords do not match."};
      res.status(200).json(ret);
    }
    else if (password.length < 8 || regex.test(password) === false)
    {
      ret = {error: "Password requirements not met. Please check requirements below."};
      res.status(200).json(ret);
    }
    else {
      dbApi.userByEmail(email).lean().exec(function (err, user) {
        if (user != null)
        {
          ret = {error: "Email is being used in another account"};
          res.status(200).json(ret);
        }
        else {
          //var hashedPassword = passwordHash.generate(password);
          dbApi.userByUserName(userName).lean().exec(function (err, user) {
            if (user != null)
            {
              ret = {error: "Username is taken."};
              res.status(200).json(ret);
            }
            else
            {
              dbApi.createUser(firstName, lastName, userName, email, password);
              ret = {error: ""};
              res.status(200).json(ret);
            }
          });
        }
      });
    }

    /*var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }*/


  });

  app.post('/api/delete', async (req, res, next) =>
  {
    //incoming: userId, postId
    // outgoing: error

    const { email, city } = req.body;

    //await dpApi.deleteRating(email, city);
    var error;

    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    (async() => {
        await dbApi.deleteRating(email, city);
        //res.send(JSON.stringify(await dbApi.cityByName(city))+"<br />Update Complete");
        error = "";
    })();

    var refreshedToken = null;

    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }

    var ret = { error: error, jwtToken: refreshedToken };

    res.status(200).json(ret);
  });

  /*app.post('/api/search', async (req, res, next) =>
  {
    //incoming:

    var error = '';

    const { city, state, country, firstName, lastName} = req.body;

    const db = client.db();

    const result = await db.collection('').find
  });*/
}
