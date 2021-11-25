const types = `
    type Comment {
        id: String!
        author: User!
        text: String!
    }

    type Task {
        id: String!
        name: String!
        author: User!
        description: String!
        tag: String!
        comments: [Comment]
        workingUsers: [User]!
    }

    type Kanban {
        id: String!
        name: String!
        tasks: [Task]!
    }

    type Project {
        id: String!
        name: String!
        tasksCounter: Int!
        kanbans: [Kanban]!
    }

    type Team {
        id: String!
        name: String!
        users: [User]!
        projects: [Project]!
        author: User!
        inviteLink: String!
        inviteRequests: [User]!
    }
`

module.exports = types;