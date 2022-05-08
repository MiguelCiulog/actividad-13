import { useContext } from "react";
import ClientsContext from "../context/ClientsProvider";


const useClients = () => {
    return useContext(ClientsContext)
}

export default useClients