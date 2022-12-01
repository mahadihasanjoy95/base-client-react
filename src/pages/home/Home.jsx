import React, {Fragment, Suspense, useState} from 'react';
import {useTranslation} from "react-i18next";
import {pageTitle} from "../../helper/CommonFunctions";
import PaypalButton from "../../paypal/PaypalButtons";

const Home = (props) => {
    pageTitle(props.pageTitle)
    const  cartList = []
    const orderId = "abcd12345"
    const totalPrice = 1040
    const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(true)
    return(
        <>
            {window.location.href = "http://localhost:3000/payment?orderId="+orderId+"&totalPrice="+totalPrice}
            </>
    )
}
export default Home;