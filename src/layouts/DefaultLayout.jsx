import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../component/common/loader';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import './scss/DefaultLayout.scss'

const DefaultLayout = (props) => {
    return(
        <Fragment>
        <Header />
        <div className="defaultayout-body">
            <Outlet /> 
        </div>
        <Footer />
        <Loader />
        </Fragment>
    )
}
export default DefaultLayout;