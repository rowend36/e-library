import { ActionResponse } from "@/actions/ActionResponse";
import { submitDatasetAction } from "@/actions/submit_dataset";
import { ButtonBase } from "@/components/base/ButtonBase";
import InputBase from "@/components/base/InputBase";
import Modal from "@/components/Modal";
import { uploadAndGetUrl } from "@/config/storage";
import { MONTHS } from "@/utils/constants";
import errorDescription from "@/utils/error_description";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { DocumentUpload, Minus } from "iconsax-react";
import { startTransition, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export default function UploadDatasetsForm({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const [state, action] = useFormState(
    async (_: any, form: FormData) => {
      try {
        setIsPending(true);
        console.log("Uploading pdf....");
        const pdf_url = await uploadAndGetUrl(form.get("pdf") as File);
        form.delete("pdf");
        form.append("pdf_url", pdf_url);
        return await submitDatasetAction(form);
      } finally {
        setIsPending(false);
      }
    },
    {
      success: false,
    }
  );

  const [query, setQuery] = useState("");
  const fetchController = useRef({
    blockUntil: 0, // block future requests
    active: query,
    tag: 0,
    lastTag: 0,
  });
  const [title, setTitle] = useState("Harry Potter");
  const [pdf, setPdf] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const resetForm = () => {
    startTransition(() => {
      formRef.current?.reset();
      state.success = false;
      state.errors = state.data = state.message = undefined;
      setTitle("");
      setPdf(null);
    });
  };
  console.log(state);
  return (
    <form action={action} ref={formRef}>
      <Modal alert open={state.success} onClose={onSubmit}>
        <h3 className="text-center">Dataset Uploaded Successfully</h3>
        <div className="flex-grow" />
        <ButtonBase variant="transparent" className="my-4" onClick={resetForm}>
          Upload Another
        </ButtonBase>
        <ButtonBase variant="transparent" onClick={onSubmit}>
          Dismiss
        </ButtonBase>
      </Modal>
      {state.success === false && state.message ? (
        <div className="text-red-500 mb-8">{state.message}</div>
      ) : null}
      <InputBase
        error={errorDescription(state, "title")}
        type="text"
        name="title"
        value={title}
        setValue={setTitle}
        placeholder="Dataset Title"
        className="mb-4"
      />
      <label
        htmlFor="pdf"
        className=" relative text-center cursor-pointer overflow-hidden hover:border-primary h-32 w-56 max-w-full justify-end rounded-xl mx-auto text-darkGrayishBlue flex flex-col items-center border p-4 mt-4 appearance-none "
      >
        <DocumentUpload
          className={`${
            pdf ? "text-primary" : "text-darkGrayishBlue"
          } h-20 w-20 m-1`}
        />
        {pdf ? (
          <span className="text-xs text-ellipsis">{pdf.name}</span>
        ) : (
          <i>Drag here or Click to upload PDF</i>
        )}
        <input
          type="file"
          required
          id="pdf"
          onChange={(e) => {
            setPdf(e.target.files?.[0] ?? null);
          }}
          name="pdf"
          accept="application/pdf, application/epub+zip"
          className="opacity-5 bg-primary absolute inset-0 cursor-pointer"
        />
      </label>
      <p className="text-red-500 text-center">
        {errorDescription(state, "pdf") || isPending}
      </p>
      {state.success === false && state.message ? (
        <div className="text-red-500 mt-8 text-center">{state.message}</div>
      ) : null}
      <ButtonBase
        type="submit"
        className="mx-auto block mt-8"
        disabled={isPending}
      >
        Submit
      </ButtonBase>
    </form>
  );
}
