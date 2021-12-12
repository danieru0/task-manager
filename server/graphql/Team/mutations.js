const mutations = `
    createTeam (name: String!, authorId: String!): Team
    joinTeamRequest (inviteId: String!): Boolean
    acceptTeamRequest (userId: String!, teamId: String!): Boolean
    rejectTeamRequest (userId: String!, teamId: String!): Boolean
    createProject (name: String!, teamId: String!): Project
    createKanban (name: String!, teamId: String!, projectId: String!): Kanban
    moveTask (taskId: String!, teamId: String!, projectId: String!, kanbanIdFrom: String!, kanbanIdTo: String!): Task
    createComment(taskId: String!, teamId: String!, projectId: String!, kanbanId: String!, text: String!): Comment
    deleteKanban(teamId: String!, projectId: String!, kanbanId: String!): DeleteKanbanResult
    deleteProject(teamId: String!, projectId: String!): String
`

module.exports = mutations;