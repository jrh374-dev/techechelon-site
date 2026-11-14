---
title: "Cursor Confirms Security Breach Exposed 5,000 Developers to Malicious Claude Code Extension"
slug: cursor-confirms-security-breach-exposed-5-000-developers-to-malicious-claude-code-extension
excerpt: "Cursor confirmed hackers exploited a stolen credential from AI provider Fireworks AI to distribute malware-laced Claude Code extensions through its marketplace, exposing up to 5,000 developers to persistent SSH backdoor software for approximately 11 hours on October 29."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-11-14T19:02:18.943Z"
coverImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5Mzc2NzZ8MHwxfHNlYXJjaHwxfHxDdXJzb3IlMjBBSSUyMGNvZGUlMjBlZGl0b3IlMjBkZXZlbG9wZXIlMjB3b3Jrc3RhdGlvbiUyMHNjcmVlbnxlbnwxfDB8fHwxNzk0NjgyOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
coverCredit: "Photo by Fotis Fotopoulos on Unsplash"
coverCreditUrl: "https://unsplash.com/@ffstop"
tags: ["cursor", "claude code", "security breach", "ssh backdoor", "ai developer tools", "fireworks ai"]
primaryEntity: "Cursor (text editor)"
readTime: 3
featured: true
hasDisclaimer: true
sourceUrls: ["https://thehill.com/policy/technology/6220727-netchoice-sues-new-york-social-media", "https://www.bleepingcomputer.com/news/security/cursor-confirms-security-breach-led-to-malicious-claude-code-extension", "https://www.bleepingcomputer.com/news/security/us-disrupts-north-korean-campaign-behind-400-million-crypto-theft"]
---

AI code editor Cursor has confirmed a security breach that allowed hackers to distribute malware-laced versions of Anthropic's Claude Code extension through its marketplace, exposing up to 5,000 developers to software designed to install persistent SSH backdoors on their machines.

The incident, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/cursor-confirms-security-breach-led-to-malicious-claude-code-extension), stems from an access key stored on Fireworks AI, a third-party provider Cursor used for AI model training and inference. Attackers obtained that key and used it to copy data from a read-only storage bucket Cursor shared with Fireworks, which contained historical AI coding-agent traces collected primarily from 2025.

The traces came from users who had not enabled Privacy Mode and whose data could be used for model training. Some of those traces contained unredacted API credentials, which the attackers leveraged to access additional Cursor systems and ultimately gain a credential that allowed them to publish extensions through Cursor's marketplace.

On October 29, the hackers used that stolen credential to place malicious copies of Anthropic's Claude Code extension directly into the cache serving Cursor's VS Code extension marketplace. The two compromised versions — 2.1.312 and 2.1.313 — remained available for approximately 11 hours before Cursor removed them.

The malicious extensions executed JavaScript designed to install attacker-controlled SSH keys, enable SSH access, collect system information, and configure persistence mechanisms for sustained remote access. Security researchers subsequently found coding errors that likely prevented the backdoor from functioning on many Windows and macOS systems where SSH was not already enabled.

Cursor said fewer than 0.05% of users had coding-agent traces exposed, and fewer than 0.01% of customers had API credentials compromised. Beyond the extension marketplace incident, attackers also accessed archived non-production source code repositories, limited customer support information and email conversations, product usage metrics, customer contact details, and summaries of some AI coding-agent conversations.

"On October 29, using a stolen credential from the exposed data from our internal system, the attacker placed malicious, unauthorized copies of Anthropic's Claude Code extension directly on the cache used to serve the Cursor VS Code extension marketplace," the company said in its incident report.

Cursor stated that its production infrastructure, official application releases, customer code repositories, and data belonging to users with Privacy Mode enabled were not affected. The attack also did not compromise Anthropic's legitimate extension or Open VSX, the extension marketplace Cursor relies on.

In response, Cursor said it has moved all inference traffic away from Fireworks AI, revoked and rotated exposed credentials, rebuilt its extension marketplace, and redeployed its production infrastructure as a precaution.

The breach is part of a broader wave of attacks targeting AI developer platforms that cybersecurity firm Wiz has named "Black October." The campaign has affected numerous companies, including Railway, Northflank, Lightning AI, OpenCode, and Warp. At Railway, attackers used stolen customer authentication secrets to generate approximately $740,000 in fraudulent AI charges.

Fireworks AI itself disclosed multiple security breaches in October, including one involving exposed API keys and tokens and another in which attackers accessed development machines through a compromised third-party cloud provider. Those incidents also affected other customers, including Notion, which disclosed that AI chat transcripts from a small number of workspaces were exposed.

The concentration of credential-theft attacks on AI infrastructure providers signals a growing vulnerability in the layered dependency chains that underpin AI development tooling — a risk that is likely to draw closer scrutiny from both enterprise security teams and platform vendors as the breadth of October's incidents continues to emerge.

[Disclaimer](/disclaimer)
