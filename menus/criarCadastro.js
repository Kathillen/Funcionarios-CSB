// Criação de novos usuários

import {log, text, isCancel, select} from "@clack/prompts"

// importando de outros documentos
import { alunoManeger} from "../alunoControl/alunos.js"; 
import { mainMenu } from "./menu.js";
import { admMenu } from "./admControls.js";

export async function criarCadastro(){
    let username;
    let password;
    let graduacao;
    
        username = await text ({
            message: "Digite o username:"
        })

    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        do {
        password = await text ({
            message: "Digite a senha que você deseja:"
        })
        if(password.length < 6 || password === username){ 
            log.error("Ei, sua senha precisa ter no mínimo 6 caracteres e sua senha não pode ser igual ao ser username, pilantra! SEJA CRIATIVO(A). Tente novamente!"); 
        } 
    } while(password.length < 6  || password === username ); 

        if(isCancel(password)){ 
            mainMenu()
            return;
        }
        graduacao = await select({
            message: "Qual é a sua graduação? ( Seja sincnero(a) )",
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

        const aluno = { 
        username,
        password, 
        graduacao, 
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj json
    }
    alunoManeger.create(aluno) // Para criar um novo user

    log.success("Cadastro criado com sucesso!");
    
    setTimeout(() => mainMenu() , 3000) 
}
