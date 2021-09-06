import PropTypes from 'prop-types'
const Button = ({ color, text, handleClick }) => {

    return (
        <button onClick={handleClick} className="btn" style={{ backgroundColor: color }}>{text}</button>
    );
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;