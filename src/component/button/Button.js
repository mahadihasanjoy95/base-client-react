import React from 'react';
import './styles/Button.scss';
import ButtonLoader from "../buttonLoader";

const Commonbutton = (props) => {
    return (
        <button
            type={props.type !== undefined ? props.type : 'submit'}
            ref={props.inputRef}
            onClick={props.onclickCallback}
            className={props.inputClassName}
            disabled={props.isLoading || props.disabled}
        >
            {
                props.isLoading && (<ButtonLoader className="social_icon mr-5px"/>)
            }
            {props.btnText}
        </button>
    );
};

export default Commonbutton;
