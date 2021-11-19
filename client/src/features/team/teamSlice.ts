import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface KanbanInterface {
    id: string;
    name: string;
    tasks: []
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
    team: TeamInterface | undefined
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
        addKanban: (state, action: PayloadAction<{projectId: string, kanban: KanbanInterface}>) => {
            const { projectId, kanban } = action.payload;

            if (state.team) {
                const projectIndex = state.team.projects.findIndex(project => project.id === projectId);

                if (projectIndex !== -1) {
                    state.team.projects[projectIndex].kanbans = [...state.team.projects[projectIndex].kanbans, kanban];
                }
            }
        }
    }
})

export const { setTeam, removeInviteRequest, addInviteRequest, addProject, addKanban } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team;

export default teamSlice.reducer;