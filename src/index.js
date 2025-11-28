const dotenv = require('dotenv');
const { buildAgents } = require('./config/agents');
const Conversation = require('./core/conversation');
const MemoryStore = require('./memory/memoryStore');

dotenv.config();

const topic = process.env.TOPIC || 'building a digital terrarium for AI agents';
const maxTurns = Number(process.env.MAX_TURNS || 9);

function boot() {
  const agents = buildAgents();
  const memoryStore = new MemoryStore();
  const conversation = new Conversation({ agents, memoryStore, topic, maxTurns });

  const transcript = conversation.run();
  console.log('\n=== THE AGORA AWAKENS ===');
  console.log(`Topic: ${topic}`);
  console.log('');
  transcript.forEach((message) => {
    console.log(`[${message.author}] ${message.text}`);
  });

  console.log('\nMoments captured:', transcript.length);
  return transcript;
}

if (require.main === module) {
  boot();
}

module.exports = { boot };
