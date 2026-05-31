# 🎉 ProEventos Front

Aplicação Front-End desenvolvida para consumo da API **ProEventos**, permitindo o gerenciamento de eventos, palestrantes e participantes através de uma interface moderna e responsiva.

Este projeto foi construído com foco em boas práticas de desenvolvimento Front-End, integração com APIs REST e organização escalável da aplicação.

---

# 🚀 Tecnologias Utilizadas

* Angular
* TypeScript
* HTML5
* CSS3
* Bootstrap
* RxJS
* Angular Router
* Angular Forms
* ASP.NET Core API (Back-End)

---

# 📋 Funcionalidades

* Listagem de eventos
* Pesquisa e filtragem de eventos
* Cadastro de eventos
* Edição de eventos
* Exclusão de eventos
* Visualização de detalhes
* Cadastro de palestrantes
* Integração completa com API REST
* Navegação SPA (Single Page Application)

---

# 🏗 Arquitetura da Aplicação

A aplicação foi organizada seguindo a estrutura recomendada pelo Angular para facilitar manutenção e evolução do projeto.

```text
src/
│
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── shared/
│   ├── pages/
│   └── guards/
│
├── assets/
│
├── environments/
│
└── styles/
```

---

# 📦 Conceitos Aplicados

* Componentização
* SPA (Single Page Application)
* Consumo de APIs REST
* Data Binding
* Dependency Injection
* Reactive Programming (RxJS)
* Lazy Loading
* Reutilização de Componentes
* Organização por Responsabilidades

---

# 🔗 Integração com Back-End

Esta aplicação consome a API do projeto:

**ProEventos API**

Repositório:

https://github.com/eliferretti/ProEventosApi

A comunicação é realizada através de endpoints REST para gerenciamento dos dados da plataforma.

---

# ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

* Node.js
* Angular CLI
* Git

Verificar versões:

```bash
node -v
```

```bash
npm -v
```

```bash
ng version
```

---

# 🔧 Instalação

Clone o repositório:

```bash
git clone https://github.com/eliferretti/ProEventosFront.git
```

Acesse a pasta:

```bash
cd ProEventosFront
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

# 🌐 Configuração da API

Configure a URL da API no arquivo de ambiente:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

Ajuste a URL conforme a configuração da sua API local.

---

# 📸 Principais Telas

* Dashboard de eventos
* Cadastro de eventos
* Detalhes do evento
* Gestão de palestrantes
* Pesquisa de eventos

---

# 🎯 Objetivos do Projeto

* Praticar desenvolvimento Front-End com Angular
* Consumir APIs REST utilizando HttpClient
* Aplicar conceitos de componentização
* Trabalhar com rotas e navegação SPA
* Criar uma aplicação integrada ao ecossistema .NET

---

# 📚 Aprendizados

Durante o desenvolvimento foram aplicados conceitos relacionados a:

* Angular Architecture
* Comunicação Front-End ↔ Back-End
* Gerenciamento de estados de tela
* Programação reativa com RxJS
* Organização de aplicações escaláveis
* Integração com APIs ASP.NET Core

---

# 👨‍💻 Autor

Eli Ferretti

GitHub:
https://github.com/eliferretti

LinkedIn:
https://www.linkedin.com

---

# 🔙 Back-End Relacionado

Projeto API utilizado por esta aplicação:

https://github.com/eliferretti/ProEventosApi

---

# 📄 Licença

Projeto desenvolvido para fins de estudo, aprendizado e evolução técnica em Angular e ASP.NET Core.
