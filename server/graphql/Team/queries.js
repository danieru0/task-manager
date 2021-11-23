const queries = `
    isAuthorOfTeam(userId: String!): Boolean
    getTask(teamId: String!, projectId: String!, kanbanId: String!, taskId: String): Task
`

module.exports = queries;