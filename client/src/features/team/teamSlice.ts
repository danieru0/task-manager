import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MoveTaskInterface {
    projectId: string, 
    kanbanIdFrom: string, 
    kanbanIdTo: string, 
    task: TaskInterface
}

export interface CommentInterface {
    id: string,
    author: UserInterface,
    text: string;
}

export interface TaskInterface {
    id: string;
    name: string;
    description: string;
    author: UserInterface;
    stage: string;
    tag: string;
    comments: CommentInterface[];
    workingUsers: UserInterface[];
}

export interface KanbanInterface {
    id: string;
    name: string;
    tasks: TaskInterface[]
}

export interface ProjectInterface {
    id: string;
    name: string;
    tasksCounter: number;
    kanbans: KanbanInterface[];
}

export interface UserInterface {
    id: string;
    email: string;
    name: string;
    nickname: string;
    picture: string;
}

interface TeamInterface {
    id: string;
    name: string;
    inviteLink: string;
    users: UserInterface[];
    projects: ProjectInterface[];
    inviteRequests: UserInterface[]
}

export interface TeamState {
    team: TeamInterface | undefined;
}

const initialState: TeamState = {
    team: undefined
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeam: (state, action: PayloadAction<any>) => {
            state.team = action.payload;
        },
        removeInviteRequest: (state, action: PayloadAction<string>) => {
            if (state.team) {
                state.team.inviteRequests = state.team.inviteRequests.filter(request => request.id !== action.payload);
            }
        },
        addInviteRequest: (state, action: PayloadAction<UserInterface>) => {
            if (state.team) {
                state.team.inviteRequests = [...state.team.inviteRequests, action.payload]
            }
        },
        addProject: (state, action: PayloadAction<ProjectInterface>) => {
            if (state.team) {
                state.team.projects = [...state.team.projects, action.payload];
            }
        },
        removeProject: (state, action: PayloadAction<string>) => {
            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === action.payload);

                if (projectIndex !== -1) {
                    state.team.projects = state.team.projects.filter(project => project.id !== action.payload);
                }
            }
        },
        addKanban: (state, action: PayloadAction<{projectId: string, kanban: KanbanInterface}>) => {
            const { projectId, kanban } = action.payload;

            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === projectId);

                if (projectIndex !== -1) {
                    state.team.projects[projectIndex].kanbans = [...state.team.projects[projectIndex].kanbans, kanban];
                }
            }
        },
        removeKanban: (state, action: PayloadAction<{projectId: string, kanbanId: string}>) => {
            const { projectId, kanbanId } = action.payload;

            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === projectId);
                if (projectIndex === -1) throw new Error('Project with this id dont exists!');

                const kanbanIndex= state.team.projects[projectIndex].kanbans.findIndex(kanban => kanban.id === kanbanId);
                if (kanbanIndex === -1) throw new Error('Kanban with this id dont exists!');

                state.team.projects[projectIndex].kanbans = state.team.projects[projectIndex].kanbans.filter(kanban => kanban.id !== kanbanId);
            }
        },
        addTask: (state, action: PayloadAction<{projectId: string, kanbanId: string, task: TaskInterface}>) => {
            const { projectId, kanbanId, task } = action.payload;

            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === projectId);

                if (projectIndex !== -1) {
                    const kanbanIndex = state.team.projects[projectIndex].kanbans.findIndex(kanban => kanban.id === kanbanId);

                    if (kanbanIndex !== -1) {
                        state.team.projects[projectIndex].kanbans[kanbanIndex].tasks = [...state.team.projects[projectIndex].kanbans[kanbanIndex].tasks, task];
                    }
                } 
            }
        },
        moveTask: (state, action: PayloadAction<MoveTaskInterface>) => {
            const { projectId, kanbanIdFrom, kanbanIdTo, task } = action.payload;

            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === projectId);
                if (projectIndex === -1) throw new Error('Project with this id dont exists!');

                const kanbanIndexFrom = state.team.projects[projectIndex].kanbans.findIndex(kanban => kanban.id === kanbanIdFrom);
                if (kanbanIndexFrom === -1) throw new Error('Kanban with this id dont exists!');

                const taskIndexFrom = state.team.projects[projectIndex].kanbans[kanbanIndexFrom].tasks.findIndex(taskEl => taskEl.id === task.id);
                if (taskIndexFrom === -1) throw new Error('Task with this id dont exists!');

                state.team.projects[projectIndex].kanbans[kanbanIndexFrom].tasks.splice(taskIndexFrom, 1);

                const kanbanIndexTo = state.team.projects[projectIndex].kanbans.findIndex(kanban => kanban.id === kanbanIdTo);
                if (kanbanIndexTo === -1) throw new Error('Kanban with this id dont exists!');

                state.team.projects[projectIndex].kanbans[kanbanIndexTo].tasks.push(task);
            }
        },
        addComment: (state, action: PayloadAction<{projectId: string, kanbanId: string, taskId: string, comment: CommentInterface}>) => {
            const { projectId, kanbanId, taskId, comment } = action.payload;

            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === projectId);
                if (projectIndex === -1) throw new Error('Project with this id dont exists!');

                const kanbanIndex = state.team.projects[projectIndex].kanbans.findIndex(kanban => kanban.id === kanbanId);
                if (kanbanIndex === -1) throw new Error('Kanban with this id dont exists!');

                const taskIndex = state.team.projects[projectIndex].kanbans[kanbanIndex].tasks.findIndex(task => task.id === taskId);
                if (taskIndex === -1) throw new Error('Task with this id dont exists!');

                state.team.projects[projectIndex].kanbans[kanbanIndex].tasks[taskIndex].comments.push(comment);
            }
        },
        clearTeamData: state => {
            state.team = undefined;
        },
        deleteUserFromTeam: (state, action: PayloadAction<string>) => {
            if (state.team) {
                state.team.users = state.team.users.filter(user => user.id !== action.payload);
            }
        }
    }
})

export const { setTeam, removeInviteRequest, addInviteRequest, addProject, removeProject, addKanban, removeKanban, addTask, moveTask, addComment, clearTeamData, deleteUserFromTeam } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team;

export default teamSlice.reducer;