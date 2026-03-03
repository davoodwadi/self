import { ProfilePortrait } from "@/components/portfolio/ProfilePortrait";
import { FadeUp } from "@/components/portfolio/FadeUp";
import { SectionContainer } from "@/components/portfolio/SectionContainer";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export function AboutSection() {
  return (
    <SectionContainer
      id="about"
      className="md:py-32"
      contentClassName="max-w-4xl"
    >
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <FadeUp className="w-full md:w-1/3">
          <ProfilePortrait src="/portrait.png" alt="Davood Wadi" />
        </FadeUp>
        <div className="w-full md:w-2/3">
          <SectionHeader className="mb-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold border-b border-gray-800 pb-4">
              About Me
            </h2>
          </SectionHeader>
          <FadeUp>
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-6">
              I am a lecturer and researcher in AI and Marketing. I research the
              behavioral patterns of large language models and their
              implications for consumer decision-making. I hold a Ph.D. in
              Marketing with a specialization in AI from HEC Montreal, supported
              by the IVADO PhD Excellence Scholarship.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
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
