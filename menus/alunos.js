
import {log, text, isCancel, select, intro} from "@clack/prompts"
import chalk from "chalk";

// importandoe outros documentos
import { alunoMenager } from "../alunosControl/alunos.js"; 
import { createUsers } from "./newUser.js";
import { admMenu } from "./admControls.js";
import { mainMenu } from "./menu.js";
import { Password } from "./password.js";

export async function alunoExistente(){
    // Verifica se o usuário já existe no sistema
    // Se existir, exibe uma mensagem de boas-vindas
    // Se não existir, exibe opções para se cadastrar, tentar novamente, ou sair
    let username;

        username = await text ({
            message: "Digite o nome do aluno:"
        })
        if( userManeger.users.has(username)){ // verificando se já existe um usuário com esse nome
            intro(`${chalk.blue.bold(`🕷️ Olá, ${username}, você realmente é um aracnídeo!`)}`);
            console.log("Você passou da primeira fase da verficação para entrar na teia!")
            Password(username);
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
                        existUser()
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
    } while(!userManeger.users.has(username)); 
        
    
    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }
    
}