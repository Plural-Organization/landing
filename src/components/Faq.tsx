import { Accordion } from "@heroui/react";
import { FAQ } from "../data/content";
import { LINKS } from "../data/site";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-24">
      <div>
        <SectionHeading id="faq-title" size="md" lead="Questions" tail="teams ask first." />
        <p className="mt-4 text-[15px] text-muted">
          The rest is in the <a className="text-foreground underline underline-offset-4" href={LINKS.docs}>docs</a> and the{" "}
          <a className="text-foreground underline underline-offset-4" href={LINKS.threatModel}>threat model</a>.
        </p>
      </div>
      <Accordion className="border-t border-separator">
        {FAQ.map((item) => (
          <Accordion.Item key={item.q} id={item.q}>
            <Accordion.Heading>
              <Accordion.Trigger className="py-5 text-left text-base font-medium">
                {item.q}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="pb-5 text-[15px] leading-relaxed text-muted">{item.a}</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}
