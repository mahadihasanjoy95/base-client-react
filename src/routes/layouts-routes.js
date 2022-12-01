import React from 'react';
import path from "./path";
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout"
import siteConfig from "../config/site-config";
import Payment from "../pages/payment/Payment";

let DelayTime = siteConfig.lazy_suspense_delay;
let SiteName = `| ${siteConfig.company_name}`;

const Login = React.lazy(() => {
    return Promise.all([import(/*webpackChunkName: "Login" */ "../pages/auth/login"), new Promise(resolve => setTimeout(resolve, DelayTime))]).then(([moduleExports]) => moduleExports);
});

const Signup = React.lazy(() => {
    return Promise.all([import(/*webpackChunkName: "Signup" */ "../pages/auth/signup"), new Promise(resolve => setTimeout(resolve, DelayTime))]).then(([moduleExports]) => moduleExports);
});

const Default = React.lazy(() => {
    return Promise.all([import(/*webpackChunkName: "Default" */ "../pages/dashboard/default"), new Promise(resolve => setTimeout(resolve, DelayTime))]).then(([moduleExports]) => moduleExports);
});

const Home = React.lazy(() => {
    return Promise.all([import(/*webpackChunkName: "Home" */ "../pages/home/Home"), new Promise(resolve => setTimeout(resolve, DelayTime))]).then(([moduleExports]) => moduleExports);
});




export const private_routes = [
    {path: `${process.env.PUBLIC_URL}${path.dashboard}`, Component: <Default pageTitle={`Default ${SiteName}`}/>, Layout: <DefaultLayout/>},
]

export const public_routes = [
    {path: `${process.env.PUBLIC_URL}${path.login}`, Component: <Login pageTitle={`Login ${SiteName}`}/>, Layout: <AuthLayout/>},
    {path: `${process.env.PUBLIC_URL}${path.registration}`, Component: <Signup pageTitle={`Sign Up ${SiteName}`}/>, Layout: <AuthLayout/>},
]

// ************ Example for public private route *********** //
export const public_private_routes = [
    {path: `${process.env.PUBLIC_URL}${path.home}`, Component: <Home pageTitle={`Home ${SiteName}`}/>, Layout: <DefaultLayout/> },
    {path: `${process.env.PUBLIC_URL}${path.payment}`, Component: <Payment pageTitle={`Payment ${SiteName}`}/>, Layout: <DefaultLayout/> },
]
