<div align="center">
	<h1>OCR Invoice Frontend</h1>
	<p>Interface web para upload, análise e exploração de faturas com extração automática de dados e chat assistido por IA.</p>
</div>

## Visão Geral

Este projeto é o frontend do sistema **OCR Invoice**, construído em Next.js (App Router). Ele permite:

- Fazer upload de faturas (PDF / Imagens) para processamento OCR.
- Acompanhar status da fatura (PENDING, ANALYZED, ERROR).
- Visualizar os dados extraídos (itens, totais, impostos, etc.).
- Interagir via Chat (bloqueado até a fatura estar `ANALYZED`).
- Autenticação por credenciais utilizando Auth.js (NextAuth v5).

## Stack Técnica

- **Next.js 15** (App Router)
- **TypeScript**
- **Auth.js / NextAuth v5** (credentials)
- **Axios** (serviços HTTP)
- **React Hook Form + Zod** (validações de formulários)
- **TailwindCSS**
- **Lucide Icons**

## Requisitos

- Node.js 18+
- Yarn (ou npm / pnpm / bun)

## URLS DE PRODUCAO:

URLs de Produção e Repositórios
 - **Frontend:** https://invoice-check-frontend.vercel.app/
 - **Repositório:** https://github.com/pedrohbl03/invoice-check-frontend


 - **Backend:** https://invoice-check-backend.vercel.app/
 - **Repositório:** https://github.com/pedrohbl03/invoice-check-backend

 ## Infraestrutura
 O projeto foi completamente hospedado na infraestrutura da Vercel, utilizando o Neon para
 gerenciamento do banco de dados PostgreSQL.

## Configuração de Ambiente

Crie o arquivo `.env.local` com as variáveis necessárias (baseado em `.env.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
AUTH_SECRET=CHAVE_SECRETA_ALEATORIA
NEXTAUTH_URL=http://localhost:3000
```

Para gerar uma chave segura:

```bash
openssl rand -base64 32
# ou
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/pedrohbl03/invoice-check-frontend.git
cd invoice-check-frontend

# Instalar dependências
yarn install
# ou npm install / pnpm install / bun install
```

## Executar em Desenvolvimento

```bash
yarn dev
# abre em http://localhost:3000
```

## Scripts Principais

| Comando        | Descrição                       |
|----------------|----------------------------------|
| `yarn dev`     | Inicia servidor dev              |
| `yarn build`   | Build de produção                |
| `yarn start`   | Servir build (produção)          |
| `yarn lint`    | Executa ESLint                   |

## Estrutura Simplificada

```
src/
	app/                # Rotas (App Router)
	components/         # Componentes reutilizáveis (UI, Chat, etc.)
	hooks/              # Hooks customizados (ex: useFileUpload)
	services/           # Chamadas HTTP (auth, invoices, users)
	types/              # Definições de tipos e DTOs
	utils/              # Funções utilitárias (ex: cn, format)
```

## Autenticação

Implementada com Auth.js (NextAuth v5) usando provider de credenciais. Fluxo básico:
1. Usuário registra ou faz login (`/signup` / `/signin`).
2. Tokens de sessão são gerenciados pelo NextAuth; dados adicionais podem ser estendidos via callbacks.
3. Rotas internas (dashboard) podem ser protegidas utilizando helpers de sessão.

## Upload de Faturas

O hook `useFileUpload` gerencia seleção, validação (tipo e tamanho), progresso, cancelamento e estado final da fatura enviada.
Chat é desbloqueado somente quando `invoiceStatus === 'ANALYZED'`.

## Melhorias Futuras (Ideias)
- WebSocket / SSE para atualizações em tempo real.
- Internacionalização (i18n).
- Testes unitários e de integração.


## Licença
MIT

---
Made with ❤️ using Next.js.
