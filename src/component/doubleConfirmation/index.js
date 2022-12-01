import React, { useEffect, useState } from 'react';
import Commonbutton from "../button/Button";
import ModalBootstrap from "../modalBootstrap/ModalBootstrap";
import path from '../../routes/path';
import InputField from '../inputfield/InputField';
import './static/doubleConfirmation.scss';
import {useNavigate} from "react-router-dom";

export default function DoubleConfirmation({setShowModal, closeOnSubmit, dataBody, footerMessage, headerText, isRoute, isFunc, callBackFunction, callBackRoute, params, confirmBtnTxt, cancelBtnTxt, headState, cancelBtn, okBtn, confirmationSigned, learning, editing }) {
    const history = useNavigate();
    const [attempt, setAttempt] = useState(0);
    const [confirmationInput, setConfirmationInput] = useState("");
    const [loading, setLoading] = useState(false);

    const cancelHandler = () => {
        setShowModal(false);
        setAttempt(0);
    }

    useEffect(() => {
        setConfirmationInput("");
    }, [confirmationSigned])

    useEffect(() => {
        if (attempt === 1) {
            if(!!!closeOnSubmit) {
                cancelHandler();
            }
            else {
                setLoading(true);
            }
            if(isRoute){
                if(callBackRoute === path.home && editing) {
                    localStorage.setItem("selectedRole", "Instructor");
                }
                history.push(callBackRoute || path.home);
            }
            else if(isFunc) {
                if(params){
                    callBackFunction(params);
                }
                else {
                    callBackFunction();
                }
            }
            else {
                history.push(callBackRoute || path.home);
            }
        }
    }, [attempt])

    return (
        <ModalBootstrap
            show={true}
            handleClose={cancelHandler}
            title={"Caution"}
            size={confirmationSigned ? "md" : "sm"}
            header={headState}
        >
            <div className="modal-body double-confirmation">
                {
                    !confirmationSigned ? 
                        <p style={{ textAlign: 'center' }}>{headerText || "Do you want to go back?"}</p> 
                        :
                        <p>
                            {dataBody}
                        </p>
                }
                {
                    confirmationSigned ? 
                    <div>
                        <InputField
                            id="doubleConfirmationInputField"
                            placeHolder="Confirm"
                            textType="text"
                            inputName="Confirmation"
                            value={confirmationInput}
                            onchangeCallback={e => {
                                setConfirmationInput(e.target.value)
                            }}
                        />
                    </div>
                    : null
                }
                {
                    footerMessage ?
                        <div className="pb-2"><i>{footerMessage}</i></div>
                        : null
                }
                <div className="action-block w-100 justify-content-center">
                    {
                    !okBtn ?
                        <Commonbutton
                            type="button"
                            disabled={loading}
                            inputClassName="form-cancel"
                            isLoading=""
                            btnText={cancelBtnTxt || "Cancel"}
                            onclickCallback={cancelHandler}
                        /> : ""
                    }

                    {
                    !cancelBtn ? 
                        <Commonbutton
                            type="button"
                            onclickCallback={() => setAttempt(prevCount => prevCount + 1)}
                            inputClassName="form-submit"
                            btnText={confirmBtnTxt || "Ok"}
                            isLoading={loading}
                            disabled={confirmationSigned && confirmationInput !== "Confirm"}
                        /> : ""
                    }
                </div>
            </div>
        </ModalBootstrap>
    );
}
