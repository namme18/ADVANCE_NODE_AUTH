import { Container, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authErrorLogout } from '../redux/authReducer';

const useStyles = makeStyles(theme => ({
    paperStyle: {
        width: 280,
        height: '80vh',
        margin: '40px auto',
        padding: 20
    }, 
    field: {
        margin: '10px auto',
        display: 'block',
      }
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authReducer);
    const onSubmit = e => {
        e.preventDefault();
        dispatch(authErrorLogout());
        //history.push('/login')
    }
    return(
        <Container>
            <Paper elevation={10} className={classes.paperStyle}>
                <form noValidate autoComplete='off' onSubmit={onSubmit}>
                <Typography gutterButtom align='center' variant='h4'>
                    Welcome Home!
                </Typography>
                <Typography align='center' variant='h3'>
                {user.username}
                </Typography>
                <Button
                    className={classes.field}
                    variant='contained'
                    color='primary'
                    fullwith
                    type='Submit'
                >Logout</Button>
                </form>
                
            </Paper>
        </Container>
    )
}

export default Home