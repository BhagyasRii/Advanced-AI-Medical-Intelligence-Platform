import UploadZone from "@/components/upload/UploadZone";
import ImagePreview from "@/components/upload/ImagePreview";
import AnalyzePanel from "@/components/upload/AnalyzePanel";
import UploadProgress from "@/components/upload/UploadProgress";

export default function Prediction() {
  return (
    <section className="section py-16">

      <div className="mb-12">

        <h1 className="text-5xl font-black">

          Chest X-Ray Diagnosis

        </h1>

        <p className="mt-4 text-slate-400">

          Upload a chest X-ray to generate an AI-assisted analysis.

        </p>

      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        <UploadZone />

        <ImagePreview />

        <AnalyzePanel />

      </div>

      <UploadProgress />

    </section>
  );
}