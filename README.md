[![JARVIS CI](https://github.com/racoon-001/JARVIS/actions/workflows/ci.yml/badge.svg)](https://github.com/racoon-001/JARVIS/actions/workflows/ci.yml)

# JARVIS — AI-Powered Local Desktop Assistant

JARVIS is a local AI-powered desktop assistant built with **Node.js and TypeScript**. It combines AI capabilities with system-level automation, memory, file operations, process control, screen awareness, and voice interaction.

The project is designed to run locally on a Windows PC and demonstrates practical use of **TypeScript, AI APIs, SQLite, Docker, GitHub Actions, and automated testing**.

## 🚀 Features

* 🤖 AI-powered question answering using Google Gemini
* 🧠 Persistent memory using SQLite
* 💻 Desktop application control
* 🌐 Open applications such as Chrome, Notepad, Calculator, and VS Code
* 📂 File and folder operations
* ⚙️ Process and system monitoring
* 📸 Screenshot capture
* 🖥️ Active-window awareness
* 🎙️ Voice input and speech-to-text
* 🔊 Text-to-speech support
* 🧭 Intent routing between commands, memory, and AI
* 🐳 Docker containerization
* ⚙️ GitHub Actions CI/CD
* 🧪 Automated intent-router and database CRUD tests

## 🛠️ Tech Stack

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| Node.js        | Runtime environment       |
| TypeScript     | Application development   |
| Google Gemini  | AI capabilities           |
| SQLite         | Persistent memory         |
| better-sqlite3 | SQLite integration        |
| Docker         | Containerization          |
| GitHub Actions | CI/CD automation          |
| npm            | Package management        |
| Git & GitHub   | Version control           |
| dotenv         | Environment configuration |

## 📁 Project Structure

```text
JARVIS/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── ai.ts
│   ├── activeWindows.ts
│   ├── commands.ts
│   ├── database.ts
│   ├── fileTools.ts
│   ├── intentRouter.ts
│   ├── memoryTool.ts
│   ├── processControl.ts
│   ├── processTools.ts
│   ├── screenshotTools.ts
│   ├── speechToText.ts
│   ├── systemControl.ts
│   ├── systemTools.ts
│   ├── ttsTools.ts
│   ├── voiceAssistant.ts
│   ├── voiceTools.ts
│   ├── wakeWord.ts
│   └── test*.ts
├── Dockerfile
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/racoon-001/JARVIS.git
cd JARVIS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit the `.env` file or expose your API key publicly.

### 4. Build the project

```bash
npm run build
```

### 5. Run JARVIS

```bash
npm start
```

## 🧪 Running Tests

Run the automated test suite with:

```bash
npm test
```

The test suite currently verifies:

* Intent classification
* Memory database creation
* Memory retrieval
* Memory updates
* Memory deletion

Database tests use an isolated test database so the user's actual JARVIS memory database is not modified.

## 🐳 Docker

Build the Docker image:

```bash
docker build -t jarvis .
```

Run the container:

```bash
docker run --rm jarvis
```

Docker is used to package the application and its runtime dependencies into a reproducible environment.

> Note: Some Windows-specific desktop and hardware features may not be available inside a Linux Docker container. Docker is primarily used here to demonstrate containerization and reproducible application builds.

## ⚙️ CI/CD

JARVIS uses **GitHub Actions** to automatically validate changes pushed to the `main` branch.

The CI pipeline performs:

```text
Push / Pull Request
        ↓
Checkout repository
        ↓
Install dependencies
        ↓
Build TypeScript
        ↓
Run automated tests
        ↓
Build Docker image
        ↓
CI result
```

This helps ensure that new changes do not break the build, tests, or Docker image.

## 🔐 Security

Sensitive configuration is stored using environment variables.

The following files are intentionally excluded from Git:

```text
.env
node_modules/
*.db
voice-test.*
whisper.cpp/
```

API keys and local databases should never be committed to the repository.

## 🎯 Project Goals

JARVIS was developed as a practical project to explore:

* AI application development
* TypeScript and Node.js
* Desktop automation
* Local system interaction
* Database-backed memory
* Voice interfaces
* REST/API integration concepts
* Automated testing
* Docker containerization
* CI/CD with GitHub Actions
* Git/GitHub development workflows

## 📌 Current Status

JARVIS is an actively developed local desktop assistant.

### Completed

* AI integration
* Intent routing
* Persistent memory
* System tools
* File operations
* Process control
* Screenshot functionality
* Screen awareness
* Voice components
* Docker configuration
* Automated testing
* GitHub Actions CI pipeline

### Future Improvements

* More robust natural-language command handling
* Expanded voice interaction
* Better error handling
* Additional automated tests
* Improved security and permissions
* More desktop automation capabilities

## 👨‍💻 Author

**Ishika Harshyana**

Computer Science & Engineering

Built as a practical AI + software engineering project.
