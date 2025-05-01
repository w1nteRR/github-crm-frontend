import { z } from 'zod';

export const addProjectSchema = z
  .object({
    name: z.string()
  });

export type IAdProjectInput = z.infer<typeof addProjectSchema>;
