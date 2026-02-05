package br.com.seplag.laricacoutinho_api.dto;

import br.com.seplag.laricacoutinho_api.model.Album;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AlbumDTO {
    private Long id;
    private Long idArtista;
    private String nomeAlbum;
    private Date dataAtualizacao;
    private String ativo;
    private String nomeArtista;

    public static List<AlbumDTO> toListDTO(List<Album> albumList) {
        List<AlbumDTO> listAlbumDTO = new ArrayList<>();

        albumList.forEach(album -> listAlbumDTO.add(toDTO(album)));

        return listAlbumDTO;
    }

    public static AlbumDTO toDTO(Album album) {
        var albumDTO = new AlbumDTO();
        albumDTO.setId(album.getId());
        albumDTO.setIdArtista(album.getIdArtista());
        albumDTO.setNomeAlbum(album.getNomeAlbum());
        albumDTO.setDataAtualizacao(album.getDataAtualizacao());
        albumDTO.setAtivo(album.getAtivo());
        albumDTO.setNomeArtista(album.getNomeArtista());
        return albumDTO;
    }
}
