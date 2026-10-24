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

  test('rejects an empty or missing agent roster', () => {
    for (const agents of [[], undefined, null]) {
      expect(() => new Conversation({ agents, memoryStore: new MemoryStore(), topic: 'empty' }))
        .toThrow('Conversation requires at least one agent.');
    }
  });

  test.each([Infinity, NaN, -1, 1.5, '3', Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid maxTurns value %s',
    (maxTurns) => {
      const agents = [new Agent({ name: 'A', persona: 'alpha' })];
      expect(() => new Conversation({ agents, memoryStore: new MemoryStore(), maxTurns }))
        .toThrow('maxTurns must be a non-negative safe integer.');
    },
  );

  test('allows zero turns without generating messages', () => {
    const memoryStore = new MemoryStore();
    const agents = [new Agent({ name: 'A', persona: 'alpha' })];
    const conversation = new Conversation({ agents, memoryStore, topic: 'zero', maxTurns: 0 });
    expect(conversation.run()).toEqual([]);
    expect(memoryStore.turnCount()).toBe(0);
  });
});
