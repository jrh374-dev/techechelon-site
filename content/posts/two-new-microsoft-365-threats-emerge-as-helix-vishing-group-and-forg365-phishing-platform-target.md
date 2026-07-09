---
title: "Two New Microsoft 365 Threats Emerge as Helix Vishing Group and Forg365 Phishing Platform Target Corporate Accounts"
slug: two-new-microsoft-365-threats-emerge-as-helix-vishing-group-and-forg365-phishing-platform-target
excerpt: "Researchers disclosed two new Microsoft 365 threats on July 9: the Helix data-extortion group, which uses voice phishing and SharePoint exfiltration, and the Forg365 phishing-as-a-service platform, which integrates AI-assisted lure generation with adversary-in-the-middle and device-code attack methods."
category: security
author: "TechEchelon Staff"
authorInitials: "TE"
publishedAt: "2026-07-09T17:11:07.063Z"
coverImage: "https://images.pexels.com/photos/17489160/pexels-photo-17489160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by panumas nikhomkhai on Pexels"
coverCreditUrl: "https://www.pexels.com/@cookiecutter"
tags: ["microsoft 365", "phishing", "vishing", "sharepoint", "phishing-as-a-service", "data extortion"]
primaryEntity: "Microsoft 365"
readTime: 3
featured: true
hasDisclaimer: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/new-helix-vishing-group-emerges-in-sharepoint-data-theft-attacks", "https://www.bleepingcomputer.com/news/security/new-forg365-phishing-platform-uses-ai-to-target-microsoft-365-accounts", "https://www.darkreading.com/cybersecurity-operations/businesses-wartime-cybersecurity-gameplans"]
---

Two distinct Microsoft 365 threats surfaced on July 9, 2026, as researchers disclosed a new data-extortion group using voice phishing and SharePoint exfiltration alongside a phishing-as-a-service platform that embeds artificial intelligence directly into its attack workflow.

The data-extortion group, identified as Helix, opens attacks with voice phishing calls in which operators impersonate a target's manager — using either the manager's name or caller ID spoofing to appear legitimate. The goal of that initial contact is to manipulate employees into completing a device-code phishing scheme that hands over account access.

Once inside a compromised environment, Helix operators register a new multi-factor authentication app for persistence, then systematically enumerate and exfiltrate files from SharePoint. Researchers at ReliaQuest say the stolen data is then used to extort victim organizations by threatening publication unless a ransom is paid, or it is sold to other cybercriminals.

The group's SharePoint activity carries a consistent technical signature. "Automated enumeration and collection were identical across incidents and represent the most reliable fingerprint. Enumeration ran from 179.43.185[.]230 using the python-requests/2.28.1 user-agent," ReliaQuest researchers noted. "The operator issued contentclass:STS_Site and wildcard (*) SharePoint searches to inventory all reachable content, then bulk-downloaded from the same IP and user-agent."

ReliaQuest believes Helix likely emerged from the ShinyHunters and BlackFile data extortion groups, based on shared techniques and infrastructure, though researchers stopped short of declaring a definitive connection. BlackFile ceased operations in April, and Helix's emergence shortly afterward — combined with an exfiltration IP address in the same autonomous system, AS 51852, that hosted a confirmed BlackFile address — suggests a possible continuation of that operation.

Ties to ShinyHunters are drawn from overlapping social engineering tactics, including vishing, employee impersonation, targeting of Microsoft 365, and SharePoint data theft. Helix's use of the NICENIC registrar, also observed in prior ShinyHunters campaigns, adds a second indicator. ReliaQuest also names Pink and Redact as potential successors to the same lineage.

As a primary defensive measure, ReliaQuest recommends disabling device-code authentication where possible. Additional guidance includes restricting SharePoint access to managed devices only and blocking traffic from newly registered domains, which Helix routinely uses in its attacks.

Separately, researchers at ZeroBEC disclosed a phishing-as-a-service platform called Forg365 that targets Microsoft 365 accounts through a combination of adversary-in-the-middle phishing, device-code phishing, and AI-assisted lure generation. The platform shares features with other known PhaaS operations such as Kali365 and Sneaky2FA, though ZeroBEC said it could not establish a direct connection.

Forg365's AI integration is embedded directly in its operator dashboard, allowing threat actors to draft, refine, and deploy phishing emails from the same interface used to manage post-compromise activity. ZeroBEC noted that "AI reduces the cost of developing custom phishing content, but it also reduces the cost of building custom PhaaS platforms."

The platform delivers phishing emails through Amazon SES and hosts landing pages on Cloudflare Pages, with Gophish used for campaign delivery. Operators are also provided a browser extension called ForgCookie, compatible with Google Chrome, Microsoft Edge, and Brave, that silently refreshes Microsoft single-sign-on cookies to maintain persistent access to compromised accounts without requiring re-authentication.

Forg365 also includes an AntiBot feature that employs AES-encrypted redirectors, bot detection, debugger traps, sandbox checks, and polymorphic code to block researcher access to its administration panel. When a VPN connection is detected, the platform redirects visitors to innocuous content rather than exposing phishing infrastructure.

ZeroBEC recommends restricting or disabling Microsoft device-code authentication unless operationally required, monitoring Microsoft Entra logs for device-code authentication events, and auditing mailbox rules, new device sign-ins, Microsoft Authentication Broker activity, and OAuth grants for unexpected entries. Organizations suspecting a compromise are advised to revoke and refresh all tokens and sessions immediately.

Taken together, the two disclosures reinforce a pattern of threat actors converging on Microsoft 365 as a high-value target — combining social engineering at the human layer with increasingly automated and AI-assisted tooling at the technical layer, raising the bar for defenders tasked with monitoring identity and access across enterprise environments.

[Disclaimer](/disclaimer)
