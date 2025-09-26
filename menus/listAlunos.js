// Listar os usuários

import {log, select, isCancel} from "@clack/prompts"
import chalk from "chalk"; // importando o chalk para poder formatar o texto


// importanto de outro documento

import { alunosManeger } from '../alunosControl/alunos.js';
import { mainMenu } from './menu.js';
import { updateAlunosMenu } from "./updateAlunos.js";

//.

export async function listAlunosMenu(){
    if(alunosManeger.alunos.size < 1) { // se o numero de usuários for menos do que 1, ou seja, 0
        log.warn("Nenhum aluno encontrado"); 
        setTimeout(() => mainMenu(), 1000);
        return;
    }
    const selected  = await select ({
        message: "Selecione um aluno para ver mais detalhes",
        options: [
                ...alunosManeger.toArray().map(({username, graduacao, status}) => ({ 
                    label: `${alunosManeger.colorStatus(status)} ${chalk.white.underline(username)} ${chalk.gray(graduacao)}`, // exibindo o username e a posição do usuário
                    value: username
                    })),// Para fazer um espalhamento de um array, usando o metodo to array e depois vai mapear todos os items para um novo obj

                    {label: "Menu principal", value: "main"}
        ]
    })
    if(isCancel(selected) || selected === "main") {
        mainMenu();      // para verificar se o prompt foi cancelado ou se o user escolheu voltar para o menu pricipal
        return;
    }

    updateAlunosMenu(selected)  // só vai ser executado se o if não acontecer
}