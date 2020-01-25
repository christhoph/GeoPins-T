const { AuthenticationError } = require("apollo-server");
const Pin = require("./models/Pin");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) throw new AuthenticationError("You must be logged in");

  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, { currentUser }) => currentUser)
  },
  Mutation: {
    createPin: authenticated(async (_, args, { currentUser }) => {
      const newPin = await new Pin({
        ...args.input,
        author: currentUser._id
      }).save();

      return await Pin.populate(newPin, "author");
    })
  }
};
