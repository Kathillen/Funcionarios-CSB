import {isCancel, outro, log, select, text, intro, stream} from "@clack/prompts";
import { alunosManeger } from "../alunosControl/alunos.js";
import { criarCadastro} from "./criarCadastro.js";
import { listAlunosMenu } from "./listAlunos.js";
import { mainMenu } from "./menu.js";
import chalk from "chalk"

export async function admMenu(){
    
    intro("  Você está no painel de controle! ");

    stream.warn((function *() { yield 'Lembre-se "Grandes poderes geram grandes responsabilidades."'; })());
    
    

    const options = await select({
        message: "O que você deseja fazer?",
        options: [
        {value: 'criarAluno', label: 'Criar novo cadastro'},
        {value: 'listarAlunos', label: 'Listar alunos'},
        {value: 'mainMenu', label: 'Voltar ao menu principal'},
        {value: 'exit', label: 'Sair'}
        ]
    });
    switch(options){
        case "criarAluno":{
            intro(" Você escolheu criar um novo cadastro!");
            criarCadastro();
            return;
        }
        case "listarAlunos":{
            intro("Você escolheu ver a lista de alunos!");
            listAlunosMenu();
            return;
        }
        case "mainMenu":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold("Você está voltando ao menu principal!"));
                    setTimeout( () => mainMenu(), 1000); // chamando o menu principal
                    return;
                }
                case "exit":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold("🥋Você está saindo do sistema!👋🏽"));
                    process.exit(0); // encerra o programa
                }
    }

} 
