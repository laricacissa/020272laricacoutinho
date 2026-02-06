import '../assets/css/App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TelaLogin from "./login/TelaLogin.tsx";
import TelaArtista from "./artista/TelaArtista.tsx";
import TelaAlbum from "./album/TelaAlbum.tsx";
import React, {useState} from "react";
import TelaMenu from "./include/menu/TelaMenu.tsx";
import TelaArtistaNaoLogado from "./artista/TelaArtistaNaoLogado.tsx";
import TelaAlbumNaoLogado from "./album/TelaAlbumNaoLogado.tsx";
import TelaMenuLogado from "./include/menu/TelaMenuLogado.tsx";
import TelaLogado from "./login/TelaLogado.tsx";


const App = () => {
    const [mostrarMenuLogado, setMostrarMenuLogado] = useState(false);
    console.log(mostrarMenuLogado);
    return (
        <Router>
            {mostrarMenuLogado ?
                <TelaMenuLogado />
                :
                <TelaMenu/>
            }
            <Routes>
                {/* Define the routes that correspond to the navigation paths */}
                <Route path="/" element={<TelaLogin setMostrarMenuLogado={setMostrarMenuLogado}/>}/>
                <Route path="/logado" element={<TelaLogado setMostrarMenuLogado={setMostrarMenuLogado}/>}/>
                <Route path="/artista" element={<TelaArtista setMostrarMenuLogado={setMostrarMenuLogado}/>} />
                <Route path="/album" element={<TelaAlbum setMostrarMenuLogado={setMostrarMenuLogado}/>} />
                <Route path="/artista/naologado" element={<TelaArtistaNaoLogado />} />
                <Route path="/album/naologado" element={<TelaAlbumNaoLogado />} />
            </Routes>
        </Router>
    );
};

export default App;
