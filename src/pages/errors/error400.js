import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import path from "../../routes/path";
import {pageTitle} from "../../helper/CommonFunctions";
import { useTranslation } from 'react-i18next';
import './error.scss';

const Error400 = (props) => {
    pageTitle(props.pageTitle)
    const {t} = useTranslation();

    return (
        <Fragment>
            <div className="page-wrapper">
                {/* <!-- error-400 start--> */}
                <div className="error-wrapper">
                    <div className="container">
                        <div className='content'>
                            <i className="bi bi-emoji-frown"></i>
                            <h2 className="headline font-info">{t('error404.404')}</h2>
                            <p>{t('error404.content')}</p>
                            <Link to={`${process.env.PUBLIC_URL}${path.dashboard}`}
                                   className="btn btn-info-gradien">{t('error404.back_to_home')}</Link>
                        </div>
                        
                    </div>
                </div>
                {/* <!-- error-400 end--> */}
            </div>
        </Fragment>
    );
};

export default Error400;
