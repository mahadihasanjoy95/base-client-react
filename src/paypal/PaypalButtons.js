import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import config from '../config'
import {toast} from "react-toastify";
import AxiosServices from "../networks/AxiosService";
import ApiUrlServices from "../networks/ApiUrlServices";
import DoubleConfirmation from "../component/doubleConfirmation";
import ButtonLoader from "../component/buttonLoader";
import success_error_message from "../lang/en.json"

const CLIENT = {
    sandbox:
    config.payment.paypal_sandbox_client_id,
    production:
    config.payment.paypal_prod_client_id
};

const CLIENT_ID = CLIENT.sandbox;

let PayPalButton = null;

class PaypalButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            paid: false,
            runningPaymentStatusCheck: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const {isScriptLoaded, isScriptLoadSucceed} = this.props;

        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM});
            this.setState({loading: false, showButtons: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isScriptLoaded, isScriptLoadSucceed} = nextProps;

        const scriptJustLoaded =
            !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

        if (scriptJustLoaded) {
            if (isScriptLoadSucceed) {
                PayPalButton = window.paypal.Buttons.driver("react", {
                    React,
                    ReactDOM
                });
                this.setState({loading: false, showButtons: true});
            }
        }
    }

    createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    invoice_id: this.props.orderId, // order id
                    description: "",
                    amount: {
                        currency_code: 'USD',
                        value: this.props.amount
                    }
                }
            ]
        });
    };

    checkPaymentStatus = async (data, count) => {

        if (count > 10) {
            toast.error(success_error_message.cart.PAYMENT_STATUS);
            {
                window.location.href = "http://localhost:3001/";
            }

            this.setState({runningPaymentStatusCheck: false});
            return;
        }

        let error;
        let succ;
        await AxiosServices.get(ApiUrlServices.CHECK_PAYMENT(this.props.orderId))
            .then(response => {
                succ = true;
                this.props.success_paypal(true)
                this.setState({showButtons: false, paid: true});
            })
            .catch(err => {
                error = err;
            })

        if (succ) {
            this.setState({runningPaymentStatusCheck: true});
            return;
        } else if (error) {
            if (error.response.data.data.reason === "UNKNOWN_ERROR" || error.response.data.data.reason === "PAYMENT_FAILED") {
                toast.error(success_error_message.cart.PAYMENT_STATUS);
                {
                    window.location.href = "http://localhost:3001/";
                }

                this.setState({runningPaymentStatusCheck: false});
                return;
            } else if (error.response.data.data.reason === "PAYMENT_NOT_COMPLETED_EXCEPTION") {
                await new Promise(() => {
                    setTimeout(() => {
                        this.checkPaymentStatus(data, count + 1);
                    }, 5000);
                });
            }
        }

    }


    onApprove = async (data, actions) => {
        this.setState({runningPaymentStatusCheck: true});

        actions.order.capture().then(async details => {
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID
            };

            if (details.status === "COMPLETED") {
                await this.checkPaymentStatus(paymentData, 1)
            }
        })
            .catch(err => {
                this.setState({runningPaymentStatusCheck: false});
            });
    };

    render() {
        const {showButtons, loading, paid, runningPaymentStatusCheck} = this.state;

        return (
            <div className="paypal_block">
                {loading && <h5>Loading. . .</h5>}

                {
                    runningPaymentStatusCheck &&
                    <DoubleConfirmation
                        headerText={<span>Please don't leave this page, your payment is on progress <ButtonLoader
                            className="fa-2x"/> </span>}
                        headState
                        cancelBtn
                        okBtn
                    />
                }

                {showButtons && (
                    <div className="payment_section">
                        <h3 className="pay_now">Pay Now</h3>

                        <PayPalButton
                            createOrder={(data, actions) => this.createOrder(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                        />
                    </div>
                )}

                {paid && (
                    <div className="main">
                        <h2 className="payment_successful_msg">
                            Payment Was Successful{" "}
                            <span role="img" aria-label="emoji">😉</span>
                        </h2>
                    </div>
                )}
            </div>
        );
    }
}


export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
