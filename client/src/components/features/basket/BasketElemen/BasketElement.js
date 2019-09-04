import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './BasketElement.scss';

const BasketElement = (
  {fetchProduct, basketProducts, basketAction, isAuthenticated, removeProduct, product: { productId, count }}
) => {

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  const renderContent = () => {

    if(basketProducts[productId]) {
      const { name, description, img, price, instore } = basketProducts[productId];
      return (
        <div className="basket-element">
          <div className="row">
            <div className="col-12 col-sm-8">
              <div className="row">
                <div className="col-3">
                  <div className="img-wrapper">
                    <img src={img} alt="product" className="product-image" />
                  </div>
                </div>
                <div className="col-9 prodcut-data">
                  <div className='title'><span className='name'>{name}</span> <span className="price">${price}</span></div>
                  <p className="product-description d-none d-md-block">{description}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="row product-actions">
                <div className="col-6 col-sm-12">
                  <div className="price-count">
                    <div className="count">
                      <button className="product-action" 
                        disabled={count <= 1 }
                        onClick={() =>{
                          basketAction({
                            count: count - 1,
                            productId
                          });
                        }} >-</button>
                      <span className="count-info">{count}</span>
                      <button className="product-action" 
                        disabled={count >= instore}
                        onClick={() =>{
                          basketAction({
                            count: count + 1,
                            productId
                          });
                        }} >+</button>
                      pcs
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-12">
                  <div className="product-delete">
                    <span onClick={() => removeProduct(productId)} className="delete-action">delete product</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return renderContent();
};

BasketElement.propTypes = {
  product: PropTypes.object.isRequired,
  fetchProduct: PropTypes.func.isRequired
};

export default BasketElement;
