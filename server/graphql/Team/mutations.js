const mutations = `
    createTeam (name: String!, authorId: String!): Team
    joinTeamRequest (inviteId: String!): Boolean
    acceptTeamRequest (userId: String!, teamId: String!): Boolean
    rejectTeamRequest (userId: String!, teamId: String!): Boolean
    createProject (name: String!, teamId: String!): Project
`

module.exports = mutations;