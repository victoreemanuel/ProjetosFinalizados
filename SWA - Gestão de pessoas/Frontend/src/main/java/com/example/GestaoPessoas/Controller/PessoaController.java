package com.example.GestaoPessoas.Controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.GestaoPessoas.Model.Pessoa;
import com.example.GestaoPessoas.Service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/pessoa")
public class PessoaController {

    private final PessoaService pessoaService;

    @Autowired
    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @GetMapping
    public List<Pessoa> listarPessoa() {
        return pessoaService.listarPessoa();
    }

    @PostMapping
    public ResponseEntity<?> salvarPessoa(@RequestBody @Valid Pessoa pessoa, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = "";
            for (FieldError error : result.getFieldErrors()) {
                errorMessage = error.getDefaultMessage();
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }

        Pessoa pessoaSalva = pessoaService.salvarPessoa(pessoa);
        return ResponseEntity.ok(pessoaSalva);
    }

    @PutMapping("/{id}")
    public Pessoa atualizarPessoa(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        return pessoaService.atualizarPessoa(id, pessoa);
    }

    @DeleteMapping("/{id}")
    public void deletarPessoa(@PathVariable Long id) {
        pessoaService.deletarPessoa(id);
    }
}
