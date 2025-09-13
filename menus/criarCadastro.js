// Criação de novos usuários

import {log, text, isCancel, select} from "@clack/prompts"

// importando de outros documentos
import { alunoManeger} from "../alunoControl/alunos.js"; 
import { mainMenu } from "./menu.js";
import { admMenu } from "./admControls.js";

export async function criarCadastro(){
    let username;
    let idade;
    let graduacao;
    let tiposangue;
    let obs;
    let cel;
    let  endereco;

    
        username = await text ({
            message: "Qual é o nome?"
        })

    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }

    idade = await text ({
            message: "QUal é a idade do aluno?:"
        })

    if(isCancel(idade)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        

        
        graduacao = await select({
            message: "Qual é a graduação? )",
            options: [
                {value: "branca", label: "Sou faixa branca - 10° Gub"},
                {value: "cinza", label: "Sou faixa cinza - 9° Gub "},
                {value: "amarela", label: "Sou faixa amarela - 8° Gub"},
                {value: "laranja", label: "Sou faixa laranja -7° Gub"},
                {value: "verde", label: "Sou faixa verde -6 ° Gub"},
                {value: "roxo", label: "Sou faixa roxa - 5° Gub"},
                {value: "azul", label: "Sou faixa azul - 4° Gub"},
                {value: "marrom", label: "Sou faixa marrom - 3° Gub"},
                {value: "vermelho", label: "Sou faixa vermelha - 2° Gub"},
                {value: "verPreta", label: "Sou faixa ver/preta - 1° Gub"},
                {value: "pretoVermelho", label: "Sou faixa preta - 1° PON"},
                {value: "preto", label: "Sou faixa preta - 1° DAN"},
            ]
        })

        tiposangue = await text ({
            message: "Digite o tipo de sangue:"
        })

    if(isCancel(tiposengue)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        obs = await text ({
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
        idade, 
        graduacao,
        tiposangue,
        cel,
        obs,
        endereco,
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj json
    }
    alunoManeger.create(aluno) // Para criar um novo user

    log.success("Cadastro criado com sucesso!");
    
    setTimeout(() => mainMenu() , 3000) 
}
