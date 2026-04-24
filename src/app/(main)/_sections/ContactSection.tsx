import { Mail } from "lucide-react";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { SocialIconButton } from "@/components/portfolio/SocialIconButton";

export function ContactSection() {
  return (
    <SectionContainer
      id="contact"
      className="section-padding bg-[#030303] relative"
      contentClassName="max-w-6xl flex flex-col md:flex-row gap-16 relative z-10"
    >
      {/* <div className="ambient-glow opacity-40"></div> */}
      <div className="w-full md:w-1/2">
        <SectionHeader className="mb-12">
          <h2 className="heading-secondary text-white/95 mb-4">
            Let's Connect
          </h2>
          <div className="w-16 h-px bg-accent-500/50 mb-6"></div>
          <p className="text-body max-w-xl">
            If you want to discuss research collaboration, have questions about
            my courses, or are interested in consulting on AI and marketing
            topics, feel free to reach out.
          </p>
        </SectionHeader>

        <div className="space-y-4">
          <a
            href="mailto:davood.wadi@hec.ca"
            className="flex items-center gap-4 p-4 glass-card rounded-lg hover:bg-white/5 transition-all"
          >
            <Mail className="w-6 h-6 text-accent-400" strokeWidth={1.5} />
            <div>
              <h4 className="text-white font-medium text-sm">Email</h4>
              <p className="text-gray-500 text-xs">davood.wadi@hec.ca</p>
            </div>
          </a>

          <div className="flex gap-4 pt-4">
            <SocialIconButton
              href="https://ca.linkedin.com/in/davoodwadi"
              label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </SocialIconButton>
            <SocialIconButton
              href="https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ"
              label="Google Scholar"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 2.735c.152.086.331.135.516.135h1.293l-1.5 8.183h13.7l-1.5-8.183h1.293c.185 0 .364-.049.516-.135L24 9.5 12 0z" />
              </svg>
            </SocialIconButton>
          </div>
        </div>
      </div>

      <FadeUp className="w-full md:w-1/2">
        <ContactForm />
      </FadeUp>
    </SectionContainer>
  );
}
