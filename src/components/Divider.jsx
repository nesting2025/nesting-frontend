const Divider = ({ screenSize }) => {
    return screenSize === "large" ? <span> | </span> : <br />
}

export default Divider