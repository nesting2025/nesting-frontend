import '../../styles/css/CustomCheckbox.css';

const CustomCheckbox = ({ label, checked, onChange, name}) => {
    return(
        <label className={`checkbox ${name}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
             />
            <span className='checkmark' />
            {label}
        </label>
    )
}

export default CustomCheckbox;