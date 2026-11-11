import type { Metadata } from "next";
import LegalPage, { Section } from "../../components/LegalPage";
import { LEGAL, REPO } from "../../data/site";

export const metadata: Metadata = {
  title: "Privacy Policy · Plural",
  description: "What Plural collects when you sign in with Google, what it does with it, and how to delete it.",
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated={LEGAL.updated}>
      <Section title="Who we are">
        <p>Plural is an open source team layer for coding agents, built by the Plural Organization. This policy covers this website (plrl.host), the Plural web client, and the Plural accounts service at accounts.plrl.host. The source code of all of it is public under GPL-3.0-or-later at <a href={REPO}>github.com/Plural-Organization</a>.</p>
      </Section>

      <Section title="What we collect">
        <p>You can use Plural without an account. An account is needed only to link your computers to your identity and to join a team. When you sign in with Google we receive, with your consent:</p>
        <ul>
          <li>your <strong>Google account ID</strong>, <strong>email address</strong> and <strong>display name</strong> (the <code>openid</code>, <code>email</code> and <code>profile</code> scopes, nothing else);</li>
          <li>for each computer you link: its <strong>public key</strong>, when it was linked and when it was last seen. The private key never leaves your computer;</li>
          <li>a <strong>session cookie</strong> that keeps you signed in. We store only a hash of its token.</li>
        </ul>
        <p>We do not collect your Google contacts, files, calendar, mail, or any other Google data. We do not use advertising or analytics trackers.</p>
      </Section>

      <Section title="How we use it">
        <ul>
          <li>to sign you in and keep you signed in;</li>
          <li>to issue short-lived certificates (7 days) that tell a Plural host which account it belongs to;</li>
          <li>to show you your account and your linked computers, and let you revoke them.</li>
        </ul>
        <p>We do not sell your data, share it for advertising, or use it to train models.</p>
      </Section>

      <Section title="Your sessions and code">
        <p>Your coding sessions run on your own computer. The prompts, replies, file contents and commands of a session are not sent to the accounts service. When you share a session over the internet, a Plural relay forwards the traffic between the people in the room. The relay routes messages and does not store their content. As the threat model states, the relay can technically see that traffic, so run your own relay if that matters to you. Team members see only the names, repository address, status and changed file paths of the sessions you publish to your team.</p>
      </Section>

      <Section title="Google user data">
        <p>Plural&apos;s use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use">Google API Services User Data Policy</a>, including the Limited Use requirements. We use Google sign-in only to identify you. We never transfer Google user data to third parties, except as needed to run the service for you or to comply with law.</p>
      </Section>

      <Section title="Who handles the data">
        <p>The accounts service runs on our own server. The website and web client are hosted on Vercel, which processes ordinary request logs such as IP addresses. Sign-in itself happens at Google, under Google&apos;s privacy policy.</p>
      </Section>

      <Section title="Retention and deletion">
        <p>We keep your account data until you delete your account. Deleting it removes your profile, sessions, claim codes and linked computers from our database. Certificates already issued stop working when they expire, at most 7 days later. You can also revoke a single computer at any time, or sign out of every session. To ask for deletion or a copy of your data, email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> from the address of your account and we will delete it.</p>
      </Section>

      <Section title="Security">
        <p>Session tokens are stored only as hashes, certificates are signed with Ed25519, and the accounts service runs as an unprivileged, read-only container. No system is perfectly secure. To report a vulnerability, use GitHub Security Advisories on the repository.</p>
      </Section>

      <Section title="Children">
        <p>Plural is not directed at children under 13 and we do not knowingly collect their data.</p>
      </Section>

      <Section title="Changes and contact">
        <p>If we change this policy, we will update the date above. Questions: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.</p>
      </Section>
    </LegalPage>
  );
}
