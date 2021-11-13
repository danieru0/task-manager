const types = `
    type User {
        _id: String!
        email: String!
        name: String!
        nickname: String!
        picture: String!
        team: Team
    }
`

module.exports = types;