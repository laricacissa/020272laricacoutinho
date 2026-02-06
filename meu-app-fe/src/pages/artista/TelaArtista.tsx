import {useGetArtistasService, usePostCadtArtistaService} from "../../api/services/Artista.ts";
import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useGetAlbunsPorArtistaService} from "../../api/services/Album.ts";
import {Dialog} from "primereact/dialog";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

function TelaArtista({ setMostrarMenuLogado }) {

    const [artistas, setArtistas] = useState([]);
    const [artista, setArtista] = useState(null);
    const [albuns, setAlbuns] = useState([]);
    const [nomeArtista, setNomeArtista] = useState(null);
    const [selectedArtista, setSelectedArtista] = useState(null);
    const [visible, setVisible] = useState(false);
    const [cadtArtistaDialog, setCadtArtistaDialog] = useState(false);

    useEffect(() => {
        consultarTodosArtistas();
        setMostrarMenuLogado('test123');
    }, []);

    const consultarTodosArtistas =  async () => {
        setArtistas(await useGetArtistasService());
    }

    const consultarAlbunsPorArtista =  async (id) => {
        setAlbuns(await useGetAlbunsPorArtistaService(id));
    }

    const onRowSelect = (event) => {
        setArtista(event.data);
        setAlbuns(consultarAlbunsPorArtista(event.data.id));
        setVisible(true);
    };

    const onRowUnselect = (event) => {
        setArtista(null);
        setAlbuns([]);
        setVisible(false);
    };

    const imageAlbumBodyTemplate = (album) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${album.image}`} alt={album.image} className="w-6rem shadow-2 border-round" />;
    };

    const headerAlbum = `Artista: ${artista ? artista.nomeArtista : 0}.`;

    const openNewArtista = () => {
        setArtista(null);
        setCadtArtistaDialog(true);
    };

    const addArtistaToolbarTemplate = () => {
        return (
            <div>
                <Button label="Adicionar Artista" icon="pi pi-plus" severity="success" onClick={openNewArtista} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
            </div>
        );
    };

    const hideDialogArtista = () => {
        setCadtArtistaDialog(false);
    };

    const handleSubmitCadtArtista = () =>{
        console.log(nomeArtista);
        setCadtArtistaDialog(false);
        setArtista(null);
        usePostCadtArtistaService(nomeArtista);
    }

    return(
        <div className="min-h-full">
            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-900">Artista</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Toolbar end={addArtistaToolbarTemplate} className="bg-white px-4 py-2 border-0 text-center font-medium text-blue-900"></Toolbar>
                    <DataTable value={artistas} dataKey="id" tableStyle={{ minWidth: '50rem' }}
                               className="min-w-full divide-y divide-blue-50 text-sm"
                               paginator rows={5} paginatorClassName="bg-blue-100 px-4 py-2 text-center font-medium text-blue-900"
                               selectionMode="single" selection={selectedArtista} onSelectionChange={(e) => setSelectedArtista(e.value)}
                               onRowSelect={onRowSelect} onRowUnselect={onRowUnselect}
                               emptyMessage="Nenhum Artista cadastrado.">
                        <Column field="nomeArtista" header="Nome do Artista" style={{ width: '50%' }} sortable
                                headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900"
                                className="p-4 border-b border-blue-200 text-blue-900 text-center"></Column>
                        <Column field="qtdeAlbuns" header="Quantidade de Albuns" style={{ width: '25%' }}
                                headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900" headerStyle={{textAlign: 'center'}}
                                className="p-4 border-b border-blue-200 text-blue-900"></Column>
                        <Column field="dataAtualizacao" header="Data da Atualização" style={{ width: '25%' }}
                                headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900" headerStyle={{textAlign: 'center'}}
                                className="p-4 border-b border-blue-200 text-blue-900"></Column>
                    </DataTable>

                    <Dialog header={headerAlbum} visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} modal
                            pt={{
                                root: { className: 'rounded-lg shadow-xl' },
                                header: { className: 'p-4 border-b border-blue-200 bg-blue-50 rounded-t-lg text-blue-900' },
                                content: { className: 'p-4' },
                                footer: { className: 'p-4 border-t border-gray-200 rounded-b-lg' },
                                closeButton: { className: 'text-gray-400 hover:text-gray-600' }
                            }}>
                        <DataTable value={albuns} tableStyle={{ minWidth: '60rem' }}
                                   paginator rows={5} paginatorClassName="bg-blue-100 px-4 py-2 text-center font-medium text-blue-900">
                            <Column header="Capa" body={imageAlbumBodyTemplate} style={{ width: '50%' }}
                                    headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900"
                                    className="p-4 border-b border-blue-200 text-blue-900"></Column>
                            <Column field="nomeAlbum" header="Nome do Album" style={{ width: '50%' }} sortable
                                    headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900"
                                    className="p-4 border-b border-blue-200 text-blue-900"></Column>
                        </DataTable>
                    </Dialog>

                </div>

                <Dialog visible={cadtArtistaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Cadastrar Artista" modal onHide={hideDialogArtista}
                        pt={{
                            root: { className: 'rounded-lg shadow-xl' },
                            header: { className: 'p-4 border-b border-blue-200 bg-blue-50 rounded-t-lg text-blue-900' },
                            content: { className: 'p-4' },
                            footer: { className: 'p-4 border-t border-gray-200 rounded-b-lg' },
                            closeButton: { className: 'text-gray-400 hover:text-gray-600' }
                        }}        >
                    <form onSubmit={handleSubmitCadtArtista} className="p-4 space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="nomeArtista" className="mb-2 font-semibold">Nome Artista: </label>
                            <InputText
                                id="username"
                                value={nomeArtista}
                                onChange={(e) => setNomeArtista(e.target.value)}
                                className="p-inputtext" // The preset handles the styling, no manual tailwind classes needed for basic appearance
                            />
                        </div>
                        <Button type="submit" label="Submit" className="mt-4" />
                    </form>
                </Dialog>
            </main>
        </div>
    )
}

export default TelaArtista;
