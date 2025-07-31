import '../../styles/css/CustomCheckbox.css';

const CustomCheckbox = ({ label, checked, onChange, name, disabled=false }) => {
    return(
        <label className={`checkbox ${name}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
                disabled={disabled}
             />
            <span className='checkmark' />
            {label}
        </label>
    )
}

export default CustomCheckbox;