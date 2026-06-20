---
title: "Russian Hacker Group Secret Blizzard Rebuilds Kazuar Backdoor as Modular P2P Botnet"
slug: russian-hacker-group-secret-blizzard-rebuilds-kazuar-backdoor-as-modular-p2p-botnet
excerpt: "Russia-linked Secret Blizzard has transformed its long-running Kazuar backdoor into a modular, peer-to-peer botnet with 150 configuration options, designed to evade detection through decentralized internal communications and autonomous leader election."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-16T19:05:00.487Z"
coverImage: "https://static.wixstatic.com/media/e37254_0860253eee1747ef8f340e95ad889324~mv2.jpg"
readTime: 3
migratedFromWix: true
---

The Russian state-linked hacking group Secret Blizzard has overhauled its Kazuar backdoor into a modular, peer-to-peer botnet engineered for long-term persistence, stealth, and intelligence collection, according to an analysis published by Microsoft.

Secret Blizzard — whose activity overlaps with groups tracked as Turla, Uroburos, and Venomous Bear — has been associated with the Russian Federal Security Service and is known for targeting government and diplomatic organizations, defense entities, and critical infrastructure across Europe, Asia, and Ukraine.

The Kazuar malware has been documented since 2017, though researchers trace its code lineage to as far back as 2005. It was previously observed in attacks against European government organizations in 2020 and later in operations targeting Ukraine in 2023.

The latest variant operates through three distinct modules: a kernel, a bridge, and a worker. The kernel module serves as a central coordinator, managing tasks and electing a single "leader" system within a compromised network segment. That leader is the only node to communicate with the external command-and-control server, while all other infected systems enter a silent mode and avoid direct external contact.

"The Kernel leader is the one elected Kernel module that communicates with the Bridge module on behalf of the other Kernel modules, reducing visibility by avoiding large volumes of external traffic from multiple infected hosts," Microsoft said.

The bridge module relays traffic between the elected kernel leader and the remote infrastructure using protocols including HTTP, WebSockets, and Exchange Web Services. Internal communications rely on Windows Messaging, Mailslots, and named pipes — methods that blend with routine operational traffic. Messages are encrypted using AES and serialized with Google Protocol Buffers.

The worker module handles the actual espionage operations: keylogging, screenshot capture, filesystem harvesting, system and network reconnaissance, email and MAPI data collection including Outlook downloads, window monitoring, and theft of recently accessed files.

The new variant also supports 150 configuration options, giving operators granular control over security bypasses, task scheduling, data theft timing, exfiltration chunk sizing, process injection, and command execution. Security bypass capabilities now include workarounds for the Antimalware Scan Interface, Event Tracing for Windows, and Windows Lockdown Policy.

Microsoft recommends that organizations prioritize behavioral detection over static signature-based defenses, noting that Kazuar's modular and highly configurable architecture makes it particularly resistant to conventional detection methods.

The disclosure comes amid a broader wave of active exploitation targeting widely deployed software. A separate threat involves a critical, unauthenticated vulnerability in the Funnel Builder plugin for WordPress — developed by FunnelKit — that is being actively exploited to inject malicious JavaScript into WooCommerce checkout pages.

The flaw, which has not yet received an official identifier, affects all versions of the plugin before 3.15.0.3 and requires no authentication to exploit. The plugin is active on more than 40,000 websites, according to WordPress.org statistics.

E-commerce security firm Sansec detected the malicious activity and found that the injected payload — disguised as a fake Google Tag Manager script — opens a WebSocket connection to an attacker-controlled server that delivers a payment card skimmer. The skimmer harvests credit card numbers, CVVs, billing addresses, and other customer information entered at checkout.

FunnelKit addressed the flaw in version 3.15.0.3, released May 15. In a security advisory, the vendor confirmed the activity, stating "we identified an issue that allowed bad actors to inject scripts." The company is urging site administrators to update immediately and to audit their checkout external scripts settings for any rogue code that may already have been introduced.

Together, the two incidents reinforce a pattern security researchers have flagged with increasing urgency: sophisticated state-backed actors are refining their toolsets for durable, low-visibility access, while opportunistic criminal groups continue to exploit unpatched vulnerabilities in popular commercial software — compressing the window defenders have to respond.
