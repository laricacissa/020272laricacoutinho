package br.com.seplag.laricacoutinho_api.service.impl;

import br.com.seplag.laricacoutinho_api.model.Artista;
import br.com.seplag.laricacoutinho_api.repository.AlbumRepository;
import br.com.seplag.laricacoutinho_api.repository.ArtistaRepository;
import br.com.seplag.laricacoutinho_api.service.ArtistaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
@AllArgsConstructor
public class ArtistaServiceImpl implements ArtistaService {
    @Autowired
    private ArtistaRepository artistaRepository;
    @Autowired
    private AlbumRepository albumRepository;

    @Override
    public List<Artista> getAllAtivos() {
        var retorno = new ArrayList<Artista>();
        Iterator itArtista = artistaRepository.findAll().iterator();
        while(itArtista.hasNext()) {
            var artista = (Artista) itArtista.next();
            artista.setQtdeAlbuns(albumRepository.countAllByIdArtista(artista.getId()));
            retorno.add(artista);
        }
        return retorno;
    }

    @Override
    public Artista getById(Long id) {
        return artistaRepository.findById(id).get();
    }

    @Override
    public Artista cadastrarNovoArtista(Artista artista) {
        artista.setDataAtualizacao(new Date());
        artista.setAtivo("S");
        return artistaRepository.save(artista);
    }
}
