---
title: "CISA Orders Federal Agencies to Patch Check Point VPN Flaw Within 3 Days Amid Qilin Ransomware Attacks"
slug: cisa-orders-federal-agencies-to-patch-check-point-vpn-flaw-within-3-days-amid-qilin-ransomware-attac
excerpt: "CISA has ordered federal agencies to patch a critical Check Point VPN authentication-bypass flaw, CVE-2026-50751, by June 11 after Qilin ransomware affiliates exploited it as a zero-day against dozens of organizations worldwide."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-06-09T11:02:55.602Z"
coverImage: "https://static.wixstatic.com/media/e37254_9d08aa2f18d24a80bbc7f3fe985e3289~mv2.jpg"
readTime: 2
migratedFromWix: true
---

The U.S. Cybersecurity and Infrastructure Security Agency has directed all Federal Civilian Executive Branch agencies to remediate a critical vulnerability in Check Point's Remote Access VPN and Mobile Access products by June 11, giving agencies a three-day window to act after the flaw was confirmed as actively exploited in zero-day attacks.

The vulnerability, tracked as CVE-2026-50751, allows unauthenticated remote attackers to bypass authentication and establish a remote access VPN connection on targeted Mobile Access/SSL VPN, Remote Access VPN, or Spark firewall deployments.

The flaw affects only instances configured to use the deprecated IKEv1 key exchange protocol, specifically security gateways that do not require a machine certificate for connections and that accept legacy remote access clients.

Check Point released security updates addressing CVE-2026-50751 on Monday, noting that exploitation in the wild began on May 7 and intensified over the weekend. The Israeli cybersecurity company said the attacks have so far resulted in confirmed breaches at "a few dozen" organizations globally.

At least one of those incidents has been tied to the Qilin ransomware operation. "One case involved confirmed post-compromise activity associated with Qilin ransomware affiliate," the company said in a statement.

Qilin operates as a Ransomware-as-a-Service platform and has claimed more than 400 victims on its dark web leak site since it emerged in August 2022.

CISA added CVE-2026-50751 to its Known Exploited Vulnerabilities catalog on Sunday, triggering the mandatory remediation timeline under Binding Operational Directive 22-01. "This type of vulnerability is a frequent attack vector for malicious cyber actors and poses significant risks to the federal enterprise," the agency said.

For organizations that cannot immediately apply the available patches, Check Point outlined several interim mitigations: removing support for the legacy remote access client, restricting Remote Access VPN Authentication to IKEv2 only via global properties, enabling the Intrusion Prevention System and downloading the relevant signatures, and making Machine Certificate Authentication mandatory.

CISA extended its guidance beyond the federal perimeter, urging private-sector security teams to deploy patches for CVE-2026-50751 as quickly as possible. The directive's legal force, however, covers only federal agencies.

The vulnerability adds to a pattern of Check Point products being targeted by ransomware operators. Two years ago, CISA flagged a separate flaw, CVE-2024-24919, affecting Check Point's Quantum Security Gateways as actively exploited, with that bug later linked to NailaoLocker ransomware attacks by Orange Cyberdefense CERT.

With the June 11 remediation deadline now in effect, federal agencies running IKEv1-configured Check Point deployments face immediate pressure to either apply vendor patches or implement the prescribed workarounds before the window closes.

Disclaimer
