import React from 'react';
import "./_Loader.sass";

interface ILoader {}

const Loader: React.FC<ILoader> = () => {
    return(
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div> 
    )
}

export default Loader;