package br.com.seplag.laricacoutinho_api.service;

import br.com.seplag.laricacoutinho_api.model.Artista;

import java.util.List;

public interface ArtistaService {
    List<Artista> getAllAtivos();

    Artista getById(Long id);

    Artista cadastrarNovoArtista(Artista artista);
}
