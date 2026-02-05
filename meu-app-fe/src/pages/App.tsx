import '../assets/css/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TelaLogin from "./login/TelaLogin.tsx";
import TelaArtista from "./artista/TelaArtista.tsx";
import TelaAlbum from "./album/TelaAlbum.tsx";
import React from "react";
import TelaMenu from "./include/menu/TelaMenu.tsx";
import TelaArtistaNaoLogado from "./artista/TelaArtistaNaoLogado.tsx";
import TelaAlbumNaoLogado from "./album/TelaAlbumNaoLogado.tsx";
import TelaMenuLogado from "./include/menu/TelaMenuLogado.tsx";

const App = () => {
    return (
        <Router>
            <TelaMenuLogado />
            <Routes>
                {/* Define the routes that correspond to the navigation paths */}
                <Route path="/" element={<TelaLogin />} />
                <Route path="/artista" element={<TelaArtista />} />
                <Route path="/album" element={<TelaAlbum/>} />
                <Route path="/artista/naologado" element={<TelaArtistaNaoLogado />} />
                <Route path="/album/naologado" element={<TelaAlbumNaoLogado />} />
            </Routes>
        </Router>
    );
};

export default App;
