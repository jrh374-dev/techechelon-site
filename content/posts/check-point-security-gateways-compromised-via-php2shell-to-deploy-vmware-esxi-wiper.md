---
title: "Check Point Security Gateways Compromised via PHP2Shell to Deploy VMware ESXi Wiper"
slug: check-point-security-gateways-compromised-via-php2shell-to-deploy-vmware-esxi-wiper
excerpt: "Attackers exploited two critical PHP flaws and a Check Point zero-day to compromise Security Gateway instances and deploy a data wiper on VMware ESXi hosts, with the first wave targeting Israeli organizations beginning October 30."
category: security
author: "TechEchelon Staff"
authorInitials: "TE"
publishedAt: "2026-11-13T19:02:40.223Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Check_Point_HQ_new_wing.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
coverCredit: "via Wikipedia (Check Point)"
coverCreditUrl: "https://en.wikipedia.org/wiki/Check_Point"
tags: ["check point", "php2shell", "vmware esxi", "data wiper", "zero-day", "cyberattack"]
primaryEntity: "Check Point"
readTime: 3
featured: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/german-military-drone-operations-disrupted-by-cyberattack", "https://thehill.com/opinion/criminal-justice/6218590-bipartisan-public-safety-bills", "https://www.bleepingcomputer.com/news/security/check-point-gateways-hacked-via-php2shell-to-deploy-vmware-esxi-wiper"]
---

Attackers have exploited critical vulnerabilities in Check Point Security Gateway instances to deploy data-wiping malware on VMware ESXi hosts, with an initial wave targeting Israeli organizations beginning October 30, according to Check Point's own research.

The campaign relies on PHP2Shell, a name given to two critical PHP flaws tracked as CVE-2026-109618 and CVE-2026-109619, both of which allow unauthenticated remote code execution on vulnerable systems. PHP issued emergency patches for the vulnerabilities on October 21, but according to Amazon Threat Intelligence, exploitation attempts had already begun four days before that, underscoring how quickly threat actors moved to weaponize the bugs.

The campaign, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/check-point-gateways-hacked-via-php2shell-to-deploy-vmware-esxi-wiper), marks one of the most consequential exploitation chains tied to PHP2Shell since the bugs were disclosed. CISA added both issues to its Known Exploited Vulnerabilities catalog on October 26 and subsequently warned that attackers were chaining the PHP2Shell flaws with a Linux kernel vulnerability called Fragnesia to obtain root privileges.

In the Check Point-specific intrusions, the attacker entered through the gateways' Mobile Access portal using PHP2Shell, then pivoted by exploiting a newly disclosed zero-day tracked as CVE-2026-123039 to escalate to root. From that position, the attacker installed PHP webshells and a backdoor designated TSGA, which embeds a networking component called TSProxy to receive commands disguised within normal traffic.

Against Israeli targets, the threat actor then moved laterally to VMware ESXi hosts, located using gogo scanner, an open-source network reconnaissance tool. In the final stage, the attacker deployed a wiper called destroy_v6, which recursively deletes data in a target directory and attempts a zero fill to complicate data recovery. The wiper also supports a faster mode that skips the overwriting step entirely.

A second exploitation wave began November 2, affecting organizations across multiple countries and sectors. That wave did not include the destructive wiper activity, though Check Point said the follow-on actions taken in those intrusions remain unclear.

In the Israeli-targeted incidents, the attacker left a text file on compromised ESXi hosts named DREAM_ANNEXATION.txt, referencing an entity called "Dream Security Ltd." The note contained political messages and explicitly rejected ransom negotiations, indicating the attackers aimed to cause damage rather than extract payment. Check Point tentatively linked the TSGA and TSProxy tools to PhiliKit, a malware framework previously observed in attacks on Ivanti appliances and associated by ESET with the Chinese threat cluster UNC5221. However, Check Point cautioned that the available evidence does not support a confident attribution, and noted the political messaging raises the possibility of a false-flag operation.

Check Point has advised all customers to install the November Jumbo Hotfix on Management Servers and Security Gateways, with priority given to systems running internet-facing Mobile Access portals. The update addresses both PHP2Shell and a separate privilege escalation flaw called DynamicCLI that was also used in the attacks.

Administrators are urged to look for indicators of compromise on previously exposed gateways, including session files containing the string "upload_progress_pwn," unexpected CPconfigdaemon processes or binaries, unexplained gaps in firewall logs, and unauthorized SSH connections from gateways to internal ESXi infrastructure.

The campaign reflects a broader pattern of attackers targeting network security appliances as entry points, leveraging n-day and zero-day vulnerabilities in rapid succession to move from perimeter access to deep infrastructure destruction before defenders can respond.
