
exports.setApp = function(app, client)
{
  app.post('/api/login', async (req, res, next) =>
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    var error = '';

    const { email, password } = req.body;

    //const db = client.db();
    //const results = await db.collection('UserProfile').find({email:email,pwhash:password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';
    fn = email;
    ln = password;
    /*if( results.length > 0 )
    {
      //id = results[0].UserId;
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

    var ret = { /*id:id,*/ firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
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

    const result = await db.collection('')
  });*/
}
