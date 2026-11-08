import { Tabs } from "@heroui/react";
import ProductScene from "./ProductScene";
import TuiShot from "./TuiShot";

// The product, nearly edge to edge: one neutral frame and a tab per client.
export default function ProductShowcase() {
  return (
    <section id="product" aria-labelledby="product-title" className="showcase scroll-mt-24 px-2 pt-8 sm:px-4">
      <div className="relative isolate mx-auto max-w-[1720px] overflow-hidden rounded-[2rem] border border-border bg-surface px-3 pt-16 pb-3 sm:px-8 sm:pt-20 sm:pb-8">
        <div className="pixel-grid" aria-hidden="true" />
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="product-title" className="text-4xl font-medium leading-[1.05] tracking-[-0.022em] md:text-[3.4rem]">One agent. Everyone in the room.</h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-lg leading-relaxed text-muted text-pretty">
            Everyone sees the same replies, tool calls and diffs as they happen, and joins from the terminal or the browser.
          </p>
        </div>
        <Tabs className="mt-10" defaultSelectedKey="web">
          <Tabs.ListContainer className="mx-auto w-fit">
            <Tabs.List aria-label="Client">
              <Tabs.Tab id="web" className="whitespace-nowrap">Web client<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="terminal" className="whitespace-nowrap">Terminal<Tabs.Indicator /></Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="web" className="mx-auto mt-8 max-w-6xl">
            <ProductScene />
          </Tabs.Panel>
          <Tabs.Panel id="terminal" className="mx-auto mt-8 max-w-6xl">
            <div className="rounded-2xl border border-border bg-[#1a1b26] p-2 sm:p-4">
              <TuiShot />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </section>
  );
}
