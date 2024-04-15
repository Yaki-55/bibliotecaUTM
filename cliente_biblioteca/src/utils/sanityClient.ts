import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '2h3kig75',
  dataset: 'production', // Por lo general, es "production"
  apiVersion: '2022-01-01',
  token: "skPCdNjC9u1FmeGO8HfwhohyoZDOp3TW1hU0XNzzxv2idorTjkD0G9Ywi2Q6xx2tr1GfxVdoTdkeWM9atqaHTHOmsHRRMLxIhtI4MHFaZuCovcI0WuNfx8U072T4LML3a0eAutA8ppuHTZEs8sQYsfLjyk1EQLYn2r1bRYj6uTVtOq5VtC1o",
  useCdn: true, // Activa el CDN para mejorar el rendimiento
});

export default client;