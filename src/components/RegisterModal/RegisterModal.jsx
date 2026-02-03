import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import RegisterConfirmModal from "../RegisterConfirmModal/RegisterConfirmModal";

const RegisterModal = ({ onClose, isOpen, onLogin, onRegister }) => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formDisabled =
    !values.name ||
    !values.email ||
    !values.password ||
    errors.name ||
    errors.email ||
    errors.password;

  const handleChange = (e) => {
    const { name, value, validity } = e.target;

    setValues((v) => ({ ...v, [name]: value }));

    let error = "";

    if (name === "email" && validity.typeMismatch) {
      error = "This email is not available";
    }

    setErrors((e) => ({ ...e, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");

    onRegister({
      ...values,
      setError: setApiError,
    })
      .then(() => {
        setShowConfirmModal(true);
      })
      .catch(console.error);
  };

  const handleConfirmClose = () => {
    setShowConfirmModal(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setValues({ name: "", email: "", password: "" });
      setErrors({ name: "", email: "", password: "" });
      setApiError("");
      setShowConfirmModal(false);
    }
  }, [isOpen]);

  return (
    <>
      <ModalWithForm
        title="Sign Up"
        buttonText="Sign Up"
        onClose={onClose}
        isOpen={isOpen && !showConfirmModal}
        onSubmit={handleSubmit}
        redirectText="or Log in"
        onRedirect={onLogin}
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
            className="modal__input"
          />
        </label>

        <label className="modal__label">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={values.password}
            onChange={handleChange}
            className="modal__input"
          />
        </label>

        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={values.name}
            onChange={handleChange}
            className="modal__input"
          />
        </label>
        <span className="modal__server-error">{errors.email}</span>
      </ModalWithForm>

      <RegisterConfirmModal
        onClose={handleConfirmClose}
        isOpen={showConfirmModal}
        onLogin={onLogin}
      />
    </>
  );
};

export default RegisterModal;
