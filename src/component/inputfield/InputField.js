import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./static/Input.scss";
import {ReactComponent as NotVisiable} from "./static/image/not-visiable.svg";
import {ReactComponent as Visiable} from "./static/image/visiable1.svg";
import {ReactComponent as InfoCircle} from "./static/image/info-circle.svg";

const InputField = (props) => {
    const active = props.textAlign ? "right-input-text" : "";
    const isError = props.isError || "";
    const isDisabled = props.isDisabled || false;
    const disabledClass = isDisabled ? "disabled" : "";
    const isMultiple = props.isMultiple ? true : false;
    const [inputType, setInputType] = useState(props.textType);
    const passwordVisiablityClick = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    return (
        <div className="input-block">
            <label htmlFor="">
                <span className={props.asterisk ? "asterisk label_name" : "label_name"}>{props.inputLabel}</span>

                {props.labelLink && (
                    <span className="link">
                        <Link to={props.labelLink}>{props.labelLinkText}</Link>
                    </span>
                )}
                {props.labelOnChangeCallback && (
                    <span className="link">
                        <a href={void 0} onClick={props.labelOnChangeCallback}>
                            {props.labelLinkText}
                        </a>
                    </span>
                )}
            </label>
            <input
                id={props.id}
                className={`input-box ${props.type === "file" ? "inp-file" : "input"} ${active} ${isError} ${disabledClass} ${props.inputClassName}`}
                placeholder={props.placeHolder}
                accept={props.accept}
                type={inputType}
                value={props.value}
                onChange={props.onchangeCallback}
                onBlur={props.onBlur}
                autoComplete="off"
                name={props.inputName}
                ref={props.inputRef}
                multiple={isMultiple}
                maxLength={props.maxLength}
                disabled={props.disabled}
            />
            {props.requiredMessage ? (
                <span className="error-message">
                    <InfoCircle fill=""/> {props.requiredMessageLabel}
                </span>
            ) : props.whiteSpace === false ? ''
                :
                (
                    <span dangerouslySetInnerHTML={{__html: "&nbsp;"}}/>
                )
            }
            {props.textType === "password" && (
                <span className="password-visiablity" onClick={passwordVisiablityClick}>
                    {
                        inputType === "password" || props?.value?.length === 0 ?
                            <NotVisiable fill="white"/>
                            : <Visiable className="paasword-visiable" />
                    }
                </span>
            )}
        </div>
    );
};
export default InputField;
