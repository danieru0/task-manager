const { gql } = require('apollo-server-express');
const User = require('./User');

const typeDef = gql`
    ${User.types}

    type Query {
        ${User.queries}
    }

    type Mutation {
        ${User.mutations}
    }
`

module.exports = typeDef;