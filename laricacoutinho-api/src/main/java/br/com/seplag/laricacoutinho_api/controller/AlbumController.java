package br.com.seplag.laricacoutinho_api.controller;

import br.com.seplag.laricacoutinho_api.dto.AlbumDTO;
import br.com.seplag.laricacoutinho_api.model.Album;
import br.com.seplag.laricacoutinho_api.service.AlbumService;
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
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @Operation(summary= "Lista todos os albuns por artista ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AlbumDTO.class)) }),
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
    @GetMapping(value="/api/albuns/artista")
    public @ResponseBody ResponseEntity<List<AlbumDTO>> consultarAlbunsPorArtista(
            @RequestParam(name = "idArtista", required = false) Long idArtista) {
        List<Album> listAlbum = albumService.getAllByIdArtista(idArtista);
        if (Objects.isNull(listAlbum)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AlbumDTO.toListDTO(listAlbum));
    }

    @Operation(summary= "Lista todos os albuns")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AlbumDTO.class)) }),
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
    @GetMapping(value="/api/albuns")
    public @ResponseBody ResponseEntity<List<AlbumDTO>> consultarAlbuns() {
        List<Album> listAlbum = albumService.getAll();
        if (Objects.isNull(listAlbum)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AlbumDTO.toListDTO(listAlbum));
    }

    @Operation(summary= "Cadastrar Album novo para Artista")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AlbumDTO.class)) }),
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
    @PostMapping(value="/api/albuns")
    public @ResponseBody ResponseEntity<AlbumDTO> cadastrarAlbum(
            @RequestBody Album album
    ) {
        Album novoAlbum = albumService.cadastrarNovoAlbum(album);
        if (Objects.isNull(novoAlbum)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AlbumDTO.toDTO(novoAlbum));
    }

}
