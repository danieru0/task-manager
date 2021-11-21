const mutations = `
    createTeam (name: String!, authorId: String!): Team
    joinTeamRequest (inviteId: String!): Boolean
    acceptTeamRequest (userId: String!, teamId: String!): Boolean
    rejectTeamRequest (userId: String!, teamId: String!): Boolean
    createProject (name: String!, teamId: String!): Project
    createKanban (name: String!, teamId: String!, projectId: String!): Kanban
    createTask (name: String!, description: String!, tag: String! teamId: String!, projectId: String!, kanbanId: String!): Task
`

module.exports = mutations;