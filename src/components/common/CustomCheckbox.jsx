import '../../styles/css/CustomCheckbox.css';

const CustomCheckbox = ({ label, checked, onChange, name, disabled=false, className='' }) => {
    return(
        <label className={`checkbox ${name ?? ''} ${disabled ? "disabled" : ""}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
                disabled={disabled}
             />
            <span className='checkmark' />
            <span className={`checkbox-label ${className}`}>{label}</span>
        </label>
    )
}

export default CustomCheckbox;