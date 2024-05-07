import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'reserva',
  title: 'Reserva',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Titulo',
      type: 'reference',
      to: [{ type: 'libro' },{ type: 'revista' },{ type: 'tesis' }],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'nombreAlumno',
      title: 'Nombre del Alumno',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'fechaInicio',
      title: 'Fecha de Reservación',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'fechaFin',
      title: 'Fecha de Devolución',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'qr',
      title: 'Código QR',
      type: 'image', // Campo para almacenar el código QR de la reserva
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      nombreAlumno: 'nombreAlumno',
      titulo: 'titulo.titulo',
      fechaReserva: 'fechaInicio',
    },
    prepare({ nombreAlumno, titulo, fechaReserva }) {
      return {
        title: `${nombreAlumno} reservó ${titulo}`,
        subtitle: `Fecha de Reserva: ${new Date(fechaReserva).toLocaleDateString()}`,
      };
    },
  },
});
