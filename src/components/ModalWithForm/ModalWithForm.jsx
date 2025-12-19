import "./ModalWithForm.css";
import close from "../../assets/images/X.svg";

function ModalWithForm({
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  redirectText,
  onRedirect,
  onSubmit,
  disabled = false,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    if (onSubmit) {
      onSubmit(evt);
    } else {
      onClose();
    }
  }

  const parts = redirectText?.split(/(Log in|Sign up|Sign in)/i) || [];
  const prefix = parts[0];
  const action = parts[1];

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          {buttonText && (
            <button className="modal__submit" type="submit" disabled={disabled}>
              {buttonText}
            </button>
          )}
          <button
            className="modal__redirect"
            type="button"
            onClick={onRedirect}
          >
            {prefix}
            <span className="modal__redirect-action">{action}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
