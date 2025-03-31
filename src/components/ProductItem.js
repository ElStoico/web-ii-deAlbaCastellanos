export default function ProductItem({ id, title, description, images, price })
{
    return (
        <div className="product-list-item">
            <div className="product-image">
                <img src={images[0]} alt={title} />
            </div>
            <div className="product-details">
                <h4>
                    {title}
                </h4>
                <p>
                    {description}
                </p>
                <p className="precio-p">Precio: ${price}</p>
            </div>
            <a href={`/product/${id}`}>Ver productos</a>
        </div>
    )
}