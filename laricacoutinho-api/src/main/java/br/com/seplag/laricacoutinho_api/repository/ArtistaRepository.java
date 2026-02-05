package br.com.seplag.laricacoutinho_api.repository;

import br.com.seplag.laricacoutinho_api.model.Artista;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ArtistaRepository  extends CrudRepository<Artista, Long> {
    @Override
    Iterable<Artista> findAll();

    @Override
    Optional<Artista> findById(Long id);

    @Override
    Artista save(Artista artista);
}
