const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");

const clientId = process.env.OAUTH_CLIENT_ID;

const client = new OAuth2Client(clientId);

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId
    });

    return ticket.getPayload();
  } catch (err) {
    console.error("Error verifying auth token", err);
  }
};

const checkIfUserExist = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;

  return new User({ name, email, picture }).save();
};

exports.findOrCreateUser = async token => {
  const googleUser = await verifyAuthToken(token);
  const user = await checkIfUserExist(googleUser.email);

  return user ? user : createNewUser(googleUser);
};
