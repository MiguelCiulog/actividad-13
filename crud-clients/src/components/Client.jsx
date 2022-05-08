import useClients from "../hooks/useClients";

import "./Components.css";
const Client = (props) => {
  const { client } = props;
  const { handleSetCurrentClient, handleOnChangeModal } = useClients();
  let { nombre, email, fechaNacimiento } = client;

  const handleOnClick = () => {
    handleSetCurrentClient(client);
    handleOnChangeModal();
  };

  return (
    <div className="clientCard" onClick={handleOnClick}>
      <p>
        Nombre: <span className="spanStyle">{nombre}</span>
      </p>
      <p>
        Email: <span className="spanStyle">{email}</span>
      </p>
      <p>
        Fecha de nacimiento:{" "}
        <span className="spanStyle">{fechaNacimiento}</span>
      </p>
    </div>
  );
};

export default Client;
