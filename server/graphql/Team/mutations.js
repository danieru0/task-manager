const mutations = `
    createTeam (name: String!, authorId: String!): Team
    joinTeamRequest (inviteId: String!): Boolean
    acceptTeamRequest (userId: String!, teamId: String!): Boolean
    rejectTeamRequest (userId: String!, teamId: String!): Boolean
`

module.exports = mutations;