/*
    Vamos agora criar uma função para nos ajudar a converter a string recebida através de 'params' em um Number.
    Vamos começar criando o arquivo 'conversorDeStringHelper.js' dentro da pasta 'utils' e colocaremos o código
*/
module.exports = (objetoParams) => {
    for(let propriedade in objetoParams){
        if(/Id|id/.test(propriedade)) {
            objetoParams[propriedade] = Number(objetoParams[propriedade]);
        }
    }
    return objetoParams;
}
/*
    Esse função irá checar, para cada propriedade que vier no 'objetoParams' se aquela propriedade tem no nome 'Id' ou 'id'. Esse teste é feito através do método 'test()' que pertence às expressões regulares, uma forma de validar textos. Em caso positivo, a função transforma o valor daquela propriedade em número.
    Apesar de existir a função 'Object.hasOwn()', que checaria se o objeto possui ou não uma propriedade, não é possivel passar uma expressão regular para essa função, portanto temos que usar o for(in) na função helper

    Agora, em 'Controller.js' importamos a função que acabamos de criar e alteramos o código da função 'getOne' para chamar a função helper e converter os valores das strings em Number, se for o caso
*/
class Controller {
    async getOne(req, res) {
        const { ...params } = req.params;
        const where = converteId(params);
        try {
            const umRegistro = await this.entidadeService.getOneRegister(where);
            return res.status(200).json(umRegistro);
        } catch (erro){
            return res.status(500).json({ erro: erro.message});
        }
    }
}
/*
    Na próxima aula poderemos, finalmente, terminar o CRUD
*/