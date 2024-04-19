import { defineField, defineType } from 'sanity';

// Definir el tipo de documento 'book'
export const bookType = defineType({
  // Nombre del tipo de documento
  name: 'book',
  
  // Título legible para humanos del tipo de documento
  title: 'Book',
  
  // Tipo de documento en Sanity, en este caso, un documento
  type: 'document',
  
  // Definición de los campos del tipo de documento
  fields: [

    // Definir el campo 'Título'
       defineField({
        name: 'title',
        type: 'string',
      }),

    // Definir el campo 'Código'
    defineField({
      name: 'code',
      type: 'string',
    }),

    // Definir el campo 'Edición'
    defineField({
      name: 'edition',
      type: 'number',
    }),

    // Definir el campo 'Número de páginas'
    defineField({
      name: 'numPages',
      type: 'number',
    }),

    // Definir el campo 'Tema'
    defineField({
      name: 'theme',
      type: 'string',
    }),



    // Definir el campo 'Autor'
    defineField({
      name: 'author',
      type: 'string',
    }),

    // Definir el campo 'Fecha de publicación'
    defineField({
      name: 'publicationDate',
      type: 'date',
    }),

    // Definir el campo 'Cantidad disponible'
    defineField({
      name: 'availableQuantity',
      type: 'number',
    }),

    // Definir el campo 'Es donado'
    defineField({
      name: 'isDonated',
      type: 'boolean',
    }),

    // Definir el campo 'ISBN'
    defineField({
      name: 'ISBN',
      type: 'string',
    }),
  ],
});
