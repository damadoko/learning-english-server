# 🧠 Learning English Server

This is the backend server for the **Learning English** application, built with **Node.js** and **PostgreSQL**. The server provides authentication and messaging functionalities, designed to support learning through interaction.

---

## 🚀 Features

- 🌐 GraphQL API using Apollo Server
- 🔐 JWT-based Authentication
- 🗣️ Chat message storage for English learning
- 🧪 Seed script with sample users
- 🛠 Built with modern Node.js (v20)

---

## 📦 Requirements

- **Node.js** v20+
- **PostgreSQL**

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/damadoko/learning-english-server.git
cd learning-english-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
DB_NAME=englishAIdb
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

> **Warning**  
> You must create the PostgreSQL database manually using the name you define in DB_NAME (default: englishAIdb).

### 4. Seed the database

```bash
npm run seed
```

This command will populate the database with two sample users:

- test1 / 123456
- test2 / 123456

### 5. Start the development server

```bash
npm run dev
```

The server will start on the port defined in `.env`

## 🧱 Tech Stack

- Node.js v20
- PostgreSQL
- Sequelize (ORM)
- JWT for authentication