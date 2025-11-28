class Agent {
  constructor({ name, persona, style, strategy }) {
    this.name = name;
    this.persona = persona;
    this.style = style || 'direct';
    this.strategy = strategy || 'reflective';
  }

  createContext(memoryStore, topic) {
    const recent = memoryStore.getRecent(8);
    const lastMessage = recent[recent.length - 1];
    const myLast = memoryStore.getLastFromAgent(this.name);

    return {
      topic,
      recent,
      lastMessage,
      myLast,
      priorTurns: memoryStore.turnCount(),
    };
  }

  craftReply(context) {
    const { topic, lastMessage, myLast, recent } = context;
    const beats = [];

    if (!lastMessage) {
      beats.push(`Opening stance on ${topic}: ${this.persona}`);
    } else if (lastMessage.author === this.name) {
      beats.push('Reflecting quietly to avoid echoing myself.');
    } else {
      beats.push(`Responding thoughtfully to ${lastMessage.author}.`);
    }

    if (this.strategy === 'curious') {
      beats.push('Asking clarifying question to deepen the thread.');
    } else if (this.strategy === 'skeptical') {
      beats.push('Challenging assumptions to keep the debate lively.');
    } else {
      beats.push('Linking current ideas back to the shared topic.');
    }

    if (myLast && recent.length > 2) {
      beats.push('Building continuity with my earlier stance.');
    }

    const cadence = this.style === 'poetic' ? '🌿' : '➜';

    return `${cadence} ${beats.join(' ')}`;
  }

  generate(memoryStore, topic) {
    const context = this.createContext(memoryStore, topic);
    return {
      author: this.name,
      persona: this.persona,
      text: this.craftReply(context),
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = Agent;
