<h1 align="center">
    Teste de back-end para NAGRO
</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/daniel-viana-almeida/">
    <img 
        alt="Made by Daniel Almeida" 
        src="https://img.shields.io/badge/MADE%20BY-Daniel%20Almeida-%230077b5?style=flat-square&logo=linkedin">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%20brightgreen?style=flat-square&logo=">

  <a href="https://www.typescript.com/">
    <img 
        alt="TypeScript" 
        src="https://img.shields.io/badge/STACK-TypeScript-%230077b5?style=flat-square&logo=TypeScript">
  </a>
  <a href="">
    <img 
        alt="server Node.js" 
        src="https://img.shields.io/badge/Server-Node.js-%23339933?style=flat-square&logo=node.js">
  </a>
  
</p>

Api rest de usuários e empresas

Recomendo utilizar o Yarn pra instalar

Criar o arquivo .env nesse modelo

```
NODE_ENV = development
PORT = xxxx
MONGO_URI = mongodb+srv://xxxx
JWT_SECRET = xxxxx
```

A primeira constante **NODE_ENV** 'development' retorna os erros como objetos json.
Ao mudar para o ambiente de produção, 'production', o erro não retornará como json, mas sim como StatusCode.

O sistema de autenticação foi utilizado implementando Json Web Token (JWT)

Para criar um banco de dados cadastre em <a href="https://cloud.google.com/mongodb">
<img 
        alt="server Node.js" 
        src="https://img.shields.io/badge/WebPage-MongoDB-%23339933?style=flat-square&logo=mongodb">
</a>

Utililize o comando

```
npm run data:import
```

Sobe um banco de dados para teste em seu servidor mongo

```
npm run data:destroy
```

Apaga todo banco de dados de teste em seu servidor mongo

## Docker

```
docker build -t nagro/api-ts .

docker run -d -p 5001:5000 nagro/api-ts
```

## Utilize as extensão .rest port 5001 no docker, port 5000 no localhost para bater nos end points

---

## Usuários

A modelagem do Schema foi feito assim

```
    name: string
    email: string
    password: string
    isAdmin?: boolean
```

Primeiro end point com validação do nome, email e tamanho 6 para password, cria usuário

Retorna o Beare token

```
### Create user

POST http://localhost:5000/api/users/
Content-Type: application/json

{
	"name": "Deborah",
	"email": "deb@lbn.com",
	"isAdmin": "false",
	"password": "123456"
}
```

Segundo end point login retorna o token

```
### Login

POST http://localhost:5000/api/users/login
Content-Type: application/json

{
	"email": "jo@lbn.com",
	"password": "123456"
}
```

Terceiro end point pega usuário pelo token, retorna tudo menos o password

```
### Get user profile

get http://localhost:5000/api/users/profile
Content-Type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTA1ZTU3OTU4MDA2ZDZmNjA4YzY2OSIsImlhdCI6MTYxMTY5MzM3NCwiZXhwIjoxNjE0Mjg1Mzc0fQ.9YR_mWWc7SGNOLpYS1tndPh5GXI8oo7WiciehCHXPzA
```

Quarto end point atualiza o cadastro com validação do tamanho do password >= 6, o nome e o email podem ser trocados também

```
### Update user

PUT http://localhost:5000/api/users/profile
Content-Type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTA1ZTU3OTU4MDA2ZDZmNjA4YzY2OSIsImlhdCI6MTYxMTY5MzM3NCwiZXhwIjoxNjE0Mjg1Mzc0fQ.9YR_mWWc7SGNOLpYS1tndPh5GXI8oo7WiciehCHXPzA

{
	"password": "123456"

}
```

## Empresas

A modelagem foi feita com nome da empresa, cnpj, usuário que criou, um array de produtos com nome e preço e um array de serviços

```
{
    user: "ID do usuário",
    brandName: "Nome da empresa",
    cnpj: 123456789,
    products: [
    {name: "Nome do produto", price:"Preço",
    service: [{name: "Serviço1"},
    {name:"Serviço2"}]

        }]}

```

Primeiro end point pegar empresa pelo id do usuário

```
### Get brand by user id

GET http://localhost:5000/api/brand/5ffd9ac3a1fbb5490b6090fe
Content-Type: application/json
```

Segundo end point cria empresa com validação no nome máximo de 100 caracteres e cnp com tamanho máximo de 14 numeros de

```
### Create brand

POST http://localhost:5000/api/brand/
Content-Type: application/json

{
	 "userId": "5ffd9ac3a1fbb5490b6090fe",
        "brandName": "Ifood22",
        "cnpj": 123456781212934,
        "products": [
            {"name": "comida", "price":23,
            "service": [{"name": "Entrega"},{"name":"Devolve"}]

        }]
}

```

Terceiro end point deleta empresa pelo id

````
### Delete brand by id

DELETE http://localhost:5000/api/brand/delete/60116596f78bd85b835182dd
Content-Type: application/json
```
````

Quarto end point atualiza empresa pelo id

```
### Update brand by id

PUT http://localhost:5000/api/brand/update/6011654cf78bd85b835182d9
Content-Type: application/json

{
	"brandName": "test"
}

```
