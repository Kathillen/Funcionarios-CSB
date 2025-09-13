import {isCancel, outro, log, select, text} from "@clack/prompts";
import chalk from "chalk"
// imprtanto de outros doumentos
import { admMenu } from "./admControls.js";
import { criarCadastro } from "./criarCadastro.js";
//import { alunoExistente } from "./alunos.js";

export async function mainMenu(){
    const option = await select({
        message: "O que você deseja fazer?",
        options: [
            {value: "adm", label: "Sou Adiministrador do sistema"},
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
        case "exit":{
            outro(chalk.bgRed.rgb(0, 0, 0).bold("Até mais! Volte sempre!🥋"))
            process.exit(0)
        }
    } // fim do switch
}