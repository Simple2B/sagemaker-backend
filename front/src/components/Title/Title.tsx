import React from 'react';
import "./_Title.sass";
import contentImg from "../../images/content_img.jpg";

interface ITitle {
    mainText: string,
    subText: string
}

const Title: React.FC<ITitle> = ({mainText, subText}) => {
    return(
        <section className='titleContainer'>
            <div className="titleContainer_img">
                <img src={contentImg} alt="titleContainer_img" />
            </div>
            <div className="titleContainer_text">
                <div className="mainText">{mainText}</div>
                <div className="subText">{subText}</div>
            </div>
        </section>
    )
}

export default Title;
