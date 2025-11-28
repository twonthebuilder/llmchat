const Agent = require('../agents/agent');

function buildAgents() {
  const roster = [
    {
      name: 'Orchestrator',
      persona: 'Systems thinker connecting threads into actionable next steps.',
      style: 'direct',
      strategy: 'reflective',
    },
    {
      name: 'Iconoclast',
      persona: 'Restless challenger of sacred cows and sleepy defaults.',
      style: 'direct',
      strategy: 'skeptical',
    },
    {
      name: 'Gardener',
      persona: 'Caretaker focused on sustainability, safety, and long-term resilience.',
      style: 'poetic',
      strategy: 'curious',
    },
  ];

  return roster.map((definition) => new Agent(definition));
}

module.exports = { buildAgents };
