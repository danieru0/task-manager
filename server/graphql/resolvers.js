const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');

const resolvers = {
    Query: {
        ...User.resolvers.queries,
        ...Task.resolvers.queries,
        ...Team.resolvers.queries,
    },
    Mutation: {
        ...User.resolvers.mutations,
        ...Task.resolvers.mutations,
        ...Team.resolvers.mutations,
    }
}

module.exports = resolvers;