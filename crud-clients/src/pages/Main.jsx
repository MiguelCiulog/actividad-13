import useClients from "../hooks/useClients"
import { useNavigate } from "react-router-dom";


import PanelClients from "../components/PanelClients"
const Main = () => {
    let navigate = useNavigate();
    const { clients } = useClients();


    const goToNew = () => {
        navigate("/add")
    }
    return (
        <main className="container mainContent">
            <div className="controlls">
                <input type="text" placeholder="Client name..." />
                <button onClick={goToNew}>
                    Add New
                </button>
            </div>
            <PanelClients
                clients={clients}
            />
        </main>
    )
}

export default Main