export default function ScanLines() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 4px, rgba(0,229,255,.18) 5px)",
        }}
      />
    </div>
  );
}