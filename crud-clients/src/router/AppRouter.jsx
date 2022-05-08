import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Master from "../pages/Master"
import Main from "../pages/Main"
import Update from "../pages/Update"
import Add from "../pages/Add"

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Master />}>
                    <Route index element={<Main />} />
                    <Route path="add" element={<Add />} />
                    <Route path="update" element={<Update />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter