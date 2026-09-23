import { Email } from "./Email";

const PORTRAIT = "/portrait.png";
const PORTRAIT_ALT = "Portrait of Davood Wadi";

export function Intro() {
  return (
    <section
      id="top"
      className="grid gap-10 pt-14 pb-16 md:grid-cols-[1fr_15rem] md:gap-16 md:pt-24 md:pb-24"
    >
      <div className="max-w-[40rem]">
        <p className="meta mb-5">AI Research · Marketing Science</p>
        <div className="flex items-center gap-5">
          {/* Phones: a small portrait beside the name, like a byline. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT}
            alt=""
            aria-hidden
            width={884}
            height={884}
            className="size-20 shrink-0 border border-rule object-cover md:hidden"
          />
          <h1 className="text-5xl leading-[1.05] md:text-6xl">Davood Wadi</h1>
        </div>
        <p className="mt-6 font-serif text-xl leading-snug text-ink md:text-2xl">
          Studying how large language models behave, and what that means for
          marketing and business.
        </p>

        <div className="mt-8 space-y-4 text-[1.0625rem]">
          <p>
            I am a lecturer and researcher in AI and Marketing. I research the
            behavioral patterns of large language models and their implications
            for consumer decision-making. I hold a Ph.D. in Marketing with a
            specialization in AI from HEC Montreal, supported by the IVADO PhD
            Excellence Scholarship.
          </p>
          <p>
            My work sits at the overlap of quantitative marketing and machine
            learning. I study questions like: do LLMs exhibit the same
            cognitive biases humans do? What happens when AI agents make
            pricing decisions? I publish in venues like EMNLP and JECR and
            teach courses on AI applications in business.
          </p>
        </div>
      </div>

      {/* Profile column: portrait on top, details and links underneath, so
          the column carries its own weight beside the bio. */}
      <aside className="md:pt-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PORTRAIT}
          alt={PORTRAIT_ALT}
          width={884}
          height={884}
          className="hidden aspect-[4/5] w-full border border-rule object-cover object-[50%_35%] md:block"
        />
        <div className="border-t border-rule pt-4 md:mt-5 md:border-t-0 md:pt-0">
          <p className="text-sm text-ink">Ph.D. in Marketing, HEC Montréal</p>
          <p className="text-sm text-ink-3">Specialization in AI</p>
          <ul className="mt-4 space-y-1.5 border-t border-rule pt-4 text-sm">
            <li>
              <a
                className="link"
                href="https://scholar.google.com/citations?hl=en&user=6Djq9PYAAAAJ"
              >
                Google Scholar
              </a>
            </li>
            <li>
              <a className="link" href="https://ca.linkedin.com/in/davoodwadi">
                LinkedIn
              </a>
            </li>
            <li>
              <Email className="text-ink-2" />
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
