import { z } from 'zod';

export const demoRequestSchema = z.object({
  nombreCompleto: z.string().trim().min(2, 'Ingresá tu nombre y apellido'),
  direccion: z.string().trim().min(3, 'Ingresá tu dirección'),
  pais: z.string().trim().min(2, 'Seleccioná tu país'),
  email: z.string().trim().email('Ingresá un email válido'),
  nombreComercio: z.string().trim().min(2, 'Ingresá el nombre del comercio'),
  paginaWeb: z.string().trim().optional().or(z.literal('')),
});
