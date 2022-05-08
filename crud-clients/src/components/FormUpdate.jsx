import { Link } from "react-router-dom";
import useClients from "../hooks/useClients";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./Components.css";
const FormUpdate = () => {
  let navigate = useNavigate();
  const { client } = useClients();

  useEffect(() => {
    if (!client) {
      navigate("/")
    }
  }, [])

  return (
    <form className="form">
      <h1>Adding new client</h1>
      <fieldset>
        <input type="text" placeholder="Client name..." defaultValue={client.nombre} />
        <input type="email" placeholder="E-mail..." defaultValue={client.email} />
        <input type="date" />
      </fieldset>
      <div className="inputSubmit">
        <Link to={"/"}>Cancel</Link>
        <input type="submit" value={"Update"} />
      </div>
    </form>
  )
}

export default FormUpdate