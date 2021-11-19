import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type ModalTypes = 'new-project' | 'new-kanban' | '';

interface ModalState {
    modalName: ModalTypes;
    variables?: {
        projectId?: string;
    }
}

const initialState: ModalState = {
    modalName: '',
    variables: {
        projectId: ''
    }
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<ModalState>) => {
            state.modalName = action.payload.modalName;
            state.variables = action.payload.variables;
        }
    }
})

export const { setModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;