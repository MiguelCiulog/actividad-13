import Client from "./Client";

import "./Components.css";
const PanelClients = (props) => {
  const { clients } = props;
  const newClients = clients.reverse();
  return (
    <div className="panleClients">
      {clients.map((client, index) => (
        <Client key={index} client={client} />
      ))}
    </div>
  );
};

export default PanelClients;
