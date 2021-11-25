import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type ContextTypes = 'task' | '';

interface ContextState {
    contextName: ContextTypes;
    pos: {
        x: number,
        y: number
    }
    variables?: {
        taskId?: string;
        kanbanId?: string;
        projectId?: string;
    }
}

const initialState: ContextState = {
    contextName: '',
    pos: {
        x: 0,
        y: 0
    },
    variables: {
        taskId: '',
        kanbanId: '',
        projectId: ''
    }
}

export const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        setContextMenu: (state, action: PayloadAction<ContextState>) => {
            const { contextName, pos, variables } = action.payload;

            state.contextName = contextName;
            state.pos = pos;
            state.variables = {...state.variables, ...variables};
        }
    }
})

export const { setContextMenu } = contextSlice.actions;

export const selectContext = (state: RootState) => state.context;

export default contextSlice.reducer;