import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Footer from "../components/Footer";

const avatarGradients = ["from-primary/30 to-primary-fixed", "from-secondary/30 to-secondary-container", "from-tertiary/30 to-tertiary-container"];

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-card").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700", "ease-out");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-white overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <nav className="flex justify-between items-center px-gutter h-16 max-w-content mx-auto">
          <div className="flex items-center gap-xs cursor-pointer active:scale-95 transition-transform">
            <Icon name="clinical_notes" filled className="text-primary text-headline-md" />
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">MedAI Pulse</span>
          </div>
          <div className="hidden md:flex items-center gap-lg">
            <Link
              to="/dashboard"
              className="text-primary font-semibold font-label-md transition-colors hover:bg-primary-container/10 px-base py-xs rounded-lg"
            >
              Dashboard
            </Link>
            <a className="text-on-surface-variant hover:text-primary font-label-md transition-colors px-base py-xs rounded-lg" href="#workflow">
              Clinical Research
            </a>
            <a className="text-on-surface-variant hover:text-primary font-label-md transition-colors px-base py-xs rounded-lg" href="#features">
              Technology
            </a>
            <Link
              to="/upload"
              className="bg-primary text-white px-md py-xs rounded-full font-label-md hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              Analyze X-Ray
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-16 flex-grow">
        {/* Hero */}
        <section className="relative min-h-[795px] flex items-center overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/5 rounded-l-full -z-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary-container/10 rounded-full -z-10 blur-3xl"></div>
          <div className="max-w-content mx-auto px-gutter grid md:grid-cols-2 gap-xl items-center">
            <div className="space-y-md">
              <div className="inline-flex items-center gap-xs px-sm py-base bg-secondary-container text-on-secondary-container rounded-full font-label-md">
                <Icon name="verified" size={16} />
                <span>Clinical Grade AI Architecture</span>
              </div>
              <h1 className="font-display text-display leading-tight text-on-surface">
                AI-Powered <span className="gradient-text">Chest X-Ray</span> Analysis
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Identify pathologies with unprecedented precision. Our platform leverages Grad-CAM explainability and deep
                learning to provide instant clinical insights and automated medical reporting.
              </p>
              <div className="flex flex-wrap gap-sm pt-xs">
                <Link
                  to="/upload"
                  className="bg-primary text-white px-lg py-sm rounded-xl font-headline-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-xs"
                >
                  <Icon name="upload_file" />
                  Analyze X-Ray
                </Link>
                <a
                  href="#features"
                  className="border border-outline-variant text-on-surface-variant px-lg py-sm rounded-xl font-headline-md hover:bg-surface-container transition-all active:scale-95"
                >
                  Learn More
                </a>
              </div>
              <div className="flex items-center gap-md pt-sm border-t border-outline-variant/20">
                <div className="flex -space-x-sm">
                  {avatarGradients.map((g, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${g}`}
                    />
                  ))}
                </div>
                <p className="text-label-md text-on-surface-variant">
                  <span className="font-bold text-primary">500+</span> Doctors using MedAI daily
                </p>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="glass-card rounded-3xl p-sm shadow-xl relative z-10 overflow-hidden">
                <div className="w-full aspect-[4/3] rounded-2xl border border-outline-variant/30 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src="/hero-medical-ai.svg"
                    alt="Medical AI illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute bottom-6 right-6 flex flex-col gap-xs">
                  <div className="bg-white/90 backdrop-blur-md p-xs rounded-lg shadow-lg border border-primary/20 flex items-center gap-xs">
                    <Icon name="warning" filled className="text-error" />
                    <span className="font-label-md text-on-surface">Pneumonia Detected (98.2%)</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full border border-primary/10 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-tertiary-container/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section id="features" className="py-xl bg-surface-container-lowest">
          <div className="max-w-content mx-auto px-gutter">
            <div className="text-center mb-xl space-y-xs">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Clinical Intelligence Suite</h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Precision tools designed to augment the diagnostic capabilities of radiologists and clinicians through
                advanced machine learning.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {/* Card 1 */}
              <div className="md:col-span-2 reveal-card glass-card rounded-3xl p-lg flex flex-col md:flex-row gap-lg group hover:shadow-lg transition-all duration-500">
                <div className="space-y-sm flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center">
                    <Icon name="psychology" className="text-primary text-headline-md" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">AI Detection &amp; Prediction</h3>
                  <p className="text-on-surface-variant text-body-md">
                    Our neural network is trained on over 2 million verified clinical images, identifying 14+ specific
                    thoracic pathologies with over 96% AUC accuracy.
                  </p>
                  <ul className="space-y-base pt-xs">
                    <li className="flex items-center gap-xs text-label-md text-on-surface-variant">
                      <Icon name="check_circle" className="text-secondary" size={18} />
                      Instant Pleural Effusion detection
                    </li>
                    <li className="flex items-center gap-xs text-label-md text-on-surface-variant">
                      <Icon name="check_circle" className="text-secondary" size={18} />
                      Cardiomegaly index calculation
                    </li>
                  </ul>
                </div>
                <div className="flex-1 bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden min-h-[200px] flex items-center justify-center">
                  <Icon name="analytics" className="text-outline" size={64} />
                </div>
              </div>
              {/* Card 2 */}
              <div className="reveal-card glass-card rounded-3xl p-lg space-y-sm hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center">
                  <Icon name="visibility" className="text-secondary text-headline-md" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Explainable AI</h3>
                <p className="text-on-surface-variant text-body-md">
                  Trust through transparency. Grad-CAM heatmaps highlight the specific pixels the AI prioritized for its
                  diagnosis.
                </p>
                <div className="pt-sm">
                  <div className="h-24 bg-surface rounded-xl border border-dashed border-outline-variant flex items-center justify-center italic text-body-sm text-outline">
                    Grad-CAM Visualization Matrix
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="reveal-card glass-card rounded-3xl p-lg space-y-sm hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center">
                  <Icon name="description" className="text-tertiary text-headline-md" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Report Generation</h3>
                <p className="text-on-surface-variant text-body-md">
                  Automated, HIPAA-compliant medical findings drafted in professional terminology for final physician
                  review.
                </p>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden mt-sm">
                  <div className="w-3/4 h-full bg-tertiary rounded-full"></div>
                </div>
              </div>
              {/* Card 4 */}
              <div className="md:col-span-2 reveal-card glass-card rounded-3xl p-lg flex flex-col md:flex-row gap-lg group hover:shadow-lg transition-all duration-500">
                <div className="flex-1 order-2 md:order-1 bg-surface-container-high rounded-2xl border border-outline-variant/30 flex items-center justify-center overflow-hidden min-h-[160px]">
                  <Icon name="lock" className="text-outline" size={56} />
                </div>
                <div className="space-y-sm flex-1 order-1 md:order-2">
                  <div className="w-12 h-12 rounded-xl bg-error-container/10 flex items-center justify-center">
                    <Icon name="security" className="text-error text-headline-md" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Secure History</h3>
                  <p className="text-on-surface-variant text-body-md">
                    Zero-knowledge encryption for all patient data. Access longitudinal analysis and past diagnostics
                    through a secure, audit-ready dashboard.
                  </p>
                  <Link to="/dashboard" className="text-primary font-bold text-label-md flex items-center gap-base group">
                    Learn about Compliance
                    <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="py-xl">
          <div className="max-w-content mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">From Image to Insight</h2>
              <p className="text-on-surface-variant">A seamless 4-step diagnostic workflow</p>
            </div>
            <div className="relative grid md:grid-cols-4 gap-lg">
              {[
                { icon: "upload", title: "1. Upload", desc: "Secure DICOM or PNG upload directly to our cloud-native inference engine." },
                { icon: "analytics", title: "2. Analysis", desc: "Deep residual networks process the image, identifying specific markers of disease." },
                { icon: "auto_awesome", title: "3. Grad-CAM", desc: "Heatmaps are generated to provide visual evidence of the AI's diagnostic reasoning." },
                { icon: "fact_check", title: "4. Medical Report", desc: "Structured data and clinical findings are summarized into an exportable medical report." },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-sm">
                  <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-primary/20 text-primary">
                    <Icon name={step.icon} size={32} />
                  </div>
                  <h4 className="font-headline-md text-body-lg font-bold">{step.title}</h4>
                  <p className="text-body-sm text-on-surface-variant">{step.desc}</p>
                </div>
              ))}
              <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-outline-variant/30 -z-0"></div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-xl px-gutter max-w-content mx-auto">
          <div className="bg-primary rounded-[3rem] p-xl text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-container/40 via-transparent to-transparent"></div>
            <div className="relative z-10 space-y-md">
              <h2 className="font-display text-display">Ready for the future of radiology?</h2>
              <p className="text-body-lg opacity-90 max-w-2xl mx-auto">
                Join thousands of clinical facilities worldwide leveraging MedAI Pulse for better patient outcomes and
                faster diagnostic turnaround times.
              </p>
              <div className="flex flex-wrap justify-center gap-md pt-sm">
                <Link
                  to="/upload"
                  className="bg-white text-primary px-lg py-sm rounded-xl font-headline-md hover:shadow-xl transition-all active:scale-95"
                >
                  Get Started Now
                </Link>
                <button className="border border-white/40 text-white px-lg py-sm rounded-xl font-headline-md hover:bg-white/10 transition-all active:scale-95">
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
