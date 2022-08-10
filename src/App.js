import { useState } from "react"
import { Routes, Route } from "react-router"
import Graphs from "./components/views/graphs/graphs"
import Home from "./components/views/home/home"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graphs" element={<Graphs />} />
        </Routes>
    )
}

export default App
