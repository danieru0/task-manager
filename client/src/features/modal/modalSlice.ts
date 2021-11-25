import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type ModalTypes = 'new-project' | 'new-kanban' | 'new-task' | '';

interface ModalState {
    modalName: ModalTypes;
    variables?: {
        projectId?: string;
        kanbanId?: string;
    }
}

const initialState: ModalState = {
    modalName: '',
    variables: {
        projectId: '',
        kanbanId: ''
    }
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<ModalState>) => {
            state.modalName = action.payload.modalName;
            state.variables = {...state.variables, ...action.payload.variables};
        }
    }
})

export const { setModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;