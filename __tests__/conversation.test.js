const Agent = require('../src/agents/agent');
const Conversation = require('../src/core/conversation');
const MemoryStore = require('../src/memory/memoryStore');

describe('Conversation', () => {
  test('cycles through agents in a predictable order', () => {
    const agents = [
      new Agent({ name: 'A', persona: 'alpha' }),
      new Agent({ name: 'B', persona: 'beta' }),
    ];
    const memoryStore = new MemoryStore();
    const conversation = new Conversation({ agents, memoryStore, topic: 'order', maxTurns: 3 });

    const transcript = conversation.run();
    const speakers = transcript.map((msg) => msg.author);

    expect(speakers).toEqual(['A', 'B', 'A']);
  });

  test('records messages in memory store', () => {
    const agents = [new Agent({ name: 'Solo', persona: 'solo' })];
    const memoryStore = new MemoryStore();
    const conversation = new Conversation({ agents, memoryStore, topic: 'memory', maxTurns: 2 });

    conversation.run();

    expect(memoryStore.turnCount()).toBe(2);
    expect(memoryStore.getRecent(1)[0].author).toBe('Solo');
  });
});
