import { Mail } from "lucide-react";
import { ContactForm } from "@/components/portfolio/blocks/ContactForm";
import { FadeUp } from "@/components/portfolio/primitives/FadeUp";
import { SectionContainer } from "@/components/portfolio/primitives/SectionContainer";
import { SocialIconButton } from "@/components/portfolio/primitives/SocialIconButton";
import type { portfolioData } from "@/app/(main)/sections.data";

type ContactSectionProps = {
  data: typeof portfolioData.contact;
};

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <SectionContainer
      id="contact"
      className="md:py-32"
      contentClassName="max-w-4xl flex flex-col md:flex-row gap-16"
    >
      <FadeUp className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
          {data.heading}
        </h2>
        <p className="text-gray-400 mb-8 font-light leading-relaxed">
          {data.description}
        </p>

        <div className="space-y-4">
          <a
            href={`mailto:${data.email.address}`}
            className="flex items-center gap-4 p-4 glass-card rounded-lg hover:bg-white/5 transition-all"
          >
            <Mail className="w-6 h-6 text-accent-400" strokeWidth={1.5} />
            <div>
              <h4 className="text-white font-medium text-sm">
                {data.email.label}
              </h4>
              <p className="text-gray-500 text-xs">{data.email.address}</p>
            </div>
          </a>

          <div className="flex gap-4 pt-4">
            {data.social.map((link) => (
              <SocialIconButton
                key={link.label}
                href={link.href}
                label={link.label}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={link.svgPath} />
                </svg>
              </SocialIconButton>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp className="w-full md:w-1/2">
        <ContactForm />
      </FadeUp>
    </SectionContainer>
  );
}
