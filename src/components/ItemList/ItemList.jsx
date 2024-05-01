import Item from "../Item/Item";

const ItemList = ({ products }) => {
    return (
        <div className="container">
            <div className="row" onClick={() => console.log('hice click en itemlist')}>
                {products?.map(product => (
                    <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                        <Item {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemList;
