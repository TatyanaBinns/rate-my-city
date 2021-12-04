
exports.setApp = function(app, dbApi)
{
  const bcrypt = require('bcrypt');
  // Used to send email for verification and/or reset password
  //const nodemailer = require('nodemailer');
  const crypto = require('crypto');
  const sgMail = require('@sendgrid/mail');
  const jwt = require("jsonwebtoken")

  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: email, password
    // outgoing: token/error message

    var ret;
    const { email, password } = req.body;

    await dbApi.userByEmail(email).lean().exec(function (err, users) {
      if (users != null)
      {
        //if (users.isVerified == false)
        //{
          //return res.status(404).json("Email has not been verified yet");
        //}
        if (bcrypt.compareSync(password, users.pwhash))
        {
            try
            {
              const token = require("./createJWT.js");
              ret = token.createToken( users.firstName, users.lastName, users._id, users.email );
              ret.firstName = users.firstName;
              ret.lastName = users.lastName;
              ret.userName = users.userName;
              ret.email = users.email;
              ret.id = users._id;
              ret.emailToken = users.emailToken
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

    try {
      var ret;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const {firstName, lastName, userName, email, password, confirmpassword} = req.body;

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

    if (password != confirmpassword)
    {
      ret = {error : "Passwords do not match."};
      return res.status(200).json(ret);
    }
    else if (password.length < 8 || regex.test(password) === false)
    {
      ret = {error: "Password requirements not met. Please check requirements below."};
      return res.status(200).json(ret);
    }
    else {
      var user = await dbApi.userByEmail(email)
        if (user)
        {
          ret = {error: "Email is being used in another account"};
          return res.status(200).json(ret);
        }
        else {
          var otherUser = await dbApi.userByUserName(userName)
            if (otherUser != null)
            {
              ret = {error: "Username is taken."};
              return res.status(200).json(ret);
            }

        }

    }
      var hashed = bcrypt.hashSync(password, 10);

      var emailToken = crypto.randomBytes(64).toString('hex');

      var user = await dbApi.createUser(firstName, lastName, userName, email, hashed, emailToken);

      ret = {userId: user._id, firstName: user.firstName, lastName: user.lastName, userName: user.userName, email: user.email, emailToken: user.emailToken, error: ""};
      res.status(200).json(ret);} catch (err)
      {
        res.json({error: err.message})
      }

    const message =
      {
      to: email,
      from: {
        name:  `Rate My City`,
        email: `ratemycitynoreply@gmail.com`,
      },
      subject: `Verify your email`,
      text: `Hello, Thanks for registering on our site.
      Please click the link below to verify your account. ${req.protocol}://${req.headers.host}/verify/?Token=${user.emailToken}`,
      html: `<h1>Hello,</h1>
      <p>thanks for registering on our site.</p>
      <p>Please click the link below to verify your account.</p>
             <a href="${req.protocol}://${req.headers.host}/verify/?Token=${user.emailToken}">Verify your account</a>`
    };

      // Send Email to user, or produce error
      await sgMail.send(message)
      .then(response => {
        ret = "Verification process sent to email. Please verify email before logging in.";
        res.status(200).json(ret);
      })
      .catch(error => res.send({error:error.message}))
  });

  app.get('/verify', async(req, res) => {
    try{
    const emailToken = req.query.Token;

    var user = await dbApi.userByToken(emailToken)
    const home = "https://"+req.headers.host+"/"
    //Update isVerified from user to true
    if (user)
    {
      var set = {isVerified: true, emailToken: null}
      await dbApi.updateByToken(emailToken, set).clone();
      res.json("User has been verified");
      //res.redirect(home)
    } else {
      {
        res.json('User not found');
        //res.redirect(home)
      }
    }}catch(err)
    {
      res.json({message: err.message})
    }
  })


  // Forgot password, reset
  app.post('/api/resetPassword', async (req, res) =>
  {
    const {email} = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const token = require("./createJWT.js");
    const user = await dbApi.userByEmail(email);
    if (!user)
    {
      return res.json("User does not exist");
    }


    var jwtToken = token.createToken(user.firstName, user.lastName, user._id, user.email);

    /*var other = jwt.verify( jwtToken.accessToken, process.env.ACCESS_TOKEN_SECRET)

    res.json({id: other.userId, name: other.firstName, last: other.lastName, email: other.email})} catch (err)
    {
      res.json({message: err.message})
    }*/
    var access = jwtToken.accessToken;
        /*const message =
            {
            to: email,
            from: {
              name:  `Rate My City`,
              email: `ratemycitynoreply@gmail.com`,
            },
            subject: `Reset Password`,
            text: `Hello, You have asked to reset your password.
            Please click the link below to verify your account. ${req.protocol}://${req.headers.host}/api/reset/?emailToken=${jwtToken.accessToken}`,
            html: `<h1>Hello,</h1>
            <p>You have asked to reset your password.</p>
            <p>Please click the link below to verify your account.</p>
                   <a href="${req.protocol}://${req.headers.host}/api/reset/?emailToken=${jwtToken.accessToken}">Verify your account</a>`
          };

          await sgMail.send(message)
          .then(response => {
            ret = "Reset process sent to email. Please verify email before logging in.";
            res.status(200).json(ret);
          })
          .catch(error => res.send({error:error.message}))*/
  const message =
    {
      to: email,
      from: {
        name:  `Rate My City`,
        email: `ratemycitynoreply@gmail.com`,
      },
      subject: `Reset Password`,
      text: `Hello,
      Please click the link below to reset your password. Link expires in 24 hours. ${req.protocol}://${req.headers.host}/Reset/?emailToken=${access}`,
      html: `<h1>Hello,</h1>
      <p>Please click the link below to reset your password. Link expires in 24 hours.</p>
             <a href="${req.protocol}://${req.headers.host}/Reset/?emailToken=${access}">Reset your password</a>`
    };

      // If email successfully sends to user, return empty error
      await sgMail.send(message)
      .then(response => {
        ret = {message: "Reset process sent to email. Please verify email before logging in.", emailToken: jwtToken.accessToken};
        res.status(200).json(ret);
      })
      .catch(error => res.send({error:error.message}));

  });

  app.post('/api/reset', async(req, res, next) =>
  {
    try {
      const {emailToken, password, confirmpassword} = req.body;
     var hashed = bcrypt.hashSync(password, 10);
     const token = require("./createJWT.js");

      if (token.isExpired(emailToken))
      {
        return res.status(401).json("Link expired");
      }

      var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

      if (password != confirmpassword)
      {
        ret = {error : "Passwords do not match."};
        return res.status(200).json(ret);
      }
      else if (password.length < 8 || regex.test(password) === false)
      {
        ret = {error: "Password requirements not met. Please check requirements below."};
        return res.status(200).json(ret);
      }

      var verifiedToken = jwt.verify( emailToken, process.env.ACCESS_TOKEN_SECRET)

      await dbApi.updateUserByEmail(verifiedToken.email, {pwhash: hashed} ).clone();

      res.json("Successfully reseted")
    } catch(err)
    {
      res.json({message: err.message})
    }
  } )

  app.post('/api/createCity', async (req, res, next) =>
  {
    // incoming: cityname, state, country
    // outgoing: error, refreshedToken

    var token = require('./createJWT.js');
    const { name, state, country, jwtToken } = req.body;
    var error = "";

    try
    {
      if (token.isExpired(jwtToken))
      {
        var r = {error: 'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    try{
    var city = await dbApi.cityByName(name);

    if (city)
      return res.json("This city is already listed on the website.")
    else {

    (async() => {
      await dbApi.createCity(name, state, country);
      error = "";
    })();}} catch(err)
    {
      res.json({message: err.message})
    }

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

  app.post('/api/addRating', async (req, res, next) =>
  {
    // incoming: email, city, rating, review, jwtToken
    // outgoing: error, refreshedToken

    var token = require('./createJWT.js');
    const { userid, email, city, state, rating, review, jwtToken } = req.body;
    var error = "";

    try
    {
      if (token.isExpired(jwtToken))
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
    var user = await dbApi.searchUsername(userid, city, state);
    if (user.length != 0)
    {
      return res.status(404).json("User already added a rating for the city");
    }

    (async() => {
         await dbApi.addRating(email, city, rating, review);
        //return res.json(num)
        error = ""
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

  app.post('/api/editRating', async(req, res, next) => {
    var token = require('./createJWT.js');
    const { email, city, rating, review, jwtToken } = req.body;
    var error = "";

    try
    {
      if (token.isExpired(jwtToken))
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
      //await dbApi.deleteRating(email, city);
      //await dbApi.addRating(email, city, rating, review);
      await dbApi.editRating(email, city, rating, review);
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
  })

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

  app.post('/api/addComment', async (req, res, next) =>
  {
    // incoming: city, ratingUsername, timePosted, email, comment, jwtToken
    // outgoing: error, refreshedToken
    // userName is user that posted the original rating.
    // email is user that wants to post a comment on the rating.

    var token = require('./createJWT.js');
    const { city, userName, time, email, comment, jwtToken } = req.body;
    var error = "";

    try
    {
      if (token.isExpired(jwtToken))
      {
        var r = {error: 'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    (async() => {
      await dbApi.addComment(city, userName, time, email, comment);
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

  app.post('/api/searchUsername', async (req, res, next) =>
  {
    //incoming: city, state, userName

    const { city, state, userName} = req.body;

    const user = await dbApi.userByUserName(userName);
    if (user == null)
    {
      return res.json({error: "User does not exist"})
    }
    const id = String(user._id);
    //res.json({id: user._id})
    try{
      const result = await dbApi.searchUsername(id, city, state);
      res.json(result);
    }
    catch (err) {
      res.json({message: err.message});
    }
  });

  app.post('/api/searchCityState', async (req, res, next) =>
  {
    const {city, state} = req.body;
    try {
    const result = await dbApi.searchCityAndState(city, state);
    res.json(result);
  } catch(err) {
    res.json({message: err.message});
  }

  })

  app.get('/api/listStates', async (req, res, next) =>
  {
    (async() =>
        res.status(200).json(await dbApi.allStates())
    )();
  });

  app.get('/api/listCities', async (req, res, next) =>
  {
    (async() =>
        res.status(200).json(await dbApi.allCities())
    )();
  });

  app.get('/api/listUsername', async (req, res, next) =>
  {
    (async() =>
        res.status(200).json(await dbApi.allUsers())
    )();
  })

  app.post('/api/settings', async (req, res, next) =>
  {
    var token = require('./createJWT.js');

    var ret;
    const {userId, firstName, lastName, userName, email, password, confirmpassword, jwtToken} = req.body;

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

    const user = await dbApi.userByUserName(userName)
    if (user != null && user._id != userId)
    {
      ret = {error: "Username is taken."};
      return res.status(400).json(ret);
    }

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

    var hashed = bcrypt.hashSync(password, 10);
    var setting = { firstName: firstName, lastName: lastName, userName: userName, pwhash: hashed};

    try {
      await dbApi.updateUserBySetting(userId, setting).clone();
    }
    catch (err) {
      return res.status(200).json({error: err.message})
    }

    var refreshedToken = null;

    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }

    try {
      const updatedUser = await dbApi.userByEmail(email);
      ret = {error: "", id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName, userName: updatedUser.userName, email: updatedUser.email, jwtToken: refreshedToken };
      return res.status(200).json(ret);
    } catch (err)
    {
      return res.json({error: err.message})
    }
  });
}
