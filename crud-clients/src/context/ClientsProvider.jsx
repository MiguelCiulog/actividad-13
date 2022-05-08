import { useState, useEffect, createContext } from "react";
import axios from "axios";

const ClientsContext = createContext();

const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [modal, setModal] = useState(false);

  const handleSetCurrentClient = (client) => {
    setClient(client);
  };

  const handleOnChangeModal = () => {
    setModal(!modal);
  };

  const queryApiGetAll = async () => {
    try {
      const response = await axios.get("http://localhost:8080/clientes");
      const { data } = response;
      setClients(data);
    } catch (error) {}
  };

  const queryApiInsert = async (client) => {
    try {
      client.fecha_nacimiento = new Date(client.fecha_nacimiento);
      const response = await axios.post(
        "http://localhost:8080/clientes",
        client
      );

      const { data } = response;
      setClients([...clients, data]);
    } catch (error) {}
  };

  const handleInsert = (client) => {
    queryApiInsert(client);
  };

  useEffect(() => {
    queryApiGetAll();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        clients,
        client,
        modal,
        handleSetCurrentClient,
        handleOnChangeModal,
        handleInsert,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export { ClientsProvider };

export default ClientsContext;
