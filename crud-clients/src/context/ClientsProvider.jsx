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
      const newData = data.map((clientItem) => {
        const newClient = { ...clientItem };
        const fecha = new Date(newClient.fechaNacimiento);
        newClient.fechaNacimiento = fecha.toDateString();
        return newClient;
      });
      setClients(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const queryApiInsert = async (client) => {
    try {
      client.fechaNacimiento = new Date();
      const response = await axios.post(
        "http://localhost:8080/clientes",
        client
      );
      const newClient = {
        email: client.email,
        fechaNacimiento: client.fechaNacimiento.toDateString(),
        nombre: client.nombre,
      };
      setClients([newClient, ...clients]);
    } catch (error) {
      console.log(error);
    }
  };

  const queryApiDelete = async (clientDelete) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/clientes/${clientDelete.email}`
      );
      const newClients = clients.filter(
        (clientItem) => clientItem.email !== clientDelete.email
      );
      setClients(newClients);
      handleOnChangeModal();
    } catch (error) {}
  };

  const queryAPiUpdate = async (clientUpdate) => {
    try {
      clientUpdate.fechaNacimiento = new Date();
      console.log(client.email);
      console.log(clientUpdate.email);
      const response = await axios.put(
        `http://localhost:8080/clientes/${client.email}`,
        clientUpdate
      );

      const newClients = clients.map((clientItem) =>
        clientItem.email === client.email ? clientUpdate : clientItem
      );
      setClients(newClients);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInsert = (client) => {
    queryApiInsert(client);
  };
  const handleDeleteClient = () => {
    queryApiDelete(client);
  };
  const handleUpdateClient = (clientUpate) => {
    queryAPiUpdate(clientUpate);
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
        handleDeleteClient,
        handleUpdateClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export { ClientsProvider };

export default ClientsContext;
