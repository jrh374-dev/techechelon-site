---
title: "TeamPCP Hackers Put Mistral AI Source Code Up for Sale at $25,000"
slug: teampcp-hackers-put-mistral-ai-source-code-up-for-sale-at-25-000
excerpt: "Hacker group TeamPCP is offering nearly 450 Mistral AI internal code repositories for $25,000 on a hacker forum, threatening to release the data publicly within a week if no buyer is found. The breach traces back to the Shai-Hulud software supply-chain attack."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-14T23:05:03.425Z"
coverImage: "https://static.wixstatic.com/media/e37254_74a7d477eb704d0bb21b3cd6c54fe836~mv2.jpeg"
readTime: 2
migratedFromWix: true
---

A hacker group known as TeamPCP is advertising nearly 450 internal code repositories stolen from French AI company Mistral AI, asking $25,000 for the data and threatening to release it publicly within a week if no buyer comes forward.

The threat actor made the offer in a post on a hacker forum, claiming to possess approximately 5 gigabytes of internal repositories and source code that Mistral uses for training, fine-tuning, benchmarking, model delivery, and inference in experiments and future projects.

"We are looking for $25k BIN or they can pay this and we will shred these permanently, only selling to the best offer and limited to one person, if we cannot find a buyer within a week we will leak all of these for free to the forums," the hackers wrote.

TeamPCP indicated the asking price is negotiable, and that prospective buyers are welcome to submit offers they consider fair.

Mistral AI confirmed the breach in a statement, saying the intrusion originated from the Mini Shai-Hulud software supply-chain attack — an incident that began when official packages from TanStack and Mistral AI were compromised through stolen CI/CD credentials and legitimate workflows. The attack subsequently spread to hundreds of other software projects on the npm and PyPI registries, including UiPath, Guardrails AI, and OpenSearch.

"They [the hackers] contaminated some of our SDK packages for a brief period," the company said.

According to a security advisory Mistral published earlier this week, the breach occurred after a developer's device was affected by the TanStack supply-chain attack. A forensic investigation determined, however, that the data exposed in the incident was not part of the company's core code repositories.

"Neither our hosted services, managed user data, nor any of our research and testing environments were compromised," Mistral said in a statement.

Mistral AI, founded by former researchers from Google's DeepMind and Meta, develops open-weight large language models in both open-source and proprietary formats.

The Shai-Hulud supply-chain attack has affected other prominent AI companies as well. OpenAI confirmed that systems belonging to two of its employees were also compromised, exposing access to "a limited subset of internal source code repositories." OpenAI said a small set of credentials was taken but that the investigation found no evidence those credentials were used in subsequent attacks.

In response, OpenAI rotated the code-signing certificates exposed in the incident and issued a warning to macOS users to update their OpenAI desktop applications before June 12, after which unpatched versions may fail to launch and stop receiving updates.

The episode underscores the cascading risks of supply-chain attacks, where a single set of compromised credentials in a widely used package ecosystem can expose multiple organizations simultaneously. With TeamPCP's self-imposed deadline approaching, Mistral and the broader developer community are watching closely to see whether the stolen repositories surface publicly or are quietly sold.

[Disclaimer](https://www.techechelon.com/disclaimer)
