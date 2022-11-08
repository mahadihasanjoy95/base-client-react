import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import path from "../routes/path";
import {pageTitle} from "../helper/CommonFunctions";
const Maintenance = (props) => {
    const {t} = useTranslation();
    pageTitle(props.pageTitle)

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="error-wrapper maintenance-bg">
                    <div className="container">
                        <ul className="maintenance-icons">
                            <li><i className="fa fa-cog"/></li>
                            <li><i className="fa fa-cog"/></li>
                            <li><i className="fa fa-cog"/></li>
                        </ul>
                        <div className="maintenance-heading">
                            <h2 className="headline">{t('maintenance')}</h2>
                        </div>
                        <h4 className="sub-content">{t('maintenance_p1')} <br />
                            {t('maintenance_p2')}</h4>
                        {/*<div><Link className="btn btn-info-gradien btn-lg text-light" to={`${process.env.PUBLIC_URL}${path.dashboard}`}>{t('back_to_home_page')}</Link></div>*/}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Maintenance;
