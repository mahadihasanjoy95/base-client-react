import React, {Fragment, Suspense, useState} from 'react';
import {useTranslation} from "react-i18next";
import {pageTitle} from "../../helper/CommonFunctions";

const Home = (props) => {
    pageTitle(props.pageTitle)
    return(
        <>
        <h1>This is Home Page</h1>
        </>
    )
}
export default Home;