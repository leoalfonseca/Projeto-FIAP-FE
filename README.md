# Projeto FIAP Front-end

## Overview

Esse repositório corresponde à entrega do trabalho do primeiro semestre da pós-graduação em Front-End Engineering da FIAP.  
Projeto com fins exclusivamente acadêmicos.

## Referência utilizada

Figma do projeto fornecido pelo professor:

```sh
www.figma.com/design/ns5TC3X5Xr8V7I3LYKg9KA/Projeto-Financeiro?node-id=503-4264
```

## Features

- Dashboard com controle de widgets via Redux
- Módulo de Transações com CRUD
- Upload e download de comprovante de transações
- Separação de tipos em microfrontend dedicado

## Microfrontend

Este projeto utiliza a estratégia de monorepo com `npm workspaces`, onde o microfrontend `types` é responsável por compartilhar tipos TypeScript entre os módulos da aplicação:

```
├── core/        → Aplicação principal (Next.js)
├── types/       → Microfrontend com tipos reutilizáveis
```

O `core` importa diretamente tipos da lib `types`, por exemplo:

```ts
import { IValueGetter } from 'types';
```

## Tech Stack

- Next.js
- TypeScript
- Material UI (MUI)
- Redux
- Docker

---

## Inicialização (modo local)

Clone o repositório e instale as dependências:

```bash
npm install
```

Para rodar o projeto localmente em modo desenvolvimento:

```bash
cd core
npm run dev
```

---

## Executando com Docker

Para rodar a aplicação com Docker:

### 1. Compile a imagem Docker:

```bash
docker build -t projeto-fiap-fe .
```

### 2. Execute o container:

```bash
docker run -p 3000:3000 projeto-fiap-fe
```

### 3. Acesse no navegador:

```txt
http://localhost:3000
```

---

> ⚠️ Caso veja avisos como `env.MODE` ou `env.ENVIRONMENT` no terminal, são apenas mensagens de configuração esperadas pelo Next.js, e não impedem o funcionamento da aplicação.

---

## Autor

Projeto desenvolvido por Leonardo Fonseca como parte da entrega da disciplina de Front-End da FIAP (2024/2025).
```