# Maps Module Structure

A "template-structure" é uma extensão para o Visual Studio Code que simplifica a criação de estruturas de módulos em projetos TypeScript. Ela permite que você crie rapidamente uma estrutura de pastas e arquivos padrão para organizar componentes, containers, serviços e outros elementos em seu projeto.

## Como Usar

Baixe aqui a extensão "template-structure do Visual Studio.
Abra o VS Code e vá para a seção de extensões (clique no ícone de quadrados no lado esquerdo da barra lateral ou use o atalho Ctrl+Shift+X).
Clique em "Instalar" na extensão "template-structure".

## Configurações

Selecione a pasta no explorador de arquivos do VS Code onde deseja criar a estrutura do módulo.
Execute o comando "template-structure.create" através do menu de comandos (Ctrl+Shift+P e digite o comando).


## Utilização

A extensão solicitará a você que selecione uma pasta para criar a estrutura do módulo.
Insira o nome do módulo quando solicitado.
A extensão criará automaticamente a estrutura de pastas e arquivos, seguindo as práticas recomendadas.
A extensão perguntará qual o nome do módulo que deseja criar (opcional).
Use [PREFIX-CAMELCASE] e/ou [PREFIX-KEBABCASE] dentro dos seus arquivos para substituir pelo nome do seu módulo caso deseje.
ex.: import { [PREFIX-CAMELCASE]Repository } from '../repository/[PREFIX-KEBABCASE].repository';
Você também pode usar PREFIX-KEBABCASE no nome do diretrório.
Ex.: PREFIX-KEBABCASE-filter, PREFIX-KEBABCASE-list, PREFIX-KEBABCASE-novo ...

## Problemas Conhecidos

Não copia pastas vazias.

## Contribuições

//

## Licença

Use e abuse.
