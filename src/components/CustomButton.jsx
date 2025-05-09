import '../styles/css/CustomButton.css';

const CustomButton = ({ text, className="", disabled=false }) => {
    return (
        <button 
            className={`custom-button ${className}  ${disabled ? 'disabled' : ''}`}
            disabled={disabled}>
            {text}
        </button>
    )
}

export default CustomButton;