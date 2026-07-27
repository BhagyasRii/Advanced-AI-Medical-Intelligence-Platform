const STATUS_STYLES = {
  CRITICAL: "bg-error-container/20 text-error",
  STABLE: "bg-secondary-container/20 text-on-secondary-container",
  PENDING: "bg-tertiary-container/10 text-tertiary",
};

const DOT_STYLES = {
  Positive: "bg-error",
  Negative: "bg-secondary",
  "Review Req.": "bg-tertiary",
};

export function StatusBadge({ status }) {
  return (
    <span className={`px-sm py-base rounded-full text-label-md font-bold ${STATUS_STYLES[status] || "bg-surface-container text-on-surface-variant"}`}>
      {status}
    </span>
  );
}

export function ResultDot({ result }) {
  return (
    <div className="flex items-center gap-base">
      <span className={`w-2 h-2 rounded-full ${DOT_STYLES[result] || "bg-outline"}`}></span>
      <span className="font-body-md text-body-md font-bold">{result}</span>
    </div>
  );
}
