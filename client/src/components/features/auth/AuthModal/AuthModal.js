import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Col, Alert,
} from 'reactstrap';

const AuthModal = ({
  sendFormData, type, toggleModal, isOpen,
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState([]);

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitForm = async (e) => {
    e.preventDefault();

    if (type === 'register' && name.length < 4) await setErrors((p) => [...p, 'Name cannott be shorter than 4']);
    if (!email.includes('@')) await setErrors((p) => [...p, 'Input valid email adress']);
    if (password.length < 5) await setErrors((p) => [...p, 'Password must contains at least 5 characters']);
    setTimeout(() => setErrors([]), 2000);
    if (type === 'register' && name.length > 4 && email.includes('@') && password.length >= 5) {
      sendFormData(formData);
    } else if (type === 'login' && email.includes('@') && password.length >= 5) {
      sendFormData(formData);
    }
  };

  return (
    <>
      <Button outline color="info" onClick={() => toggleModal()}>{type === 'login' ? 'Login' : 'Register'}</Button>
      <Modal isOpen={isOpen} toggle={() => toggleModal()} style={{ marginTop: 250 }}>
        <ModalHeader toggle={() => toggleModal()}>{type === 'login' ? 'Login to your account' : 'Create a new account'}</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => submitForm(e)}>
            { type === 'login' ? '' : (
              <FormGroup row>
                <Label for="userName" sm={2}>Name</Label>
                <Col sm={10}>
                  <Input value={name} onChange={(e) => onChange(e)} type="text" name="name" id="userName" placeholder="Add your name" />
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Email</Label>
              <Col sm={10}>
                <Input value={email} onChange={(e) => onChange(e)} type="email" name="email" id="exampleEmail" placeholder="eg. user123@gmail.com" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>Password</Label>
              <Col sm={10}>
                <Input value={password} onChange={(e) => onChange(e)} type="password" name="password" id="examplePassword" placeholder="password" />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>{type === 'login' ? 'Login' : 'Create'}</Button>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col style={{ marginTop: 15 }}>
                {errors.length ? errors.map((e) => <Alert color="danger">{e}</Alert>) : ''}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

AuthModal.propTypes = {
  sendFormData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AuthModal;
