package br.com.seplag.laricacoutinho_api.controller;

import br.com.seplag.laricacoutinho_api.dto.LoginDTO;
import br.com.seplag.laricacoutinho_api.util.excecoes.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Operation(summary= "Verifica conta do usuario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = LoginDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content =
                    { @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ApiErrorResponse.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ApiErrorResponse.class)) }),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ApiErrorResponse.class)) })
    })
    @PostMapping(value="/api/login")
    public @ResponseBody ResponseEntity<LoginDTO> verificarLogin(@RequestBody String jsonLogin) {
//        Infracao infra = intgNaiEletronicaService.consultarInfracaoPorCodgGrupoCodgSubGrupoCodgInfracao(codgGrupo, codgSubgrupo, codgInfracao);
//        if (Objects.isNull(infra)) {
        return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(InfracaoDTO.toDTO(infra));
    }
}
