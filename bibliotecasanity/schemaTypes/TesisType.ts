import { defineField, defineType } from 'sanity';

// Definir el tipo de documento 'book'
//export const tesisAdd = defineType({
export default defineType({
    name: 'tesis',
    title: 'Tesis',
    type: 'document',
    fields: [
        defineField({
            name: 'tesisId',
            title: 'TesisId',
            type: 'number',
        }),        
        defineField({
            name: 'titulo',
            title: 'Título',
            type: 'string',
        }),
        defineField({
            name: 'autor',
            title: 'Autor(e)',
            type: 'string',
        }),        
        defineField({
            name: 'fechaPresentacion',
            title: 'Fecha de presentación',
            type: 'date',
        }),
        defineField({
            name: 'instituto',
            title: 'Instituto',
            type: 'string',
        }),        
        defineField({
            name: 'numeroPaginas',
            title: 'No. de páginas',
            type: 'number',
        }),
        defineField({
            name: 'codigo',
            title: 'Código',
            type: 'string',
        }),
        defineField({
            name: 'donado',
            title: '¿Es donado?',
            type: 'boolean',
        }),
    ]
})