---
title: "Unpatched Chromium Flaw Exposed, Cisco Patches Maximum-Severity Bug, and Chinese Hackers Target Telcos"
slug: unpatched-chromium-flaw-exposed-cisco-patches-maximum-severity-bug-and-chinese-hackers-target-telc
excerpt: "Google accidentally exposed details of an unpatched Chromium remote code execution flaw, Cisco patched a maximum-severity Secure Workload vulnerability, and researchers detailed a Chinese espionage campaign hitting telecom providers with new Linux and Windows malware."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-05-21T19:04:41.805Z"
coverImage: "https://static.wixstatic.com/media/e37254_8e0d262f63cc476095d35a86882c94f5~mv2.webp"
readTime: 3
migratedFromWix: true
---

Three cybersecurity developments surfaced Wednesday, spanning an accidentally disclosed Chromium vulnerability that remains unpatched, a maximum-severity flaw in Cisco's Secure Workload platform, and a newly detailed Chinese espionage campaign targeting telecommunications providers across Asia and the Middle East.

Google accidentally disclosed details of an unresolved Chromium flaw that allows JavaScript to persist on a device even after the browser is closed, enabling remote code execution without any user interaction beyond visiting a single webpage.

The vulnerability, first reported by security researcher Lyra Rebane and acknowledged as valid in December 2022, exploits a malicious Service Worker — such as a background download task — that never terminates. Rebane warned that an attacker could use it to silently execute JavaScript on visitors' devices at scale.

"It's realistic to get tens of thousands of pageviews for creating a 'botnet', and people won't be aware that JavaScript can be remotely executed on their device," Rebane said in the original bug report.

The flaw affects all Chromium-based browsers, including Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi, and Arc. Access restrictions on Chromium Issue Tracker were lifted on May 20 after the bug had been closed for more than 14 weeks and marked as fixed — but Rebane tested the supposed fix that same day and confirmed the vulnerability still worked in Chrome Dev 150 and Edge 148.

Rebane posted on Mastodon that the exploit had grown stealthier in recent Edge builds, with the download pop-up that previously accompanied the exploit no longer appearing. She told Ars Technica that Google's accidental disclosure would make exploitation "pretty easy," though scaling it into a large botnet is more complicated. She also clarified that the bug does not bypass browser security boundaries and does not grant attackers access to emails, files, or the host operating system. Google had not responded to requests for comment by publication time.

Separately, Cisco on Wednesday released security updates to address a maximum-severity vulnerability in its Secure Workload platform, tracked as CVE-2026-20223. The flaw resides in Secure Workload's internal REST APIs and allows unauthenticated attackers to access resources with Site Admin privileges.

"A successful exploit could allow the attacker to read sensitive information and make configuration changes across tenant boundaries with the privileges of the Site Admin user," Cisco said in its advisory.

Cisco confirmed there are no workarounds for the flaw and has released patches for on-premises customers, with fixed releases available in versions 3.10.8.3 and 4.0.3.17. The company's Product Security Incident Response Team said it has found no evidence of exploitation in the wild prior to the advisory's publication. Cisco's Secure Workload SaaS deployment has already been patched.

The disclosure follows Cisco's warning earlier this month that a separate maximum-severity authentication bypass flaw — CVE-2026-20182 — affecting its Catalyst SD-WAN platform was being actively exploited as a zero-day. The U.S. Cybersecurity and Infrastructure Security Agency added that flaw to its Known Exploited Vulnerabilities Catalog on May 14 and ordered federal agencies to secure affected devices by May 17.

On the threat-actor front, researchers at Lumen's Black Lotus Labs and PwC Threat Intelligence published findings Wednesday detailing an ongoing Chinese cyber-espionage campaign attributed to the Calypso threat group, also tracked as Red Lamassu. The operation has been active since at least mid-2022 and has targeted telecommunications providers across the Asia Pacific region and parts of the Middle East.

The campaign employs two newly documented malware families: Showboat, a modular Linux post-exploitation framework built for long-term persistence, and JFMBackdoor, a full-featured Windows espionage implant. Showboat functions primarily as a SOCKS5 proxy and port-forwarding pivot, enabling lateral movement through compromised networks. JFMBackdoor offers capabilities including reverse shell access, file management, screenshot capture, and self-removal to hinder forensic investigation.

Lumen's researchers concluded that the tooling is likely shared across multiple China-aligned threat groups, each operating against distinct regional targets but drawing from the same malware ecosystem — a finding that underscores the coordinated nature of the broader campaign.

With an unpatched browser flaw now public, a critical enterprise platform requiring immediate updates, and an active state-linked espionage operation targeting critical infrastructure, security teams face a crowded remediation queue heading into the week.
