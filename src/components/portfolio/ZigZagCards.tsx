import Link from "next/link";

import { BookOpen, MoveRight } from "lucide-react";


export const ConceptCardsZigzag = ({ cards, id, altBg = false }: any) => {
    console.log(cards)
  return (
      <div className="max-w-[var(--container)] w-full mx-auto">
        <div className="flex flex-col relative w-full gap-4 md:gap-8">
          {cards.map((card: any, idx: number) => {
            const isRight = idx % 2 !== 0; // Force all zigzags to start from left
            return (
              <div 
                key={idx} 
                className={`group bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12 hover:border-accent1 hover:shadow-[0_0_20px_var(--glow)] transition-[border-color,box-shadow] duration-300 w-full md:w-[95%] flex flex-col ${isRight ? 'self-end' : 'self-start'} relative shadow-2xl`}
                style={{ zIndex: 10 + idx }}
              >
                <h4 className="card-title text-h2 text-xl mb-4 !tracking-wider">{card.title}</h4>
                <p className="text-body text-sm mb-6">{card.description}</p>
                {card?.link?.label && (
          <Link
            href={card.link.href}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent-500 hover:text-accent-400 transition-colors"
          >
            {card.link.label}
            <span className="group-hover:translate-x-1 transition-transform inline-flex">
              <MoveRight size={16} />
            </span>
          </Link>
        )}
              </div>
            )
          })}
        </div>
      </div>
  )
}