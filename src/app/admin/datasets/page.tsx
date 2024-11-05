"use client";
import { deleteDatasetAction, fetchDatasets } from "@/actions/dataset_actions";
import UploadDatasetsForm from "@/components/admin/datasets/UploadDatasetsForm";
import { ButtonBase } from "@/components/base/ButtonBase";
import Modal from "@/components/Modal";
import { Dataset } from "@/data/models/dataset";
import { useEffect, useState } from "react";

export default function ManageDatasetsPage() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const [datasets, setDatasets] = useState([] as Dataset[]);
  const [refreshToken, setRefreshToken] = useState(1);
  const refresh = () => {
    setRefreshToken((e) => {
      return e + 1;
    });
  };
  useEffect(() => {
    fetchDatasets(page).then(setDatasets);
  }, [page, refreshToken]);
  return (
    <>
      <h1 className="font-bold text-xl text-darkBlue mt-4">Manage Datasets</h1>
      <div className="flex justify-end">
        <ButtonBase onClick={() => setShowModal(true)}>
          Upload New Dataset
        </ButtonBase>
      </div>
      <Modal title="Upload New Dataset" open={showModal} onClose={setShowModal}>
        {showModal ? (
          <UploadDatasetsForm onSubmit={() => setShowModal(false)} />
        ) : null}
      </Modal>
      <div className="overflow-auto flex max-w-full">
        <table className="w-full mt-8 min-w-[480px]">
          <thead>
            <tr className="bg-slate-500 text-white">
              <th className="p-1 border-r border-black">ID</th>
              <th className="p-1 border-r border-black">Title</th>
              <th className="p-1 border-r border-black">Date Uploaded</th>
              <th className="p-1 border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((e) => (
              <tr key={e.dataset_id} className="odd:bg-slate-100">
                <td className="p-1 w-8 border-r border-black">
                  {e.dataset_id}
                </td>
                <td className="p-1 pl-4 border-r border-black">{e.title}</td>
                <td className="p-1 pl-4">{e.created_at?.toLocaleString()}</td>
                <td className="w-8 px-4">
                  <ButtonBase
                    size="small"
                    onClick={() => {
                      deleteDatasetAction(e.dataset_id);
                      setDatasets((datasets) => {
                        return datasets.filter((f) => e !== f);
                      });
                      refresh();
                    }}
                  >
                    Delete
                  </ButtonBase>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
