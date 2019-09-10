import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input, Alert, Col,
} from 'reactstrap';
import RateStars from '../RateStars/RateStars';

const RateForm = ({
  sendForm, type, productId, opinionId, closeForm,
}) => {
  const [formData, setFormData] = useState({
    rate: 0,
    name: '',
    text: '',
  });

  const { rate, name, text } = formData;

  const [error, setError] = useState('');

  useEffect(() => {
    if (error) setTimeout(() => setError(''), 1800);
  }, [error]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // eslint-disable-next-line consistent-return
  const onSubmit = (e) => {
    e.preventDefault();

    if (rate <= 0) {
      return setError('You must rate product');
    }

    if (!name || !text) {
      return setError('All fields required');
    }

    if (text.length < 5) {
      return setError('Text length min is 4');
    }

    if (name && text && text.length > 4) {
      closeForm();
      return sendForm(formData, productId, opinionId);
    }
  };

  return (
    <div className="rate-form">
      <Form onSubmit={onSubmit}>
        {type === 'comment' ? '' : (
          <FormGroup row>
            <Label sm={2}>Rate</Label>
            <Col sm={10}>
              <RateStars
                rate={rate}
                setRate={(rate) => {
                  setFormData({ ...formData, rate });
                }}
              />
            </Col>
          </FormGroup>
        )}
        <FormGroup row>
          <Label sm={2} for="text">{type === 'comment' ? 'Comment' : 'Opinion'}</Label>
          <Col sm={10}>
            <Input value={text} sm={10} type="textarea" name="text" id="text" onChange={(e) => onChange(e)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="username">Name</Label>
          <Col sm={10}>
            <Input value={name} sm={4} type="text" name="name" id="username" onChange={(e) => onChange(e)} />
          </Col>
        </FormGroup>
        <Button className="mb-3">{type === 'comment' ? 'Add comment' : 'Add opinion'}</Button>
        {error ? <Alert color="danger">{error}</Alert> : null}
      </Form>
    </div>
  );
};

RateForm.propTypes = {
  sendForm: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  opinionId: PropTypes.string,
  closeForm: PropTypes.func.isRequired,
};

export default RateForm;
