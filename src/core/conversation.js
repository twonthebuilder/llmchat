class Conversation {
  constructor({ agents, memoryStore, topic, maxTurns = 9 }) {
    this.agents = agents;
    this.memoryStore = memoryStore;
    this.topic = topic;
    this.maxTurns = maxTurns;
  }

  *turns() {
    let turn = 0;
    while (turn < this.maxTurns) {
      const agent = this.agents[turn % this.agents.length];
      yield agent;
      turn += 1;
    }
  }

  run() {
    const transcript = [];
    for (const agent of this.turns()) {
      const message = agent.generate(this.memoryStore, this.topic);
      this.memoryStore.addMessage(message);
      transcript.push(message);
    }
    return transcript;
  }
}

module.exports = Conversation;
