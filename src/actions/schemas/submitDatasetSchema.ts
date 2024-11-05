import { MONTHS } from "@/utils/constants";
import { z } from "zod";

export const submitDatasetSchema = z.object({
  title: z.string().min(3),

  pdf_url: z.string(),
});
