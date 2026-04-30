import z from "zod";
import { serviceSchema } from "./add-service";

export const updateServiceSchema = serviceSchema.partial().extend({
  imagesToRemove: z.array(z.string()).optional(), // URLs of images to delete
  newImages: z.array(z.instanceof(File)).optional(), // New image files to upload
});

export type TUpdateService = z.infer<typeof updateServiceSchema>;
