import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Avatar,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginExtraReducer } from '../../redux/extraReducers/loginExtraReducer';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    height: 'auto',
    width: 280,
    margin: '40px auto',
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
});

const Login = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const error = useSelector(state => state.errorReducer);
  const history = useHistory();
  const { isAuthenticated, resetPasswordStatus,  msg} = useSelector(state => state.authReducer);

  const [data, setData] = useState({
    email: '',
    password: '',
    msg: null,
  });

  useEffect(() => {
    if(isAuthenticated) history.push('/');

    if (error.id === 'LOGIN_FAIL') {
      setData({
        ...data,
        msg: error.msg,
      });
    } else {
      setData({
        ...data,
        msg: null,
      });
    }

  }, [error,isAuthenticated]);

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = data;

    const user = {
      email,
      password,
    };
    dispatch(loginExtraReducer(user));
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">Sign In</Typography>
        </Grid>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          {data.msg ? <Alert className={classes.alert} severity='error'>{data.msg}</Alert> : ''}
          {resetPasswordStatus ? <Alert className={classes.alert} severity='success'>{msg}</Alert> : ''}
          <TextField
            className={classes.field}
            value={data.email}
            label="Email"
            name="email"
            type="text"
            label="Enter Email"
            placeholder="Enter Email"
            onChange={onChange}
            fullWidth
            required
          />

          <TextField
            className={classes.field}
            value={data.password}
            label="Password"
            name="password"
            type="password"
            label="Enter Password"
            placeholder="Enter Password"
            onChange={onChange}
            fullWidth
            required
          />

          <FormControlLabel
            className={classes.field}
            control={<Checkbox name="rememberMe" color="primary" />}
            label="Remember me"
          />

          <Button
            className={classes.field}
            color="primary"
            variant="contained"
            fullWidth
            type="Submit"
          >
            Sign In
          </Button>
          <Grid align="center">
            <Link style={{ textDecoration: 'none' }} to="/register">
              <Button color="primary">Sign Up </Button>
            </Link>
            |
            <Link style={{ textDecoration: 'none' }} to="/forgot">
              <Button color="primary">forgotpassword</Button>
            </Link>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
