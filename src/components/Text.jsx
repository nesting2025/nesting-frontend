import React from "react";
import { font } from '../theme'

const Text = ({typography, children}) => {
    const style = font[typography] || font.body1

    return <span style={style}>{children}</span>
}

export default Text

