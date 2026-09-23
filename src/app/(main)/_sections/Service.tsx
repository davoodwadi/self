import { Section } from "./Section";

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 py-6 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <p className="meta pt-1">{label}</p>
      <div>{children}</div>
    </div>
  );
}

export function Service() {
  return (
    <Section id="service" title="Service & recognition">
      <div className="divide-y divide-rule">
        <Group label="Grants & awards">
          <ul className="space-y-4">
            <li>
              <h3 className="text-lg">Google Gemini Academic Program Award</h3>
              <p className="mt-1">
                Recognized for excellence and innovation in academic research
                and applications involving Google&rsquo;s Gemini models.
              </p>
            </li>
            <li>
              <h3 className="text-lg">UCW Explore Grant</h3>
              <p className="mt-1">
                Developed &ldquo;AILSS: AI-Powered Learning Support
                System.&rdquo; This project addresses the challenge of providing
                timely, personalized support to students with disabilities by
                utilizing Large Language Models for formative assessment.
              </p>
            </li>
          </ul>
        </Group>

        <Group label="Peer review">
          <ul className="space-y-1">
            <li>
              <span className="text-ink">
                Journal of Electronic Commerce Research
              </span>{" "}
              <span className="text-ink-3">· E-Commerce (March 2026)</span>
            </li>
            <li>
              <span className="text-ink">ICML 2025</span>{" "}
              <span className="text-ink-3">· Gradient Descent Optimization</span>
            </li>
            <li>
              <span className="text-ink">AISTATS 2025</span>
            </li>
            <li>
              <span className="text-ink">NeurIPS 2024 & 2022</span>{" "}
              <span className="text-ink-3">
                · GD, LLMs, Vector Symbolic Architecture
              </span>
            </li>
          </ul>
        </Group>

        <Group label="Ethics">
          <p>
            Member of the institutional Research Ethics Board (REB) at
            University Canada West, reviewing research proposals involving human
            participants for ethical compliance.
          </p>
        </Group>

        <Group label="Curriculum design">
          <ul className="space-y-1">
            <li>
              <span className="text-ink">Master of Financial Technology</span>:
              Created the &ldquo;Applications of AI in Finance&rdquo;
              curriculum.
            </li>
            <li>
              <span className="text-ink">
                Bachelor of Applied Information Tech
              </span>
              : Designed the &ldquo;Responsible AI&rdquo; and &ldquo;Intro to
              AI&rdquo; courses.
            </li>
            <li>
              <span className="text-ink">Masters of Health Management</span>
            </li>
          </ul>
        </Group>
      </div>
    </Section>
  );
}
