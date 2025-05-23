import '../styles/css/CustomButton.css';

const CustomButton = ({ text, className="", isValid=false }) => {
    return (
        <button 
            className={`custom-button ${className}  ${isValid ? 'isValid' : ''}`}
            isValid={isValid}>
            {text}
        </button>
    )
}

export default CustomButton;