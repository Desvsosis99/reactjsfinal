import { Link } from "react-router-dom"

const Item = ({ id, name, imageUrl, price}) => {

    const handleClick = (e) => {
        e.stopPropagation()
        console.log('hice click en item')
    }

    return (
        <div onClick={handleClick}>
            <h2>{name}</h2>
            <img src={imageUrl} style={{ width: 100}}/>
            <h3>Precio: S/. {price}</h3>
            <Link to={`/item/${id}`}>ver detalle</Link>
        </div>
    )
}

export default Item