export default function UploadProgress() {
  return (
    <div
      className="
      mt-10
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-6
    "
    >
      <div className="mb-3 flex justify-between">

        <span>

          Upload Status

        </span>

        <span>

          Waiting

        </span>

      </div>

      <div className="h-2 rounded-full bg-slate-700">

        <div
          className="h-full w-0 rounded-full bg-cyan-400"
        />

      </div>
    </div>
  );
}