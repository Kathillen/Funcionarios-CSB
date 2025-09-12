import {isCancel, outro, log, select, text} from "@clack/prompts";
import chalk from "chalk"
// imprtanto de outros doumentos
import { admMenu } from "./admControls.js";
import { criarCadastro } from "./novoAluno.js";
import { alunoExistente } from "./alunos.js";

export async function mainMenu(){
    const option = await select({
        message: "O que você deseja fazer?",
        options: [
            {value: "adm", label: "Sou ADM do sistema"},
            {value: "aluno", label: "Sou aluno(a) da academia"},
            {value: "register", label: "Ainda não sou aluno(a) e quero me cadastrar"},
            {value: "exit", label: "Sair"}
        ]
    })
    if(isCancel(option)) return;

    switch (option){
        case "adm":{
            console.log(`${chalk.red.bold("Ok, vamos lá!🥋")}`)
            console.log;
            admMenu()
            return;
        }
        case "aluno":{
            
            console.log(`${chalk.blue.bold("Seja bem-vindo(a) ao painel de alunos da acadêmia!")}`)
            console.log;
            alunoExistente();
            return;
        }
        case "register":{
            console.log(`${chalk.red.bold("Parece que você é novo por aqui!")}`)
            console.log(`${chalk.blue.bold("Seja bem-vindo(a) ao ao nosso painel de cadastros!")}`)
            console.log;
            criarCadastro();
            return;
        }   
        case "exit":{
            outro(chalk.bgRed.rgb(0, 0, 0).bold("Até mais! Volte sempre!🥋"))
            process.exit(0)
        }
    } // fim do switch
}