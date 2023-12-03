import './Button.css'
export default function Button(props) {
    const { label, href, className, onClick = null } = props;
    return (
        <a href={ href } onClick={onClick}>
            <button className={ `button ${className}` } disabled={className === 'disabled'? true : false}>
                { label }
            </button>
        </a>
    )
}