import { Link } from "react-router-dom";
import useClients from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Components.css";
const FormUpdate = () => {
  let navigate = useNavigate();
  const { client, handleUpdateClient } = useClients();
  const [newClient, setNewClient] = useState({ ...client });

  const handleOnChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleUpdateClient(newClient);
    navigate("/");
  };
  useEffect(() => {
    if (!client) {
      navigate("/");
    }
  }, []);

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <h1>Adding new client</h1>
      <fieldset>
        <input
          type="text"
          placeholder="Client name..."
          name="nombre"
          defaultValue={client.nombre}
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="E-mail..."
          name="email"
          defaultValue={client.email}
          onChange={handleOnChange}
        />
      </fieldset>
      <div className="inputSubmit">
        <Link to={"/"}>Cancel</Link>
        <input type="submit" value={"Update"} />
      </div>
    </form>
  );
};

export default FormUpdate;
