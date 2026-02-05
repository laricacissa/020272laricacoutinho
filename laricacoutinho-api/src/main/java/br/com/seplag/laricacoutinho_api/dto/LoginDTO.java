package br.com.seplag.laricacoutinho_api.dto;

import br.com.seplag.laricacoutinho_api.model.Login;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class LoginDTO {
    private String username;
    private String senha;

    public static List<LoginDTO> toListDTO(List<Login> loginList) {
        List<LoginDTO> listLoginDTO = new ArrayList<>();

        loginList.forEach(login -> listLoginDTO.add(toDTO(login)));

        return listLoginDTO;
    }

    public static LoginDTO toDTO(Login login) {
        var loginDTO = new LoginDTO();
        loginDTO.setUsername(login.getUsername());
        loginDTO.setSenha(login.getSenha());
        return loginDTO;
    }

}
