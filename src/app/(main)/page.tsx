import { Masthead } from "./_sections/Masthead";
import { Intro } from "./_sections/Intro";
import { Research } from "./_sections/Research";
import { Teaching } from "./_sections/Teaching";
import { Service } from "./_sections/Service";
import { Contact } from "./_sections/Contact";

export default function Home() {
  return (
    <>
      <Masthead />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Intro />
        <Research />
        <Teaching />
        <Service />
        <Contact />
      </main>
      <footer className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <p className="meta border-t border-rule py-8">
          &copy; {new Date().getFullYear()} Davood Wadi
        </p>
      </footer>
    </>
  );
}
