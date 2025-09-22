Este é um projeto de Gestão de Pessoas, onde o usuário pode cadastrar, editar e excluir informações de pessoas. A aplicação 
valida automaticamente o CPF e oferece uma interface simples e intuitiva para interações rápidas e eficientes.

# Funcionalidades

- Cadastro de Pessoas: Insira nome, CPF, data de nascimento e e-mail.
- Validação de CPF: O CPF é validado automaticamente. Se inválido, o sistema pede correção.
- Edição e Exclusão: Após cadastrar, você pode editar ou excluir o usuário com apenas um clique (ícones de lápis e lixeira).
- Interface Intuitiva: A interface foi feita para ser simples, dinâmica e de fácil navegação.

# Tecnologias Usadas

# Back-End:
- Java + Spring Boot
- JPA para persistência de dados
- MySQL Driver para conexão com o banco de dados
- Spring Validation para validação de dados (como CPF)

# Front-End:
- HTML, CSS e JavaScript
- Imagens customizadas para dar um design mais bacana à página

# Como Rodar o Projeto

# Pré-requisitos:
1. Java 11+ instalado.
2. MySQL rodando na sua máquina.
3. Uma IDE como IntelliJ para rodar o projeto.

# Passos:
1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/nome-do-repositorio.git
   ```

2. Abra o projeto na sua IDE.

3. Configure as credenciais do banco de dados no `application.properties` ou `application.yml`.

4. Execute a aplicação Spring Boot.

5. O sistema vai estar disponível em `http://localhost:8080` no navegador.

# Como Usar:

- Abra o sistema no navegador e comece a cadastrar pessoas.
- O sistema valida o CPF automaticamente. Se o CPF for inválido, ele vai pedir para corrigir.
- Você pode editar ou excluir registros diretamente pela interface, usando os ícones de lápis (editar) ou lixeira (excluir).

# Como Contribuir

- Se você quiser ajudar a melhorar o projeto, é só seguir esses passos:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/nome-do-repositorio.git
   ```

2. Crie uma nova branch:

   ```bash
   git checkout -b minha-contribuicao
   ```

3. Faça suas alterações.

4. Commit e envie para o repositório:

   ```bash
   git commit -am "Descrição da sua contribuição"
   git push origin minha-contribuicao


5. Abra um **Pull Request** detalhando o que foi feito.
