package com.example.GestaoPessoas.Service;

import com.example.GestaoPessoas.Model.Pessoa;
import com.example.GestaoPessoas.Repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

    private PessoaRepository pessoaRepository;

    @Autowired
    public PessoaService(PessoaRepository pessoaRepository){
        this.pessoaRepository = pessoaRepository;
    }

    public List<Pessoa> listarPessoa() {
        return pessoaRepository.findAll();
    }

    public Pessoa salvarPessoa(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    public Pessoa atualizarPessoa(Long id, Pessoa pessoa) {
        Pessoa existente = pessoaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
        existente.setNome(pessoa.getNome());
        existente.setCpf(pessoa.getCpf());
        existente.setDataNascimento(pessoa.getDataNascimento());
        existente.setEmail(pessoa.getEmail());
        return pessoaRepository.save(existente);
    }

    public void deletarPessoa(Long id){
        pessoaRepository.deleteById(id);
    }
}
