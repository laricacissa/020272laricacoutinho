# PROJETO PRÁTICO - IMPLEMENTAÇÃO FULL STACK SÊNIOR - JAVA + ANGULAR/REACT

Projeto para o gerenciamento de artistas e seus álbuns desenvolvido em Spring Boot que utiliza MinIO (S3-compatible) para armazenamento de arquivos.

## 🚀 Tecnologias Utilizadas

- **Java 17.0.12**
- **Spring Boot 4.0.2**
- **MinIO** (S3-compatible storage)
- **Maven** (gerenciamento de dependências)
- **Lombok** (redução de boilerplate)
- **Spring Dotenv** (gerenciamento de variáveis de ambiente)
- **H2 Database** (Banco de Dados em Memória)
- **OpenAPI/Swagger** (Documentar endpoints)
- **React com Vite e TailwindCss e Primereact** (FrontEnd em React)

## 📋 Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- MinIO Server (local)
- NodeJs versão 

## ⚙️ Configuração

### 1. H2 Database

- URL via Browser: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- User Name: sa
- Password: (vazio)

Obs.: Acessar após SpringBoot estar inicializado por completo.

### 2. Swagger

URL via Browser: http://localhost:8080/swagger-ui/index.html
Obs.: Acessar após SpringBoot estar inicializado por completo.


## 🛠️ Instalação e Execução

### 1. Clone o repositório

# BackEnd(Spring Boot)

```bash
git clone https://github.com/laricacissa/020272laricacoutinho.git
cd laricacoutinho-api
```

### 2. Configure as variáveis de ambiente

Certifique-se de que o arquivo `.env` está configurado corretamente na raiz do projeto.

### 3. Compile o projeto

```bash
mvn clean compile
```

### 4. Execute a aplicação

```bash
mvn spring-boot:run
```

A aplicação estará disponível em `http://localhost:8080`


# FrontEnd(React)

```bash
git clone https://github.com/laricacissa/020272laricacoutinho.git
cd meu-app-fe
```

### 2. Compile o projeto

```bash
npm install
```

### 2. Execute o frontend

```bash
npm run dev
```

As funcionalidades estarão disponível em `http://localhost:5173`


## 📚 API Endpoints

### Login-Controller

**POST** `/api/login`

- **Parâmetro**: (JSON)`{"username": string, "senha": string}`

**Exemplo de uso:**

```bash
curl -X POST \
  http://localhost:8080/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "seplag", "senha": "123456"}'
```

### Artista-Controller

# Lista todos os artistas cadastrados:

**GET** `/api/artistas` 

- **Parâmetro**: (JSON)`{"username": string, "senha": string}`

**Exemplo de uso:**

```bash
curl -X GET http://localhost:8080/api/artistas 
```

# Cadastrar novo artista:

**POST** `/api/artistas`

- **Parâmetro**: (JSON)`{"nomeArtista": "Biquini Cavadao"}`

**Exemplo de uso:**

```bash
curl -X POST \
  http://localhost:8080/api/artistas \
  -H 'Content-Type: application/json' \
  -d '{"nomeArtista": "Biquini Cavadao"}'
```

### Album-Controller

# Lista todos os albuns cadastrados:

**GET** `/api/albuns` 

**Exemplo de uso:**

```bash
curl -X GET http://localhost:8080/api/albuns 
```

# Cadastrar novo album para determinado artista:

**POST** `/api/albuns`

- **Parâmetro**: (JSON)`{"nomeAlbum": "Vento Ventania", "idArtista": "6"}`

**Exemplo de uso:**

```bash
curl -X POST \
  http://localhost:8080/api/albuns \
  -H 'Content-Type: application/json' \
  -d '{"nomeAlbum": "Vento Ventania", "idArtista": "6"}'
```

# Lista todos os albuns por artista ID:

**GET** `/api/albuns/artista` 

**Exemplo de uso:**

```bash
curl -X GET http://localhost:8080/api/albuns/artista \
  -H 'Content-Type: application/json' \
  -d '{"idArtista": "1"}'
```

## 🏗️ Arquitetura do Projeto

No repositório temos duas pastas que compõem dois projetos separados:

Projeto Backend: laricacoutinho-api

```
src/
├── main/
│   ├── java/
│   │   └── br/com/seplag/laricacoutinho_api/
│   │       ├── config/          	# Configurações 
│   │       ├── controller/      	# Controllers REST
│   │       ├── dto/             	# Data Transfer Objects
│   │       ├── model/           	# Entidades
│   │       ├── repository/      	# Repositories
│   │       ├── service/         	# Interfaces de serviço
│   │       │   └── impl/        	# Implementações dos serviços
│   │       ├── util/            	# Utilitários
│   │       │   └── exception/   	# Tratamento de exceções
│   │       └── LaricacoutinhoApiApplication.java
│   └── resources/
│       ├── application.properties  # Configurações da aplicação
│       ├── data.sql                # SQls Inserts no H2 Database(Memória)
│       └── schema.sql  			# DDL de criação das tabelas no H2 Database(Memória)
└── test/                       # Testes unitários
```

Projeto Frontend: meu-app-fe

```
meu-app-fe/
├── public/
├──	src/
│	├── api/
│	│   └── services/				# Acessa os endpoints
│	├── assets/    
│	│   ├── css/						# Cascading Style Sheets
│	│   └── img/  					# Imagens 
│	├── pages/    
│	│   ├── album/ 					# Todas as telas envolvidas em gerenciar Album
│	│   ├── artista/ 				# Todas as telas envolvidas em gerenciar Artista
│	│   ├── include/ 				# Telas reutilizadas no projeto frontend
│	│   │      ├── mensagens/       # Mostram mensagens de sucesso ou aviso
│	│   │      └── menu/			# Menu 
│	│   ├── login/ 			        # Telas de Login
│	│   └── App.tsx 				# Define rota de navegação
│	└── main.tsx                    # Template Principal
├── .gitignore						# Lista arquivos que se quer ignorar
├── README.md						# Informações sobre o Projeto
├── eslint.config.js				#
├── index.html						# Página index do projeto
├── package.json					# Arquivo que contém todas as depencias do projeto
├── postcss.config.cjs				# Arquivo que configura o  postcss
├── tailwind.config.js				# Arquivo que configura o  tailwindcss
├── tsconfig.app.json				#
├── tsconfig.json					#
├── tsconfig.node.json				#
└── vite.config.ts					# Arquivo que configura o compilador Vite
```

## Justificativas
- Docker:
Não consegui testar usando o docker-compose. Justificativa: Tentei instalar no meu computador, mas o CPU que uso em casa não suportou a instalação do Docker. Até tentei comprar um novo computador para realizar o projeto, mas em todas as cotações que eu fiz o CPU só chegaria depois do prazo. Não deu certo. Mas deixei as configurações no projeto. Caso o projeto não execute, basta deletar o arquivo docker-compose.yml
Como não consegui instalar o docker, não consegui levantar o MinIO e fazer o upload das imagens.

- Já trabalho na SEFAZ-MT à 15 anos, e atualmente estou no final de um contrato tenmporário de 2024, na área de desenvolvimento. Especialmente com React/Spring Boot.
Todos os dias trabalho com desenvolvimento de sistemas da SEFAZ-MT legados e novos, o que inclui fazer testes unitários para atender as boas práticas conforme rigorosamente avaliadas por meio da plataforma Sonarqube.
Porém, eu não consegui implementar nesse projeto a tempo do prazo.


## 📞 Suporte

Para suporte ou dúvidas, entre em contato através dos issues do GitHub.

---

**Desenvolvido by laricacissa usando Spring Boot e MinIO**
