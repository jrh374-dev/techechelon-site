---
title: "KDDI Data Breach Exposes Email Addresses and Passwords of 12.2 Million People"
slug: kddi-data-breach-exposes-email-addresses-and-passwords-of-12-2-million-people
excerpt: "Japanese telecom giant KDDI has revealed that a zero-day exploit targeting a shared email platform exposed the email addresses of 12.2 million people and the passwords of more than 7.6 million, affecting customers across five internet service providers."
category: security
author: "TechEchelon Staff"
authorInitials: "TE"
publishedAt: "2026-07-08T15:09:41.570Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Garden_Air_Tower.jpg"
coverCredit: "via Wikipedia (KDDI)"
coverCreditUrl: "https://en.wikipedia.org/wiki/KDDI"
tags: ["data breach", "kddi", "zero-day", "japan", "telecommunications", "email security"]
primaryEntity: "KDDI"
readTime: 2
featured: true
hasDisclaimer: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/3-ways-ai-powers-service-desk-attacks-and-how-to-prevent-them", "https://www.bleepingcomputer.com/news/software/duckduckgo-browser-now-blocks-youtube-video-ads", "https://www.bleepingcomputer.com/news/security/japanese-telecom-giant-kddi-says-data-breach-affects-12-million-people"]
---

Japanese telecommunications giant KDDI has disclosed that attackers compromised an email platform shared by five internet service providers, exposing the email addresses of more than 12 million people and the passwords of more than 7.6 million others.

KDDI is Japan's second-largest mobile carrier, with 45,000 employees and annual revenue of $32.4 billion. The company said it discovered the intrusion on June 17, 2026, at which point it blocked the attackers' access and began implementing defensive measures.

According to KDDI, the breach affected the STNet, JCOM, Chubu Telecommunications C, NIFTY Corporation, and BIGLOBE ISP operators — all of which relied on the compromised email platform.

The company said up to 14.22 million current and former customers, as well as holders of inactive accounts, may have had their email addresses and passwords exposed. In a July 6 update, KDDI confirmed that attackers gained access to the email addresses of exactly 12,233,087 people and the passwords of 7,616,173 others.

KDDI said the attackers entered the platform on May 16, exploiting a zero-day vulnerability in third-party software. "As a result of our investigation, as of June 17, 2026, the date of our confirmation, this vulnerability was not recognized by the software vendor," the company said. The software vendor has since reported the vulnerability to public authorities and is working toward public disclosure.

The company acknowledged that some passwords were stored in hashed or encrypted form, which would make them more difficult to use for account hijacking — but KDDI did not specify how many accounts had passwords stored in plaintext, nor did it detail the encryption method used.

KDDI said it is actively working to change the passwords of affected customers' email accounts. "To date, many customers, primarily those who regularly use email services, have already changed their passwords," the company said. For customers who use email less frequently, KDDI said it is coordinating with ISP providers to complete mandatory password changes within one or two days.

On June 23, a forensic audit confirmed that the exploited vulnerability had been remediated and that the affected systems carried no additional security issues, according to KDDI. The company has also deployed Endpoint Detection and Response software across the platform to help detect future intrusion attempts.

KDDI notified Japan's Personal Information Protection Commission and the Ministry of Internal Affairs and Communications following the discovery, and said it continues to work with the affected ISPs on additional security measures.

The incident underscores the risk that shared infrastructure platforms pose across interconnected service providers — a single unpatched zero-day in a third-party component cascaded into exposure for customers across five distinct ISPs, highlighting how quickly a supplier-level vulnerability can translate into a population-scale data event.

[Disclaimer](/disclaimer)
