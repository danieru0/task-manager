const types = `
    type User {
        id: String!
        email: String!
        name: String!
        nickname: String!
        picture: String!
        team: Team!
        workingTasks: [Task]
    }
`

module.exports = types;