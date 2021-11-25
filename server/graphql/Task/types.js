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
        stage: String!
        projectName: String!
        comments: [Comment]
        workingUsers: [User]!
        teamId: String!
    }
`

module.exports = types;