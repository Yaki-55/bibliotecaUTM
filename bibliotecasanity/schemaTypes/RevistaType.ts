import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'revista',
  title: 'Revistas',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Titulo',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'autor',
      title: 'Autor(es)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'fechaRedaccion',
      title: 'Fecha Redaccion',
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'issn',
      title: 'ISSN',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'codigo',
      title: 'Código',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'edicion',
      title: 'Edición',
      type: 'number',
    }),
    defineField({
      name: 'numPaginas',
      title: 'Número de páginas',
      type: 'number',
    }),
    defineField({
      name: 'tema',
      title: 'Tema',
      type: 'string',
    }),
    defineField({
      name: 'cantidadDisponible',
      title: 'Cantidad disponible',
      type: 'number',
    }),
    defineField({
      name: 'esDonado',
      title: 'Es donado',
      type: 'boolean',
    }),
    // Agrega el campo de imagen
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'fechaRedaccion',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).getFullYear().toString() : '',
      };
    },
  },
});
