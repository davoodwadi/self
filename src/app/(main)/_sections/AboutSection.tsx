import { ProfilePortrait } from "@/components/portfolio/ProfilePortrait";
import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export function AboutSection() {
  return (
    <SectionContainer
      id="about"
      className="section-padding bg-[#08080a]"
      contentClassName="max-w-5xl"
    >
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <FadeUp className="w-full md:w-5/12">
          <ProfilePortrait src="/portrait.png" alt="Davood Wadi" />
        </FadeUp>
        <div className="w-full md:w-7/12">
          <SectionHeader className="mb-8">
            <h2 className="heading-secondary text-white/95">Biography</h2>
            <div className="w-12 h-px bg-accent-500/50 mt-6 mb-2"></div>
          </SectionHeader>
          <FadeUp>
            <p className="text-body mb-6">
              I am a lecturer and researcher in AI and Marketing. I research the
              behavioral patterns of large language models and their
              implications for consumer decision-making. I hold a Ph.D. in
              Marketing with a specialization in AI from HEC Montreal, supported
              by the IVADO PhD Excellence Scholarship.
            </p>
            <p className="text-body">
              My work sits at the overlap of quantitative marketing and machine
              learning. I study questions like: do LLMs exhibit the same
              cognitive biases humans do? What happens when AI agents make
              pricing decisions? I publish in venues like EMNLP and JECR and
              teach courses on AI applications in business.
            </p>
          </FadeUp>
        </div>
      </div>
    </SectionContainer>
  );
}
