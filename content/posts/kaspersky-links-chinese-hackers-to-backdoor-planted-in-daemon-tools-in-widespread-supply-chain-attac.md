---
title: "Kaspersky Links Chinese Hackers to Backdoor Planted in Daemon Tools in Widespread Supply Chain Attack"
slug: kaspersky-links-chinese-hackers-to-backdoor-planted-in-daemon-tools-in-widespread-supply-chain-attac
excerpt: "Kaspersky has linked a Chinese-language hacking group to a backdoor planted in Daemon Tools, a popular Windows disc imaging application, in a supply chain attack the firm says is ongoing and has already been used to deliver malware to organizations in Russia, Belarus, and Thailand."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-05-05T17:05:37.451Z"
coverImage: "https://static.wixstatic.com/media/e37254_4f483da862a94910842e287c129d23a5~mv2.jpg"
readTime: 3
migratedFromWix: true
---

Security researchers at Kaspersky have identified a malicious backdoor embedded in Daemon Tools, the widely used Windows disc imaging software, and have attributed the operation to a Chinese-language speaking hacking group in what the firm is calling a "widespread" and ongoing supply chain attack.

Kaspersky said Tuesday that telemetry collected from computers running its antivirus software shows thousands of Windows machines running Daemon Tools have been exposed to the threat. The backdoor was first detected on April 8, the company said.

The attackers used the compromised software to deploy additional malware on a dozen computers across the retail, scientific, and manufacturing sectors, as well as on government systems. Kaspersky described the targeting of those specific machines as a "targeted" effort within the broader campaign. The affected organizations are located in Russia, Belarus, and Thailand.

The supply chain attack remains "still active," according to Kaspersky, meaning hackers retain the ability to push malware to any machine running the infected software. The company said it had contacted Disc Soft, the developer behind Daemon Tools, but did not disclose whether Disc Soft had responded or taken action at the time of publication.

A Disc Soft representative, when contacted for comment, said the company is "aware of the report and are currently investigating the situation." "Our team is treating this matter with the highest priority and is actively working to assess and address the issue. At this stage, we are not in a position to confirm specific details referenced in the report. However, we are taking all necessary steps to remediate any potential risks and to ensure the security of our users," the representative said.

An independent check of the Windows installer downloaded directly from the Daemon Tools website found the file appeared to contain the backdoor when run through the online malware scanner VirusTotal. It is not known whether the macOS version of Daemon Tools or other applications made by Disc Soft are affected.

The Daemon Tools attack follows a pattern of supply chain intrusions that security researchers say has intensified in recent months. Earlier this year, hackers linked to the Chinese government compromised the popular text editing software Notepad++ to deliver malware to organizations with interests in East Asia. Last month, researchers also warned of a separate attack targeting visitors to the website of CPUID, the maker of the widely used HWMonitor and CPU-Z diagnostic tools.

Supply chain attacks have grown in appeal because a single compromise can expose a large number of downstream users simultaneously. By infiltrating a developer's distribution pipeline, attackers can deliver malicious code as part of what appears to be a routine software update, bypassing many conventional defenses.

Kaspersky's attribution to a Chinese-language speaking group is based on analysis of the malware itself, though the company did not provide additional technical indicators or name a specific threat actor. The scope of the broader campaign — touching thousands of machines — contrasts with the surgical focus on a dozen organizations, suggesting the attackers may be using wide initial access to identify and prioritize high-value targets for follow-on operations.
