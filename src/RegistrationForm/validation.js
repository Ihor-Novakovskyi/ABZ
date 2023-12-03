import regularExpression from "./regularExp";
import { useState } from "react";
export default function () { 
    const [validateData, setValidateData] = useState({ email: '', phone: '', name: '', photo: '', position_id: '' });
    const [validateError, setErrorValidate] = useState({ email: false, phone: false, name: false, photo: false });
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
    const loadImage = (e) => {
        const file = e.target.files[0];
        const sizeBytes = file.size;
        if (sizeBytes <= 5 * 1024 * 1024) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = (e) => {
                const widthImage = e.target.width;
                const heightImage = e.target.height;
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
    return {
        validateDataInfo,
        loadImage,
        setValidateData,
        validateData,
        setErrorValidate,
        validateError
    }
}
