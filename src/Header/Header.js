import './Header.css';
import logo from '../assets/Logo.svg';
import Button from '../Button/Button';
export default function Header() { 
    return (
        <>
            <div className="main-page__header">
                <div className="logo">
                    <img src={logo} alt="logo" className="logo__item" />
                </div>
                <div className="header-button__wrapper">
                <Button label="Users" href='/' ></Button>
                <Button label="Sign Up" href='/'></Button>
                </div>
            </div>
            <div className="main-page__information-block">
                <h1 className="main-page__slogan">
                    Test assignment for 
                    front-end developer
                </h1>
                <p className="main-page__main-text">
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <a href="/">
                    <div className="button main-page__header-button">
                        Sign Up
                    </div>
                </a>
            </div>
        </>
    )
} 