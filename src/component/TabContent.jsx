// TabContent.js
import React from 'react';

const TabContent = ({ children, isActive }) => {
    return (
        <div className={`tab-content ${isActive ? 'active' : ''}`}>
            {children}
        </div>
    );
};

export default TabContent;
