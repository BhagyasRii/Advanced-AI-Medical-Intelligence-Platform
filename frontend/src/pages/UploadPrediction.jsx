import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import { createPrediction } from "../services/api";

const STEPS = [
  { key: "upload", label: "Uploading Image", icon: "cloud_upload" },
  { key: "inference", label: "Running AI Diagnostic Model", detail: "Analyzing spatial features...", icon: "sync" },
  { key: "gradcam", label: "Generating Grad-CAM Overlays", detail: "Mapping pathology regions...", icon: "layers" },
  { key: "report", label: "Synthesizing Medical Report", detail: "LLM clinical summarization...", icon: "description" },
];

const MAX_SIZE_MB = 25;

export default function UploadPrediction() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | running | error
  const [activeStep, setActiveStep] = useState(-1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);
  const stepTimers = useRef([]);

  useEffect(() => {
    return () => {
      stepTimers.current.forEach(clearTimeout);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = useCallback(
    (selected) => {
      if (!selected) return;
      const isImage = selected.type.startsWith("image/") || /\.(dcm|dicom)$/i.test(selected.name);
      if (!isImage) {
        setErrorMsg("Please choose a PNG, JPG, or DICOM file.");
        return;
      }
      if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`File is larger than ${MAX_SIZE_MB}MB.`);
        return;
      }
      setErrorMsg("");
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(selected);
      setPreviewUrl(selected.type.startsWith("image/") ? URL.createObjectURL(selected) : null);
      setStatus("idle");
      setActiveStep(-1);
    },
    [previewUrl]
  );

  const resetUpload = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setActiveStep(-1);
    setUploadProgress(0);
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startAnalysis = async () => {
    if (!file) return;
    setStatus("running");
    setActiveStep(0);
    setUploadProgress(0);
    setErrorMsg("");

    // Advance through the visual pipeline steps while the request is in
    // flight. If the backend responds faster or slower, the UI still lands
    // on the final "done" state only once the real response arrives.
    stepTimers.current.push(setTimeout(() => setActiveStep(1), 900));
    stepTimers.current.push(setTimeout(() => setActiveStep(2), 2200));
    stepTimers.current.push(setTimeout(() => setActiveStep(3), 3600));

    try {
      const data = await createPrediction(file, {
        onUploadProgress: setUploadProgress,
      });
      stepTimers.current.forEach(clearTimeout);
      setActiveStep(4);
      const id = data?.id ?? data?.prediction_id;
      setTimeout(() => {
        if (id) {
          navigate(`/results/${id}`);
        } else {
          setStatus("error");
          setErrorMsg("The analysis finished but no result ID was returned by the server.");
        }
      }, 500);
    } catch (err) {
      stepTimers.current.forEach(clearTimeout);
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.detail ||
          "Couldn't reach the diagnostic API. Confirm the backend is running and VITE_API_BASE_URL is set correctly."
      );
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files[0]);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow pt-32 pb-xl px-gutter max-w-[1200px] mx-auto w-full">
        <div className="mb-xl text-left">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Diagnostic Image Upload</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Upload high-resolution Chest X-Rays for immediate AI-driven pathology detection and automated clinical
            report generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
          {/* Upload column */}
          <div className="lg:col-span-7 space-y-md">
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                className={`relative group h-[480px] upload-dashed bg-surface-container-low hover:bg-surface-container transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden p-xl ${
                  dragActive ? "bg-primary/10" : ""
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-sm">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-sm group-hover:scale-110 transition-transform">
                    <Icon name="upload_file" className="text-primary" size={40} />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Drag &amp; drop chest X-ray</h3>
                  <p className="font-body-md text-on-surface-variant max-w-xs">Supports PNG, JPG, or DICOM files up to {MAX_SIZE_MB}MB.</p>
                  <button
                    type="button"
                    className="mt-md px-lg py-sm bg-primary text-on-primary rounded-xl font-semibold shadow-lg hover:shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    Browse Files
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  accept="image/*,.dcm,.dicom"
                  className="hidden"
                  type="file"
                  onChange={(e) => handleFiles(e.target.files?.[0])}
                />
              </div>
            ) : (
              <div className="relative h-[480px] rounded-2xl bg-surface-container-low flex flex-col items-center justify-center gap-md p-xl">
                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white glass">
                  {previewUrl ? (
                    <img className="w-full h-full object-cover" src={previewUrl} alt="Selected chest X-ray preview" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <Icon name="folder_zip" className="text-white/50" size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-sm left-sm right-sm text-white">
                    <p className="font-body-md font-bold truncate">{file.name}</p>
                    <p className="text-xs opacity-80">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                  {status !== "running" && (
                    <button
                      onClick={resetUpload}
                      className="absolute top-sm right-sm w-10 h-10 rounded-full bg-error/90 text-white flex items-center justify-center hover:bg-error transition-colors shadow-lg"
                    >
                      <Icon name="close" />
                    </button>
                  )}
                </div>
                {status !== "running" && (
                  <button
                    onClick={startAnalysis}
                    className="w-full max-w-sm px-lg py-md bg-primary text-on-primary rounded-xl font-bold shadow-xl flex items-center justify-center gap-sm hover:translate-y-[-2px] transition-all"
                  >
                    <Icon name="analytics" />
                    Start AI Analysis
                  </button>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="p-sm bg-error-container/20 border border-error/20 rounded-xl flex items-center gap-sm text-error font-body-sm">
                <Icon name="error" />
                {errorMsg}
              </div>
            )}

            <div className="glass p-md rounded-2xl border border-outline-variant/20 flex gap-md items-start">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
                <Icon name="verified_user" className="text-tertiary" />
              </div>
              <div>
                <h4 className="font-body-md font-bold text-on-surface">HIPAA Compliant Processing</h4>
                <p className="font-body-sm text-on-surface-variant">
                  All uploads are encrypted end-to-end. Patient metadata is automatically anonymized before AI
                  processing occurs in our secure clinical cloud.
                </p>
              </div>
            </div>
          </div>

          {/* Status column */}
          <div className="lg:col-span-5">
            <div className="glass rounded-3xl p-lg border border-outline-variant/30 shadow-xl h-full flex flex-col">
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-headline-md text-headline-md text-on-surface">Analysis Pipeline</h3>
                <span className="px-sm py-xs bg-surface-container rounded-full text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  Status: {status === "idle" ? "Idle" : status === "running" ? "Processing" : "Error"}
                </span>
              </div>

              {status !== "running" ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-md py-xl">
                  <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-outline">
                    <Icon name="pending_actions" size={48} />
                  </div>
                  <p className="font-body-md text-on-surface-variant px-sm">
                    Waiting for file selection to begin the clinical diagnostic sequence.
                  </p>
                </div>
              ) : (
                <div className="space-y-lg">
                  <div className="flex flex-col items-center py-md">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
                      <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                        <Icon name="neurology" className="text-primary animate-pulse" size={32} />
                      </div>
                    </div>
                    <p className="mt-md font-body-md font-bold text-primary animate-pulse">AI Engine Processing...</p>
                  </div>
                  <div className="space-y-sm">
                    {STEPS.map((step, i) => {
                      const done = activeStep > i || activeStep >= 4;
                      const active = activeStep === i;
                      return (
                        <div
                          key={step.key}
                          className={`flex items-center gap-md p-sm rounded-xl transition-all duration-500 ${
                            active || done ? "opacity-100 bg-primary-container/5 border border-primary/10" : "opacity-40 grayscale"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              done ? "bg-primary text-white" : "bg-surface-container-highest text-on-surface-variant"
                            }`}
                          >
                            <Icon name={done ? "check" : step.icon} className={active && !done ? "animate-spin" : ""} size={16} />
                          </div>
                          <div>
                            <p className="font-body-sm font-bold text-on-surface">{step.label}</p>
                            {step.key === "upload" ? (
                              <div className="h-1 w-full bg-surface-container rounded-full mt-xs overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${done ? 100 : uploadProgress}%` }}
                                ></div>
                              </div>
                            ) : (
                              <p className="text-[10px] text-on-surface-variant uppercase">{step.detail}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
