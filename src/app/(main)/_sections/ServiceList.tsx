import { ServiceListItem } from "@/components/portfolio/ServiceListItem";

export function ServiceList() {
  return (
    <div className="space-y-6">
      <ServiceListItem title="Peer Reviewer" bordered={true}>
        <ul className="text-sm text-gray-400 font-light space-y-2">
          <li>
            <span className="text-accent-400 font-medium">ICML 2025</span> -
            Gradient Descent Optimization
          </li>
          <li>
            <span className="text-accent-400 font-medium">AISTATS 2025</span>
          </li>
          <li>
            <span className="text-accent-400 font-medium">
              NeurIPS 2024 & 2022
            </span>{" "}
            - GD, LLMs, Vector Symbolic Architecture
          </li>
        </ul>
      </ServiceListItem>

      <ServiceListItem title="Research Ethics Board" bordered={true}>
        Member of the institutional Research Ethics Board (REB), reviewing
        research proposals involving human participants for ethical compliance.
      </ServiceListItem>

      <ServiceListItem title="Curriculum Designer" bordered={true}>
        <ul className="text-sm text-gray-400 font-light space-y-2">
          <li>Master of Financial Technology.</li>
        </ul>
      </ServiceListItem>

      <ServiceListItem title="Curriculum Designer" bordered={false}>
        <ul className="text-sm text-gray-400 font-light space-y-2">
          <li>Bachelor of Information Technology.</li>
        </ul>
      </ServiceListItem>
    </div>
  );
}
