import React from 'react';
import "./_Info.sass";

interface IInfo {
    title: string,
    subTitle: string,
    items: string[]
}

const Info: React.FC<IInfo> = ({title, subTitle, items}) => {
    return(
        <section className='containerInfo'>
            <div className='containerInfo_title'>{title}</div>
            <div className='containerInfo_text'>
                <div className='text_subTitle'>{subTitle}</div>
                <div className='text_itemsContainer'>
                    {items.map((item, index) => {
                        return (
                            <div key={index} className="text_item">
                                <span className='text_itemSquare'/>
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section> 
    )
}

export default Info;