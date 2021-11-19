const types = `
    type Task {
        name: String!
        author: User!
        description: String!
    }

    type Kanban {
        id: String!
        name: String!
        tasks: [Task]
    }

    type Project {
        id: String!
        name: String!
        tasksCounter: Int!
        kanbans: [Kanban]
    }

    type Team {
        id: String!
        name: String!
        users: [User]
        projects: [Project]
        author: User!
        inviteLink: String!
        inviteRequests: [User]
    }
`

module.exports = types;