import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormField } from '../Field';
import { errors, inputRules } from '../../constants/formValidation';

export const LoginForm = () => {
  const formFiled = {
    email: '',
    password: '',
  };

  const [formData, onSubmitLogin] = useState(formFiled);
  const [error, setError] = useState(formFiled);

  const validateField = (name, value) => {
    const rule = new RegExp(inputRules[name]);

    return rule.test(value) ? '' : errors[name];
  };

  const onHandleChange = (name, value) => {
    const errMsg = validateField(name, value);

    if (errMsg) {
      setError({
        ...error,
        [name]: errMsg,
      });
    } else {
      setError({
        ...error,
        [name]: '',
      });
      onSubmitLogin({
        ...formData,
        [name]: value,
      });
    }
  };

  const checkValidation = () => {
    return Object.keys(error).every((k) => !error[k]) && Object.values(formData).every(Boolean);
  };

  const onHandleLogin = (e) => {
    e.preventDefault();

    // submitLogin(formData);
  };

  return (
    <form className="unreg-user-form">
      <h3 className="form-title">Log in to Sport News</h3>
      <h4 className="form-desc">Sign in with your organizational account</h4>
      <FormField
        label="Email address"
        name="email"
        type="email"
        placeholder="jonhdoe@gmail.com"
        value={formData.email}
        onChangeInput={onHandleChange}
        error={error.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChangeInput={onHandleChange}
        error={error.password}
        intComp={<Link to="/forgot-password" className="internal-link">Forgot password?</Link>}
      />
      <button
        type="submit"
        className="submit-form fill-in-btn"
        onClick={(e) => onHandleLogin(e)}
        disabled={!checkValidation()}
      >Log in
      </button>
    </form>
  );
};
