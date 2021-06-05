import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authErrorLogout, emailSent, emailNotSent } from '../authReducer';
import { clearErrors, getErrors } from '../errorReducer';

export const sendForgotExtraReducer = createAsyncThunk('sendForgotExtraReducer', async (email, {dispatch,rejectWithValue}) => {

    //config
    const config = {
        headers:{
            'Content-type':'application/json'
        }
    }
    //body
    const body = JSON.stringify(email);

    //request
    console.log(email);
    return axios.post('/api/auth/forgotpassword', body, config)
        .then(res => {
            dispatch(emailSent(res.data));
            dispatch(clearErrors());
        })
        .catch(err => {
            const errData = {
                msg: err.response.data.error,
                status: err.response.status,
                id: 'EMAIL_FAIL'
            }
            dispatch(getErrors(errData));
            dispatch(authErrorLogout());
            dispatch(emailNotSent());
            return rejectWithValue();
        })
});