class MemoryStore {
  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    const entry = {
      ...message,
      id: `${this.messages.length + 1}`,
      timestamp: message.timestamp || new Date().toISOString(),
    };
    this.messages.push(entry);
    return entry;
  }

  getRecent(limit = 10) {
    return this.messages.slice(-limit);
  }

  getLastFromAgent(agentName) {
    for (let i = this.messages.length - 1; i >= 0; i -= 1) {
      if (this.messages[i].author === agentName) {
        return this.messages[i];
      }
    }
    return null;
  }

  turnCount() {
    return this.messages.length;
  }
}

module.exports = MemoryStore;
