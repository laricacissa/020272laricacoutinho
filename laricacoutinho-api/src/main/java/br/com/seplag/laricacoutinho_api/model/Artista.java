package br.com.seplag.laricacoutinho_api.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Artista {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "minha_seq_gen_artista")
    @SequenceGenerator(
            name = "minha_seq_gen_artista",
            sequenceName = "minha_sequence_artista",
            initialValue = 5, // Começa a gerar a partir de 5
            allocationSize = 1   // Garante que o incremento seja de 1 em 1
    )
    private Long id;
    private String nomeArtista;
    private Date dataAtualizacao;
    private String ativo;

    @Transient
    private Integer qtdeAlbuns;
}
