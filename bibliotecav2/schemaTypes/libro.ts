import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'libro',
    title: 'Libros',
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
        name: 'fechaPublicacion',
        title: 'Fecha Publicacion',
        type: 'date',
        options: {
        dateFormat: 'YYYY',
    },
        validation: Rule => Rule.required()
    }),
    defineField({
        name: 'isbn',
        title: 'ISBN',
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
    // Campos definidos para libro
    ],
    preview: {
    select: {
        title: 'titulo',
        subtitle: 'fechaPublicacion',
    },
    prepare({ title, subtitle }) {
    return {
        title,
        subtitle: subtitle ? new Date(subtitle).getFullYear().toString() : '',
        };
    },
    },
});