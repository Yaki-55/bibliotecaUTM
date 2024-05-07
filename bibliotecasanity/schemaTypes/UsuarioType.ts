import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'usuario',
    title: 'Usuario',
    type: 'document',
    fields: [
        defineField({
            name: 'nombre',
            title: 'Nombre',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'correo',
            title: 'Correo Electrónico',
            type: 'string',
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: 'contrasena',
            title: 'Contraseña',
            type: 'string',
            validation: Rule => Rule.required().min(6),
        }),
        defineField({
            name: 'tipo_usuario',
            title: 'Tipo de Usuario',
            type: 'string',
            options: {
                list: ['administrador', 'trabajador','alumno'],
            },
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'nombre',
            subtitle: 'correo',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle,
            };
        },
    },
});
