---
title: "Hackers Hijack D-Link and Ubiquiti Devices Across 34 Countries to Monetize Stolen Bandwidth"
slug: hackers-hijack-d-link-and-ubiquiti-devices-across-34-countries-to-monetize-stolen-bandwidth
excerpt: "A proxyjacking campaign has silently hijacked at least 143 D-Link, Ubiquiti, and other edge devices across 34 countries, enrolling victims' internet connections into a commercial residential proxy network to generate unauthorized payouts, according to GreyNoise."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-10-15T19:01:51.494Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/5/5b/D-Link_Corporation_profile.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
coverCredit: "via Wikipedia (D-Link)"
coverCreditUrl: "https://en.wikipedia.org/wiki/D-Link"
tags: ["proxyjacking", "d-link", "ubiquiti", "greynoise", "residential proxy", "edge device security"]
primaryEntity: "D-Link"
readTime: 2
sourceUrls: ["https://www.cnbc.com/2026/10/15/tesla-roadster-reveal-what-to-know-about-the-delayed-ev.html", "https://thehill.com/newsletters/1230-report/6151324-nidal-hasan-execution-livestream-omar-aoc-el-sayed-zacharia", "https://www.bleepingcomputer.com/news/security/hackers-hijack-d-link-ubiquiti-devices-to-resell-your-stolen-bandwidth"]
---

A proxyjacking campaign has compromised at least 143 devices across 34 countries, silently enrolling victims' internet connections into a commercial residential proxy network without their knowledge, according to research from threat intelligence firm GreyNoise.

The campaign, first reported by BleepingComputer, involves attackers installing Pawns.app — a legitimate bandwidth-sharing application — on vulnerable edge devices without the owners' consent. Pawns.app allows users to voluntarily earn money by letting traffic from other users route through their connections. By hijacking multiple devices and enrolling them under a single account, the attacker likely generated larger payouts from the platform.

GreyNoise uncovered the activity while investigating suspicious behavior at an unnamed organization. Researchers linked the intrusions to several known vulnerabilities across a range of widely deployed devices.

The exploited flaws include CVE-2024-3272 and CVE-2024-3273 in D-Link ShareCenter NAS devices, CVE-2021-44228 — the well-documented Log4Shell vulnerability — affecting Ubiquiti UniFi Video NVR systems, and CVE-2025-31324 in SAP NetWeaver Visual Composer. Researchers also observed targeting of Hikvision and Dahua DVR and NVR systems, though the specific vulnerabilities used against those devices were not identified.

In some instances, attackers went a step further by configuring SSH key authentication as a secondary persistence method, ensuring continued access even if the initial entry point was patched or closed.

The use of a nominally legitimate application complicates detection. Because Pawns.app operates as a commercial service, its network traffic may not trigger traditional security alerts, allowing the campaign to persist longer than attacks involving overtly malicious tools.

The risks extend beyond the immediate victims. Even legitimate proxy networks can inadvertently route suspicious or unlawful traffic through nodes operated by ordinary users, GreyNoise noted. That exposure can result in IP address blocks, or in more serious cases, draw scrutiny from law enforcement. The FBI has previously warned that residential proxy networks have been exploited to conduct large-scale credential stuffing attacks against online platforms.

The geographic spread of compromised devices — spanning 34 countries — underscores how widely deployed, and often poorly maintained, consumer and small-business network hardware remains a favored target for opportunistic threat actors. Edge devices such as NAS units and network video recorders frequently go unpatched for extended periods, leaving known vulnerabilities open long after fixes are available.

GreyNoise offers a free lookup tool, requiring account registration, that allows users to check whether their IP address has been associated with a known proxying service.

Security researchers advised organizations and individuals running internet-facing devices to apply available patches promptly, enforce strong credentials, implement secure configurations, and restrict unnecessary network exposure. The campaign highlights the growing incentive for financially motivated attackers to quietly monetize compromised infrastructure rather than deploy ransomware or exfiltrate data — a lower-profile approach that can evade detection for longer stretches.
