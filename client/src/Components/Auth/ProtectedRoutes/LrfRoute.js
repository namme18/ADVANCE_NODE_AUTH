import { Redirect, Route } from 'react-router-dom';


const LrfRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
        {...rest}
        render = { props => 
            localStorage.getItem('token') ? (
                <Redirect to='/' />
            ) : (
                <Component {...props} />
            )
        }
        />
    )
}

export default LrfRoute;