---
title: "U.S. and South Korea Warn of Gunra Ransomware Targeting Government and Critical Infrastructure"
slug: u-s-and-south-korea-warn-of-gunra-ransomware-targeting-government-and-critical-infrastructure
excerpt: "U.S. federal agencies and South Korea's National Police Agency have jointly warned that the Gunra ransomware group — a Conti-derived operation with ties to North Korea's Lazarus Group — is actively targeting government and critical infrastructure sectors worldwide."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-08-11T11:01:28.430Z"
coverImage: "https://images.pexels.com/photos/6950205/pexels-photo-6950205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by Werner Pfennig on Pexels"
coverCreditUrl: "https://www.pexels.com/@werner-pfennig"
tags: ["ransomware", "gunra", "lazarus group", "critical infrastructure", "fortinet", "raas"]
primaryEntity: "Lazarus Group"
readTime: 2
sourceUrls: ["https://thehill.com/homenews/campaign/6021344-progressives-face-midterm-test-wisconsin-minnesota", "https://www.bleepingcomputer.com/news/security/us-warns-of-gunra-ransomware-attacks-against-government-critical-infrastructure", "https://www.cnbc.com/2026/08/11/singapore-gdp-forecast-ai-boost-oil.html"]
---

U.S. federal agencies and South Korea's National Police Agency issued a joint advisory Monday warning government bodies and critical infrastructure operators worldwide to harden their systems against attacks by the Gunra ransomware group, which has expanded rapidly since emerging in April 2025.

The advisory, first reported by BleepingComputer, describes Gunra as a double-extortion ransomware variant built on source code from the Conti ransomware operation, which leaked in February 2022. The group has targeted a broad range of sectors, including healthcare, public health, financial services, and government agencies.

"Gunra first emerged in April 2025 as a sophisticated double-extortion ransomware variant derived from the leaked Conti1 ransomware source code," the authoring agencies said in the advisory.

Gunra actors have been observed exploiting two critical authentication vulnerabilities in Fortinet's FortiOS and FortiProxy software — tracked as CVE-2024-55591 and CVE-2025-24472 — to gain initial footholds on victim networks. The group also exploits credential-exposure flaws and Secure Shell access control weaknesses in internet-facing VPN gateways.

The group's attacks initially focused on Windows environments before the introduction of a Linux variant in mid-2025 enabled cross-platform campaigns.

Since January 2026, Gunra has launched a formal ransomware-as-a-service platform on dark web forums, providing affiliates with a management panel, a configurable ransomware builder, cross-platform locker payloads, and structured documentation. The FBI has observed the group operating under the alias "Golden Community" as part of that expansion.

"Gunra has further commercialized its platform by actively recruiting penetration testers and ethical hackers to serve as initial access brokers, offering a share of the ransom profits in exchange for enterprise network access," the joint advisory states.

The FBI has also observed Gunra actors attempting to contact management staff at victim organizations directly via email in order to solicit ransom payments, though with limited success, according to the advisory.

The joint alert follows a separate advisory from South Korean cybersecurity firm AhnLab, issued in collaboration with multiple South Korean government agencies, which identified links between the Gunra ransomware group and Lazarus Group — a North Korean state-backed hacking collective.

Authorities advised network defenders to apply patches for known exploited vulnerabilities in internet-facing systems promptly, segment networks to limit lateral movement, and maintain offline backups of critical data.

The advisory underscores a broader pattern of ransomware groups professionalizing their operations through affiliate recruitment and platform development, even as law enforcement agencies in multiple countries have increased coordinated action against such networks. With Gunra's RaaS platform now active and its affiliate roster apparently growing, the volume and sophistication of attacks attributed to the group bears close watching in the months ahead.
