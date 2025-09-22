package com.example.GestaoPessoas.Repository;

import com.example.GestaoPessoas.Model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
