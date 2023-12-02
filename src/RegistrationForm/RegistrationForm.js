import './RegistrationForm.css';
import getData from '../services/getData';
import Spinner from '../Spinner/Loading';
import { useState, useEffect } from 'react';

export default function RegistrationForm(props) {
    const token = props.token;
    const [load, setLoad] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState();
    let  currentInfo = null;
    const options = {
        token,
        url: "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
    };
    useEffect(() => {
        if (token) {
            getData(options)
                .then(resp => {
                    setLoad(false);
                    setData(resp.positions)
                })
                .catch(error => setError(error));
        }

    }, [token])
    if (load) {
        currentInfo = <Spinner />
        console.log('spinner')
    } else if (error) {
        currentInfo = error;
    } else { 
        currentInfo = <RadioButton positions={ data } />
        console.log('load')
    }
    
    return (
        <div className='form-wrapper'>
            <h1 className="registration-slogan">
                Working with POST request
            </h1>
            <div className="main-page__registration-block">
                <form action="" className="form">
                    <input required="required" type="text" className="form__input form__name" placeholder='Your name' />
                    <input required="required" type="text" className="form__input form__email" placeholder='Email' />
                    <input required="required"  type="text" className="form__input form__phone" placeholder='Phone' />
                    <span className='form__paragraph'>
                        Select your position
                    </span>
                    {currentInfo}
                </form>
            </div>
        </div>
    )
}


const RadioButton = (props) => {
    const positions = props.positions;
    return positions.map((el) => {
        const { name, id } = el;
        return (
            <label className='form__radio-button' key={id}>
                <input
                    type="radio"
                    className="form__radio-item"
                    value={ id }
                />
                <span className='form__position-name'>
                    { name }
                </span>
            </label>
        )
    })

} 