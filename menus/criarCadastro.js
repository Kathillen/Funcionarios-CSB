// Criação de novos usuários

import {log, text, isCancel, select} from "@clack/prompts"

// importando de outros documentos
import { alunosManeger} from "../alunosControl/alunos.js"; 
import { mainMenu } from "./menu.js";
import { admMenu } from "./admControls.js";

export async function criarCadastro(){
    let username;
    let nomeCompleto;
    let idade;
    let graduacao;
    let tiposangue;
    let obs;
    let cel;
    let  endereco;

    
        username = await text ({
            message: "Qual é o primeiro nome?"
        })

    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }

    nomeCompleto = await text ({
            message: "Agora digite o nome completo?"
        })

    if(isCancel(nomeCompleto)){ 
        mainMenu() // chamando o menu principal
        return;
    }

    idade = await text ({
            message: "Qual é a idade do aluno?:"
        })

    if(isCancel(idade)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        

        
        graduacao = await select({
  
            message: "Qual é a graduação? ",
            options: [
                "Faixa branca - 10° Gub",
                "Faixa amarela - 9° Gub",
                "Faixa amarela ponta verde -8° Gub",
                "Faixa verde -7 ° Gub",
                "Faixa verde ponta azul- 6° Gub",
                "Faixa azul - 5° Gub",
                "Faixa azul ponta vermelha - 4° Gub",
                "Faixa vermelha - 3° Gub",
                "Faixa vermelha ponta preta - 1° Gub",
                "Faixa preta - 1° PON",
            ]
        })

        tiposangue = await text ({
            message: "Digite o tipo de sangue:"
        })

    if(isCancel(tiposangue)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        obs = await select ({
            message: "Tem alguma observação clinica?:",
            options:[
                {value: "nenhuma", label: "Nenhuma"},
                {value: "sim", label: "Sim"},
            ]
        })

        switch (obs) {
            case "nenhuma":{
                obs = "Nenhuma"
                break;
            }
            case "sim":{
                obs = await text({
                    message: "Digite a observação clinica:"
                })
                break;
            }
        }

    if(isCancel(obs)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        cel = await text ({
            message: "Qual é o número de celular?:"
        })

    if(isCancel(cel)){ 
        mainMenu() // chamando o menu principal
        return;
    }

    endereco = await text ({
            message: "Qual é o endereço:"
        })

    if(isCancel(endereco)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        const aluno = { 
        username,
        nomeCompleto,
        idade, 
        graduacao,
        tiposangue,
        cel,
        obs,
        endereco,
        status: "Aluno ativo", // status padrão
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj json
    }
    alunosManeger.create(aluno) // Para criar um novo user

    log.success("Cadastro criado com sucesso!");
    
    setTimeout(() => mainMenu() , 3000) 
}
