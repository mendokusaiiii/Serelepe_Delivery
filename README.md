
# 🐿 Serelepe Delivery

![image (1)](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/c3dfd94e-0df6-449f-9acb-a1ca51b9b80a)
Este projeto é um aplicativo de delivery desenvolvido para os clientes, funcionários e administradores de uma empresa. Ele permite vendas de produtos, registro de novos usuários, acompanhamento de pedidos e gerenciamento de usuários e pedidos.

Todos os usuários têm acesso através do login com diferentes permissões. O aplicativo valida o tipo de usuário a que a conta pertence usando o Token JWT. Além disso, o vendedor só pode ver os pedidos relacionados ao seu nome.



## Sumário

 - [Sobre o projeto](#sobre-o-projeto)
 - [Demo](#demo)
 - [Front-End](#front-end)
 - [Back-End](#back-end)
 - [Instalação](#instalação)
 - [Banco de Dados](#banco-de-dados)
 - [API](#api)
 - [Habilidades](#habilidades)
 - [Um pouco sobre o Grupo](#um-pouco-sobre-o-grupo)

## Sobre o projeto

Nessa aplicação, nosso grupo foi responsável por criar e integrar tanto o back-end quanto o front-end, criando uma plataforma de delivery de cerveja. 🍻

A distribuidora de cervejas do seu Serelepe está se informatizando! 🚀 Seu negócio, antes focado em um local específico da cidade, passou a receber uma quantidade massiva de encomendas de outros pontos, expandindo sua atuação via delivery. Isso tudo graças ao excelente preço das bebidas e atendimento da equipe de vendas.

Agora a distribuidora possui alguns pontos de venda na cidade para agilizar no atendimento dessas áreas. Cada ponto de venda, por sua vez, possui uma pessoa vendedora responsável.

Como seu antigo sistema, que era um conjunto de planilhas, já não atende a necessidade do negócio por gerar muita manutenção, o seu Srelepe procurou a nossa equipe de pessoas desenvolvedoras com uma ideia de aplicativo que pudesse agilizar a vida de sua equipe e das pessoas que compram seus produtos. O aplicativo consegue:

- 👨‍💻 👩‍💻Ter acesso via login: tanto clientes como pessoas vendedoras, assim como o próprio seu Serelepe, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo.

- 🗣 👥 Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos.

- 🏍 Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido quando sua página for atualizada, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega.

## Demo
![image (1)](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/c3dfd94e-0df6-449f-9acb-a1ca51b9b80a)
![image (2)](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/7c43c975-b6b0-4d9c-99bf-9ce2b52b085e)
![image (3)](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/316ac30d-a6c0-475b-8f14-b4e607f92ed6)
![image (4)](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/cf67edf4-9923-4c7a-b939-160cf942d5de)
![image (5)](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/00664fe0-9672-40a4-b54a-242073016456)
## Front-End

O Front-End foi desenvolvido com as seguintes ferramentas:
- Axios
- Material UI
- React
- React Router Dom
- React Testing Library


## Back-End
O Back-End foi desenvolvido com as seguintes ferramentas:
- Javascript
- NodeJS
- ExpressJS
- JWT
- MySQL
- Sequelize
- Mocha
- Chai
- Sinon
## Instalação

🤖 Comandos necessarios para o uso:

❗️ Observação: nesse projeto, utilizamos o gerenciador de processos `pm2`. Caso você queira entender melhor o que são gerenciadores de processos Node, dê uma conferida na documentação. ❗️



 São os scripts da raiz do projeto  (`~/package.json`) e não das aplicações individuais `./front-end/package.json` e `./back-end/package.json`(Todos os comandos devem ser executados com npm. Ex: `npm start`): 

 - ``start``: Limpa as portas ``3000`` e ``3001`` e simula a inicialização no avaliador. Também prepara o campo rodando o ``Sequelize`` para restaurar o banco de dados de testes (final -test) e sobe a aplicação com ``pm2`` em modo fork (uma instância para cada aplicação). Nesse modo, as alterações não são assistidas.
 - ``stop``: Para e deleta as aplicações rodando no ``pm2``;
 
 - ``dev``: Limpa as portas ``3000`` e ``3001`` e sobe a aplicação com ``pm2`` em modo fork (uma instância pra cada aplicação). Nesse modo, as atualizações são assistidas (modo watch).

- ``dev:prestart``: A partir da raiz, esse comando faz o processo de instalação de dependências ``(npm i)`` nos dois projetos ``(./front-end e ./back-end)`` e roda o ``Sequelize`` no ``./back-end`` (lembrar de configurar o .env no mesmo).

- ``db:reset``: Roda os scripts do ``Sequelize`` restaurando o banco de dados de desenvolvimento (final ``-dev``). Utilize esse script caso ocorra algum problema no seu banco local.

- ``test <nomes-dos-arquivos>``: Roda todos os testes (ou uma parte deles caso ``<nomes-dos-arquivos>`` seja definido) utilizando o banco de dados de testes (final ``-test``).


## Para iniciar o projeto, siga os seguintes passos:

- Crie e configure um arquivo `.env` com as suas variáveis de ambiente no diretório back-end. Caso contrário, a configuração do banco de dados usará os valores padrão(Um exemplo de `.env` está na `src` do backend).

- Instale o banco de dados MySQL e verifique se ele está sendo executado no seu computador ou em um contêiner.

- Abra o terminal na pasta raiz (`~/delivery_app`) e execute os seguintes comandos:
    - `npm run db:reset` - Isso executará os scripts do Sequelize e restaurará o banco de dados de desenvolvimento.
    - `npm run start` - Isso limpará as portas 3000 e 3001 e iniciará a aplicação.

## Banco de Dados

Para o banco de dados, utilizamos o ORM Sequelize, que fará interface com o MySQL.

Utilize para referência de criação de migrations e seeders o arquivo ``./db.example.sql``.

O Diagrama de ER também pode ajudar a "visualizar" o banco de dados.


![erdr](https://github.com/mendokusaiiii/Serelepe_Delivery/assets/102118032/25d224cb-e508-4ba0-b24f-06abfe6e3723)

O banco de dados vem com três usuários padrões (cliente, vendedor e administrador) e onze bebidas. Você pode usar as seguintes credenciais para testar o aplicativo:

- Cliente:
  ```
  name: Cliente Zé Birita
  email: zebirita@email.com
  password: $#zebirita#$
  ```

- Vendedor:
  ```
  name: Fulana Pereira
  email: fulana@deliveryapp.com
  password: fulana@123
  ```

- Admin:
  ```
  name: Delivery App Admin
  email: adm@deliveryapp.com
  password: --adm2@21!!--
  ```

#### MySQL com Docker
Para usar o MySQL com Docker, você precisa ter o Docker instalado em sua máquina. Para verificar se você tem o Docker instalado, abra o prompt de comando e digite:
`docker --version`

Este comando deve retornar algo semelhante a:
`Docker version 23.0.2`

Depois de ter o Docker instalado, você pode criar o contêiner com o seguinte comando. Lembre-se de alterar o nome do contêiner e a senha:
`docker container run --name delivery-app -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 mysql:5.7`.

Este comando criará um contêiner MySQL com o nome `delivery-app`, irá definir a senha de root como `123456` e irá expor a porta MySQL 3306 para a porta local 3306.


## API

Para entender como funciona um pouco melhor a API e o projeto em si, as funcionalidades e desenvolvimento foi dividida em cinco (5) fluxos diferentes, cada um com a suas subdivisões, que juntos se tornam a aplicação em si.

Sendo eles: 
- Fluxo Comum
    -
    - Login: Verifica se o banco de dados contém as pessoas usuárias padrão. 

    - Registro: Deve ser capaz de registrar novos usuários, com dados validos no banco de dados.
- Fluxo do Cliente
    - 
    - Produtos do Cliente: Fluxo responsável pelos produtos que o cliente inseriu no carrinho. Sendo possivel, inserir, remover, modificar e deletar produtos do carrinho. O cliente também consegue consultar e ver os produtos e preços.

    - Checkout: Validar o valor total dos produtos adicionados na tela de produtos, navegar para a tela de checkout através do botão do carrinho de compras, gerar um novo pedido com o preço total presumido e dados aleatórios para utilização. O usuario tambem consegue ver os detalhes do pedido, remover itens do carrinho.

    - Pedidos do Cliente: Aqui é possivel ver a tela com todos os pedidos do cliente com os dados corretos.

    - Detalhes do Pedido: Contem  detalhes do pedido do cliente de forma a possuir os dados corretos da venda.

- Fluxo da Pessoa Vendedora
    -
    - Pedidos do Vendedor: O vendedor consegue  ver a lista de todos os pedidos atuais e anteriores.

    - Detalhes do Pedido: A pessoa vendedora tem acesso a tela de detalhes do pedido, de forma a possuir os dados corretos da venda.

- Validação do  Status do Pedido
    -
    - A validação de status consiste em assegurar que os status do pedido sejam alterados e refletidos para clientes e pessoas vendedoras.

- Fluxo da Pessoa Administradora
    -
    - O fluxo da pessoa administradora deve possibilitar o cadastro de clientes e pessoas vendedoras, tal como a remoção dos mesmos.

   ## Testando a API  
    
    #### POST  `/login`
```
  {
    "email": "zebirita@email.com",
    "password": "$#zebirita#$"
  }
  ```

  **Respostas**
  
  Status: 200 OK
  ```
  {
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "role": "customer",
    "token": "jsonwebtoken"
  }
  ```
  
  Status: 400 Bad Request
  ```
  {
    "message": "Invalid empty fields"
  }
  ```
  ```
  {
    "message": "Invalid email"
  }
  ```
  ```
  {
    "message": "Password must have at least 6 characters"
  }
  ```
  
  Status: 401 Unauthorized
  ```
  {
    "message": "Incorrect password"
  }
  ```
  
  Status: 404 Not Found
  ```
  {
    "message": "User not found"
  }
  ```
#### POST `/register`

  
  **Exemplo de Valores de Parâmetros**
  ```
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
  }
  ```

  



  **Respostas**
  
  Status: 201 Created  
  ```
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "customer",
    "token": "jsonwebtoken"
  }
  ```
  
  Status: 400 Bad Request
  ```
  {
    "message": "Invalid empty fields"
  }
  ```
  ```
  {
    "message": "Username must have at least 12 characters"
  }
  ```
  ```
  {
    "message": "Invalid email"
  }
  ```
  ```
  {
    "message": "Password must have at least 6 characters"
  }
  ```
  
  Status: 409 Conflict
  ```
  {
    "message": "User already exist"
  }
  ```

#### GET `/seller`
  
  **Respostas**
  
  Status: 200 OK
  ```
  [
    {
      "id": 2,
      "name": "Fulana Pereira"
    }
  ]
  ```
#### POST `/sale`

  **Exemplo de Valores de Parâmetros**
  ```
  {
    "cart": [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "quantity": 2,
        "unityPrice": 2.30,
        "subTotal": 4.60
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "quantity": 1,
        "unityPrice": 1.20,
        "subTotal": 1.20
      }
    ],
    "totalPrice": 88.8,
    "sellerId": 1,
    "deliveryAddress": "R. Ficticia, Em Algum Lugar, AL",
    "deliveryNumber": 121,
    "userEmail": "zebirita@email.com"
  }
  ```


  **Respostas**
  
  Status: 201 Created
  ```
  {
    "saleId": 1
  }
  ```
  #### PUT /sale/orders

  Status dos pedidos:
  - "Pendente"
  - "Preparando"
  - "Em Trânsito"
  - "Entregue"
    
 
  **Exemplo de Valores de Parâmetros**
  ```
  {
    "saleId": 1, 
    "status": "Preparando"
  }
  ```
  

  **Respostas**
  
  Status: 200 OK
  ```
  [
    1   // saleId
  ]
  ```

  **Respostas**
  #### GET
  Status: 200 OK
  ```
  [
    {
      "saleDate": "2023-05-18 16:23:10 +00:00",
      "id": 1,
      "status": "Preparando",
      "totalPrice": "88.80",
      "deliveryAddress": "R. Ficticia, Em Algum Lugar, AL"
    },
    {
      "saleDate": "2023-05-18 16:23:10 +00:00",
      "id": 2,
      "status": "Pendente",
      "totalPrice": "88.80",
      "deliveryAddress": "R. Ficticia, Em Algum Lugar, AL"
    }
  ]
  ```

  **Respostas**
  #### GET /costumer/products
  Status: 200 OK
  ```
  [
    {
      "saleId": 2,
      "productId": 1,
      "quantity": 2,
      "product": {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20"
      },
      "sale": {
        "saleDate": "2023-05-18 16:23:10 +00:00",
        "userId": 3,
        "sellerId": 1,
        "totalPrice": "88.80",
        "deliveryAddress": "R. Ficticia, Em Algum Lugar, AL",
        "deliveryNumber": "121",
        "status": "Pendente",
        "seller_id": 1
      }
    },
    {
      "saleId": 2,
      "productId": 2,
      "quantity": 1,
      "product": {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50"
      },
      "sale": {
        "saleDate": "2023-05-18 16:23:10 +00:00",
        "userId": 3,
        "sellerId": 1,
        "totalPrice": "88.80",
        "deliveryAddress": "R. Ficticia, Em Algum Lugar, AL",
        "deliveryNumber": "121",
        "status": "Pendente",
        "seller_id": 1
      }
    }
  ]
  ```

#### GET `/users`

  **Respostas**
  
  Status: 200 OK
  ```
  [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg"
    },
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": "7.50",
      "url_image": "http://localhost:3001/images/heineken_600ml.jpg"
    },
    ...
  ]
  ```

  #### GET `/products`
  
  **Parâmetros dos Headers**
  ```
  Authorization: JsonWebToken
  ```


  **Respostas**
  
  Status: 200 OK
  ```
  [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg"
    },
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": "7.50",
      "url_image": "http://localhost:3001/images/heineken_600ml.jpg"
    },
    ...
  ]
  ```
  Status: 404 Not Found
  ```
  {
    "message": "Token not found"
  }
  ```
  ```
  {
    "message": "Expired or invalid token"
  }
  ```

#### `/admin`
#### GET

  **Parâmetros dos Headers**
  ```
  Authorization: JsonWebToken
  ```


  **Respostas**
  
  Status: 200 OK
  ```
  [
    {
      "id": 2,
      "name": "Fulana Pereira",
      "email": "fulana@deliveryapp.com",
      "role": "seller"
    },
    {
      "id": 3,
      "name": "Cliente Zé Birita",
      "email": "zebirita@email.com",
      "role": "customer"
    }
  ]
  ```
  
  Status: 401 Unauthorized
  ```
  {
    "message": "Unauthorized"
  }
  ```
  
  Status: 404 Not Found
  ```
  {
    "message": "Token not found"
  }
  ```
  ```
  {
    "message": "Expired or invalid token"
  }
  ```
  #### POST
 
  **Parâmetros dos Headers**
  ```
  Authorization: JsonWebToken
  ```



  **Exemplo de Valores de Parâmetros**
  ```
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
  }
  ```

  

  **Respostas**
  
  Status: 201 Created  
  ```
  {
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "customer",
    "token": "jsonwebtoken"
  }
  ```
  
  Status: 400 Bad Request
  ```
  {
    "message": "Invalid empty fields"
  }
  ```
  ```
  {
    "message": "Username must have at least 12 characters"
  }
  ```
  ```
  {
    "message": "Invalid email"
  }
  ```
  ```
  {
    "message": "Password must have at least 6 characters"
  }
  ```
   
  Status: 401 Unauthorized
  ```
  {
    "message": "Unauthorized"
  }
  ```
  
  Status: 404 Not Found
  ```
  {
    "message": "Token not found"
  }
  ```
  ```
  {
    "message": "Expired or invalid token"
  }
  ```
  
  Status: 409 Conflict
  ```
  {
    "message": "User already exist"
  }
  ```
  
  **Parâmetros dos Headers**
  ```
  Authorization: JsonWebToken
  ```
  
   #### DELETE /admin/:id
  
  **Respostas**
  
  Status: 201 Created
  ```

  ```
  
  Status: 401 Unauthorized
  ```
  {
    "message": "Unauthorized"
  }
  ```
  
  Status: 404 Not Found
  ```
  {
    "message": "Token not found"
  }
  ```
  ```
  {
    "message": "Expired or invalid token"
  }
  ```




## Habilidades:
#### Hardskills:

    - A realização da dockerização dos apps, network, volume e compose;
    - A modelagem de dados com MySQL através do Sequelize;
    - A criação e associação de tabelas usando models do sequelize;
    - A construção de uma API REST com endpoints para consumir os models criados;
    - A construção de um CRUD com NodeJS, utilizando ORM;
    - A utilização de React
    - A utilização de React-Hooks e Context-API
    - A estilização com Material-UI
    - A organização e estruturação de software
    - A cobertura de testes. Tanto testes unitários e de integração robusta e com alta cobertura.

##### Softskills:
    - Trabalho em grupo
    - Metodologias Ageis
    - Scrum
    - Kanban
    - Comunicação
## Um pouco sobre o grupo
O App de Delivery foi um projeto realizado em grupo, sendo o ultimo projeto do modulo de Back-End. Com o objetivo de trabalhar principalmente as softskills e simular um ambiente de trabalho com diferentes pessoas atuando no mesmo.

Esse projeto permitiu com que conhecemos novas pessoas e vissemos novos jeitos de trabalhar em grupo, utilizando as metodologias ageis. A comunicação foi essencial para realizar esse projeto e podemos dizer com muito orgulho que tivemos sucesso na entrega do mesmo.

O grupo é composto dos seguintes desenvolvedores:

    - Gabriel Palhares (lider responsavel pelo grupo)
    - Yuzo Matoba
    - Victor Alejandro Cabral Orellana

##### Depoimetos sobre o projeto

- Depoimeto de Victor: Esse trabalho em grupo foi bem desafiador de começo, nunca tinha trabalhado com o Gabriel ou o Yuzo antes, então estava bem animado para realizar esse projeto com eles. Posso dizer que foi uma das melhores decisões que tomei, realizar esse projeto com dois grandes desenvolvedores como eles, agregou muito ao meu conhecimento em hardskills como em softskills. Definitivamente foi o projeto mais divertido e o que mais aprendi durante o curso da Trybe. So tenho a agradecer aos meus colegas por esses 13 dias intensos de projeto!

- Depoimeto de Gabriel: Desenvolver o projeto Serelepe Delivery representou um grande desafio pessoal para mim, pois foi meu primeito projeto desenvolvido do zero fullStack. Graças à colaboração do meu time, conseguimos concluir o desenvolvimento dentro do prazo estipulado. Essa jornada proporcionou uma série de aprendizados técnicos valiosos e se mostrou uma excelente oportunidade para aprimorar minhas habilidades de soft skills. Gostaria de expressar minha profunda gratidão aos meus colegas, Yuzo e Victor, pelo trabalho conjunto e pela dedicação que ambos demonstraram durante todo o processo. Yuzo desempenhou um papel fundamental no desenvolvimento do front-end, utilizando o Context API para garantir o correto funcionamento do nosso projeto. E Victor, com seu incrível trabalho no back-end, utilizando o modelo MSC, contribuiu de forma significativa para o sucesso alcançado. Mais uma vez, gostaria de agradecer a ambos pelo esforço e dedicação, que foram essenciais para completar o nosso projeto.

- Depoimeto de Yuzo: Trabalhar com o Gabriel e o Victor, proporcionou o entendimento de outras perspectivas de pensamento lógico, ampliando o meu escopo em relação à diferentes formas de se obter um mesmo resultado. A experiência prévia do Gabriel com programação e a sua empatia, foram fundamentais para que a sua liderança nos conduzisse para alcançarmos o estabelecido. Quanto ao Victor, o senso de responsabilidade e de companheirismo, contribuíram imensamente para que ficássemos sincronizados e seguíssemos um fluxo praticamente uniforme de trabalho. A ferramenta de gestão de tempo (Metodologia Ágil) foi o Trello para que os steps fossem organizados e feitos de acordo com a responsabilidade e tempo de cada membro. Gratidão ao meus colegas e amigos pelo incrível trabalho que desenvolveram comigo. Foram excepcionais e grandes parceiros nesse projeto do qual me orgulho muito.
## Contato
#### Redes de Victor
- E-mail: victor_cabral_o@hotmail.com
- LinkedIn: https://www.linkedin.com/in/victor-alejandro-orellana/

#### Redes de Gabriel
- E-mail: devpalhares@gmail.com
- LinkedIn: https://www.linkedin.com/in/devpalhares/
- Github: https://github.com/GPalhares

#### Redes de Yuzo
- E-mail: fabioymatoba@uol.com.br
- LinkedIn: https://www.linkedin.com/in/fabio-yuzo
- Github: https://github.com/yuzomatoba 
