import {isCancel, outro, log, select, text, intro, stream} from "@clack/prompts";
import { alunoManeger } from "../alunosControl/users.js";
import { criarCadastro} from "./criarCadastro.js";
import { listUsersMenu } from "./listUsers.js";
import { mainMenu } from "./menu.js";
import chalk from "chalk"
import { confirmAdm } from "./confirmAdm.js";



export async function admMenu(){
    
    const acesso = await confirmAdm();

    if (!acesso) return;
    
    async function admOptions(){
    intro("  Você está no painel de controle! ");

    stream.warn((function *() { yield 'Lembre-se "Grandes poderes geram grandes responsabilidades."'; })());
    
    

    const options = await select({
        message: "O que você deseja fazer?",
        options: [
        {value: 'createUser', label: 'Criar novo cadastro'},
        {value: 'listUser', label: 'Listar alunos'},
        {value: 'admOptions', label: "Voltar ao menu adm"},
        {value: 'mainMenu', label: 'Voltar ao menu principal'},
        {value: 'exit', label: 'Sair'}
        ]
    });
    switch(options){
        case "createUser":{
            intro("🕷️ Você escolheu criar um novo usuário! 🕸️");
            createUsers();
            return;
        }
        case "listUser":{
            intro("🕷️ Você escolheu ver a lista de usuários! 🕸️");
            listUsersMenu();
            return;
        }
        case "admOptions":{
                    console.log(chalk.bgBlue.rgb(29, 47, 151, 1).bold("🕷️  Você está voltando ao menu ADM!🕸️"));
                    setTimeout( () => admMenu(), 1000); // chamando o menu principal
                    return;
                }
        case "mainMenu":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold("🕷️  Você está voltando ao menu principal!🕸️"));
                    setTimeout( () => mainMenu(), 1000); // chamando o menu principal
                    return;
                }
                case "exit":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold("🕷️  Você está saindo do aranhaverso!🕸️"));
                    process.exit(0); // encerra o programa
                }
    }

    } await admOptions();
}