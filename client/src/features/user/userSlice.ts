import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface WorkingTasksInterface {
    id: string;
    name: string;
    stage: string;
    projectName: string;
}

interface UserState {
    workingTasks: WorkingTasksInterface[];
}

const initialState: UserState = {
    workingTasks: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setWorkingTasks: (state, action: PayloadAction<WorkingTasksInterface[]>) => {
            state.workingTasks = action.payload;
        },
        updateWorkingTaskStage: (state, action: PayloadAction<{taskId: string, stage: string}>) => {
            const { taskId, stage } = action.payload;

            const taskIndex = state.workingTasks.findIndex(task => task.id === taskId);

            if (taskIndex !== -1) {
                state.workingTasks[taskIndex].stage = stage;
            }
        },
        clearUserData: state => {
            state.workingTasks = [];
        }
    }
})

export const { setWorkingTasks, updateWorkingTaskStage, clearUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;