// 根组件

import { Bar } from "./component/Bar"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Home } from "./view/Home"
import { Login } from "./view/Login"
import { NotFound } from "./view/NotFound"
import { User } from "./view/User"
import { Add } from "./view/Add"
import { About } from "./view/About"

function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={
                        <>
                            <Bar />
                            <Outlet />
                        </>
                    }>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/about" element={<About /> }/>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
