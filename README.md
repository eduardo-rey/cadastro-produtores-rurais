# cadastro-produtores-rurais
Uma API para gerenciamento de produtores rurais, incluindo dados para um dashboard com dados sumarizados.

## Pré-requisitos
- Node.JS
- PostgreSQL

## Instalação
```
git clone https://github.com/eduardo-rey/cadastro-produtores-rurais
```
Copiar ou renomear `.env.example` para `.env` e incluir credenciais de acesso ao banco de dados PostgreSQL.

Gerar as tabelas do sistema:
```
node ace migration:run
```
Alimentar a base com dados iniciais:
```
node ace db:seed -f database/seeders/0_starter_seeder
```
Opcional: alimentar a base com dados "mockados":
```
node ace db:seed -f database/seeders/1_mock_seeder
```

## Endpoints

- `POST /produtor`: Cadastrar novo produtor rural. O corpo da requisição deve conter os seguintes campos:
  ```
  {
      "produtor": Nome do produtor,
      "cpfCnpj": CPF ou CNPJ válido (string),
      "fazenda": Nome da fazenda,
      "cidade": Nome da cidade,
      "estado": Sigla do estado (ex. GO),
      "areaAgriculturavel": Área agriculturável (valor numérico em hectares),
      "areaVegetacao": Área de vegetação (valor numérico em hectares),
      "areaTotal": Área total (valor numérico em hectares),
      "culturas": Lista de IDs das culturas cultivadas na fazenda (IDs podem ser obtidos pelo endpoint /cultura)
  }
  ```

- `GET /produtor/(:id)`: Lista de produtores cadastrados, ou apenas um produtor quando informado o parâmetro `:id`

- `PUT /produtor`: Editar um produtor, com os mesmos campos de `POST`
- `DELETE /produtor/:id`: Excluir um produtor

- `GET /cultura`: Lista de culturas cadastradas

- `GET /dashboard`: Dados sumarizados dos produtores cadastrados, para uso em dashboard administrativo.
