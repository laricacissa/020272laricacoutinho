import MensagemErro from "../include/mensagens/MensagemErro.tsx";
import MensagemSucesso from "../include/mensagens/MensagemSucesso.tsx";


function TelaArtistaNaoLogado() {
    return(
        <div className="min-h-full">
            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-900">Artista</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Your content */}
                    <MensagemErro message="Para acessar página Artista, o usuário deve fazer login na sua conta!" />
                </div>
            </main>
        </div>
    )
}

export default TelaArtistaNaoLogado;
