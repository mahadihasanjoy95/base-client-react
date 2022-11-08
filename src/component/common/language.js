import React, {Fragment, useState} from 'react';
import {useTranslation} from "react-i18next";
import {i18nextLng} from "../../config/sessionKeys";
import langList from "../../lang/langList.json"

const Language = () => {
    const {i18n} = useTranslation();
    const [selected, setSelected] = useState(localStorage.getItem(i18nextLng));
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        setSelected(lng);
    };
    return (
        <Fragment>
            <div>
                <a className="txt-dark" href={void 0}>
                    <h6 className='text-uppercase'>{selected === null ? 'en' : selected.includes('en-') ? 'en' : selected}</h6></a>
                <ul className="language-dropdown onhover-show-div p-20">
                    {
                        langList?.map((item, index) => {
                            return <li onClick={() => changeLanguage(item.code)} key={index}>
                                <a href={void 0} data-lng={item.code}>
                                    <i className={`flag-icon ${item.flag_icon_class}`}/> {item.name}
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        </Fragment>
    );
};


export default Language;
