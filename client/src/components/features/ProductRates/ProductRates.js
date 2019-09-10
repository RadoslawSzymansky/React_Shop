/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowDown, FaArrowUp } from 'react-icons/all';
import { withRouter } from 'react-router-dom';
import RateForm from '../../common/RateForm/RateForm';
import OpinionsList from '../OpinionsList/OpinionList';

import './ProductRates.scss';

const ProductRates = ({
  isAuthenticated, product, fetchProduct, setAlert, match, toggleLogin, addOpinion,
}) => {
  useEffect(() => {
    fetchProduct(match.params.id);
  }, []);

  const [isOpinionForm, setOpinionForm] = useState(false);
  const [isOpinionsOpen, setOpinionsOpen] = useState(false);

  const openForm = () => {
    if (!isAuthenticated) {
      setAlert('Login to add opinion');
      return toggleLogin();
    }
    return setOpinionForm(!isOpinionForm);
  };

  return (
    <>
      {
        product !== null ? (
          <div className="product-rates">
            <div className="actions">
              <button onClick={openForm} type="button" className="action">
                {isOpinionForm ? <FaArrowUp /> : <FaArrowDown />}
                {' '}
                Add opinion
              </button>
              <button type="button" className="action" onClick={() => setOpinionsOpen(!isOpinionsOpen)}>
                Show opinions (
                {product.rates.length}
                )
                {' '}
                {isOpinionsOpen ? <FaArrowUp /> : <FaArrowDown />}
              </button>
            </div>
            <div className="content">
              {isOpinionForm
                ? (
                  <RateForm
                    sendForm={addOpinion}
                    productId={product._id}
                    closeForm={() => { setOpinionForm(false); }}
                  />
                )
                : null}
            </div>
            {isOpinionsOpen ? <OpinionsList opinions={product.rates} /> : null}
          </div>
        ) : ''
      }
    </>
  );
};

ProductRates.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  addOpinion: PropTypes.func.isRequired,
};

export default withRouter(ProductRates);
