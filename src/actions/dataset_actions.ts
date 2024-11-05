"use server";

import { deleteDataset, getDatasets } from "@/services/dataset_service";

export const fetchDatasets = async (page: number) => {
  return await getDatasets(50, page * 50);
};

export const deleteDatasetAction = async (dataset_id: number) => {
  return await deleteDataset(dataset_id);
};
