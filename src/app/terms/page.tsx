import type { Metadata } from "next";
import LegalPage, { Section } from "../../components/LegalPage";
import { LEGAL, REPO } from "../../data/site";

export const metadata: Metadata = {
  title: "Terms of Service · Plural",
  description: "The terms for using the Plural website, web client and accounts service.",
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated={LEGAL.updated}>
      <Section title="Agreement">
        <p>These terms apply when you use the Plural website (plrl.host), the Plural web client and the Plural accounts service (together, the &quot;Service&quot;), operated by the Plural Organization. By using the Service you agree to them. If you do not agree, do not use it.</p>
      </Section>

      <Section title="The software">
        <p>Plural&apos;s source code is open source and licensed under the <a href={LEGAL.license}>GNU General Public License, version 3 or (at your option) any later version (GPL-3.0-or-later)</a>. These terms cover the hosted Service only. Your rights to the code are set by that license, not by these terms.</p>
      </Section>

      <Section title="Your account">
        <p>You sign in with a Google account. You are responsible for activity under your account and for keeping your computers and their keys safe. Tell us if you think your account was compromised, and revoke the affected computers from the web client. An account can link a limited number of computers.</p>
      </Section>

      <Section title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>break the law or violate anyone&apos;s rights through the Service;</li>
          <li>attack, overload, probe or try to bypass the security of the Service, the relay or other users;</li>
          <li>use the Service to distribute malware or to access systems you are not allowed to access;</li>
          <li>impersonate others or misrepresent which account or computer you are.</li>
        </ul>
        <p>We may suspend or remove accounts that break these rules.</p>
      </Section>

      <Section title="Your content and agents">
        <p>You keep all rights to your code, prompts and sessions. They run on your computer, and the Service does not claim any license to them. You decide who joins your sessions and what a coding agent may do; <strong>you are responsible for approving its actions</strong> and for the results. Third-party AI providers you connect are governed by their own terms.</p>
      </Section>

      <Section title="Availability">
        <p>The Service is provided as is, may change or go down, and we may add or remove features. We will try to give notice of big changes, but we do not promise uptime.</p>
      </Section>

      <Section title="No warranty">
        <p>The Service is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement. AI agents can make mistakes, including destructive ones. Review what they do and keep backups.</p>
      </Section>

      <Section title="Limitation of liability">
        <p>To the extent the law allows, the Plural Organization and its contributors are not liable for indirect, incidental or consequential damages, or for lost data, profits or revenue, arising from your use of the Service. Our total liability for any claim is limited to the greater of the amount you paid us in the last 12 months (the Service is currently free) or USD 50.</p>
      </Section>

      <Section title="Ending">
        <p>You can stop using the Service and delete your account at any time. We may suspend or end the Service, or your access, for breach of these terms or to protect the Service and its users. Sections that by nature should survive, such as the warranty and liability terms, survive.</p>
      </Section>

      <Section title="Privacy">
        <p>How we handle your data is described in the <a href="/privacy">Privacy Policy</a>.</p>
      </Section>

      <Section title="Changes and contact">
        <p>We may update these terms and will change the date above when we do. Continuing to use the Service after a change means you accept it. Questions: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.</p>
      </Section>
    </LegalPage>
  );
}
