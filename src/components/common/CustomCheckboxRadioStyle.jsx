import '../../styles/css/CustomRadioButton.css';

const CustomCheckboxnRadioStyle = ({ label, checked, onChange, className }) => {
    return (
        <label className={`custom-radio ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="radio-mark" />
            <span className="label-text">{label}</span>
        </label>
    )
}

export default CustomCheckboxnRadioStyle;