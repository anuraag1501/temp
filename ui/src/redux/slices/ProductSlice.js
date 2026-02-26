import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    selectedCategory : ""
};

const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
});

export const { setSearchValue, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
