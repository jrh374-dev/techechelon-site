---
title: "CenterPoint Energy Confirms Customer Data Stolen After API Security Failure"
slug: centerpoint-energy-confirms-customer-data-stolen-after-api-security-failure
excerpt: "CenterPoint Energy has confirmed that a threat actor stole customer personal information by exploiting an unprotected public API, with the attacker claiming to have taken 7.49 million records including partial Social Security numbers."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-09-15T19:01:43.319Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Centerpoint_energy_plaza.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
coverCredit: "via Wikipedia (CenterPoint Energy)"
coverCreditUrl: "https://en.wikipedia.org/wiki/CenterPoint_Energy"
tags: ["centerpoint energy", "data breach", "api security", "utility sector", "customer data", "sec filing"]
primaryEntity: "CenterPoint Energy"
readTime: 2
featured: true
hasDisclaimer: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/centerpoint-energy-confirms-customer-data-stolen-in-cyberattack", "https://www.darkreading.com/endpoint-security/vectrarat-hack-windows-enterprises", "https://www.bleepingcomputer.com/news/security/bambootoken-malware-controls-windows-and-linux-systems-via-mqtt"]
---

CenterPoint Energy has confirmed that an unauthorized party stole personal information belonging to a portion of its customers after a threat actor exploited weaknesses in one of the utility's external-facing application programming interfaces, the company disclosed in a filing with the U.S. Securities and Exchange Commission.

The breach, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/centerpoint-energy-confirms-customer-data-stolen-in-cyberattack), came to light after a threat actor using the alias "4d722e4d656f77" told the publication they had exfiltrated 7.49 million customer records from the Houston-based utility.

The stolen data allegedly includes names, phone numbers, service and billing addresses, account numbers, billing amounts, and partial Social Security numbers.

The threat actor claimed to have harvested the records by iterating through millions of IDs on CenterPoint's public API, which they said lacked rate limiting, web application firewall protection, and other controls against automated access. The attacker said they leaked the data publicly after the company ignored their communications.

In its SEC filing, CenterPoint confirmed an unauthorized third party obtained customer personal information but did not specify the number of affected individuals or detail the categories of compromised data. "The Company is continuing to work with third-party experts to determine the scope of customers and personal information affected by the incident and intends to notify affected customers and regulatory authorities as required by applicable law," the filing states.

CenterPoint serves approximately 7 million metered customers across Indiana, Minnesota, Ohio, and Texas, and generates over $9.3 billion in annual revenue. The company employs roughly 8,300 people.

The company said its electric and gas services were not disrupted by the incident and that it does not believe the breach will materially affect its business or financial condition.

CenterPoint said it has activated its incident-response procedures, retained third-party cybersecurity experts, strengthened protections on affected systems, and reported the matter to law enforcement and regulators.

Litigation followed quickly. Multiple law firms have filed proposed class-action lawsuits against CenterPoint in federal court on behalf of potentially affected customers, alleging the breach occurred between August 17 and September 1.

The incident reinforces a recurring vulnerability pattern in which customer-facing APIs are exposed to automated enumeration attacks — a risk that organizations handling sensitive utility and billing data have struggled to address consistently across large, distributed infrastructures.

With its investigation still ongoing and customer notification yet to be completed, CenterPoint faces both regulatory scrutiny and civil liability, while affected customers await clarity on the full extent of what personal information may have been compromised.

[Disclaimer](/disclaimer)
