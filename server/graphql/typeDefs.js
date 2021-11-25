const { gql } = require('apollo-server-express');
const User = require('./User');
const Task = require('./Task');
const Team = require('./Team');

const typeDef = gql`
    ${User.types}
    ${Task.types}
    ${Team.types}

    type Query {
        ${User.queries}
        ${Task.queries}
        ${Team.queries}
    }

    type Mutation {
        ${User.mutations}
        ${Task.mutations}
        ${Team.mutations}
    }
`

module.exports = typeDef;