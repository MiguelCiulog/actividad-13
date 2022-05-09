import "./Components.css";
import Close from "../img/close.svg";
import useClients from "../hooks/useClients";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  let navigate = useNavigate();
  const { handleOnChangeModal, handleSetCurrentClient, handleDeleteClient } =
    useClients();
  const handleToggle = () => {
    handleOnChangeModal();
    handleSetCurrentClient(null);
  };

  const goToUpdate = () => {
    handleOnChangeModal();
    navigate("/update");
  };

  return (
    <div className="modal-area">
      <div className="modal-card">
        <div className="closeButton">
          <img src={Close} alt="close" onClick={handleToggle} />
        </div>
        <h1>You want to do?</h1>
        <div className="modal-option">
          <button className="delete" onClick={() => handleDeleteClient()}>
            Delete
          </button>
          <button className="update" onClick={goToUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
