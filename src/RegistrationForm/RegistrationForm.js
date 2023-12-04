import './RegistrationForm.css';
import request from '../services/request';
import Spinner from '../Spinner/Loading';
import { useState, useEffect } from 'react';
import setOptions from '../services/serverApi';
import Button from '../Button/Button';
import validation from './validation';
export default function RegistrationForm(props) {
    const { token, setRegistraion } = props;
    const [load, setLoad] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState();
    const { url, options } = setOptions({ token, action: "GET/positions" });
    const [activeIdElement, setActiveIdElement] = useState(null);
    const { validateDataInfo, loadImage, setValidateData, validateData, setErrorValidate, validateError } = validation();
    const { email, phone, name, photo } = validateError;
    const [ fieldInput, setFieldInput ] = useState({ name: '', phone: '', email: '' });
    const [disabled, setDisabled] = useState('disabled');
    let renderInfo = null;

    const onChacnge = (e) => { 
        setErrorValidate((prev) => ({ ...prev, [e.target.name]: false }));
        setFieldInput((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    const postData = (e) => {
        e.preventDefault();
        if (!email && !phone && !photo && !name) {
            const { url, options } = setOptions({ token, action: "POST/users", data: validateData });
            request({ url, ...options })
                .then(() => setRegistraion({update: true, problemRegistration: false}))
                .catch(() => setRegistraion({update: false, problemRegistration: true}))
        }
    }
    useEffect(() => {
        if (token) {
            request({ url, ...options })
                .then(resp => {
                    const positions = resp.positions;
                    setLoad(false);
                    setData(positions)
                    setActiveIdElement(positions[0].id);
                    setValidateData((prev) => ({ ...prev, position_id: positions[0].id }))
                })
                .catch(error => setError(error));
        }

    }, [token]);

    useEffect(() => {
        const values = Object.values(validateData);
        if (values.every((el) => el !== '') && !name && !phone && !photo && !email) { 
            setDisabled('');
            return;
        }
        setDisabled('disabled');

    }, [validateData])
    
    if (load) {
        renderInfo = <Spinner />
    } else if (error) {
        renderInfo = error;
    } else {
        renderInfo = <RadioButton
            positions={ data }
            activeIdElement={ activeIdElement }
            setActiveIdElement={ setActiveIdElement }
            setValidateData={ setValidateData }
        />
    }

    return (
        <div className='form-wrapper'>
            <h1 className="registration-slogan">
                Working with POST request
            </h1>
            <div className="main-page__registration-block">
                <form onSubmit={ postData } className="form">
                    <label className={ `form__name-label ${name ? 'error' : ''}`}>
                        <input
                            onChange={onChacnge}
                            onBlur={ validateDataInfo }
                            value={fieldInput.name}
                            required="required"
                            name="name"
                            type="text"
                            className={ `form__input form__name ${name ? 'error' : ''}` }
                            placeholder='Your name'
                        />
                    </label>
                    <label className={`form__email-label ${email ? 'error' : ''}`}>
                        <input
                            onChange={onChacnge}
                            onBlur={ validateDataInfo }
                            value={fieldInput.email}
                            required="required"
                            name="email"
                            type="text"
                            className={ `form__input form__email ${email ? 'error' : ''}` }
                            placeholder='Email'
                        />
                    </label>
                    <label className={ `form__phone-label ${phone ? 'error' : ''}` }>
                    <input
                        onChange={onChacnge}
                        onBlur={ validateDataInfo }
                        value={fieldInput.phone}
                        required="required"
                        name="phone"
                        type="text"
                        className={ `form__input form__phone ${phone ? 'error' : ''}` }
                        placeholder='Phone'
                    />
                    </label>
                    <span className='form__paragraph'>
                        Select your position
                    </span>
                    <div className='form__button-wrapper'>
                        { renderInfo }
                    </div>
                    <div className="form__load-image">
                        <label className={ `form__load-label ${photo ? 'error' : ''}` }>
                            Upload your photo
                            <input type="file"
                                className='form__input form__input-image'
                                placeholder='Upload your photo'
                                onChange={ loadImage }
                            />
                        </label>

                    </div>
                    <Button label="Sign Up" className={disabled} />
                </form>
            </div>
        </div>
    )
}

const RadioButton = (props) => {
    const { positions, activeIdElement, setActiveIdElement, setValidateData } = props;
    return positions.map((el) => {
        const { name, id } = el;
        const setActiveElement = (e) => {
            setActiveIdElement(id);
            setValidateData((prev) => ({ ...prev, position_id: id }))
        }
        return (
            <label className={ `form__radio-button ${activeIdElement === id ? 'active' : ''}` } key={ id }>
                <input
                    onChange={ setActiveElement }
                    checked={ id === activeIdElement ? 'checked' : '' }
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
