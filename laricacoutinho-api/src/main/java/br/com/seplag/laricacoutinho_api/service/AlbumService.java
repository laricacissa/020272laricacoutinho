package br.com.seplag.laricacoutinho_api.service;

import br.com.seplag.laricacoutinho_api.model.Album;

import java.util.List;

public interface AlbumService {
    List<Album> getAllByIdArtista(Long idArtista);

    List<Album> getAll();

    Album getById(Long id);

    Album cadastrarNovoAlbum(Album album);
}
