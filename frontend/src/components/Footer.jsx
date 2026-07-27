import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="w-full py-md bg-surface-container-low border-t border-outline-variant/20 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-content mx-auto gap-sm">
        <div className="flex items-center gap-xs">
          <Icon name="clinical_notes" className="text-primary text-label-md" />
          <p className="font-label-md text-label-md font-bold text-primary">
            © {new Date().getFullYear()} MedAI Intelligence. Clinical-grade AI Diagnostics.
          </p>
        </div>
        <div className="flex gap-md">
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors underline"
            href="#"
          >
            HIPAA Compliance
          </a>
        </div>
      </div>
    </footer>
  );
}
