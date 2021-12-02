
exports.setApp = function(app, dbApi)
{
  const bcrypt = require('bcrypt');
  // Used to send email for verification and/or reset password
  const nodemailer = require('nodemailer');
  const crypto = require('crypto');

  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: email, password
    // outgoing: token/error message

    var ret;
    const { email, password } = req.body;

    await dbApi.userByEmail(email).lean().exec(function (err, users) {
      if (users != null)
      {
        /*if (users.isVerified == "false")
        {
          var ret = {error: "Need to verify email"};
          return res.json(ret);
        }*/
        if (bcrypt.compareSync(password, users.pwhash))
        {
            try
            {
              const token = require("./createJWT.js");
              ret = token.createToken( users.firstName, users.lastName, users._id );
              ret.firstName = users.firstName;
              ret.lastName = users.lastName;
              ret.userName = users.userName;
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
      return res.status(200).json(ret);
    }
    else if (password.length < 8 || regex.test(password) === false)
    {
      ret = {error: "Password requirements not met. Please check requirements below."};
      return res.status(200).json(ret);
    }
    else {
      dbApi.userByEmail(email).lean().exec(function (err, user) {
        if (user != null)
        {
          ret = {error: "Email is being used in another account"};
          return res.status(200).json(ret);
        }
        else {
          dbApi.userByUserName(userName).lean().exec(function (err, user) {
            if (user != null)
            {
              ret = {error: "Username is taken."};
              return res.status(200).json(ret);
            }
          });
        }
      });
    }
      var hashed = bcrypt.hashSync(password, 10);

      var emailToken = crypto.randomBytes(64).toString('hex');

      await dbApi.createUser(firstName, lastName, userName, email, hashed);//, emailToken,"false");

      /*var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "",
          pass: ""
        }
      });

      var mailOptions;
      let sender = "RateMyCity";
      mailOptions = {
        from: sender,
        to: email,
        subject: "Email Confirmation",
        text: `Hello, Thanks for registering on our site.
          Please copy and paste the address below to verify your account.
          http://${req.headers.host}/verify-email?token=${emailToken}
        `,
        html: `<h1>Hello,</h1>
          <p>thanks for registering on our site.</p>
          <p>Please click the link below to verify your account.</p>
          <a href="http://${req.headers.host}/verify-email/${emailToken}">Verify your account</a>`
      };

      Transport.sendMail(mailOptions, function(err, response) {
        if (err) {
          res.send({error: err.message})
        }
        else {
          var ret = {message: "Message sent"}
          res.status(200).json(ret);
        }
      })*/

      const newUser = await dbApi.userByEmail(email);
      ret = {userId: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, userName: newUser.userName, email: newUser.email, error: ""};
      res.status(200).json(ret);
  });

  app.get('/verify-email/:uniqueString', async(req, res) => {
    const {uniqueString} = req.params;

    // Add token function
    const user = await dbApi.userByToken(uniqueString);

    //Update user valid. add into function
    if (user)
    {
      user.isValid = true;
      await user.save();
      res.redirect('/');
    } else {
      {
        res.json('User not found');
      }
    }
  })

  /*
  // Forgot password, reset
  app.post('/api/resetPassword', async (req, res) =>
  {
    if (req.body.email == '')
    {
      ret = {error: "Email is required to reset password."};
      res.status(400).json(ret);
      // or res.status(400).send(ret);
    }

    var user = (await dbApi.userByEmail(req.body.email));

    if (user == null)
    {
      ret = {error: "Email was not found in our records."};
      res.status(400).json(ret);
      console.log("email not found in database.");
    }

    else
    {
      var crypto;
      try
      {
        crypto = await import('crypto');
      }
      catch (e)
      {
        console.log('crypto support is disabled.');
      }

      const token = crypto.randomBytes(20).toString('hex');
      user.update(
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 400000,
        });

      const transporter = nodemailer.createTransport(
        {
          service: 'gmail',
          auth:
          {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

      const mailOptions =
            {
              from: 'rate-my-city-admin@gmail.com',
              to: `${user.email}`,
              subject: 'Reset your Password for Rate-My-City',
              text:
                'Insert message here to reset your password........\n\n'
                + '`http://localhost:3000/reset/${token}\n\n`'
                + 'Link might not work right now.',
            };

      transporter.sendMail(mailOptions, (err, response) =>
      {
        if (err)
        {
          console.log('Error occurred: ', err);
        }
      });
    }
  });
  */

  app.post('/api/createCity', async (req, res, next) =>
  {
    // incoming: cityname, state, country
    // outgoing: error, refreshedToken

    var token = require('./createJWT.js');
    const { name, state, country, jwtToken } = req.body;
    var error = "";

    /*(async() =>
        const city = await dbApi.cityByName(name);
        if (city != null)
        {
          ret = {error: "This city has already been added to our database."};
          return res.status(200).json(ret);
        }
    )();*/
     await dbApi.cityByName(name).lean().exec(function (err, city)
     {
       if (city != null)
       {
         ret = {error: "This city has already been added to our database."};
         return res.status(200).json(ret);
       }
     });

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
      await dbApi.createCity(name, state, country);
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

  app.post('/api/addRating', async (req, res, next) =>
  {
    // incoming: email, city, rating, review, jwtToken
    // outgoing: error, refreshedToken

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
      await dbApi.addRating(email, city, rating, review);
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

    const updatedUser = await dbApi.userByEmail(email);

    var refreshedToken = null;

    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }

    ret = {error: "", id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName, userName: updatedUser.userName, email: updatedUser.email, jwtToken: refreshedToken };
    return res.status(200).json(ret);
  });
}
