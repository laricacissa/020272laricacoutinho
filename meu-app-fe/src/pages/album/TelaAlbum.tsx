import React, {useEffect, useState} from "react";
import {useGetArtistasService} from "../../api/services/Artista.ts";
import {useGetAlbunsService, usePostCadtAlbumService} from "../../api/services/Album.ts";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";

function TelaAlbum() {

    const [artistas, setArtistas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [cadtAlbumDialog, setCadtAlbumDialog] = useState(false);
    const [nomeAlbum, setNomeAlbum] = useState(null);
    const [idArtista, setIdArtista] = useState(null);
    const [selectedArtista, setSelectedArtista] = useState(null);

    useEffect(() => {
        consultarTodosArtistas();
        consultarTodosAlbuns();
    }, []);

    const consultarTodosArtistas =  async () => {
        setArtistas(await useGetArtistasService());
    }

    const consultarTodosAlbuns =  async () => {
        setAlbuns(await useGetAlbunsService());
    }

    const openNewAlbum = () => {
        setCadtAlbumDialog(true);
    };

    const addAlbumToolbarTemplate = () => {
        return (
            <div>
                <Button label="Adicionar Album" icon="pi pi-plus" severity="success" onClick={openNewAlbum} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
            </div>
        );
    };

    const hideDialogAlbum = () => {
        setCadtAlbumDialog(false);
    };

    const handleSubmitCadtAlbum = () =>{
        setCadtAlbumDialog(false);
        usePostCadtAlbumService(nomeAlbum, selectedArtista.id);
        consultarTodosAlbuns();
    }

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };

    return(
        <div className="min-h-full">
            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-900">Album</h1>
                </div>
            </header>
            <main>
                <Toolbar end={addAlbumToolbarTemplate} className="bg-white px-4 py-2 border-0 text-center font-medium text-blue-900"></Toolbar>
                <DataTable value={albuns} dataKey="id" tableStyle={{ minWidth: '50rem' }}
                           className="min-w-full divide-y divide-blue-50 text-sm"
                           paginator rows={5} paginatorClassName="bg-blue-100 px-4 py-2 text-center font-medium text-blue-900"
                           emptyMessage="Nenhum Album cadastrado.">
                    <Column field="nomeAlbum" header="Nome do Album" style={{ width: '50%' }} sortable
                            headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900"
                            className="p-4 border-b border-blue-200 text-blue-900 text-center"></Column>
                    <Column field="nomeArtista" header="Nome do Artista" style={{ width: '25%' }} sortable
                            headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900" headerStyle={{textAlign: 'center'}}
                            className="p-4 border-b border-blue-200 text-blue-900"></Column>
                    <Column field="dataAtualizacao" header="Data da Atualização" style={{ width: '25%' }}
                            headerClassName="bg-blue-100 px-4 py-2 font-medium text-blue-900" headerStyle={{textAlign: 'center'}}
                            className="p-4 border-b border-blue-200 text-blue-900"></Column>
                </DataTable>

                <Dialog visible={cadtAlbumDialog} style={{ width: '52rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Cadastrar Album" modal onHide={hideDialogAlbum}
                        pt={{
                            root: { className: 'rounded-lg shadow-xl' },
                            header: { className: 'p-4 border-b border-blue-200 bg-blue-50 rounded-t-lg text-blue-900' },
                            content: { className: 'p-4' },
                            footer: { className: 'p-4 border-t border-gray-200 rounded-b-lg' },
                            closeButton: { className: 'text-gray-400 hover:text-gray-600' }
                        }}        >
                    <form onSubmit={handleSubmitCadtAlbum} className="p-4">
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold">Capa do Album: </label>
                            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader} chooseLabel="Carregar"
                                        className="p-button-outlined p-button-secondary flex flex-wrap w-full"
                                        chooseOptions={{ icon: 'pi pi-upload'}}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="nomeAlbum" className="mb-2 font-semibold">Nome Album: </label>
                            <InputText
                                id="nomeAlbum"
                                value={nomeAlbum}
                                onChange={(e) => setNomeAlbum(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-600"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold">Artista: </label>
                            <Dropdown value={selectedArtista} onChange={(e) => setSelectedArtista(e.value)} options={artistas} optionLabel="nomeArtista"
                                      placeholder="Selecione Artista" checkmark={true} highlightOnSelect={false}
                                      className="w-full md:w-14rem" // Add base styling for size
                                      unstyled // Ensures no default styles are applied
                                      pt={{
                                          root: { className: 'border border-gray-300 rounded-md p-2 hover:border-blue-500' },
                                          input: { className: 'w-full outline-none text-blue-600' },
                                          trigger: { className: 'ml-2' },
                                          panel: { className: 'bg-blue-100 shadow-lg rounded-md mt-1 border border-gray-300' },
                                          item: ({ context }) => ({
                                              className: `p-3 hover:bg-blue-100 ${context.selected ? 'bg-blue-500 text-white' : ''}`
                                          })
                                      }}/>
                        </div>
                        <Button type="submit" label="Submit" className="mt-4" />
                    </form>
                </Dialog>
            </main>
        </div>
    )
}

export default TelaAlbum;
