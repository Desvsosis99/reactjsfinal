import { useEffect, useRef } from "react"

const Button = () => {

    const buttonRef = useRef()

    const handleClick = (e) => {
        console.log(e)
    }

    console.log(buttonRef)
    return (
        <button ref={buttonRef} onClick={handleClick}>boton</button>
    )
}

export default Button