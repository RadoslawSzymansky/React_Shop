import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


const HistoryToast = ({
  product: {
    name, img, purchasedCount, date,
  },
}) => (
  <Toast>
    <ToastHeader>
      {name}
    </ToastHeader>
    <ToastBody>
      <div className="row">
        <div className="col-4">
          <img className="img-thumbnail" src={img} alt="product" />
        </div>
        <div className="col-7">
          <p>
            <Translate id="youBought" />
            <span className="text-info">{purchasedCount}</span>
            <Translate id="pieces" />
            <br />
            <Translate id="on" />
            <span className="text-info">{date.slice(0, 10)}</span>
          </p>
        </div>
      </div>
    </ToastBody>
  </Toast>
);


HistoryToast.propTypes = {
  product: PropTypes.object.isRequired,
};

export default HistoryToast;
