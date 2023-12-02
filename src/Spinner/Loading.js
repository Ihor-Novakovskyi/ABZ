import spinner from '../assets/loading.svg';
import './Loading.css';
export default function Spinner() {
    return (
        <div className='loading-wrapper'>
            <img src={ spinner } /> 
        </div>
    )
 }