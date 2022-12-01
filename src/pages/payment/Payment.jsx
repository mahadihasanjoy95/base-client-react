import React, {Fragment, Suspense, useState} from 'react';
import {useTranslation} from "react-i18next";
import {pageTitle} from "../../helper/CommonFunctions";
import PaypalButton from "../../paypal/PaypalButtons";
import {useSearchParams} from "react-router-dom";

const Payment = (props) => {
    pageTitle(props.pageTitle)
    const [searchParams, setSearchParams] = useSearchParams();
    const cartList = []
    const orderId =  searchParams.get("orderId")
    const totalPrice = searchParams.get("totalPrice")
    console.log("Total price::", totalPrice)
    const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false)
    return (<> <PaypalButton orderId={orderId}
                             amount={totalPrice}
                             success_paypal={setShowPaymentSuccessModal}/>

        </>)
}
export default Payment;