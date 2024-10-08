
##  Cadastro de Currículo

  
  

##  Ferramentas

  

- *Node*

- *Typescript*

- *Docker*

- *Postgresql*

  

##  Instalação

  

- Instale o serviço pela url HTTPS no GitHub

  

```bash

git  clone  https://github.com/gfacilitti/resume_project.git

```

- env

```

POSTGRES_PORT=

POSTGRES_USER=

POSTGRES_PASSWORD=

POSTGRES_DB=

POSTGRES_HOSTNAME=

DATABASE_URL=

PORT=

```

- comando docker para executar a aplicação local

```
docker compose up -d

```

- comando docker para visualizar os log do container

```

docker ps -a

```

- comando docker para acessar o container

```

docker exec -it postgres /bin/bash

``` 

- comando para acessar o banco de dados no container

```

docker exec -it id_container_db psql -U username -d banco_dados

```

- comando pra executar o compose de teste

```
docker compose -f docker-compose-test.yml up -d

```

- pra executar somente os testes no container

```
docker exec container_name npm test

```

- executar somente os testes unitários

```
npm run test ./tests/unit/candidates.test.ts

```

> porta do banco de dados docker-compose.yml e docker-compose-test.yml **5433** e porta do banco de dados no ci.yml **5432**

- Se eu quiser construir somente a imagem docker
```
docker build -t resume-project -f Dockerfile .
```

- para gerar um token jwt

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```
