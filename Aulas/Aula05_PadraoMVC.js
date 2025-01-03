/*
    Antes de continuar desenvolvendo a API vamos relembrar sobre o padrão MVC.
    MVC significa Model View Controller e serve para estruturar nossa API. Nesse padrão "Model" é o modelo que criamos, que contém todas as regras de negocio da nossa API. "View" é a camada que interage com a pessoa usuária, seja recebendo uma requisição através de uma rota, seja enviando os dados requeridos à pessoa usuária. Nesse momento, nosso modelo e nossas rotas estão desconectados. Para fazer essa conexão, usamos a ultima camada do padrão MVC, o "Controller".

    Nesse padrão, o fluxo da nossa API é

    cliente faz uma requisição HTTP em uma das rotas -> a rota chama um método que se encontra dentro de um Controller -> O controle recebe os dados da requisição (de cabeçalho, corpo, etc) e faz uma requisição ao Model -> O Model acessa os dados do banco através de uma query e envia os dados de volta ao Controller -> o Controller pega os dados recebidos do Model, empacota num formato aceitado pelo cliente e gera uma resposta, que é então passada para o cliente.
    Lembrando que, nesse caso, 'cliente' é o nome dado ao programa que está sendo usado pela pessoa usuária para realizar a requisição (pode ser o Postman ou um browser, por exemplo)

    Cada "pedaço" dessa lógica é chamada de 'camada', sendo que as principais sao as que compõe o nome do padrão MVC. Podem haver camadas intermediárias, responsáveis por operações que precisam ser realizadas entre as camadas principais. Nesse curso veremos uma dessas sub-camadas. Além disso, é importante que as camadas principais estejam bem separadas, para facilitar a leitura e o entendimento do código.

    Existem outros padrões de desenvolvimento, mas o MVC é o mais utilizado (princialmente se formos considerar suas formas expandidas, com diversas subcamadas)

    Nas proximas aulas, criaremos uma rota e um controlador para interagir com nosso modelo 'pessoa' e nosso banco de dados.

*/