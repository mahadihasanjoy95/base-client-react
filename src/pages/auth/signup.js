import React, { Fragment } from 'react';
import {useNavigate} from "react-router-dom";
import {pageTitle} from "../../helper/CommonFunctions";

const Signup = (props) => {
    const history = useNavigate();
    pageTitle(props.pageTitle)

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="container-fluid">
                    {/* <!-- sign up page start--> */}
                    <div className="authentication-main">
                        Hello Register
                    </div>
                    {/* <!-- sign up page ends--> */}
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;
