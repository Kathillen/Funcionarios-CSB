import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import chalk from "chalk";
const filePath = path.join(process.cwd(), "alunos.json");

if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify([]), "utf-8");
}

const data = readFileSync(filePath, { encoding: "utf-8" });
const parsed = JSON.parse(data);

const alunos = new Map(parsed.map(aluno => [aluno.username, aluno]));

export const alunosManeger = {
    alunos,
    save() {
    const data = this.toArray();
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    },
    create(aluno) {
    this.alunos.set(aluno.username, aluno);
    this.save();
    },
    toArray() {
    return Array.from(this.users.values());
    },
    colorStatus(status){ // definir uma cor dependendo do status da task
        switch(status){
            
            case "Aluno ativo": {
                return chalk.bgGreen(`${status}`)// se o status for em andamento, vai retornar a cor amarela
            }
            case "Aluno inativo":{
                return chalk.bgRed(`${status}`)
            }
            default:{
                return chalk.bgWhite(`${status}`) // se não for nenhum dos outros, vai retornar a cor branca
            }
        }
    }
};