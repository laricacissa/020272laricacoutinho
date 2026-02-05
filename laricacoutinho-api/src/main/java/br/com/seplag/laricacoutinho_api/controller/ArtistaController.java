package br.com.seplag.laricacoutinho_api.controller;

import br.com.seplag.laricacoutinho_api.dto.ArtistaDTO;
import br.com.seplag.laricacoutinho_api.model.Artista;
import br.com.seplag.laricacoutinho_api.service.ArtistaService;
import br.com.seplag.laricacoutinho_api.util.excecoes.ApiErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ArtistaController {
    @Autowired
    private ArtistaService artistaService;

    @Operation(summary= "Lista todos os artistas ativos")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ArtistaDTO.class)) }),
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
    @GetMapping(value="/api/artistas")
    public @ResponseBody ResponseEntity<List<ArtistaDTO>> consultarTodosArtistasAtivos() {
        List<Artista> listArtista = artistaService.getAllAtivos();

        if (Objects.isNull(listArtista)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ArtistaDTO.toListDTO(listArtista));

    }

    @Operation(summary= "Cadastrar novo artista")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ArtistaDTO.class)) }),
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
    @PostMapping(value="/api/artistas")
    public @ResponseBody ResponseEntity<ArtistaDTO> cadastrarArtista(
            @RequestBody Artista artista
    ) {
        Artista novoArtista = artistaService.cadastrarNovoArtista(artista);

        if (Objects.isNull(novoArtista)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ArtistaDTO.toDTO(novoArtista));

    }

}
