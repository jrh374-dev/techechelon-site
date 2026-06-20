---
title: "AI-Assisted Ransomware Toolkit Automates EDR Evasion and Active Directory Discovery"
slug: ai-assisted-ransomware-toolkit-automates-edr-evasion-and-active-directory-discovery
excerpt: "Sophos researchers uncovered a ransomware toolkit built with AI tools including Claude Opus agents, capable of automating Active Directory discovery and evading EDR products from Sophos, CrowdStrike, and Microsoft after iterative AI-assisted testing."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-06-02T21:04:08.834Z"
coverImage: "https://static.wixstatic.com/media/e37254_3a8d9e0f78084f6fb8c2b83d7ffcde65~mv2.jpg"
readTime: 3
migratedFromWix: true
---

A threat actor has deployed a ransomware attack toolkit built with the assistance of artificial intelligence tools, using the technology to automate Active Directory discovery and evade endpoint detection and response software — a development that underscores how AI is accelerating the pace of offensive cyber operations.

Researchers at Sophos detected the toolkit on a compromised host in a customer environment after alerts fired for payloads stored in the directory C:\Users\User\Documents\test. The discovery led to a broader investigation into a framework that appeared, at first, to be the work of a legitimate security team.

"Our initial assessment included the possibility that a legitimate Red Team was engaged, but our investigation revealed further artifacts that indicated malicious and criminal activity," Sophos told BleepingComputer.

What ultimately confirmed criminal intent was the discovery of ransom notes in Cobalt Strike operator logs, along with references to multiple organizations listed on a ransomware data leak site.

The toolkit was built with assistance from Cursor and Claude Opus agents at various stages of development, including initial coding, analysis, and revision. Some agents were specifically tasked with reviewing security research posts to identify detection bypass techniques, drawing on published work from Kaspersky, Palo Alto Networks, Bishop Fox, and SpecterOps, as well as social media posts.

A Claude Opus 4.5 agent served as coordinator of the research-and-development process, while other agents handled testing, OPSEC hardening, documentation, proxy stress testing, and virtual machine deployment. The multiple Python scripts found on the compromised host were written in Russian and generated with AI assistance.

The framework's core component is a Python-based payload generator that produces executables primarily in Rust and Go, layering encryption and evasion techniques to resist sandboxing, antivirus tools, and EDR detection. Close to 80 modules were generated and tested against more than 70 techniques, according to Sophos.

The toolkit also included Cobalt Strike profiles engineered to make beacon traffic resemble legitimate web requests, a Telegram bot API-based command-and-control mechanism that routed communications through Telegram's infrastructure, and a Cloudflare Worker acting as a front-end redirector to obscure the backend server.

Despite what initially appeared to be a high failure rate, the modules were able to bypass nearly all tested EDR solutions after several iterative refinement cycles. The malware was tested in virtual environments against EDR products from Sophos, CrowdStrike, and Microsoft, though Sophos noted discrepancies between test outputs and the framework's internal reporting in some instances, with the reasons remaining unclear.

Sophos found no evidence that AI was embedded in the deployed malware or operating autonomously within victim environments. The technology functioned as a development accelerant rather than an active attack component, compressing the time between the publication of offensive security research and its practical weaponization by threat actors.

The researchers characterized the workflow as entirely human-driven, with AI agents handling discrete, well-defined tasks rather than operating with open-ended autonomy.

The toolkit's architecture reflects a broader pattern in which ransomware operators are borrowing the iterative development practices of legitimate software engineering — running structured test labs, version-controlling code in Git repositories, and mapping techniques to the MITRE ATT&CK framework — aided by general-purpose AI coding tools.

As AI lowers the technical barrier for developing sophisticated evasion capabilities, security teams face a shrinking window between the emergence of new offensive techniques in public research and their deployment against real targets.
