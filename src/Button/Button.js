import './Button.css'
export default function Button(props) {
    const { label, href, className, actionClick = null } = props;
    return (
        <a href={ href } onClick={actionClick}>
            <div className={ `button ${className}` }>
                { label }
            </div>
        </a>
    )
}