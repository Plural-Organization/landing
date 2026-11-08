import { Card, Tabs } from "@heroui/react";
import { ROLES } from "../data/roles";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "./SectionHeading";

export default function Roles() {
  return (
    <section id="roles" aria-labelledby="roles-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
      <SectionHeading id="roles-title" align="center" lead="One agent." tail="Clear rules around it.">
        The host keeps the machine and the key. Everyone else gets exactly the access their role allows.
      </SectionHeading>
      <Tabs className="mx-auto mt-12 max-w-3xl" defaultSelectedKey="host">
        <Tabs.ListContainer className="mx-auto w-fit max-w-full overflow-x-auto">
          <Tabs.List aria-label="Roles in a room">
            {ROLES.map((role) => (
              <Tabs.Tab key={role.key} id={role.key} className="whitespace-nowrap">
                {role.name[0]!.toUpperCase() + role.name.slice(1)}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        {ROLES.map((role) => (
          <Tabs.Panel key={role.key} id={role.key} className="pt-6">
            <Card className="rounded-3xl border border-border bg-surface p-6 shadow-none sm:p-8">
              <Card.Header className="p-0">
                <Card.Title className="text-2xl font-semibold tracking-tight">{role.name[0]!.toUpperCase() + role.name.slice(1)}</Card.Title>
                <Card.Description className="mt-1 text-base">{role.note}</Card.Description>
              </Card.Header>
              <Card.Content className="mt-6 grid gap-6 p-0 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">Can</p>
                  <ul className="mt-3 space-y-2.5">
                    {role.can.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[15px] leading-snug text-muted">
                        <Check size={17} weight="bold" className="mt-0.5 shrink-0 text-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {role.cannot.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-foreground">Limits</p>
                    <ul className="mt-3 space-y-2.5">
                      {role.cannot.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[15px] leading-snug text-muted">
                          <X size={17} weight="bold" className="mt-0.5 shrink-0 text-muted" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Content>
            </Card>
          </Tabs.Panel>
        ))}
      </Tabs>
    </section>
  );
}
