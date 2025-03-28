import "../style/product_details.css";
import { useAuthProtection } from './Auth';

const ProductDetails = () => {
  useAuthProtection();
  return (
    <div className="page-container">
      <div className="product-details-page-container">
        <div className="product-image-container">
          <img src="https://www.tasteboutique.com/cdn/shop/products/Refresco_COCA_COLA_ORIGINAL_VIDRIO_NR_235_ML_2048x.png?v=1632771199"></img>
        </div>

        <div className="product-details-container">
          <div className="toast-bar">
            <h6>
              Home <span> - </span> Products <span> - </span> Coke
            </h6>
          </div>
          <div className="product-info">
            <h4>Cocacola de cristal</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="product-highlights">
            <h5>Highlights:</h5>
            <ul>
              <li>Es de crital.</li>
              <li>Sabe bien.</li>
              <li>Reusable.</li>
            </ul>
          </div>
          <div className="product-specifications">
            <table>
              <tr>
                <th>Color</th>
                <th>Size</th>
              </tr>
              <tr>
                <td>Coca</td>
                <td>30</td>
              </tr>
            </table>
            <h5>$16.00</h5>
          </div>
          <div className="product-buttons">
            <button>Add to cart</button>
            <button>❤️ Add to wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
