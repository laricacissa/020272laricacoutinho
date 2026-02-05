package br.com.seplag.laricacoutinho_api.service.impl;

import br.com.seplag.laricacoutinho_api.model.Album;
import br.com.seplag.laricacoutinho_api.repository.AlbumRepository;
import br.com.seplag.laricacoutinho_api.repository.ArtistaRepository;
import br.com.seplag.laricacoutinho_api.service.AlbumService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
@AllArgsConstructor
public class AlbumServiceImpl implements AlbumService {
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private ArtistaRepository artistaRepository;

    @Override
    public List<Album> getAll() {
        return getListaAlbum(albumRepository.findAll().iterator());
    }

    @Override
    public List<Album> getAllByIdArtista(Long idArtista) {
        return getListaAlbum(albumRepository.findAllByIdArtista(idArtista).iterator());
    }

    @Override
    public Album getById(Long id) {
        return null;
    }

    @Override
    public Album cadastrarNovoAlbum(Album album) {
        album.setDataAtualizacao(new Date());
        album.setAtivo("S");
        return albumRepository.save(album);
    }

    private List<Album> getListaAlbum(Iterator itAlbum){
        var retorno = new ArrayList<Album>();
        while (itAlbum.hasNext()) {
            var album = (Album) itAlbum.next();
            var optArtista = artistaRepository.findById(album.getIdArtista());
            if(optArtista.isPresent()){
                var artista = artistaRepository.findById(album.getIdArtista()).get();
                album.setNomeArtista(artista.getNomeArtista());
            }
            retorno.add(album);
        }
        return retorno;
    }
}
