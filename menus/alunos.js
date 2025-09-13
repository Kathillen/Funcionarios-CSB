
import {log, text, isCancel, select, intro} from "@clack/prompts"
import chalk from "chalk";

// importandoe 
// outros documentos
import { alunosManeger } from "../alunosControl/alunos.js"; 
import { criarCadastro } from "./criarCadastro.js";
import { admMenu } from "./admControls.js";
import { mainMenu } from "./menu.js";



export async function alunoExistente(){
    // Verifica se o usuário já existe no sistema
    // Se existir, exibe uma mensagem de boas-vindas
    // Se não existir, exibe opções para se cadastrar, tentar novamente, ou sair
    let username;

        username = await text ({
            message: "Digite o seu nome:"
        })
        if( alunosManeger.alunos.has(username)){ // verificando se já existe um usuário com esse nome
            intro(`${chalk.blue.bold(` Olá, ${username}, você está cadastrado no sistema 🥋🪪`)}`);

        } else {
            console.log("Ops, parece que você ainda não está cadastrado no aranhaverso.");
            const ask = await select({
                message: "Oque você gostaria de fazer agora?",
                options: [
                    {value: "register", label: "Quero me cadastrar"},
                    {value: "tryAgain", label: "Tentar novamente"},
                    {value: "mainMenu", label: "Voltar ao menu principal"},
                    {value: "exit", label: "Sair do aranhaverso"}
                ]
            })
            switch(ask){
                case "register":{
                    console.log(chalk.red.bold("Você escolheu se cadastrar no aranhaverso!"));
                    createUsers();
                    return;
                }
                case "tryAgain":{
                    console.log(chalk.blue.bold("Vamos tentar novamente!"));
                        alunoExistente()
                        return; 
                }
                case "mainMenu":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold(" Você está voltando ao menu principal!"));
                    setTimeout( () => mainMenu(), 1000); // chamando o menu principal
                    return;
                }
                case "exit":{
                    console.log(chalk.bgRed.rgb(0, 0, 0).bold("  Você está saindo do sistema!"));
                    process.exit(0); // encerra o programa
                }
        }
    } while(!alunosManeger.alunos.has(username)); 
        
    
    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }
    
}