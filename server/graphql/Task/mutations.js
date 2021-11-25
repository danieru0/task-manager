const mutations = `
    createTask (name: String!, description: String!, tag: String! teamId: String!, projectId: String!, kanbanId: String!): Task
    setWorkingStatus (teamId: String!, projectId: String!, kanbanId: String!, taskId: String!): [Task]
`

module.exports = mutations;