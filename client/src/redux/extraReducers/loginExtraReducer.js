import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logRegSuccess, authErrorLogout } from '../authReducer';
import { getErrors, clearErrors } from '../errorReducer';

export const loginExtraReducer = createAsyncThunk(
  'loginExtraReducer',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    //headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //request body
    const body = JSON.stringify({email, password});

    return axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch(logRegSuccess(res.data));
            dispatch(clearErrors());
            return res.data;
        })
        .catch(err => {
          
            const errData = {
                msg: err.response.data.error,
                status: err.response.status,
                id: 'LOGIN_FAIL',
            }
            dispatch(getErrors(errData));
            dispatch(authErrorLogout(errData));
            return rejectWithValue(errData);
        })
  });
