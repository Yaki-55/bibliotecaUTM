import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '5rc1pjr5',
  dataset: 'production', // Por lo general, es "production"
  apiVersion: '2022-01-01',
  token: 'skVthh0syHaXaPTLQdyh17iBfO3vpo9nTnoRLyJ94KEKIDs8KYNmG5ixZf7dJv3FX1PpjlB27xNgHeNdFqDSeJafx4F5ltK6icus8VSUcowaEAI9OeSnbSWMv7kzGQ85yIIRF2ZxEhMECjFe8OFxPcWfODzRJBg8uI5cpvXSrDbE7hjJGobt',
  useCdn: true, // Activa el CDN para mejorar el rendimiento
});

export default client;