const { gql } = require('apollo-server-express');
const User = require('./User');
const Team = require('./Team');

const typeDef = gql`
    ${User.types}
    ${Team.types}

    type Query {
        ${User.queries}
        ${Team.queries}
    }

    type Mutation {
        ${User.mutations}
        ${Team.mutations}
    }
`

module.exports = typeDef;