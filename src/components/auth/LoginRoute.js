import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {appContext} from '../../util';

//此方法属于包装组合模式
// export const LoginRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )

export const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        appContext.currentStaff
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

 