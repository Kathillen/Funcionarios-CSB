// ATUALIZAÇÃO DE USUÁRIO 

import { alunosManeger } from '../alunosControl/alunos.js';
import {log, select, isCancel, text} from "@clack/prompts";
import { listAlunosMenu } from './listAlunos.js';
import { admMenu } from "./admControls.js";

import chalk from "chalk"; 

export async function updateAlunosMenu(username){ 

    const aluno = alunosManeger.alunos.get(username); 

    const formatedDate = new Date(aluno.createdAt).toLocaleString(); // para ter a data formatada e poder ser exibida
    const status = alunosManeger.colorStatus(aluno.status);

    log.info([
        `Aluno: ${aluno.username}`,
        `Nome Completo: ${aluno.nomeCompleto}`,
        `Graduação: ${aluno.graduacao}`,
        `idade: ${aluno.idade}`,
        `Aluno desde: ${chalk.bgBlue(formatedDate.toString())}`,
        `Tipo Sanguíneo: ${aluno.tiposangue}`,
        `Endereço: ${aluno.endereco}`,
        `Telefone: ${aluno.cel}`,
        `Observação Clínica: ${aluno.obs}`,
        `Status: ${status}`,
        
    ].join("\n")) // join para exibir os intens do array com uma quebra de linha
    const selected  = await select({
        message: "Oque você deseja fazer?",
        options: [
            {label: "Alterar nome", value:"username"},
            {label: "Alterar graduação", value:"graduacao"},
            {label: "Alterar idade", value:"idade"},
            {label: "Alterar endereço", value:"endereco"},
            {label: "Alterar telefone", value:"cel"},
            {label: "Alterar status", value:"status"},
            {label: "Alterar observação clínica", value:"obs"},
            {label: "Deletar", value:"delete"},
            {label: "Voltar à lista", value:"back"},
            {label: "Voltar ao menu", value: "admMenu"}
        ]
    }) 
    if(isCancel(selected)){
        listAlunosMenu();
        return;
    }

    switch(selected){

        case "username":{
            const oldAlunoName = aluno.username; // criado no inicio do código

            const newAlunoName = await text ({
                message: "Digite o novo nome do usuário:",
                validate(input){ // para validar oque o usuario esta digitando sem que ele precise clicar em enter
                    if(alunosManeger.alunos.has(input)){
                        return "O novo nome não pode ser igual o antigo!";
                    }
                }
            });
            if(isCancel(newAlunoName)){
                updateAlunosMenu(oldAlunoName); // se  o usuario cancelar, ira voltar para o  nome antigo e as alterações do name não serão salvas
                return;
            }
            alunosManeger.alunos.delete(oldAlunoName); // deleta o username antigo
            const updateAlunosName = { ...aluno, username: newAlunoName} // espalha no map de user o novo username
            alunosManeger.alunos.set(newAlunoName, updateAlunosName); 
            alunosManeger.save(); 
            updateAlunosMenu(newAlunoName); // chama a função novamente para atualizar o menu com o novo nome
            return;
        }

        case "graduacao":{
            const alunoGraduacao = [
                "faixa branca - 10° Gub",
                "faixa amarela - 9° Gub",
                "faixa amarela ponta verde -8° Gub",
                "faixa verde -7 ° Gub",
                "faixa verde ponta azul- 6° Gub",
                "faixa azul - 5° Gub",
                "faixa azul ponta vermelha - 4° Gub",
                "faixa vermelha - 3° Gub",
                "faixa vermelha ponta preta - 1° Gub",
                "faixa preta - 1° PON",
            ]
        
            const options = alunoGraduacao
            .filter(graduacao => graduacao !== aluno.graduacao)  // para filtrar todos os status que são diferentes do status que já está
            .map(graduacao => ({ label: graduacao, value: graduacao})) // para cada um dos status será criado uma opção para o prmpt de select
            
            const graduacao = await select({
                message: "Selecione a nova graduacao:",
                options // isto é uma short sintaxe, já que ja existe as opçoes em forma de variavel, é so passar elas aqui pra dentro
            })
            if(isCancel(graduacao)){
                updateAlunosMenu(username);
            return;
            }
            alunosManeger.alunos.set(username, {...aluno, graduacao}) 
            alunosManeger.save(); // salva as alterações no arquivo json
            updateAlunosMenu(username); // chama a função novamente para atualizar o menu com o novo status
            return;
        }

            case "idade": {
                console.log(`Idade atual: ${aluno.idade}`);

                    const newIdade = await text({
                        message: "Digite a nova idade:",
                        validate(input) {
                            if (input === aluno.idade) {
                                return "A nova idade não pode ser igual ao antigo!";
                            }
                        }
                    });

                    if (isCancel(newIdade)) {
                    updateAlunosMenu(username);
                    return;
                    }

    
            const updatedAluno = { ...aluno, idade: newIdade};

    alunosManeger.alunos.set(username, updatedAluno);
    alunosManeger.save();

    updateAlunosMenu(username);
    return;
    }

        case "endereco": {
                console.log(`Endereço atual: ${aluno.endereco}`);

                    const newEndereco = await text({
                        message: "Digite o novo endereço:",
                        validate(input) {
                            if (input === aluno.endereco) {
                                return "A novo endereço não pode ser igual ao antigo!";
                            }
                        }
                    });

                    if (isCancel(newEndereco)) {
                    updateAlunosMenu(username);
                    return;
                    }

    
            const updatedAluno = { ...aluno, endereco: newEndereco};

    alunosManeger.alunos.set(username, updatedAluno);
    alunosManeger.save();

    updateAlunosMenu(username);
    return;
    }

        case "cel": {
            console.log(`Número atual: ${aluno.cel}`);

            const newCel = await text({
                message: "Digite o novo número:",
                validate(input) {
                if (input === aluno.cel) {
                    return "O novo número não pode ser igual ao antigo!";
                }
            }
            });

        if (isCancel(newCel)) {
        updateAlunosMenu(username);
        return;
        }

        const updatedAluno = { ...aluno, cel: newCel };

        alunosManeger.alunos.set(username, updatedAluno);
        alunosManeger.save();

        updateAlunosMenu(username);
        return;
    }
        
        case "status":{
            const alunoStatus = [
                "Aluno ativo",
                "Aluno inativo"
            ]
            const options = alunoStatus
            .map(status => ({ label: status, value: status})) // para cada um dos status será criado uma opção para o prmpt de select
            
            const status = await select({
                message: "Selecione o novo status do usuário:",
                options // isto é uma short sintaxe, já que ja existe as opçoes em forma de variavel, é so passar elas aqui pra dentro
            })
            if(isCancel(status)){
                updateAlunosMenu(username);
            return;
            }
            alunosManeger.alunos.set(username, {...aluno, status}) 
            alunosManeger.save(); // salva as alterações no arquivo json
            updateAlunosMenu(username); // chama a função novamente para atualizar o menu com o novo status
            return;
        
        }

        case "obs": {
            console.log(`Observações atuais: ${aluno.obs}`);

            const newObs = await text({
            message: "Digite a nova observação clínica:",
            });

            if (isCancel(newObs)) {
                updateAlunosMenu(username);
                return;
            }
    
            const updatedAluno = { 
                ...aluno, 
                obs: aluno.obs 
                ? `${aluno.obs}; ${newObs}`  // se já existir algo, adiciona com separador
                : newObs                      // se não existir, cria a primeira
            }

            alunosManeger.alunos.set(username, updatedAluno);
            alunosManeger.save()

            updateAlunosMenu(username)
            return;
        }
        case"delete":{
            alunosManeger.alunos.delete(username); 
            alunosManeger.save()
        }
        case "admMenu":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold("Você está voltando ao menu ADM!🥇"));
                    setTimeout( () => admMenu(), 1000); // chamando o menu principal
                    return;
                }
        case"back":{
            listAlunosMenu(); // volta para o menu de listar users
            return;
        }

    }
}