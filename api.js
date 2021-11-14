
exports.setApp = function(app, dbApi)
{
  const bcrypt = require('bcrypt');
  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: email, password
    // outgoing: token/error message

    var ret;
    const { email, password } = req.body;

    await dbApi.userByEmail(email).lean().exec(function (err, users) {
      if (users != null)
      {
        if (bcrypt.compareSync(password, users.pwhash))
        {
            //ret = { id:users._id, firstName:users.firstName, lastName:users.lastName, userName: users.userName, pwhash: users.pwhash, error:''};
            try
            {
              const token = require("./createJWT.js");
              ret = token.createToken( users.firstName, users.lastName, users._id );
              ret.firstName = users.firstName;
              ret.lastName = users.lastName;
              ret.id = users._id;
            }
            catch(e)
            {
              ret = {error:e.message};
            }
        }
        else {
            ret = {error : "Login/Password incorrect"};
        }
      }
      else
      {
        ret = {error : "Login/Password incorrect"};
      }
      res.status(200).json(ret);
    });
  });

  app.post('/api/register', async (req, res, next) =>
  {
    //incoming: firstName, lastName, userName, email, password, confirmpassword
    //outgoing: error message

    var ret;
    // ADD EMAIL VERIFICATION
    const {firstName, lastName, userName, email, password, confirmpassword} = req.body;

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
          dbApi.userByUserName(userName).lean().exec(function (err, user) {
            if (user != null)
            {
              ret = {error: "Username is taken."};
              res.status(200).json(ret);
            }
            else
            {
              var hashed = bcrypt.hashSync(password, 10)
              dbApi.createUser(firstName, lastName, userName, email, hashed);
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
    // incoming: email, city, jwtToken
    // outgoing: error, refreshedToken
    var token = require('./createJWT.js');

    const { email, city, jwtToken } = req.body;

    var error = "";

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

  app.get('/api/listStates', async (req, res, next) =>
  {

  });

  app.post('/api/settings', async (req, res, next) =>
  {
    //var token = require('./createJWT.js');
    var ret;
    const {userId, firstName, lastName, userName, email, password, confirmpassword, jwtToken} = req.body;

    await dbApi.userByUserName(userName).lean().exec(function (err, user) {
      if (user != null /*&& user._id != userId*/)
      {
        ret = {error: "Username is taken."};
        return res.status(400).json(ret);
      }
    });

    await dbApi.userByEmail(email).lean().exec(function(err, user) {
      if (user != null /*&& user._id != userId*/)
      {
        ret = {error: "Email is being used in another account"};
        return res.status(400).json(ret);
      }
    });

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

    if (password != confirmpassword)
    {
      ret = {error : "Passwords do not match."};
      return res.status(400).json(ret);
    }

    if (password.length < 8 || regex.test(password) === false)
    {
      ret = {error: "Password requirements not met. Please check requirements below."};
      return res.status(400).json(ret);
    }

    /*var setting = { firstName: firstName, lastName: lastName, userName: userName, email: email, pwhash: password};

    await dbApi.updateUserBySetting(userId, setting);

    await dbApi.userByEmail(email).lean().exec(function(err, user) {
      if (user != null)
      {
        return res.status(200).json(user);
      }
      else {
        ret = {error: "Didn't update successfully"};
        return res.status(400).json(ret);
      }
    })*/
  });
}
