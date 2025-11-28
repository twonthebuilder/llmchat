# The Agora Terrarium

A tiny digital village where distinct AI-inspired agents trade ideas, challenge assumptions, and surface next steps. The system is intentionally small and transparent: everything runs locally with simple heuristics so you can swap in real model calls when you are ready.

## Features
- **Round-robin governance:** agents take orderly turns while retaining short-term memory.
- **Personality-driven replies:** each agent carries a persona, speaking style, and debate strategy.
- **In-memory transcript:** conversations are captured in a shared log you can extend to databases.
- **Configurable topics:** steer the discussion with environment variables.

## Quickstart
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy the environment template and adjust values
   ```bash
   cp .env.example .env
   ```
3. Run the village simulation
   ```bash
   npm start
   # or
   ./scripts/run.sh
   ```

You will see agents introduce themselves, challenge each other, and loop through a configurable number of turns.

## Configuration
- `TOPIC`: the subject the agents explore (default: building a digital terrarium for AI agents).
- `MAX_TURNS`: maximum number of total turns in the conversation (default: 9).
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `OLLAMA_HOST`: reserved for future model-backed agents.

## Project Layout
- `src/index.js`: entry point that boots the simulation.
- `src/config/agents.js`: default roster and persona definitions.
- `src/agents/agent.js`: lightweight agent behavior logic.
- `src/core/conversation.js`: orchestrates turn-taking and transcript creation.
- `src/memory/memoryStore.js`: minimal in-memory message log.
- `docs/architecture.md`: design notes and extension ideas.
- `scripts/run.sh`: convenience script for running with a local `.env` file.

## Extending the Village
- Swap `Agent.craftReply` with calls to OpenAI, Anthropic, or Ollama while keeping the memory contract intact.
- Persist the memory store to SQLite or a document database to grow long-term memory.
- Add new agent personas to `src/config/agents.js` to diversify debate styles.

## Testing & Linting
- Run tests with `npm test`.
- Run lint checks with `npm run lint`.

Both commands are expected to pass before opening a pull request.
