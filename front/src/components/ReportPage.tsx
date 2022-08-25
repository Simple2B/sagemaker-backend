import React from 'react';

import NavBar from './NavBar/NavBar';
import Report from './Report/Report';

interface IReportPage {}

const reportContent = (
    <div className='reportTitle yellowColor'>Your paper's evaluation</div>
)


const ReportPage: React.FC<IReportPage> = () => {
    return(
        <>
            <NavBar text={'Home'} children={reportContent} linkHref={'/'}/>
            <Report/>
        </>
    )
}

export default ReportPage;