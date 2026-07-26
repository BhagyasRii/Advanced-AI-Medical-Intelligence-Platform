import { Button } from "@/components/ui/button";
import { useUpload } from "@/context/UploadContext";

export default function AnalyzePanel() {

  const { selectedImage } = useUpload();

  return (
    <div
      className="
      flex
      h-[420px]
      flex-col
      justify-between
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
    "
    >
      <div>
        <h2 className="text-2xl font-bold">
          AI Diagnosis
        </h2>

        <p className="mt-4 text-slate-400">
          {selectedImage
            ? selectedImage.name
            : "Upload an image to begin analysis."}
        </p>
      </div>

      <Button
        disabled={!selectedImage}
        className="
          h-14
          rounded-2xl
          bg-cyan-500
          text-black
        "
      >
        Analyze Image
      </Button>
    </div>
  );
}