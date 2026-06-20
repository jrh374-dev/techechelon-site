---
title: "Amnesty International Researcher Exposes Russian Hackers Targeting 13,500 Signal Users"
slug: amnesty-international-researcher-exposes-russian-hackers-targeting-13-500-signal-users
excerpt: "Amnesty International security researcher Donncha Ó Cearbhaill turned a phishing attempt on his own Signal account into an investigation, uncovering a Russian government-linked campaign that had identified more than 13,500 targets."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-14T15:03:31.650Z"
coverImage: "https://static.wixstatic.com/media/e37254_0a601b7132e448faabcece4a0446edcc~mv2.jpg"
readTime: 3
migratedFromWix: true
---

Donncha Ó Cearbhaill, the head of Amnesty International's Security Lab, became an unlikely target of a Russian government-linked hacking campaign earlier this year — and used the attempt to map an operation that had already identified more than 13,500 potential victims.

The attack arrived as a message on Ó Cearbhaill's own Signal account. It impersonated a Signal security chatbot, warned of suspicious activity on his device, and urged him to enter a verification code — a code that would have linked his account to a device controlled by the attackers.

Ó Cearbhaill immediately recognized the attempt as fraudulent. Rather than ignoring it, he treated it as an entry point into a broader investigation.

"Having the attack land in my inbox, and the chance to turn the tables on the attackers and understand more about the campaign was too good to pass up," he told TechCrunch.

The campaign's tactics — impersonating Signal, fabricating security warnings, and tricking targets into linking their accounts to attacker-controlled devices — match those detailed in separate warnings from the U.S. Cybersecurity and Infrastructure Security Agency, the United Kingdom's cybersecurity agency, and Dutch intelligence, all of which attributed the activity to Russian government operatives. Signal has also independently warned its users about phishing attacks using similar techniques. German news magazine Der Spiegel reported that Russian hackers successfully compromised multiple people inside Germany, including high-profile politicians.

Ó Cearbhaill said he determined he was among more than 13,500 individuals targeted in the campaign. He declined to disclose the full methods of his investigation to avoid revealing his techniques to the threat actors, but shared several key findings.

Among the targets he identified were journalists he had worked with and at least one colleague. That pattern led him to what he called a "snowball hypothesis" — the theory that hackers compromised initial victims, harvested their contact lists and group chat memberships, and used those to identify new targets. Ó Cearbhaill said he believes he was swept up in the campaign because he shared a group chat with someone who had already been compromised.

The researcher was also able to identify the system powering the operation: a tool called "ApocalypseZ," which automates the phishing process and allows operators to target large numbers of people simultaneously with limited human oversight. The codebase and operator interface are written in Russian, and victim chats were being translated into Russian — details that reinforce the attribution to a Russian state-linked actor.

Ó Cearbhaill said the campaign was still active at the time of publication and that the true number of targets is certainly higher than the 13,500 figure he observed earlier this year.

For Signal users concerned about this type of attack, Ó Cearbhaill recommended enabling the app's Registration Lock feature, which requires a user-set PIN before another device can register a phone number on the platform, preventing unauthorized account linking.

The researcher said he doubts the hackers will target him a second time — and closed with a pointed message to the group: "I welcome future messages, especially if they have zero-days they would like to share."

The case underscores a growing pattern of state-linked actors using social engineering through trusted consumer platforms rather than technical exploits, placing the burden of defense on user awareness and platform-level security features rather than traditional network controls.
