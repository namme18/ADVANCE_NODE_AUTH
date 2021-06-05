import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPasswordFail, resetPasswordSuccess } from '../authReducer';
import { clearErrors, getErrors } from '../errorReducer';
import axios from 'axios';


export const resetExtraReducer = createAsyncThunk('resetExtraReducer', async ({password,resetToken}, {dispatch, rejectWithValue}) => {
    //config
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    //body
    const body = JSON.stringify({password});
    //reaquest
    return axios.put(`/api/auth/resetpassword/${resetToken}`, body, config)
        .then(res => {
            dispatch(resetPasswordSuccess(res.data))
            dispatch(clearErrors());
        })
        .catch(err => {
            const errData = {
                msg: err.response.data.error,
                status: err.response.status,
                id: 'RESET_FAIL'
            }
            console.log(err);
            dispatch(getErrors(errData));
            dispatch(resetPasswordFail());
            return rejectWithValue();
        });
});