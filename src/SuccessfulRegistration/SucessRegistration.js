import './SucessRegistration.css';
import sucess from '../assets/success-image.svg';
export default function SucessRegistration() { 
    return (
        <div className="main-page__registration">
            <h1 className="main-page__slogan-sucess">
                User successfully registered
            </h1>
            <div className="main-page__registraion-sucess-image">
                <img src={sucess} alt="sucess" className="main-page__image-item" />
            </div>
        </div>
    )
} 