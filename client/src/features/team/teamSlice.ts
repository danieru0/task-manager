import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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
    users: [];
    projects: [];
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
        }
    }
})

export const { setTeam, removeInviteRequest } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team;

export default teamSlice.reducer;