import { useUpload } from "@/context/UploadContext";

export default function ImagePreview() {

  const { selectedImage } = useUpload();

  return (

    <div

      className="
      flex
      h-[420px]
      items-center
      justify-center
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-black
    "

    >

      {

        selectedImage ?

        (

          <img

            src={selectedImage.preview}

            alt="preview"

            className="
            h-full
            w-full
            object-contain
          "

          />

        )

        :

        (

          <p className="text-slate-500">

            No image selected

          </p>

        )

      }

    </div>

  );

}