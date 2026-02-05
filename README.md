# PROJETO PRÁTICO - IMPLEMENTAÇÃO FULL STACK SÊNIOR - JAVA + ANGULAR/REACT

Projeto para o gerenciamento de artistas e seus álbuns desenvolvido em Spring Boot que utiliza MinIO (S3-compatible) para armazenamento de arquivos.

## 🚀 Tecnologias Utilizadas

- **Java 17.0.12**
- **Spring Boot 4.0.2**
- **MinIO** (S3-compatible storage)
- **Maven** (gerenciamento de dependências)
- **Lombok** (redução de boilerplate)
- **Spring Dotenv** (gerenciamento de variáveis de ambiente)

## 📋 Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- MinIO Server (local)
- Docker (Não consegui testar usando o docker-compose. Justificativa: Tentei instalar no meu computador, mas o CPU que uso em casa não suportou a instalação do Docker. Até tentei comprar um novo computador para realizar o projeto, mas em todas as cotações que eu fiz o CPU só chegaria depois do prazo. Não deu certo. Mas deixei as configurações no projeto. Caso o projeto não execute, basta deletar o arquivo docker-compose.yml)

## ⚙️ Configuração

### 1. Variáveis de Ambiente

O projeto utiliza um arquivo `.env` na raiz do projeto para configuração. Crie o arquivo `.env` com as seguintes variáveis:

```env
# Configurações da Aplicação
APP_NAME=file-upload-service
MAX_FILE_SIZE=10MB
MAX_REQUEST_SIZE=10MB

# Configurações do MinIO
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_BUCKET_NAME=images
MINIO_REGION=us-east-1
```

### 2. MinIO Setup

#### Opção 1: Docker (Recomendado)

```bash
# Navegar para o diretório docker
cd docker

# Executar MinIO via Docker Compose
docker-compose up -d
```

#### Opção 2: Instalação Local

1. Baixe e instale o MinIO Server
2. Execute o servidor MinIO:
   ```bash
   minio server /data --console-address ":9001"
   ```
3. Acesse o console em `http://localhost:9001`
4. Crie um bucket chamado `images`

## 🛠️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/devsdofuturobr/files.git
cd files
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

## 📚 API Endpoints

### Upload de Arquivo

**POST** `/api/v1/files/upload`

- **Content-Type**: `multipart/form-data`
- **Parâmetro**: `file` (arquivo a ser enviado)

**Exemplo de uso:**

```bash
curl -X POST \
  http://localhost:8080/api/v1/files/upload \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/caminho/para/seu/arquivo.jpg'
```

**Resposta de sucesso:**

```json
{
  "success": true,
  "message": "Arquivo enviado com sucesso",
  "fileName": "20231010_143022_abc123.jpg",
  "fileUrl": "http://localhost:9000/images/20231010_143022_abc123.jpg",
  "fileSize": 1024576,
  "contentType": "image/jpeg"
}
```

### Listar Arquivos

**GET** `/api/v1/files/list`

**Exemplo de uso:**

```bash
curl -X GET http://localhost:8080/api/v1/files/list
```

**Resposta de sucesso:**

```json
{
  "success": true,
  "message": null,
  "files": [
    "20231010_143022_abc123.jpg",
    "20231010_144530_def456.png"
  ],
  "count": 2,
  "error": null
}
```

### Deletar Arquivo

**DELETE** `/api/v1/files/delete/{fileName}`

**Exemplo de uso:**

```bash
curl -X DELETE http://localhost:8080/api/v1/files/delete/20231010_143022_abc123.jpg
```

**Resposta de sucesso:**

```json
{
  "success": true,
  "message": "Arquivo deletado com sucesso",
  "fileName": "20231010_143022_abc123.jpg"
}
```

## 🏗️ Arquitetura do Projeto

```
src/
├── main/
│   ├── java/
│   │   └── com/devsdofuturobr/file/
│   │       ├── config/          # Configurações (MinIO, etc.)
│   │       ├── controller/      # Controllers REST
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── exception/      # Tratamento de exceções
│   │       ├── service/        # Interfaces de serviço
│   │       │   └── impl/       # Implementações dos serviços
│   │       └── FileApplication.java
│   └── resources/
│       └── application.yml     # Configurações da aplicação
└── test/                       # Testes unitários
```

### Principais Componentes

- **FileUploadController**: Controller REST que expõe os endpoints da API
- **FileUploadService**: Interface que define os contratos do serviço
- **FileUploadServiceImpl**: Implementação do serviço de upload (localizada em service/impl/)
- **GlobalExceptionHandler**: Tratamento centralizado de exceções
- **MinioConfig**: Configuração do cliente MinIO
- **DTOs**: Objetos de transferência de dados (FileResponse, FileListResponse, FileDeleteResponse, HealthResponse)

## 🔧 Configurações Avançadas

### Limites de Upload

Por padrão, o tamanho máximo de arquivo é 10MB. Para alterar:

1. Modifique as variáveis no arquivo `.env`:
   ```env
   MAX_FILE_SIZE=50MB
   MAX_REQUEST_SIZE=50MB
   ```

## 🔗 Conectando com MinIO via AWS CLI

O MinIO é compatível com a API do Amazon S3, permitindo o uso do AWS CLI para interagir com o servidor.

### Instalação do AWS CLI

```bash
# macOS
brew install awscli

# Ubuntu/Debian
sudo apt-get install awscli

# Windows
# Baixe o instalador do site oficial da AWS
```

### Configuração do AWS CLI

```bash
# Configure o perfil para MinIO
aws configure --profile minio
```

Quando solicitado, insira:
- **AWS Access Key ID**: `minioadmin`
- **AWS Secret Access Key**: `minioadmin123`
- **Default region name**: `us-east-1`
- **Default output format**: `json`

### Comandos Úteis

#### Listar buckets
```bash
aws --profile minio --endpoint-url http://localhost:9000 s3 ls
```

#### Criar bucket
```bash
aws --profile minio --endpoint-url http://localhost:9000 s3 mb s3://images
```

#### Listar arquivos no bucket
```bash
aws --profile minio --endpoint-url http://localhost:9000 s3 ls s3://images
```

#### Upload de arquivo
```bash
aws --profile minio --endpoint-url http://localhost:9000 s3 cp arquivo.jpg s3://images/
```

#### Download de arquivo
```bash
aws --profile minio --endpoint-url http://localhost:9000 s3 cp s3://images/arquivo.jpg ./
```

#### Deletar arquivo
```bash
aws --profile minio --endpoint-url http://localhost:9000 s3 rm s3://images/arquivo.jpg
```

#### Sincronizar diretório
```bash
# Upload de diretório local para bucket
aws --profile minio --endpoint-url http://localhost:9000 s3 sync ./local-folder s3://images/

# Download de bucket para diretório local
aws --profile minio --endpoint-url http://localhost:9000 s3 sync s3://images/ ./local-folder
```

### Configuração Alternativa com Variáveis de Ambiente

Para evitar usar `--profile` e `--endpoint-url` em cada comando:

```bash
# Defina as variáveis de ambiente
export AWS_ACCESS_KEY_ID=minioadmin
export AWS_SECRET_ACCESS_KEY=minioadmin123
export AWS_DEFAULT_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:9000

# Agora você pode usar comandos mais simples
aws s3 ls
aws s3 ls s3://images
aws s3 cp arquivo.jpg s3://images/
```

## 🐳 Docker

O projeto inclui um ambiente Docker completo na pasta `docker/` com:

- MinIO Server
- MinIO Console
- Configurações de rede

## 🧪 Testes

### Executar testes

```bash
mvn test
```

### Testar endpoints manualmente

#### Usando cURL

1. **Upload de arquivo:**
   ```bash
   curl -X POST -F "file=@test-image.png" http://localhost:8080/api/v1/files/upload
   ```

2. **Listar arquivos:**
   ```bash
   curl http://localhost:8080/api/v1/files/list
   ```

3. **Deletar arquivo:**
   ```bash
   curl -X DELETE http://localhost:8080/api/v1/files/delete/nome-do-arquivo.png
   ```

#### Usando Postman

O projeto inclui uma coleção do Postman (`File_Upload_Service.postman_collection.json`) com todos os endpoints configurados para facilitar os testes. A coleção contém:

- **Upload de arquivo**: Endpoint configurado para upload com exemplo de arquivo
- **Listar arquivos**: Endpoint para listar todos os arquivos no bucket
- **Deletar arquivo**: Endpoint para deletar arquivos específicos
- **Variáveis de ambiente**: Configurações pré-definidas para URL base e outros parâmetros
- **Exemplos de resposta**: Respostas de exemplo para cada endpoint

A coleção está localizada na raiz do projeto e pode ser importada diretamente no Postman.

## 📝 Logs

A aplicação utiliza Log4j2 para logging. Os logs incluem:

- Informações de upload (nome do arquivo, tamanho, etc.)
- Erros de validação e exceções
- Operações de listagem e exclusão

## 🚨 Tratamento de Erros

A aplicação possui tratamento centralizado de exceções que retorna respostas padronizadas:

- **400 Bad Request**: Arquivo inválido ou muito grande
- **404 Not Found**: Arquivo não encontrado
- **500 Internal Server Error**: Erros internos do servidor

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através dos issues do GitHub.

---

**Desenvolvido by laricacissa usando Spring Boot e MinIO**
