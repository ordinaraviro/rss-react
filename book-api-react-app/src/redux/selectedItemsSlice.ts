import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
    items: string[]; // or any other type based on your selected items
}

const initialState: SelectedItemsState = {
    items: [],
};

const selectedItemsSlice = createSlice({
    name: 'selectedItems',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item !== action.payload);
        },
        clearItems: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
