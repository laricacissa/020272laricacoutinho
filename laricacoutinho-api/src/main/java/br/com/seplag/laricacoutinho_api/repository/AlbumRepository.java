package br.com.seplag.laricacoutinho_api.repository;

import br.com.seplag.laricacoutinho_api.model.Album;
import br.com.seplag.laricacoutinho_api.model.Artista;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AlbumRepository extends CrudRepository<Album, Long> {
    @Query("select a from Album a where a.idArtista = ?1")
    Iterable<Album> findAllByIdArtista(Long idArtista);

    @Query("select Count(*) from Album a where a.idArtista = ?1")
    Integer countAllByIdArtista(Long idArtista);
}
