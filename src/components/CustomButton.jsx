import '../styles/css/CustomButton.css';

const CustomButton = ({ text, className="" }) => {
    return (
        <button className={`custom-button ${className}`}>
            {text}
        </button>
    )
}

export default CustomButton;