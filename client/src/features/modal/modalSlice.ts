import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type ModalTypes = 'new-project' | '';

interface ModalState {
    modalName: ModalTypes;
}

const initialState: ModalState = {
    modalName: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<ModalTypes>) => {
            state.modalName = action.payload;
        }
    }
})

export const { setModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;