package br.com.seplag.laricacoutinho_api.controller;

import br.com.seplag.laricacoutinho_api.service.LoginService;
import br.com.seplag.laricacoutinho_api.util.excecoes.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @Operation(summary= "Verifica conta do usuario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = String.class)) }),
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
    @GetMapping(value="/api/login")
    public @ResponseBody ResponseEntity<String> verificarLogin(
            @RequestParam(name = "username", required = false) String user,
            @RequestParam(name = "senha", required = false) String password
    ) {
        String token = loginService.isLoginValido(user, password);
        return ResponseEntity.ok(token);
    }
}
