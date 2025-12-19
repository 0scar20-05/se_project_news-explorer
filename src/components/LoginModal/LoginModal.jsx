import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({ onClose, isOpen, onRegister, onLogin }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");

  const formDisabled =
    !values.email || !values.password || errors.email || errors.password;

  const handleChange = (e) => {
    const { name, value, validity } = e.target;

    setValues((v) => ({ ...v, [name]: value }));

    let error = "";

    if (name === "email") {
      if (validity.valueMissing) {
        error = "Email is required";
      } else if (validity.typeMismatch) {
        error = "Invalid email address";
      }
    }

    setErrors((e) => ({ ...e, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");
    onLogin({ ...values, setError: setApiError });
  };

  useEffect(() => {
    if (!isOpen) {
      setValues({ email: "", password: "" });
      setErrors({ email: "", password: "" });
      setApiError("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      redirectText="or Sign up"
      onRedirect={onRegister}
      disabled={formDisabled}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
          className={`modal__input ${
            errors.email && "modal__input_type_error"
          }`}
        />
      </label>
      <span className="modal__client-error">{errors.email}</span>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
          className={`modal__input ${
            errors.password && "modal__input_type_error"
          }`}
        />
      </label>
      <span className="modal__error">{errors.password}</span>
    </ModalWithForm>
  );
};

export default LoginModal;
