# 🤖 PartSelect AI Chat Agent

An intelligent conversational agent for appliance parts e-commerce — built with **LangGraph, FastAPI, PostgreSQL, Redis, and React**.

The system supports:
- 🔍 Part search  
- 🛠️ Issue diagnosis  
- 🔄 Compatibility checks  
- 📹 Installation guidance  
- 💬 Multi-turn AI conversations  

---

## 🌟 Overview

This platform uses an **intent-driven architecture** powered by a **5-node LangGraph agent**:

- 🧠 **LLM-based intent classification**  
- 💾 **Redis-backed context persistence**  
- 🔍 **Hybrid search** (Postgres full-text + ChromaDB semantic search)  
- 🔧 **Diagnostic reasoning**  
- 🟢 **Real-time part recommendations**  
- 📘 **Installation instructions & videos**  

---

## 🏗️ Architecture Flowchart

```mermaid
flowchart TD
    %% ----------------------
    %% INTENT CLASSIFICATION
    %% ----------------------
    A[User Query] --> B{Intent Classification}

    B -->|search_part| C1[Keyword Search + Brand Filter]
    B -->|diagnose_issue| C2[Symptom Mapping → Part Search]
    B -->|compatibility_check| C3[Model ↔ Part Lookup]
    B -->|installation_help| C4[Fetch How-To Guides]
    B -->|product_details| C5[Retrieve Part Info]
    B -->|general_question| C6[General Response]

    %% ----------------------
    %% 5-NODE AGENT PIPELINE
    %% ----------------------
    subgraph AGENT_PIPELINE [5-Node Agent Pipeline]
        D1[1. Understand Query]
        D2[2. Search Products]
        D3[3. Gather Context]
        D4[4. Recommend Parts]
        D5[5. Generate Response]
    end

    C1 --> D2
    C2 --> D2
    C3 --> D2
    C4 --> D3
    C5 --> D3
    C6 --> D5

    D1 --> D2 --> D3 --> D4 --> D5
    D5 --> Z[Final Chat Response]

    %% Styling
    style A fill:#e1f5e1
    style B fill:#fff3e0
    style AGENT_PIPELINE fill:#f3e5f5
    style Z fill:#e1f5e1

```

Quick Start
Prerequisites

Python 3.9+

Node.js 16+

Docker + Docker Compose

1️⃣ Start Infrastructure
# Start PostgreSQL, Redis, ChromaDB
docker-compose up -d

# Verify containers
docker-compose ps

2️⃣ Backend Setup
cd partselect-backend

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Add your DEEPSEEK_API_KEY

Load Data
python scripts/load_data.py
python scripts/load_semantic_data.py

Start API Server
python -m app.main
# → http://localhost:8000

3️⃣ Frontend Setup
cd partselect-frontend

npm install
npm start
# → http://localhost:3000
