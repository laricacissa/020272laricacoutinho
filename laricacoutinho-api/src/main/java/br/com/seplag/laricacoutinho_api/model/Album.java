package br.com.seplag.laricacoutinho_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "minha_seq_gen")
    @SequenceGenerator(
            name = "minha_seq_gen",
            sequenceName = "minha_sequence",
            initialValue = 15, // Começa a gerar a partir de 1000
            allocationSize = 1   // Garante que o incremento seja de 1 em 1
    )
    private Long id;
    private Long idArtista;
    private String nomeAlbum;
    private Date dataAtualizacao;
    private String ativo;

    @Transient
    private String nomeArtista;
}
