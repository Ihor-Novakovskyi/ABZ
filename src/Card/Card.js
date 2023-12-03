import './Card.css';
import emptyPhoto from '../assets/disable-image.svg'
export default function Card(props) { 
    let { id, name, email, phone, position, photo = null } = props;
    photo = !!photo ? photo : emptyPhoto;
    return (
        <div className="card" data-id={id}>
            <div className="card__user-image">
                <img src={photo} alt="" className="card__image-item" />
            </div>
            <span className="card__user-name">
                {name}
            </span>
            <div className="card__user-information">
                <p className="card__user-item">
                    {position}
                </p>
                <p className="card__user-item">
                    {email}
                </p>
                <p className="card__user-item">
                    {phone}
                </p>
            </div>
        </div>
    )
}