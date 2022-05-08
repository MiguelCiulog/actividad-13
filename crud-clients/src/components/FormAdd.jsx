import { Link, useNavigate } from "react-router-dom";
import "./Components.css";
import { useState } from "react";
import useClients from "../hooks/useClients";

const FormAdd = () => {
  let navigate = useNavigate();
  const [client, setClient] = useState({});
  const { handleInsert } = useClients();
  const [added, setAdded] = useState(false);

  const handleOnChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInsert(client);
    setAdded(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {added ? <p>Agregado</p> : null}
      <h1>Update client</h1>
      <fieldset>
        <input
          type="text"
          placeholder="Client name..."
          name="nombre"
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="E-mail..."
          name="email"
          onChange={handleOnChange}
        />
        <input type="date" name="fecha_nacimiento" onChange={handleOnChange} />
      </fieldset>
      <div className="inputSubmit">
        <Link to={"/"}>Cancel</Link>
        <input type="submit" value="Create" />
      </div>
    </form>
  );
};

export default FormAdd;
