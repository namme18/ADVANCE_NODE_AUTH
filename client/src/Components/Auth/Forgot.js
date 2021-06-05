import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotExtraReducer } from '../../redux/extraReducers/sendForgotExtraReducer';

const useStyles = makeStyles({
  paperStyle: {
    height: 'auto',
    width: 280,
    margin: '40px auto',
    padding: 20,
  },
  avatarStyle: {
    backgroundColor: 'green',
  },
  fields: {
    margin: '10px 0',
    display: 'block',
  },
  alert: {
    padding: '.2rem .2rem',
    margin: '10px 0',
    fontSize: '.7rem'
  }
});

const Forgot = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.errorReducer);
  const { success } = useSelector(state => state.authReducer);

  const [data, setData] = useState({
    gmail: '',
    msg: null,
    success: false
  });

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if(error.id === 'EMAIL_FAIL'){
      return setData({
        ...data,
        msg: error.msg,
        success: false
      });
    }

    if(success){
      return setData({
        msg: null,
        success: true,
        gmail: '',
      });
    }
  },[error, success])

  const onSubmit = e => {
    e.preventDefault();
    console.log(data);
    const { gmail } = data;

    const email = {
      email: gmail,
    }

    dispatch(sendForgotExtraReducer(email));
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <CreateIcon />
          </Avatar>
          <Typography variant="h4">Forgot password</Typography>
        </Grid>

        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          {data.msg ? <Alert className={classes.alert} severity='error' >{data.msg}</Alert> : ''}
          {data.success ? <Alert className={classes.alert} severity='success'>Email Sent! Please check your mailbox!</Alert> : ''}
          <TextField
            name="gmail"
            label="Enter Email"
            value = {data.gmail}
            placeholder="Enter Email"
            className={classes.fields}
            onChange={onChange}
            fullWidth
            required
          />

          <Button color="primary" type="Submit" variant="contained" fullWidth>
            send
          </Button>
          <Grid align="center" className={classes.fields}>
            <Link style={{ textDecoration: 'none' }} to="/login">
              <Button color="primary">Login</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/register">
              <Button color="primary">Signup</Button>
            </Link>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Forgot;
