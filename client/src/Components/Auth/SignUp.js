import { Avatar, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerExtraReducer } from '../../redux/extraReducers/registerExtraReducer';
import  Alert  from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  paperStyle: {
    margin: '40px auto',
    height: 'auto',
    width: 280,
    padding: 20,
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

const SignUp = () => {

  const dispatch = useDispatch();
  const error = useSelector(state => state.errorReducer);

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    comment: '',
    msg: null,
  });

  useEffect(() => {
    if(error.id === 'REGISTER_FAIL'){
       setData({
        ...data,
        msg: error.msg
      })
    }else{
       setData({
        ...data,
        msg: null
      });
    }
  },[error]);

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { username, email, password } = data;

    const newUser = {
      username,
      email,
      password
    }

    dispatch(registerExtraReducer(newUser));
  };

  const classes = useStyles();
  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <CreateIcon />
          </Avatar>
          <Typography variant="h4">SignUp</Typography>

          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            {data.msg ? <Alert className={classes.alert} severity='error'>{data.msg}</Alert> : ''}
            <TextField
              className={classes.field}
              type="text"
              name="username"
              label="Enter Username"
              placeholder="Enter Username"
              required
              fullWidth
              onChange={onChange}
              value={data.username}
            />

            <TextField
              className={classes.field}
              type="text"
              name="email"
              label="Enter Email"
              placeholder="Enter Email"
              required
              fullWidth
              onChange={onChange}
              value={data.email}
            />

            <TextField
              className={classes.field}
              type="password"
              name="password"
              label="Enter Password"
              placeholder="Enter Password"
              required
              fullWidth
              onChange={onChange}
              value={data.password}
            />

            <TextField
              className={classes.field}
              type="text"
              name="comment"
              label="Enter Comment"
              placeholder="Enter Comment"
              fullWidth
              multiline
              rows={4}
              onChange={onChange}
              value={data.comment}
            />

            <Button
              className={classes.field}
              variant="contained"
              color="primary"
              onClick={onChange}
              fullWidth
              type="Submit"
              style={{ marginTop: '1.5rem' }}
            >
              Sign up
            </Button>

            <Grid align="center" style={{ marginTop: '.5rem' }}>
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Button color="primary">login</Button>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/forgot">
              <Button color="primary">
                forgotpassword
              </Button>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SignUp;
