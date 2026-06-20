---
title: "Checkmarx Jenkins Plugin Compromised in Third Supply-Chain Attack by TeamPCP"
slug: checkmarx-jenkins-plugin-compromised-in-third-supply-chain-attack-by-teampcp
excerpt: "A rogue version of Checkmarx's Jenkins Application Security Testing plugin was uploaded to the Jenkins Marketplace on May 9, the third supply-chain attack against the firm since late March, carried out by the TeamPCP hacker group."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-11T23:02:25.665Z"
coverImage: "https://static.wixstatic.com/media/e37254_095829785a1845909ade4714c8c35608~mv2.png"
readTime: 2
migratedFromWix: true
---

A rogue version of Checkmarx's Jenkins Application Security Testing plugin was uploaded to the Jenkins Marketplace on May 9, marking the third supply-chain attack the application security testing firm has endured since late March.

The compromise was claimed by the TeamPCP hacker group, which has carried out a series of related intrusions targeting developer tooling, including the Shai-Hulud campaigns on npm and a breach of the Trivy vulnerability scanner.

The malicious plugin, versioned 2026.5.09, was uploaded to repo.jenkins-ci.org outside the plugin's standard release pipeline. The update lacked a git tag and a GitHub release, and deviated from the official date style scheme used in legitimate releases. The plugin is designed to integrate security scanning into automated CI/CD pipelines.

Checkmarx confirmed that TeamPCP obtained credentials to its GitHub repositories through the earlier Trivy supply-chain attack in March. "As a result of that access, the attackers were able to interact with Checkmarx's GitHub environment and subsequently publish malicious code to certain artifacts," a company spokesperson said.

A message left by the threat actors in the plugin's about section read: "Checkmarx fails to rotate secrets again. With love - TeamPCP."

Using the stolen credentials, the attackers published modified versions of multiple developer tools across GitHub, Docker, and VSCode that included credential-stealing code. The group maintained access for at least a month before publishing a malicious version of the company's KICS analysis tool on Docker, Open VSX, and VSCode, harvesting data from developer environments.

In late April, the company confirmed that the LAPSUS$ threat group separately leaked data stolen from its private GitHub repository.

Checkmarx has advised users to ensure they are running version 2.0.13-829.vc72453fa_1c16 of the Jenkins AST plugin, published on December 17, 2025, or an older release. The company said it is in the process of publishing a new, clean version of the plugin.

Anyone who downloaded the malicious version should assume their credentials are compromised, rotate all secrets, and investigate for signs of lateral movement or persistence, the company warned.

Checkmarx noted that its GitHub repositories are isolated from its customer production environment and that no customer data is stored there. The company has published a set of malicious artifacts that defenders can use as indicators of compromise.

Offensive security engineer Adnan Khan attributed the Jenkins plugin compromise to TeamPCP's earlier foothold, reinforcing how a single unrotated credential from one supply-chain breach can enable a cascade of subsequent intrusions across a vendor's toolchain ecosystem. The incident highlights the compounding risk organizations face when third-party security tooling itself becomes a vector for credential theft.
