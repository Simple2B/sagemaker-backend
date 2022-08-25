import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import "./_NavBar.sass";

interface INavBar {
    text: string,
    children: ReactNode,
    linkHref: string
    onClickMail?: any,
}

const NavBar: React.FC<INavBar> = ({text, children, linkHref, onClickMail}) => {
    
    return(
        <nav className='navContainer'>
          {children}
          <Link to={linkHref} onClick={onClickMail}>
            <div className="navContainer_contact yellowColor">
              {text}
            </div>
          </Link>
        </nav>
    )
}

export default NavBar;