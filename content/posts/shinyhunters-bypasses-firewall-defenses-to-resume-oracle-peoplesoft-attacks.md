---
title: "ShinyHunters Bypasses Firewall Defenses to Resume Oracle PeopleSoft Attacks"
slug: shinyhunters-bypasses-firewall-defenses-to-resume-oracle-peoplesoft-attacks
excerpt: "The ShinyHunters extortion gang is bypassing web application firewall rules meant to block exploitation of Oracle PeopleSoft CVE-2026-35273 by using a URL-encoding trick, resuming attacks against organizations across healthcare, government, education, and other sectors."
category: security
author: "Marc Sabatini"
authorInitials: "MS"
publishedAt: "2026-09-26T21:02:05.564Z"
coverImage: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Oracle_Campus_in_Austin_2018.jpg/3840px-Oracle_Campus_in_Austin_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
coverCredit: "via Wikipedia (Oracle Corporation)"
coverCreditUrl: "https://en.wikipedia.org/wiki/Oracle_Corporation"
tags: ["shinyhunters", "oracle peoplesoft", "cve-2026-35273", "waf bypass", "mandiant", "web shell"]
primaryEntity: "Oracle Corporation"
readTime: 3
hasDisclaimer: true
sourceUrls: ["https://arstechnica.com/security/2026/09/google-ads-caught-delivering-convincing-scareware-ads-to-unsuspecting-users", "https://www.bleepingcomputer.com/news/security/shinyhunters-uses-waf-bypass-trick-in-oracle-peoplesoft-attacks", "https://arstechnica.com/apple/2026/09/review-the-iphone-18-pro-is-apples-coolest-smartphone-but-only-literally"]
---

The ShinyHunters extortion gang has resumed widespread exploitation of a critical Oracle PeopleSoft vulnerability by using a URL-encoding trick to circumvent web application firewall rules that organizations had deployed as a temporary defense, according to new research from Google's Mandiant and Threat Intelligence Group.

The technique, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/shinyhunters-uses-waf-bypass-trick-in-oracle-peoplesoft-attacks), targets CVE-2026-35273, a flaw Oracle patched on June 11 that allows unauthenticated remote code execution against PeopleSoft servers.

At the time of the patch, Mandiant advised organizations that could not immediately apply the update to block external access to the vulnerable `/PSEMHUB/` endpoint using a WAF. ShinyHunters has now found a way around that guidance.

Rather than requesting the literal path `/PSEMHUB/`, attackers are now sending requests to `/%50SEMHUB/`, where `%50` is the percent-encoded representation of the letter "P." Many WAFs and reverse proxies compare the literal request path before decoding it, so rules written to block `/PSEMHUB/` fail to catch the encoded variant. Oracle WebLogic, however, decodes the character and routes the request to the vulnerable endpoint, bypassing the firewall rule entirely.

"This allows the threat actor to reach the endpoint on systems whose operators may have believed their WAF rules had mitigated the exposure," Mandiant explained in its report.

Google warns that ShinyHunters may not limit itself to the `%50` variant and could rotate to other percent-encoded, mixed-case, or alternative encodings of the path to sidestep updated WAF rules.

The new wave of attacks has resulted in web shell deployments on dozens of systems across higher education, technology, IT services, healthcare, agriculture, transportation, and government organizations worldwide, according to Mandiant.

Before attempting full exploitation, the attackers typically send between five and 15 POST requests to the encoded endpoint containing serialized Java objects. On vulnerable systems, those requests return host operating system information without writing files or disrupting service — a reconnaissance step that lets ShinyHunters quietly determine whether a target is exploitable.

Once a vulnerable server is confirmed, the group executes commands directly in memory or deploys JSP web shells. On compromised Windows servers, Mandiant observed the deployment of an executable named `Ple64.exe` that masquerades as a signed Light Alloy media player installer but installs a backdoor Google tracks as SIDEEYE. The malware is used to steal credentials, manage processes and files, create reverse shells, and proxy traffic.

ShinyHunters also deployed the open-source Neo-reGeorg tunneling toolkit, which allows SOCKS5 proxy traffic to move over standard HTTP and HTTPS connections, enabling lateral movement into internal networks from compromised PeopleSoft servers. On Linux systems, Mandiant observed the group using the legitimate MeshAgent remote management tool to maintain persistent access.

The new campaign follows ShinyHunters' September 22 claim that it breached FBI systems using a separate Oracle PeopleSoft zero-day, accessing the FBI Jobs platform and then moving laterally into the agency's AWS GovCloud infrastructure. The group told BleepingComputer it stole between 2TB and 3TB of data related to current and former FBI employees and job applicants. The FBI confirmed it was investigating claims of unauthorized activity affecting FBIjobs.gov but did not confirm a breach or data theft. ShinyHunters has since confirmed to BleepingComputer that it used the WAF bypass technique against FBI Jobs, while also claiming a separate, as-yet-unverified vulnerability in the same PSEMHUB component.

Mandiant's guidance is unambiguous: organizations running Oracle PeopleSoft should apply the latest security update rather than rely on WAF-based mitigations. Security teams are also advised to search WebLogic access logs for requests to both `/PSEMHUB/` and encoded variants such as `/%50SEMHUB/` to identify signs of prior or ongoing exploitation.

With ShinyHunters demonstrating the ability to adapt its tooling rapidly in response to defensive measures, organizations that have deferred patching face a narrowing window to remediate before further intrusions occur.

[Disclaimer](/disclaimer)
