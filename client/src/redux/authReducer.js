import { createSlice } from '@reduxjs/toolkit';


export const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        isLoading: null,
        user: null
    },
    reducers: {
        userLoading: state => {
            return {
                ...state,
                isLoading: true
            }
        },

        userLoaded: (state, action) => {
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        },

        logRegSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        },

        authErrorLogout: state => {
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        },

        emailSent: (state, action) => {
            return{
                ...state,
                ...action.payload
            }
        },

        emailNotSent: (state, action) => {
            return{
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        },

        resetPasswordSuccess: (state, action) => {
            return {
                ...state,
                resetPasswordStatus: true,
                msg: action.payload.data
            }
        },

        resetPasswordFail: (state, action) => {
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        }
    }
});

export const { userLoading,userLoaded,logRegSuccess,authErrorLogout, emailSent, emailNotSent, resetPasswordSuccess, resetPasswordFail } = authReducer.actions;
export default authReducer.reducer;