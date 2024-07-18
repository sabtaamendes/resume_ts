## Cadastro de Curriculo


## Ferramentas

- Node
- Typescript
- Docker 
- Postgresql

## Instalação

- Instale o serviço pela url HTTPS no GitHub

```bash
git clone https://github.com/gfacilitti/resume_project.git
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
psql -U postgres -d postgres
```

- comando pra executar o compose de teste

```
docker compose -f docker-compose-test.yml up -d
```

- pra executar somente os testes no container

```
docker exec container_name npm test
```


`porta do banco de dados docker-compose.yml e docker-compose-test.yml `5433` e porta do banco de dados no ci.yml `5432` `