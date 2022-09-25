# PLATAFORMA SING-ME-A-SONG

### Configuração de testes.

> A plataforma, cujo objetivo é agrupar recomendações de videos possui uma serie de testes e aqui será descrito brevemente como configurar o ambiente para que os testes sejam executados.
>
> 1. Execute o comando `npm i` no terminal da aplicação para instalar as dependências do projeto.
> 1. Inicialize os testes do projeto através do comando `npm test`

### Descrição dos testes

> Os testes do _Backend_ são compostos de três arquivos:
>
> 1. O arquivo `getTests` na pasta `tests` descreve os testes de integração relacionados aos métodos `GET` do sistema, como:
>
> > - busca de todas as recomendações registradas;
> > - requisição de uma recomendação aleatória;
> > - requisição das recomendações mais populares;
>
> 1. O arquivo `postTests` na pasta `tests` descreve os testes de integração relacionados aos métodos `POST` do sistema, como:
>
> > - inserção de uma nova recomendação;
> > - voto positivo e negativo na classificação de uma recomendação;
>
> 1. O arquivo `serviceTests` na pasta `tests/unit` descreve os testes unitários referentes aos serviços que o sistema implementa, como:
>
> > - lógica de seleção de uma recomendação aleatória;
> > - lógica de qual tipo de busca será realizada no banco de dados;
> > - lógica de remoção de uma recomendação com pontuação muito baixa;

### Informações adicionais

> Os testes de integração realizam acessos ao banco de dados, porém, toda informação inserida é fabricada e removida logo após o teste.
>
> Os testes unitários não realizam nenhum acesso ao banco de dados, todas as informações geradas durante os testes são fabricadas pelas funções na pasta `factories`:
>
> 1. o arquivo `factory` fabrica qualquer tipo de objeto que vá ser usado como falso-retorno de uma função (_mocked return/mocked resolve_);
> 1. o arquivo `dbFactory` usa das funções no arquivo `factory` para realizar inserções no banco de dados durante a fase de testes de integração;
