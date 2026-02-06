package br.com.seplag.laricacoutinho_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "minha_seq_gen_login")
    @SequenceGenerator(
            name = "minha_seq_gen_login",
            sequenceName = "minha_sequence_login",
            initialValue = 2, // Começa a gerar a partir de 2
            allocationSize = 1   // Garante que o incremento seja de 1 em 1
    )
    private Long id;
    private String username;
    private String senha;
    private String token;
}
