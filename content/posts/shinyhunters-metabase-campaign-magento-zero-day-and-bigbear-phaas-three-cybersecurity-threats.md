---
title: "ShinyHunters Metabase Campaign, Magento Zero-Day, and BigBear PhaaS: Three Cybersecurity Threats Converge in a Single Day"
slug: shinyhunters-metabase-campaign-magento-zero-day-and-bigbear-phaas-three-cybersecurity-threats
excerpt: "A single day of cybersecurity disclosures brought a Metabase breach affecting 1,079,819 Mathspace users, an unpatched Magento zero-day deploying a Linux backdoor, and a phishing-as-a-service platform that bypassed MFA at 258 organizations."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-09-07T21:02:18.213Z"
coverImage: "https://upload.wikimedia.org/wikipedia/en/f/f5/ShinyHuntersWebsite.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
coverCredit: "via Wikipedia (ShinyHunters)"
coverCreditUrl: "https://en.wikipedia.org/wiki/ShinyHunters"
tags: ["data breach", "phishing", "zero-day", "mathspace", "magento", "shinyhunters"]
primaryEntity: "ShinyHunters"
readTime: 3
featured: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/mathspace-discloses-data-breach-affecting-over-1-million-people", "https://www.bleepingcomputer.com/news/security/magento-stylesmuggler-zero-day-exploited-to-deploy-linux-backdoor", "https://www.bleepingcomputer.com/news/security/bigbear-microsoft-365-phishing-service-bypassed-mfa-at-258-organizations"]
---

Three distinct cyberattack campaigns surfaced in public disclosures on September 7, 2026, spanning a data breach affecting more than 1 million students and parents, an unpatched zero-day in one of the web's most widely deployed e-commerce platforms, and a phishing-as-a-service framework that has bypassed multi-factor authentication at 258 organizations.

Mathspace, an online mathematics learning platform founded in Sydney in 2010 and used by more than 6,900 schools worldwide, disclosed over the weekend that attackers exploited a vulnerability in its self-hosted Metabase installation to steal personal data belonging to 1,079,819 students, parents, guardians, and staff, all from Australia and New Zealand, as [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/mathspace-discloses-data-breach-affecting-over-1-million-people).

"Attackers exploited a security vulnerability in our self-hosted installation of Metabase, software we use for internal reporting," company CTO Alvin Savoy said in a Saturday blog post. "The vulnerability allowed attackers to obtain administrator access to that system without a legitimate login."

Savoy confirmed that threat actors first accessed Mathspace systems on August 10, downloaded data from its Australian reporting database on August 27, and the company confirmed the breach on September 3. No academic records, passwords, authentication tokens, or SSO credentials were exposed, though Savoy acknowledged that for schools with identifiable email domains, linking affected accounts to their institutions may be possible.

The Mathspace incident is part of a broader campaign involving the ShinyHunters extortion group, which added Metabase to its dark web leak site on August 11. ShinyHunters has also been linked to a breach at hardware wallet maker Trezor—whose affected customer count grew from nearly 14,000 to 81,000 in a matter of weeks—as well as incidents at laptop maker Framework and form-building platform Tally, all involving hijacked Metabase instances.

On the e-commerce front, a zero-day vulnerability dubbed "StyleSmuggler" affecting all versions of Magento and Adobe Commerce is being actively exploited, [BleepingComputer also reported](https://www.bleepingcomputer.com/news/security/magento-stylesmuggler-zero-day-exploited-to-deploy-linux-backdoor), citing research from e-commerce security firm Sansec. Magento is installed on more than 160,000 websites, including 14,000 of the top 1 million sites.

The first confirmed exploitation was recorded on September 4 against a target running the latest security updates. The attack abuses Magento's template system through PHP code injection to generate a fake "failed-payment" email that triggers code execution, ultimately installing a small Rust-based backdoor disguised as a system process.

Newer variants of the backdoor camouflage their command-and-control traffic as Network Time Protocol by sending UDP packets to port 123 using hostnames that resemble time-syncing infrastructure—a technique designed to evade firewalls. The malware also sets a cron job to relaunch every 30 minutes for persistence.

Adobe Enterprise Support confirmed it was working on a fix but provided no timeline. Adobe's next scheduled security release was September 8, though BleepingComputer noted Adobe had not confirmed whether StyleSmuggler would be addressed in that release. Until a patch is available, Sansec recommends disabling GraphQL as a mitigation measure.

The third major disclosure involves BigBear 2.0, a phishing-as-a-service platform that researchers at CloudSEK found after gaining administrator access to its control panel. The service operates 42 VPS nodes and uses an Evilginx2-based adversary-in-the-middle framework to intercept credentials and authenticated session cookies, allowing attackers to hijack Microsoft 365 accounts even after victims complete MFA.

"The panel has exfiltrated 5,137 credential records — including 474 complete MFA-bypassed authentications, 1,032 plaintext passwords, and 4,148 session cookies — affecting 3,331 unique victim IPs across 40+ countries," CloudSEK said in a report shared with BleepingComputer.

BigBear is leased to at least five affiliate operators, who receive stolen credentials in real time via Telegram bots. The platform also uses custom JavaScript to disable FIDO2/WebAuthn browser functionality, pushing targets toward weaker authentication methods, and employs geo-matched residential proxies across 69 countries to avoid triggering Microsoft's suspicious-activity flags.

CloudSEK said it notified law enforcement and affected organizations. The administration panel remained online at the time of reporting, though the phishing infrastructure had been offline for nearly three weeks.

Taken together, the three disclosures underscore the continued effectiveness of targeting third-party software components — analytics tools, e-commerce engines, and authentication middleware — as entry points into otherwise hardened environments.
