import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterConfirmModal = ({ onClose, isOpen, onLogin }) => {
  return (
    <ModalWithForm
      title="Registration Successfully completed"
      onClose={onClose}
      isOpen={isOpen}
      redirectText="Sign in"
      onRedirect={onLogin}
      onSubmit={null}
    ></ModalWithForm>
  );
};

export default RegisterConfirmModal;
