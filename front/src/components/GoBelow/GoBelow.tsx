import React from 'react';
import "./_GoBelow.sass";

interface IGoBelow {
    text: string,
    href: string
}

const GoBelow: React.FC<IGoBelow> = ({text, href}) => {
    
    return(
        <div className='containerGoBelow'>
          <div className='containerGoBelow_text'>{text}</div>
          <a href={href} className='containerGoBelow_arrow'></a>
        </div>
    )
}

export default GoBelow;