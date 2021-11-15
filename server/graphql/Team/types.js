const types = `
    type Task {
        name: String!
        author: User!
        description: String!
    }

    type Kanban {
        name: String!
        tasks: [Task]
    }

    type Project {
        name: String!
        kanbans: [Kanban]
    }

    type Team {
        name: String!
        users: [User]
        projects: [Project]
        author: User!
        inviteLink: String!
    }
`

module.exports = types;