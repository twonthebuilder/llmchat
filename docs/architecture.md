# Architecture Notes

The Agora Terrarium keeps the simulation intentionally simple so you can reshape it for different research or prototyping needs.

## Event Loop
- `Conversation` orchestrates the round-robin loop. Each tick picks the next agent and records the new message in the shared `MemoryStore`.
- The total number of turns is capped by `MAX_TURNS` to avoid runaway logs during experimentation.
- Construction requires a non-empty array of agents and a non-negative safe integer `maxTurns`. Invalid values throw `RangeError` before running; `maxTurns: 0` returns an empty transcript. In particular, `Infinity`, `NaN`, negative/fractional values and numeric strings are rejected rather than silently running or coercing.
- `src/index.js` converts the `MAX_TURNS` environment setting with `Number(...)`; invalid settings therefore fail fast when a `Conversation` is constructed. The interface does not yet enforce a small operational maximum, so operators should still choose bounded values.

## Agents
- Agents are constructed via `buildAgents` in `src/config/agents.js` and share the same interface (`generate(memoryStore, topic)`).
- Persona, speaking style, and strategy nudge the canned reply builder. Swap `Agent.craftReply` with API calls to model providers to create live agents.

## Memory
- `MemoryStore` tracks messages in-memory with helper lookups for recent context and last self-message.
- It is intentionally stateless beyond process memory; persist these records to a database when you need durable memories.

## Extensibility Hooks
- **Custom agents:** add definitions to `src/config/agents.js` or inject new agent instances when constructing `Conversation`.
- **Long-term storage:** replace `MemoryStore` with an implementation that streams transcripts to disk or a hosted store.
- **Interfaces:** the entry point is a plain function (`boot`) in `src/index.js`, making it easy to wrap in a CLI, HTTP API, or UI server.
