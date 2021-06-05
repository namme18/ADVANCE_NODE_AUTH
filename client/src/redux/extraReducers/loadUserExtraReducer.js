import { userLoaded, userLoading,authErrorLogout } from "../authReducer";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { getErrors } from "../errorReducer";

export const loadUser = createAsyncThunk('loadUser', async (any, {getState, dispatch,rejectWithValue}) => {
    
    dispatch(userLoading());

    return axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch(userLoaded(res.data.user))
        })
        .catch(err => {
            const errorData = {
                msg: err.response.data.error,
                status: err.response.status
            }
            dispatch(getErrors(errorData));
            dispatch(authErrorLogout());
            return rejectWithValue();
        })
});

export const tokenConfig = getState => {
    //get token

    const token = `Bearer ${getState().authReducer.token}`;

    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    //if token, add to headers
    if(token){
        config.headers['Authorization'] = token;
    }

    return config;

}