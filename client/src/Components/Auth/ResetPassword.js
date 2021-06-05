import { Paper, Grid, Avatar, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { resetExtraReducer } from '../../redux/extraReducers/resetExtraReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    paperStyle: {
        width: 280,
        height: 'auto',
        margin: '40px auto',
        padding: theme.spacing(4)
    },
    avatarStyle: {
        backgroundColor: 'green',
      },
      field: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block',
      },
      alert: {
        padding: '.2rem .2rem',
        margin: '10px 0',
        fontSize: '.7rem'
      }
}));


const ResetPassword = () => {

    const classes = useStyles();

    const { resetToken } = useParams();

    const dispatch = useDispatch();

    const error = useSelector(state => state.errorReducer);

    const { resetPasswordStatus } = useSelector(state => state.authReducer);

    const history = useHistory();
    
    const [data, setData] = useState({
        password: '',
        confirmPassword:'',
        msg:'',
        isMatch: null,
        resetMsg: ''
    });

    useEffect(() => {
        if(data.password && data.confirmPassword){
            if(data.password === data.confirmPassword) return setData({...data, resetMsg: '', isMatch: true, msg: 'Password Matched!'});
            if(data.password !== data.confirmPassword) return setData({...data, resetMsg: '', isMatch: false,msg: 'Password Not Match'});
        }else{
            setData({
                ...data,
                msg: '',
                isMatch: null
            });
        }
    },[data.confirmPassword, data.password]);

    useEffect(() => {
        if(error.id === 'RESET_FAIL') {
            return setData({...data, isMatch: null, msg: '', resetMsg: error.msg});
        }else{
            setData({...data, resetMsg: ''});
        }

        if(!error.id && resetPasswordStatus === true) return history.push('/');
    },[error,resetPasswordStatus]);

    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        const { password } = data;

        const newPassword = {
            password,
            resetToken,
        }

        dispatch(resetExtraReducer(newPassword));
    }

    return (
        <Grid>
            <Paper className={classes.paperStyle} elevation={10}>
            <Grid align='center'>
                <Avatar className={classes.avatarStyle}>
                    <CreateIcon />
                </Avatar>
                <Typography variant='h4'>Enter new password!</Typography>
            </Grid>

            <form noValidate autoComplete='off' onSubmit={onSubmit}>

                {data.isMatch ? <Alert severity='success' className={classes.alert}>{data.msg}</Alert> : ''}
                {data.isMatch === false ? <Alert severity='error' className={classes.alert}>{data.msg}</Alert> : ''}
                {data.resetMsg ? <Alert severity='error' className={classes.alert}>{data.resetMsg}</Alert> : '' }

                <TextField 
                className ={classes.field}
                name='password'
                label='Enter new password'
                placeholder='Enter new password'
                onChange = {onChange}
                fullWidth
                type='password'
                />

                <TextField 
                type='password'
                name = 'confirmPassword'
                label = 'Confirm password'
                placeholder='Confirmpassword'
                fullWidth
                onChange = {onChange}
                className={classes.field}
                />

                <Button
                disabled={data.isMatch ? '' : 'true' }
                variant='contained'
                type='submit'
                color='primary'
                fullWidth
                className={classes.field}
                style={{marginTop: '1.5rem'}}
                >Submit</Button>

            </form>

            </Paper>
        </Grid>
    )
}

export default ResetPassword;