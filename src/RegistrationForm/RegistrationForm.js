import './RegistrationForm.css';
import fetchData from '../services/fetchData';
import Spinner from '../Spinner/Loading';
import { useState, useEffect } from 'react';
import setOptions from '../services/serverApi';
import regularExpression from './regularExp';
import Button from '../Button/Button';
export default function RegistrationForm(props) {
    const { token, setRegistraion } = props;
    const [load, setLoad] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState();
    const { url, options } = setOptions({ token, action: "GET/positions" });
    const [activeIdElement, setActiveIdElement] = useState(null);
    const [validateData, setValidateData] = useState({ email: '', phone: '', name: '', photo: '', position_id: '' });
    const [{ email, phone, name, photo }, setErrorValidate] = useState({ email: false, phone: false, name: false, photo: false });
    const [disabled, setDisabled] = useState('disabled');
    let renderInfo = null;
    console.log(validateData, { email, phone, name, photo })

    const loadImage = (e) => {
        const file = e.target.files[0];
        const sizeBytes = file.size;
        if (sizeBytes <= 5 * 1024 * 1024) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = (e) => {
                const widthImage = e.target.width;
                const heightImage = e.target.height;
                console.log(widthImage, heightImage)
                if (widthImage === 70 && heightImage === 70) {
                    setValidateData((prev) => ({ ...prev, photo: file }));
                    setErrorValidate((prevValidate) => ({ ...prevValidate, photo: false }))
                    return
                }
                setErrorValidate((prevValidate) => ({ ...prevValidate, photo: true }))
            };
            return;
        }
        setErrorValidate((prevValidate) => ({ ...prevValidate, photo: true }))
    }
    const validateDataInfo = (e) => {
        const field = e.target;
        const data = field.value;
        const name = field.name;
        switch (name) {
            case 'name':
                if (data.length > 2 && data.length <= 60) {
                    setValidateData((prev) => ({ ...prev, name: data }));
                    setErrorValidate((prevValidate) => ({ ...prevValidate, name: false }))
                    return
                }
                setErrorValidate((prevValidate) => ({ ...prevValidate, name: true }))
                return
            case 'email':
                const { regExpEmail } = regularExpression;
                const resultEmail = regExpEmail.test(data.toLowerCase());
                setValidateData((prev) => ({ ...prev, email: resultEmail ? data : '' }));
                setErrorValidate((prevValidate) => ({ ...prevValidate, email: resultEmail ? false : true }))
                return;
            case 'phone':
                const { regExpPhone } = regularExpression;
                const resultPhone = regExpPhone.test(data)
                setValidateData((prev) => ({ ...prev, phone: resultPhone ? data : '' }));
                setErrorValidate((prevValidate) => ({ ...prevValidate, phone: resultPhone ? false : true }))
                return;
        }


    }
    const postData = (e) => {
        e.preventDefault();
        if (!email && !phone && !photo && !name) {
            const { url, options } = setOptions({ token, action: "POST/users", data: validateData });
            fetchData({ url, ...options })
                .then(() => setRegistraion({update: true, problemRegistration: false}))
                .catch(() => setRegistraion({update: false, problemRegistration: true}))
        }
    }
    useEffect(() => {
        if (token) {
            fetchData({ url, ...options })
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
                            onBlur={ validateDataInfo }
                            required="required"
                            name="name"
                            type="text"
                            className={ `form__input form__name ${name ? 'error' : ''}` }
                            placeholder='Your name'
                        />
                    </label>
                    <label className={`form__email-label ${email ? 'error' : ''}`}>
                        <input
                            onBlur={ validateDataInfo }
                            required="required"
                            name="email"
                            type="text"
                            className={ `form__input form__email ${email ? 'error' : ''}` }
                            placeholder='Email'
                        />
                    </label>
                    <label className={ `form__phone-label ${phone ? 'error' : ''}` }>
                    <input
                        onBlur={ validateDataInfo }
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