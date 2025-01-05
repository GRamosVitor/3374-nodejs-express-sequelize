/*
    Agora que as migrações estão prontas para subir para o banco e os modelos estão associados, podemos começar a realizar as operações.
    Nós começamos criando as tabelas faltantes através do comando

    npx sequelize-cli db:migrate

    Agora, com as tabelas criadas no banco de dados, precisamos criar os seeders para essas tabelas. Assim como fizemos ao criar as migrações, temos que criar os seeders na mesma ordem que criamos as associações para que as consultas no banco sejam feitas na ordem, dessa forma garantindo que todas as tabelas envolvidas nas associações já existam e não ocorra nenhum conflito.

    Agora, precisamos alterar os arquivos 'seeders', lembrando que esses arquivos são mais genéricos. Lembre-se que, para cada seeder, temos que:
    1 - apagar os comentários
    2 - trocar o nome da tabela
    3 - adicionar o array correspondente (que está, nesse caso, nos arquivos-base, baixados no inicio do curso)

    Agora, podemos rodar o código para preencher o banco. Aqui, vale notar que quando fizemos isso pela primeira vez, usamos o comando 
    
    npx sequelize-cli db:seed:all 

    Porém, como agora o banco já possui dados na tabela 'pessoas', se usarmos esse mesmo comando, os dados serão duplicados. Portanto, ao invés do comando acima, usaremos

    npx sequelize-cli db:seed --seed 20250105214234-demo-categorias.js
    npx sequelize-cli db:seed --seed 20250105214241-demo-cursos.js
    npx sequelize-cli db:seed --seed 20250105214248-demo-matriculas.js

    cada linha deve ser executada separadamente e irá popular a tabela correspondente.
*/