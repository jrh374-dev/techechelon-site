---
title: "CISA Orders Federal Agencies to Patch Critical Splunk Enterprise Flaw by Sunday"
slug: cisa-orders-federal-agencies-to-patch-critical-splunk-enterprise-flaw-by-sunday
excerpt: "CISA has confirmed active exploitation of CVE-2026-20253, a critical Splunk Enterprise flaw that allows unauthenticated remote attackers to manipulate files, and ordered federal civilian agencies to patch by Sunday under Binding Operational Directive 26-04."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-06-20T19:07:50.448Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/3098_Olsen_Drive.jpg/3840px-3098_Olsen_Drive.jpg"
coverCredit: "via Wikipedia (Splunk)"
coverCreditUrl: "https://en.wikipedia.org/wiki/Splunk"
tags: ["cisa", "splunk", "vulnerability", "patch", "federal agencies", "exploit"]
primaryEntity: "Splunk"
readTime: 2
sourceUrls: ["https://techcrunch.com/2026/06/19/the-ceo-of-allbirds-new-ai-biz-has-a-plan-but-no-employees", "https://techcrunch.com/2026/06/19/the-us-says-asmls-top-chip-tool-may-be-in-china-asml-says-it-isnt", "https://www.bleepingcomputer.com/news/security/cisa-splunk-enterprise-flaw-actively-exploited-patch-by-sunday"]
---

The U.S. Cybersecurity and Infrastructure Security Agency has ordered federal civilian agencies to patch a critical Splunk Enterprise vulnerability by this Sunday after confirming that threat actors are actively exploiting the flaw in the wild.

The vulnerability, tracked as CVE-2026-20253, affects Splunk Enterprise versions 10.2.0 through 10.2.3 and 10.0.0 through 10.0.6. It allows remote, unauthenticated attackers to create or truncate arbitrary files on vulnerable devices through a PostgreSQL sidecar service endpoint.

"The vulnerability exists because the PostgreSQL sidecar service endpoint lacks authentication controls, allowing any network-reachable user to invoke file operations without credentials," Splunk's security team said in an advisory published last week.

The flaw's exposure window widened considerably on June 12, when security research firm WatchTowr published a technical breakdown of the issue alongside proof-of-concept exploit code and a warning that the vulnerability is capable of enabling remote code execution attacks.

Splunk updated its advisory on June 18, citing evidence of exploitation in the wild and urging customers to upgrade to a fixed software release immediately. "In June 2026, the Splunk Product Security Incident Response Team (PSIRT) became aware of limited exploitation of this vulnerability," the company said in that updated advisory.

CISA confirmed active exploitation the following day, Thursday, and invoked Binding Operational Directive 26-04 — issued last week — which requires Federal Civilian Executive Branch agencies to prioritize patches based on each vulnerability's assessed risk of exploitation. The Sunday deadline applies to all FCEB agencies with Splunk instances in their environments.

"This type of vulnerability is a frequent attack vector for malicious cyber actors and poses significant risks to the federal enterprise," CISA said.

Internet security monitoring organization Shadowserver is currently tracking more than 1,400 internet-exposed Splunk instances, with 952 located in North America and 223 in Europe. It remains unclear how many of those instances are running the vulnerable versions targeted by CVE-2026-20253.

For administrators who cannot immediately apply patches, Splunk has advised disabling the PostgreSQL sidecar service as a temporary mitigation to eliminate the attack surface. The company cautioned, however, that doing so will disable Edge Processor, OpAnn, and SPL2 data pipelines on affected systems — a meaningful operational trade-off for organizations that rely on those features.

The directive arrives amid a period of heightened federal attention to vulnerability management. BOD 26-04, the binding directive underpinning Sunday's deadline, represents CISA's latest effort to impose structured, risk-based timelines on federal patching cycles — an acknowledgment that the gap between public disclosure and agency remediation has historically been a reliable window for attackers to operate.
