import React from "react";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";
import siteConfig from "../../config/site-config";
import './Header.scss'
const Header = () => {
    const { t } = useTranslation();
    return(
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 align-self-center">
                        <div className="header-logo">
                            <Link to='/'>
                                <img src={siteConfig.company_logo} alt={siteConfig.company_name} />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-10 align-self-center">
                        <div className="menu text-right">
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/about'>About</Link></li>
                                <li><Link to='/shop'>Shop</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;