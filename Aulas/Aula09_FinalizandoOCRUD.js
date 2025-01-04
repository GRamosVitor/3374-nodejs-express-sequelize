/*
    Agora que nossos 'PessoaControle', 'PessoaService', 'pessoasRoutes' e 'pessoa' estão feitos, podemos fazer os demais métodos básicos do CRUD.
    Aqui, é importante notar que as operações create e delete são muito similares à operação de read, portanto as operações de pegar um registro por id, criar novo registro e deletar registro não serão vistas em detalhe nessa aula. Para ver a implementação dessas operações, consulte os arquivos do CRUD da nossa API.

    Porém, o método de atualizar um registro é um pouco diferente e um pouco mais complicado, portanto faremos esse método passo-a-passo nessa aula.

    Começando no nosso Controller, vamos criar o seguinte método entre os métodos de criar novo registro e excluir registro:
*/
async function atualiza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try{
        const isAtualizado = await this.entidadeService.updateRegister(dadosAtualizados, Number(id));

        if(!isAtualizado){
            return res.status(400).json({mensagem: 'Registro não atualizado'})
        }
        return res.status(200).json({message: 'Atualizado com sucesso'});
    } catch(erro) {
        //erro
    }
}

/*
    Agora, antes de analizarmos o código, vamos fazer também o Service:
*/
async function updateRegister(dadosAtualizados, id) {
    const listaDeregistrosAtualizados =  dataSource[this.model].update
     (dadosAtualizados, {
            where: { id: id }
        });
    if (listaDeregistrosAtualizados[0] === 0){
        return false;
    } else {
        return true;
    }
}

/*
    Observe que, diferente dos demais métodos, nós criamos no controller uma constante chamada 'isAtualizado' para receber o retorno da função 'updateRegister'. Isso acontece pois o retorno da função .update() do Sequelizer é um array de numeros, contendo quantos registros foram alterados pelo método. Essa informação deve ser obtida na documentação da biblioteca, na parte de dependencias da API. O retorno, por ser um array de numeros, não pode ser passado diretamente para o front end e deve ser tratado.
    O tratamento começa na função 'updateRegister' em 'Services.js'. Após tentar realizar a função 'update()', o retorno da função é armazenado na constante 'listaDeRegistrosAtualizados'. É então feita uma verificação onde caso o numero de registros atualizados seja igual a 0 a função retorna 'false', caso contrário ela retorna 'true' (aqui chumbamos o valor 0 em listaDeRegistrosAtualizados[0] pois como a atualização é feita através do id, só podem ser atualizados 1 ou 0 registros)
    A função 'atualiza' do controlador então pega o retorno de 'updateRegister' e armazena na constante 'isAtualizado'. Essa constante então é checada e, caso seja 'false', 'atualiza' envia a resposta 'res.status(400).json({mensagem: 'Registro não atualizado'})' caso contrário, ela envia a resposta 'res.status(200).json({message: 'Atualizado com sucesso'})'

    Alguns pontos importantes que devem ser notados: primeiro que, ao passar o id como argumento na chamada função 'updateRegister' em 'atualiza', temos que converter o valor, que vem no formato de string, para 'Number', que é o tipo da propriedade 'id' no nosso modelo.
    segundo, que o método 'update' do sequelize recebe como argumento dois objetos, sendo o primeiro um objeto contendo as propriedades que devem ser alteradas no registro e o segundo um objeto contendo quais registros devem ser alterados. Perceba que esse segundo objeto possui uma propriedade chamada 'where', que indica quais propriedades devem ser usadas como filtro para encontrar os registros que devem ser atualizados. Essa nomenclatura 'where' é a mesma usada na linguagem SQL para realizar uma query. Nesse nosso método, essa instrução poderia ser lida como "alterar todos os registros com os dadosAtualizados onde o id do registro seja igual ao id passado"

    Por ultimo, precisamos apenas registrar a nova rota:
*/
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));