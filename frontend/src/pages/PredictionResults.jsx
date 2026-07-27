import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import { getPredictionById, BACKEND_BASE_URL } from "../services/api";
import { mockPredictionDetail } from "../services/mockData";

const TABS = ["Overview", "Medical Report", "Grad-CAM", "Recommendations"];

export default function PredictionResults() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPredictionById(id)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setUsingDemoData(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData({ ...mockPredictionDetail, id });
          setUsingDemoData(true);
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-md">
          <div className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin"></div>
          <p className="text-on-surface-variant font-body-sm">Loading diagnostic result...</p>
        </div>
      </div>
    );
  }

  const d = data;
  const gradcamFilename = d?.gradcam_image?.split(/[\\/]/).pop();
  const gradcamUrl = d?.gradcam_image?.startsWith("http")
    ? d.gradcam_image
    : gradcamFilename
    ? `${BACKEND_BASE_URL}/gradcam/${gradcamFilename}`
    : null;

  return (
    <div className="font-body-md text-body-md overflow-x-hidden min-h-screen flex flex-col" style={{ backgroundColor: "#f7f9fb" }}>
      <AppHeader />
      <main className="flex-grow pt-24 pb-xl px-gutter max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-lg w-full">
        {/* Left Column */}
        <section className="lg:col-span-7 space-y-md">
          {usingDemoData && (
            <div className="p-sm bg-tertiary-container/10 border border-tertiary/20 rounded-xl flex items-center gap-sm text-tertiary font-body-sm">
              <Icon name="info" />
              Showing demo data — couldn't fetch record "{id}" from the API.
            </div>
          )}

          <div className="glass-panel rounded-xl p-lg shadow-sm animate-emerge">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-sm mb-md">
              <div>
                <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mb-base">
                  AI Diagnostic Analysis
                </p>
                <h2 className="font-display text-display text-primary leading-tight">{d.prediction}</h2>
              </div>
              <div className="flex items-center gap-xs">
                <div className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-bold flex items-center gap-base">
                  <Icon name="verified" size={16} />
                  {d.confidence}% Confidence
                </div>
                <div className="bg-error-container text-on-error-container px-sm py-xs rounded-full font-bold">{d.prediction}</div>
              </div>
            </div>
            <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">{d.report?.report_summary}</p>
          </div>

          {/* Image viewer */}
          <div className="bg-black rounded-xl overflow-hidden relative shadow-2xl h-[500px] animate-emerge">
            {gradcamUrl ? (
              <img
                className="w-full h-full object-contain"
                src={gradcamUrl}
                alt="GradCAM"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30">
                <Icon name="radiology" size={96} />
              </div>
            )}
            <div className="absolute top-md right-md">
              <div className="bg-black/60 backdrop-blur-md p-sm rounded-lg border border-white/10">
                <p className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">Prediction ID: {d.id}</p>
                <p className="text-white font-mono text-[12px]">{new Date(d.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-outline-variant/30 flex gap-lg overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-sm font-label-md text-label-md whitespace-nowrap transition-colors ${
                  activeTab === tab ? "active-tab" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "Overview" && (
            <div className="space-y-lg pt-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Diagnosis Summary</h3>
                  <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20">
                    <ul className="space-y-xs">
                      {(d.report?.radiological_findings
                        ? [d.report.radiological_findings]
                        : []).map((finding, i) => (
                        <li key={i} className="flex items-start gap-xs">
                          <Icon name="check_circle" className="text-primary mt-1" size={16} />
                          <span className="text-on-surface-variant">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-sm">
                <h3 className="font-headline-md text-headline-md text-on-surface">Clinical Interpretation</h3>
                <p className="text-on-surface-variant leading-relaxed">{d.report?.clinical_interpretation}</p>
              </div>
            </div>
          )}

          {activeTab === "Medical Report" && (
            <div className="pt-sm space-y-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface">LLM-Generated Report</h3>
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 whitespace-pre-line text-on-surface-variant leading-relaxed">
                {d.report?.report_summary || d.report?.clinical_interpretation}
              </div>
            </div>
          )}

          {activeTab === "Grad-CAM" && (
            <div className="pt-sm space-y-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface">Explainability Heatmap</h3>
              <p className="text-on-surface-variant">
                Regions in red/orange indicate the pixels that most influenced the model's prediction, generated via
                Grad-CAM on the final convolutional layer.
              </p>
              {!d.gradcam_image && (
                <div className="h-40 bg-surface rounded-xl border border-dashed border-outline-variant flex items-center justify-center italic text-body-sm text-outline">
                  Grad-CAM overlay not available for this record
                </div>
              )}
            </div>
          )}

          {activeTab === "Recommendations" && (
            <div className="pt-sm space-y-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface">Suggested Next Steps</h3>
              <ul className="space-y-xs">
                {(
                  d.report?.warning_signs ||
                  (d.report?.follow_up_recommendations
                    ? [d.report.follow_up_recommendations]
                    : []) ||
                  [
                    "Correlate findings with patient symptoms and vitals.",
                    "Consider follow-up imaging in 48–72 hours if symptoms persist.",
                    "Escalate to a specialist if confidence is below the clinical threshold.",
                  ]
                ).map((rec, i) => (
                  <li key={i} className="flex items-start gap-xs text-on-surface-variant">
                    <Icon name="arrow_forward" className="text-primary mt-1" size={16} />
                    {rec}
                  </li>
                ))}
              </ul>
              {d.report?.patient_guidance && (
                <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 text-on-surface-variant leading-relaxed">
                  <h4 className="font-headline-sm text-on-surface">Patient Guidance</h4>
                  <p>{d.report.patient_guidance}</p>
                </div>
              )}
              {d.report?.disclaimer && (
                <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 text-on-surface-variant leading-relaxed text-[13px] opacity-90">
                  {d.report.disclaimer}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Right column */}
        <aside className="lg:col-span-5 space-y-md">
          <div className="glass-panel rounded-xl p-md shadow-sm">
            <div className="flex items-center gap-sm mb-md">
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                <Icon name="description" />
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] text-on-surface">Prediction Details</h4>
                <p className="text-on-surface-variant font-label-md text-label-md">ID: {d.id}</p>
              </div>
            </div>
            <div className="space-y-sm border-t border-outline-variant/30 pt-md">
              <div className="p-sm bg-surface-container rounded-lg">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase">Prediction</p>
                <p className="text-headline-md text-primary">{d.prediction}</p>
              </div>
              <div className="p-sm bg-surface-container rounded-lg">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase">Confidence</p>
                <p className="text-headline-md text-secondary">{d.confidence}%</p>
              </div>
              <div className="p-sm bg-surface-container rounded-lg">
                <p className="text-[10px] text-on-surface-variant font-bold uppercase">Created At</p>
                <p className="text-headline-md text-on-surface">{new Date(d.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-md rounded-xl">
            <div className="flex justify-between items-center mb-sm">
              <h5 className="font-label-md text-label-md text-on-surface uppercase">Probability Distribution</h5>
              <Icon name="info" className="text-outline" size={16} />
            </div>
            <div className="space-y-sm">
              {Object.entries(d.probabilities || {}).map(([label, value], i) => {
                const percentage = typeof value === "number"
                  ? value > 1
                    ? Math.round(value)
                    : Math.round(value * 100)
                  : 0;
                return (
                  <div key={label} className="space-y-base">
                    <div className="flex justify-between text-body-sm">
                      <span>{label}</span>
                      <span className="font-bold">{percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-primary-fixed-dim"}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-sm pt-md">
            <button className="w-full bg-surface border border-outline-variant text-on-surface font-semibold py-md rounded-xl hover:bg-surface-container transition-all flex items-center justify-center gap-base">
              <Icon name="send" />
              Refer to Specialist
            </button>
            <button className="w-full text-error font-semibold py-sm rounded-xl hover:bg-error-container/10 transition-all flex items-center justify-center gap-base">
              <Icon name="flag" />
              Report AI Inaccuracy
            </button>
            <Link to="/dashboard" className="text-center text-primary font-label-md text-label-md hover:underline pt-xs">
              Back to Dashboard
            </Link>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
