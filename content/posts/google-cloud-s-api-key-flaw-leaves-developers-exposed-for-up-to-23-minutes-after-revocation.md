---
title: "Google Cloud's API Key Flaw Leaves Developers Exposed for Up to 23 Minutes After Revocation"
slug: google-cloud-s-api-key-flaw-leaves-developers-exposed-for-up-to-23-minutes-after-revocation
excerpt: "A security firm found that deleted Google API keys remain exploitable for up to 23 minutes, allowing attackers to exfiltrate data from Gemini — a gap Aikido researcher Joseph Leon says is a matter of priorities, not engineering limits."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-25T01:03:32.241Z"
coverImage: "https://static.wixstatic.com/media/e37254_67077b8e09f04fc0b75b26b3843a5dbe~mv2.jpg"
readTime: 3
migratedFromWix: true
---

A security vulnerability in Google's API key infrastructure allows attackers to continue using compromised credentials for up to 23 minutes after a developer has deleted them, according to research published by security firm Aikido — underscoring the widening gap between the AI security advice platform providers dispense and the practices they maintain internally.

Aikido researcher Joseph Leon found that revocation of Google API keys propagates gradually across the company's infrastructure, leaving a window during which success rates are highly unpredictable. In some minutes within that window, Leon found that over 90% of requests still authenticated successfully, giving attackers enough time to exfiltrate files and cached conversation data from Google's Gemini AI models.

The research adds a new dimension to a pattern documented in recent weeks: Google Cloud developers hit with five-figure bills after unauthorized API calls to Gemini models — services many said they had never intentionally enabled.

The affected keys were originally deployed for Google Maps and placed publicly in line with Google's own instructions. Following an undisclosed expansion of their scope by Google, those same keys quietly became capable of accessing Gemini. Developers say they were not clearly informed of the change.

Rod Danan, CEO of interview-prep platform Prentus, said his bill reached $10,138 in roughly 30 minutes after attackers exploited his compromised API key. Isuru Fonseka, a Sydney-based developer, said he woke to charges of approximately AUD $17,000 despite believing a $250 spending cap was in place. Google's automated systems had raised both developers' effective billing ceilings — to as high as $100,000 — based on account history, without explicit consent. Google refunded both after the incidents were reported.

Google told reporters it has no plans to change its automatic tier-upgrade policy, saying it prioritizes preventing service outages over enforcing users' stated budget preferences.

The 23-minute revocation delay stands out because Leon found it is not an engineering constraint. Google's own newer credential formats perform significantly better: service account API credentials revoke in approximately five seconds, and Gemini's newer AQ-prefixed key format takes about one minute. "Both run at Google scale," Leon wrote in Aikido's related paper. "Both suggest this is technically solvable for Google API keys, too."

The findings arrived in the same week that Francis de Souza, COO of Google Cloud, offered security guidance to companies navigating AI adoption. Speaking at an event in Los Angeles, de Souza warned that the average time between an initial breach and the handoff to the next stage of an attack has dropped from eight hours to 22 seconds, and that the attack surface has expanded well beyond the traditional network perimeter.

"In addition to your usual estate, you have models now. You have data pipelines used to train the models. You have agents, you have prompts. All of this needs to be protected," de Souza said.

He also flagged a less-discussed threat: AI agents moving through enterprise systems can surface forgotten data repositories with outdated access controls. "A lot of organizations have old SharePoint servers [and access controls] they haven't really updated, but it didn't matter because nobody really knew where they were. But agents roaming your enterprise will find those data assets and will expose the data on them," he said.

De Souza argued that companies must take a platform approach to AI security from the outset, treating security, data strategy, and AI strategy as inseparable. "Security is not something you can bolt on later, and it's not something you can leave up to employees to do on their own," he said.

The qualified-talent shortage compounds the problem. LinkedIn's chief information security officer, Lea Kissner, said the industry should not expect to understand AI security in any sustainable long-term way for at least several years, adding that the volume of AI-introduced vulnerabilities will require a significant increase in human oversight — what she called dealing with the "bug-pocalypse."

For now, the gap between the security posture platforms prescribe and the one they themselves maintain is drawing increasing scrutiny, with the Aikido findings offering a concrete example of how that gap can translate directly into developer harm.

[Disclaimer](https://www.techechelon.com/disclaimer)
