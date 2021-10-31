
exports.setApp = function(app, dbApi)
{
  var passwordHash = require('password-hash');
  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var ret;
    const { email, password } = req.body;
    dbApi.userByEmail(email).lean().exec(function (err, users) {
      if (passwordHash.verify(users.pwhash, password))
      {
        ret = { id:users._id, firstName:users.firstName, lastName:users.lastName, userName: users.userName, error:''};
        res.status(200).json(ret);
      }
      else
      {
        ret = {error : "Login/Password incorrect"};
        res.status(200).json(ret);
      }
    });

    /*var error = '';

    const { email, password } = req.body;

    var results = await UserProfile.findOne({email: email, pwhash: password});
    results.exec(function (err, users) {
        if (err)
          res.send(err);
        return res.send(JSON.stringify(users));
    });*/

    /*var id = -1;
    var fn = '';
    var ln = '';
    fn = email;
    ln = password;*/
    /*if( results.length > 0 )
    {
      //id = results[0]._id;
      fn = results[0].firstName;
      ln = results[0].lastName;

      /*try
      {
        const token = require("./createJWT.js");
        ret = token.createToken( fn, ln, id );
      }
      catch(e)
      {
        ret = {error:e.message};
      }
    }*/
    /*else
    {
      ret = {error:"Login/Password incorrect"};
    }*/

    //var ret = { /*id:id,*/ firstName:fn, lastName:ln, error:''};
    //res.status(200).json(ret);
  });

  app.post('/api/register', async (req, res, next) =>
  {
    //incoming: firstName, lastName, userName, email, password
    //outgoing: message

    var ret;

    const {firstName, lastName, userName, email, password} = req.body;

    dbApi.userByEmail(email).lean().exec(function (err, user) {
      if (user != null)
      {
        ret = {error: "Email is being used in another account"};
        res.status(200).json(ret);
      }
      //NEED TO CHECK IF USERNAME TAKEN!!!!!!!!!!!!!!!
      else {
        dbApi.createUser(firstName, lastName, userName, email, passwordHash.generate(password));
        ret = {error: ""};
        res.status(200).json(ret);
      }
    });
  });

  /*app.post('/api/delete', async (req, res, next) =>
  {
    //incoming: userId, postId
    // outgoing: error

    var error = '';

    const { userId, postId } = req.body;

    const db = client.db();

    const result = await db.collection('UserProfile').deleteOne({cityid:postId});

    var ret = { result:"${result.deletedCount} document was deleted.", error:error};
    res.status(200).json(ret);
  });

  app.post('/api/search', async (req, res, next) =>
  {
    //incoming:

    var error = '';

    const { city, state, country, firstName, lastName} = req.body;

    const db = client.db();

    const result = await db.collection('').find
  });*/
}
