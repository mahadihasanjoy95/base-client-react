import React from 'react';

export default function ButtonLoader({className = ''}) {
    return (
        <i className={`fa fa-circle-o-notch fa-spin fa-fw ${className}`} aria-hidden="true"/>
    );
}
