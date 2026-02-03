import "./Profile.css";
import close from "../../assets/images/X.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({ isOpen, onClose }) {
  const { currentUser, onLogout } = useContext(CurrentUserContext);

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content_profile">
        <button className="modal__close" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <div className="profile">
          <button className="profile__logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
