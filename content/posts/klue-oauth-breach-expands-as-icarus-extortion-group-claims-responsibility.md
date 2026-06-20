---
title: "Klue OAuth Breach Expands as Icarus Extortion Group Claims Responsibility"
slug: klue-oauth-breach-expands-as-icarus-extortion-group-claims-responsibility
excerpt: "Market intelligence platform Klue has confirmed attackers stole OAuth tokens connected to customer Salesforce environments on June 12, as the newly emerged Icarus extortion group publicly claims responsibility and the list of affected organizations continues to grow."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-06-20T01:06:13.204Z"
coverImage: "https://static.wixstatic.com/media/e37254_ee6547201fe84a3b8ec1365c6ff23fe0~mv2.jpeg"
readTime: 3
migratedFromWix: true
---

Market intelligence platform Klue has confirmed a security incident in which attackers stole OAuth tokens connected to customer Salesforce environments, with the newly emerged Icarus extortion group now publicly claiming credit for the attack.

Klue CEO Jason Smith said in a statement this week that the company detected unauthorized activity on June 12 affecting a portion of its integration infrastructure. "On June 12, we identified unauthorized activity affecting a portion of Klue's integration infrastructure. Since then, we've been working alongside trusted cybersecurity experts to understand what happened, support our customers, and restore the connections you rely on," Smith wrote.

According to Smith, the attacker gained entry through a compromised legacy credential tied to an integration service, then used that access to obtain OAuth tokens connecting Klue to third-party platforms, including Salesforce, before reaching into a number of connected customer environments.

Klue said there is no evidence that data stored directly within its own platform was affected, characterizing the incident as limited to third-party integrations. The company said it immediately revoked affected credentials and tokens, removed unauthorized code, disabled impacted integrations, alerted law enforcement, and engaged CrowdStrike to assist with the response.

Cybersecurity firms Huntress and ReliaQuest had earlier detailed how attackers exploited compromised Klue Battlecards integrations to steal Salesforce CRM data from multiple organizations. ReliaQuest observed the attackers generating OAuth tokens and deploying Python scripts to query Salesforce's API over extended periods. Huntress separately disclosed that its own Salesforce environment was among those affected, with stolen data including business contacts, sales communications, pricing information, and other records.

Icarus, which researchers had previously linked to the incident through extortion emails sent to affected organizations, has now formally claimed the attack on its data leak site. "As you've probably already heard, Klue.com has been impacted by us recently. A number of other companies' Salesforce instances, which were partners to Klue, were exfiltrated," the group wrote in a post on its site.

The threat actors urged Klue and affected organizations to contact them through the Session messaging platform or face the public release of stolen data.

Huntress said it independently connected the operation to Icarus through Session Messenger IDs used in extortion emails and the group's data leak site.

The victim list has continued to grow since the initial disclosure. Organizations that have confirmed their Salesforce environments were affected include Recorded Future, Tanium, Jamf, Sprout Social, Gong, and Insurity. Nearly all said the breach did not affect their own platforms, internal infrastructure, or payment data.

Several of those organizations warned that stolen business contact information could be used in follow-on phishing, social engineering, and extortion campaigns, urging their customers to remain vigilant.

The incident underscores the supply-chain risk inherent in OAuth-based third-party integrations, where a single compromised vendor credential can expose multiple downstream organizations simultaneously. As the Icarus group continues to pressure victims and the affected company count rises, security teams across industries relying on Klue integrations face an extended response window while the full scope of the breach is still being determined.
