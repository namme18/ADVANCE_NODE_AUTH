import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


export default configureStore({
    reducer:{
        authReducer: authReducer,
        errorReducer: errorReducer
    }
});