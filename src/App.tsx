// 根组件

import { Bar } from "./component/Bar"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Lastest } from "./view/Lastest"
import { Login } from "./view/Login"
import { NotFound } from "./view/NotFound"
import { UserZoom } from "./view/UserZoom"
import { Add } from "./view/Add"
import { About } from "./view/About"
import { Artwork } from "./view/Artwork"
import { Gallery } from "./view/Gallery"
import { Garden } from "./view/Garden"
import { Tag } from "./view/Tag"
import { PinkCandy } from "./view/PinkCandy"
import { Plantpot } from "./view/Plantpot"
import { MyZoom } from "./view/MyZoom"
import { Trends } from "./view/Trends"
import { Notice } from "./view/Notice"

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
                        <Route path="/garden" element={<Garden />} />
                        <Route path="/tag" element={<Tag />} />
                        <Route path="/lastest" element={<Lastest />} />
                        <Route path="/plantpot/:id" element={<Plantpot />} />
                        <Route path="/trends" element={<Trends />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
