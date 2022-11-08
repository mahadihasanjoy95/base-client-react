import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import './scss/AuthLayout.scss'

const AuthLayout = (props) => {
    return (
        <Fragment>
            THis is Auth
            <Outlet />
        </Fragment>
    );
}

export default AuthLayout;