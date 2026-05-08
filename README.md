# Sistema de Gestão de Atendimento Médico com Prontuário Eletrônico

## Descrição

Sistema web para gestão de clínicas médicas de pequeno e médio porte, com funcionalidades de agendamento de consultas, prontuário eletrônico, controle financeiro e gestão de pacientes. Desenvolvido como Trabalho de Conclusão de Curso (TCC) em Engenharia de Software.

## Tecnologias Utilizadas

### Back-end
- Node.js + Express.js
- PostgreSQL (banco de dados relacional)
- JWT (autenticação)
- bcrypt (hash de senhas)
- RBAC (controle de acesso por perfis)

### Front-end
- React.js
- React Router (navegação SPA)
- Axios (requisições HTTP)
- CSS Modules

## Estrutura do Projeto

```
├── backend/
│   ├── src/
│   │   ├── config/         # Configurações (DB, JWT)
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── middleware/     # Auth, RBAC, validação
│   │   ├── models/         # Modelos do banco
│   │   └── routes/         # Rotas da API
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Chamadas à API
│   │   └── styles/         # Estilos CSS
│   ├── public/
│   └── package.json
└── docs/                   # Documentação e diagramas
```

## Funcionalidades

- **Autenticação e Autorização:** Login com JWT e controle de acesso por perfis (Médico, Recepcionista, Administrador)
- **Cadastro de Pacientes:** Registro completo com dados pessoais, alergias e histórico
- **Agendamento de Consultas:** Visualização de horários disponíveis e agendamento com confirmação
- **Prontuário Eletrônico:** Registro de atendimentos com anamnese, exame físico, diagnóstico (CID) e prescrição
- **Controle Financeiro:** Registro de pagamentos vinculados às consultas
- **Logs de Auditoria:** Rastreabilidade de todas as ações em prontuários

## Requisitos de Implantação

- Node.js >= 18.x
- PostgreSQL >= 14.x
- NPM ou Yarn

## Como Executar

### Back-end
```bash
cd backend
npm install
npm run dev
```

### Front-end
```bash
cd frontend
npm install
npm start
```

## Autor

**Erick Toyotoshi Martins**  
Engenharia de Software - Unicesumar  
2025
