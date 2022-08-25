import React from 'react';
import FormInfo from './FormInfo/FormInfo';
import GoBelow from './GoBelow/GoBelow';
import Info from './Info/Info';
import NavBar from './NavBar/NavBar';
import Title from './Title/Title';
import logoImg from "../images/logo_.jpg";

interface IMainPage {}

const infoItems = [
    "A short summary of the paper",
    "A list of related literature",
    "A set of recommended journals for publication",
    "A forecast of citations",
    "An index of paper novelty",
]

const mainHeaderContent = (
    <div className="navContainer_logo">
      <span className="greyColor">Peer</span>
      <span className="yellowColor">Reviewer</span>
      <span className="greyColor">.AI</span>
      <span className="navContainer_logoIcon">
        <img src={logoImg} alt="logo" />
      </span>
    </div>
  )

const onClickMailtoHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.href = `mailto:${process.env.REACT_APP_MAILTO_EMAIL}`
}

const MainPage: React.FC<IMainPage> = () => {
    return(
        <>
            <NavBar text={'Contact'} children={mainHeaderContent} linkHref={'javascript:void(0)'} onClickMail={onClickMailtoHandler}/>
            <Title mainText={'A digital peer reviewer'} subText={'For authors, editors and reviewers'}/>
            <GoBelow text={'Try it for free'} href={'#goToForm'}/>
            <Info title={"Evaluate a paper's contribution in the blink of an eye"} subTitle={'Obtain:'} items={infoItems}/>
            <FormInfo id={'goToForm'}/>
        </>
    )
}

export default MainPage;