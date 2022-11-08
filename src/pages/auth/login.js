import React, {Fragment, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {pageTitle} from "../../helper/CommonFunctions";
import {useTranslation} from "react-i18next";



const Logins = (props) => {
    pageTitle(props.pageTitle)
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="auth-bg">
                    Login
                </div>
            </div>
        </Fragment>
    );
};

export default Logins;
