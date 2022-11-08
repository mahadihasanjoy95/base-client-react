import React, {Suspense, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {RouteRestriction} from "./route-restriction";
import {private_routes, public_routes, public_private_routes} from './layouts-routes';
import pages_path from "./path";
import {isDeveloperr, userData} from "../config/sessionKeys";
import Error400 from "../pages/errors/error400";
import siteConfig from "../config/site-config";
import config from "../config/config.json";
import Maintenance from "../pages/maintenance";
import CustomPageLoader from "../component/customPageLoader";

const MainRoutes = () => {
    const maintenance = config.maintenance;
    const isDeveloper = localStorage.getItem(isDeveloperr)
    const jwt_token = JSON.parse(localStorage.getItem(userData));

    // Favicon icon set...
    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = siteConfig.company_favicon;
    }, []);

    return maintenance && isDeveloper !== 'true' ? (
        <Maintenance/>
    ) : (
        <>
            <Routes>
                {/* <Route path={`${process.env.PUBLIC_URL}${pages_path.home}`} element={<Home pageTitle="Home"/>}/> */}
                <Route exact path='/' element={<RouteRestriction type="both"/>}>
                    {public_private_routes.map(({path, Component, Layout}, i) => (
                        <Route element={Layout} key={i}>
                            <Route exact path={path} element={<Suspense fallback={<CustomPageLoader default/>}>{Component}</Suspense>}/>
                        </Route>
                    ))}
                </Route>
                <Route exact path='/' element={<RouteRestriction type="private"/>}>
                    {private_routes.map(({path, Component, Layout}, i) => (
                        <Route element={Layout} key={i}>
                            {jwt_token && <Route exact
                                                 path={`/`}
                                                 element={<Navigate
                                                     to={`${process.env.PUBLIC_URL}${pages_path.dashboard}`}/>}
                            />}
                            <Route exact path={path}
                                   element={<Suspense fallback={<CustomPageLoader default/>}>{Component}</Suspense>}
                            />
                        </Route>
                    ))}
                </Route>

                <Route exact path='/' element={<RouteRestriction type="public"/>}>
                    {public_routes.map(({path, Component, Layout}, i) => (
                        <Route element={Layout} key={i}>
                            <Route exact path={path} element={<Suspense fallback={<CustomPageLoader default/>}>{Component}</Suspense>}/>
                        </Route>
                    ))}
                </Route>
                
                

                
                
                <Route path={`${process.env.PUBLIC_URL}${pages_path.error400}`} element={<Error400 pageTitle="Error"/>}/>
                <Route path="*" element={<Error400 pageTitle="Error"/>}/> {/* wrong route redirects to 404 page */}
            </Routes>
        </>
    );


};

export default MainRoutes;
