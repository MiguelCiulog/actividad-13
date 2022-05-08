

import AppRouter from "./router/AppRouter"

import { ClientsProvider } from "./context/ClientsProvider"

function App() {

  return (
    <ClientsProvider>
      <AppRouter />
    </ClientsProvider>
  )
}

export default App
