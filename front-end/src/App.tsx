// 根组件

import { Bar } from "./component/Bar"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Login } from "./view/Login"
import { NotFound } from "./view/NotFound"
import { UserZoom } from "./view/UserZoom"
import { Add } from "./view/Add"
import { About } from "./view/About"
import { Artwork } from "./view/Artwork"
import { Gallery } from "./view/Gallery"
import { Tag } from "./view/Tag"
import { PinkCandy } from "./view/PinkCandy"
import { MyZoom } from "./view/MyZoom"
import { Notice } from "./view/Notice"
import { Board } from "./view/Board"

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
                        <Route path="/" element={<PinkCandy />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/myzoom" element={<MyZoom />} />
                        <Route path="/notice" element={<Notice />} />
                        <Route path="/user/:username" element={<UserZoom />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/artwork/:id" element={<Artwork />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/tag" element={<Tag />} />
                        <Route path="/board" element={<Board />} />
                        <Route path="/notfound" element={<NotFound />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
