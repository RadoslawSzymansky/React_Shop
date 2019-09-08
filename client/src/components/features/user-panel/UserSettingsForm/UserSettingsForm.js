/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert,
} from 'reactstrap';

const UserSettingsForm = ({
  changeName, changeEmail, changePassword, type, buttonLabel,
}) => {
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState('');
  const toggle = () => setModal(!modal);

  const [form, setForm] = useState({
    name: '', email: '', oldPassword: '', newPassword: '', confirmPassword: '',
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const clearAlert = () => setTimeout(() => setAlert(''), 1500);

  const {
    name, email, newPassword, oldPassword, confirmPassword,
  } = form;

  const onSubmit = (e) => {
    e.preventDefault();

    if (type === 'password') {
      if (alert) return;

      if (!oldPassword || !newPassword || !confirmPassword) {
        setAlert('Old fields required!');
        return clearAlert();
      }

      if (newPassword.length < 5) {
        setAlert('Password min length is 5!');
        return clearAlert();
      }

      if (newPassword !== confirmPassword) {
        setAlert('Passwords are not equal!');
        return clearAlert();
      }

      changePassword(form);
    }

    if (type === 'name') {
      if (!name) {
        setAlert('Field name required!');
        return clearAlert();
      }

      if (name.length < 4) {
        setAlert('Name min length is 4!');
        return clearAlert();
      }

      changeName(form);
    }

    if (type === 'email') {
      if (!email) {
        setAlert('Email is required!');
        return clearAlert();
      }

      changeEmail(form);
    }
    setModal(false);
  };

  return (
    <div>
      <Button outline onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
        <ModalBody>

          <Form onSubmit={onSubmit}>

            {type === 'email' ? (
              <FormGroup>
                <Label for="email">New Email</Label>
                <Input
                  onChange={onChange}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                />
              </FormGroup>
            ) : null}

            {type === 'name' ? (
              <FormGroup>
                <Label for="name">New Name</Label>
                <Input
                  onChange={onChange}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                />
              </FormGroup>
            ) : null}

            {type === 'password' ? (
              <>
                <FormGroup>
                  <Label for="oldpassword">Old password</Label>
                  <Input
                    onChange={onChange}
                    value={oldPassword}
                    type="password"
                    name="oldPassword"
                    id="oldassword"
                    placeholder="Place your old password"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">New Password</Label>
                  <Input
                    onChange={onChange}
                    value={newPassword}
                    type="password"
                    name="newPassword"
                    id="examplePassword"
                    placeholder="password placeholder"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    onChange={onChange}
                    value={form.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="password
                    placeholder"
                  />
                </FormGroup>

              </>
            ) : null}

            <Button color="primary">Change</Button>
          </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        <div>
          {alert ? <Alert color="danger">{alert}</Alert> : null}
        </div>
      </Modal>
    </div>
  );
};

UserSettingsForm.propTypes = {
  changeName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default UserSettingsForm;
