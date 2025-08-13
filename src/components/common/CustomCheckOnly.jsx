import "../../styles/css/CustomCheckOnly.css";

const CustomCheckOnly = ({ label, checked, onChange, name, disabled = false, className = '' }) => {
    return (
        <label className={`checkbox-only ${name ?? ''} ${disabled ? "disabled" : ""}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
                disabled={disabled}
            />
            <span className="checkmark-only" />
            <span className={`checkbox-label ${className}`}>{label}</span>
        </label>
    )
}

export default CustomCheckOnly;