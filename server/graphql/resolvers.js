const User = require('./User');
const Team = require('./Team');

const resolvers = {
    Query: {
        ...User.resolvers.queries,
        ...Team.resolvers.queries,
    },
    Mutation: {
        ...User.resolvers.mutations,
        ...Team.resolvers.mutations,
    }
}

module.exports = resolvers;