import { createSlice } from '@reduxjs/toolkit';


export const errorReducer = createSlice({
    name:'errorReducer',
    initialState: {
        msg:{},
        status: null,
        id: null
    },
    reducers:{
        getErrors: (state, action) => {
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        },
        clearErrors: (state, action) => {
            return {
                msg: {},
                status: null,
                id: null
            }
        }
    }
});

export const { getErrors, clearErrors } = errorReducer.actions;

export default errorReducer.reducer;