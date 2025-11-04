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
import { Trends } from "./view/Trends"
import { Notice } from "./view/Notice"
import Chat from "./view/Chat"
import ChatZoom from "./view/ChatZoom"

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
                        <Route path="/trends" element={<Trends />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chatzoom/:id" element={<ChatZoom />} />
                        <Route path="/notfound" element={<NotFound />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
