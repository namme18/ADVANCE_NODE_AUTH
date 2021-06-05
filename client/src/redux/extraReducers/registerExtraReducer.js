import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authErrorLogout, logRegSuccess } from '../authReducer';
import { clearErrors, getErrors } from '../errorReducer';


export const registerExtraReducer = createAsyncThunk('registerExtraReducer', async ({username, email, password},{dispatch, getState, rejectWithValue}) => {

    //Config
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    //Body
    const body = JSON.stringify({username, email, password});

    return axios.post('/api/auth/register',body ,config)
        .then(res =>{
            dispatch(logRegSuccess(res.data));
            dispatch(clearErrors());
        })
        .catch(err => {
            const errData = {
                msg : err.response.data.error,
                status: err.response.status,
                id: 'REGISTER_FAIL'
            }
            dispatch(getErrors(errData));
            dispatch(authErrorLogout());
            return rejectWithValue();
        })

});