import { ServiceListItem } from "@/components/portfolio/ServiceListItem";

export function ServiceList() {
  return (
    <div className="space-y-6">
      <ServiceListItem title="Peer Reviewer" bordered={true}>
        <ul className="text-muted space-y-2">
          <li>
            <span className="text-highlight">
              Journal of Electronic Commerce Research
            </span>{" "}
            - E-Commerce (March 2026)
          </li>
          <li>
            <span className="text-highlight">ICML 2025</span> - Gradient Descent
            Optimization
          </li>
          <li>
            <span className="text-highlight">AISTATS 2025</span>
          </li>
          <li>
            <span className="text-highlight">NeurIPS 2024 & 2022</span> - GD,
            LLMs, Vector Symbolic Architecture
          </li>
        </ul>
      </ServiceListItem>

      <ServiceListItem title="Research Ethics Board" bordered={true}>
        Member of the institutional Research Ethics Board (REB) at University
        Canada West, reviewing research proposals involving human participants
        for ethical compliance.
      </ServiceListItem>

      <ServiceListItem title="Curriculum Designer" bordered={false}>
        <ul className="text-muted space-y-2">
          <li>
            <span className="text-highlight">
              Master of Financial Technology
            </span>
            : Created the "Applications of AI in Finance" curriculum.
          </li>
          <li>
            <span className="text-highlight">
              Bachelor of Applied Information Tech
            </span>
            : Designed the "Responsible AI" and "Intro to AI" courses.
          </li>
          <li>
            <span className="text-highlight">Masters of Health Management</span>
          </li>
        </ul>
      </ServiceListItem>
    </div>
  );
}
