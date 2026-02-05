package br.com.seplag.laricacoutinho_api.dto;

import br.com.seplag.laricacoutinho_api.model.Artista;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ArtistaDTO {
    private Long id;
    private String nomeArtista;
    private Date dataAtualizacao;
    private String ativo;
    private int qtdeAlbuns;

    public static List<ArtistaDTO> toListDTO(List<Artista> artistaList) {
        List<ArtistaDTO> listArtistaDTO = new ArrayList<>();

        artistaList.forEach(artista -> listArtistaDTO.add(toDTO(artista)));

        return listArtistaDTO;
    }

    public static ArtistaDTO toDTO(Artista artista) {
        var artistaDTO = new ArtistaDTO();
        artistaDTO.setId(artista.getId());
        artistaDTO.setNomeArtista(artista.getNomeArtista());
        artistaDTO.setDataAtualizacao(artista.getDataAtualizacao());
        artistaDTO.setAtivo(artista.getAtivo());
        artistaDTO.setQtdeAlbuns(artista.getQtdeAlbuns());
        return artistaDTO;
    }
}
