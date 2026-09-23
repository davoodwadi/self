import { Email } from "./Email";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[40rem]">
        If you want to discuss research collaboration, have questions about my
        courses, or are interested in consulting on AI and marketing topics,
        feel free to reach out.
      </p>
      <dl className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-[8rem_1fr]">
        <dt className="meta pt-1">Email</dt>
        <dd>
          <Email className="font-serif text-xl text-ink" />
        </dd>
        <dt className="meta pt-1">Elsewhere</dt>
        <dd className="flex flex-wrap gap-x-6 gap-y-1">
          <a
            className="link"
            href="https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ"
          >
            Google Scholar
          </a>
          <a className="link" href="https://ca.linkedin.com/in/davoodwadi">
            LinkedIn
          </a>
        </dd>
      </dl>
    </Section>
  );
}
