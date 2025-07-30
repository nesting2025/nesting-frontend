import '../../styles/css/CustomRadioButton.css';

const CustomRadioButton = ({ label, value, name, checked, onChange }) => {
    return (
        <label className="custom-radio">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className="radio-mark" />
            <span className="label-text">{label}</span>
        </label>
    )
}

export default CustomRadioButton;