---
title: "JadePuffer Ransomware Used Autonomous AI Agent to Conduct Entire Cyberattack"
slug: jadepuffer-ransomware-used-autonomous-ai-agent-to-conduct-entire-cyberattack
excerpt: "Cloud security firm Sysdig has documented what researchers call the first ransomware operation conducted entirely by an autonomous AI agent, dubbed JadePuffer, which carried out every stage of an intrusion — from exploitation to encryption — without apparent human direction at each step."
category: security
author: "Marc Sabatini"
authorInitials: "MS"
publishedAt: "2026-07-04T15:02:51.766Z"
coverImage: "https://images.pexels.com/photos/1181320/pexels-photo-1181320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by Christina Morillo on Pexels"
coverCreditUrl: "https://www.pexels.com/@divinetechygirl"
tags: ["ransomware", "ai agents", "llm", "sysdig", "jadepuffer", "cyberattack"]
primaryEntity: "Sysdig"
readTime: 3
featured: true
hasDisclaimer: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/jadepuffer-ransomware-used-ai-agent-to-automate-entire-attack", "https://www.theverge.com/tech/960854/ai-fanfiction-ao3-claude-detector", "https://www.theverge.com/tech/961387/amazon-2023-fire-hd-10-tablet-4gb-update"]
---

Researchers at cloud security firm Sysdig have documented what they describe as the first known ransomware operation conducted entirely by a large language model agent — a campaign they have named JadePuffer — in which an autonomous AI system carried out every stage of an intrusion without apparent human intervention at each step.

The AI agent handled reconnaissance, credential theft, lateral movement, persistence, privilege escalation, and data encryption, adapting to failures along the way in a manner researchers say resembles how a human attacker responds to obstacles.

"The operation also adapted in real time, retrying failed steps within refined parameters. In one sequence, it went from a failed login to a working fix in 31 seconds," Sysdig said.

JadePuffer gained initial access by exploiting CVE-2025-3248, an unauthenticated remote code execution vulnerability in Langflow, an open-source framework for building LLM applications. The vendor patched the flaw on April 1, 2025, and the Cybersecurity and Infrastructure Security Agency added it to its known-exploited vulnerabilities catalog in early May of that year, noting that internet-exposed Langflow deployments frequently contain cloud credentials and API keys.

Once inside, the AI agent dumped Langflow's PostgreSQL database, gathered host information, searched environment variables and sensitive files, retrieved credentials, and enumerated a MinIO object store. Sysdig highlighted the agent's adaptive approach during MinIO enumeration: when one API request returned XML instead of JSON, the subsequent payload automatically adjusted its parsing logic.

The agent also installed a cron job on the Langflow host, configured to beacon to attacker-controlled infrastructure every 30 minutes, establishing persistent access before pivoting to a production MySQL server running Alibaba Nacos.

On the Nacos server, the agent deployed multiple payloads, including one exploiting CVE-2021-29441, an authentication bypass vulnerability capable of creating rogue administrator accounts. It then probed for container escape methods before deploying the ransomware payload.

In total, the agent encrypted 1,342 Nacos service configuration items. "The captured payloads show the agent encrypting all 1,342 Nacos service configuration items using MySQL's AES_ENCRYPT(), dropping the original config_info and history tables, and creating an extortion table (README_RANSOM) containing the demand, a Bitcoin payment address, and a Proton Mail contact," Sysdig described.

The ransom note claimed AES-256 encryption, though Sysdig researchers believe the actual implementation was the weaker AES-128-ECB. The encryption key was randomly generated and, notably, neither stored nor transmitted back to the attacker — a functional flaw that would render data recovery impossible even for a paying victim.

The Bitcoin address included in the ransom note appears to be a widely circulated example address from public documentation, suggesting the LLM may have reproduced it from training data rather than generating a live payment destination.

Sysdig identified several technical indicators pointing to AI authorship: natural-language comments embedded in the generated code describing the agent's operational reasoning, and rapid iterative adjustments tied to specific errors encountered rather than generic retries.

Sysdig concluded that JadePuffer signals the arrival of what it terms "agentic threat actors," a category of attacker that lowers the skill threshold for executing damaging intrusions. The firm also noted that the way LLM agents operate today — generating verbose, annotated payloads — creates new detection opportunities for security tools trained to recognize those patterns.

Whether JadePuffer represents a one-off experiment or the early signal of a broader shift toward AI-automated intrusions, the case gives defenders a concrete technical baseline to study — and a narrowing window in which AI-generated attack artifacts remain reliably detectable.

[Disclaimer](/disclaimer)
