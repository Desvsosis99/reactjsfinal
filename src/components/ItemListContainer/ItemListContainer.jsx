import { memo } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/firebase/firestore/products";
import { useAsync } from "../../hooks/useAsync";

const ItemListMemoized = memo(ItemList);

const ItemListContainer = ({ greeting }) => {                               
    const { categoryId } = useParams();
    
    const asyncFunction = () => getProducts(categoryId);
    
    const { data: products, loading, error } = useAsync(asyncFunction, [categoryId]);
    
    if (loading) {
        return <h1>Se están cargando los productos...</h1>;
    }

    if (error) {
        return <h1>Hubo un error al cargar los productos</h1>;
    }

    return (
        <div className="container" style={{ background: 'white'}} onClick={() => console.log('hice click en itemlistcontainer')}>
            <h1>{greeting}</h1>
            <div className="row">
                <ItemListMemoized products={products}/>
            </div>
        </div>
    );
}

export default ItemListContainer;
