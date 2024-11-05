"use server";
import { addDataset } from "@/services/dataset_service";
import validateForm from "@/utils/validate_form";
import { ZodError } from "zod";
import { ActionResponse } from "./ActionResponse";
import { submitDatasetSchema } from "./schemas/submitDatasetSchema";

export async function submitDatasetAction(
  form: FormData
): Promise<ActionResponse> {
  try {
    const data = validateForm(form, submitDatasetSchema);
    console.log({ data });
    await addDataset(data);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, message: "Server Error" };
  }
  return { success: true };
  // Call the service function to submit the dataset
}
