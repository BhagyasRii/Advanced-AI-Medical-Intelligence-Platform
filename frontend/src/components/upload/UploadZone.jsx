import { UploadCloud } from "lucide-react";
import { useRef } from "react";
import { useUpload } from "@/context/UploadContext";

export default function UploadZone() {

  const inputRef = useRef();

  const { handleFile } = useUpload();

  function onChange(e) {

    handleFile(e.target.files[0]);

  }

  return (

    <>

      <input

        ref={inputRef}

        hidden

        type="file"

        accept="image/*"

        onChange={onChange}

      />

      <div

        onClick={() => inputRef.current.click()}

        className="
        flex
        h-[420px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-3xl
        border-2
        border-dashed
        border-cyan-500/30
        bg-white/5
        transition
        hover:border-cyan-400
      "

      >

        <UploadCloud

          size={60}

          className="text-cyan-400"

        />

        <h2 className="mt-8 text-2xl font-bold">

          Upload Chest X-Ray

        </h2>

        <p className="mt-4 text-center text-slate-400">

          Click to browse

        </p>

      </div>

    </>

  );

}