---
title: "CISA Orders Federal Agencies to Patch Maximum-Severity Joomla Plugin Flaw by Friday"
slug: cisa-orders-federal-agencies-to-patch-maximum-severity-joomla-plugin-flaw-by-friday
excerpt: "CISA has ordered federal agencies to patch CVE-2026-48907, a maximum-severity flaw in the Joomla Content Editor plugin, by Friday after confirmed active exploitation. The vulnerability allows unauthenticated attackers to execute PHP code with no prior privileges required."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-06-17T11:02:29.163Z"
coverImage: "https://static.wixstatic.com/media/e37254_f7d624938c1b4fad86f34b1d88e18263~mv2.jpeg"
readTime: 2
migratedFromWix: true
---

The U.S. Cybersecurity and Infrastructure Security Agency has directed all Federal Civilian Executive Branch agencies to patch a maximum-severity vulnerability in the Widget Factory Joomla Content Editor plugin by this Friday, citing active exploitation in the wild.

The flaw, tracked as CVE-2026-48907, allows unauthenticated threat actors to upload and execute PHP code through low-complexity attacks targeting Joomla deployments that use the JCE WYSIWYG editor plugin.

"Widget Factory Joomla Content Editor contains an improper access control vulnerability which could allow for upload and execution of PHP code via the creation of new editor profiles for unauthenticated users," CISA warned on Tuesday.

CISA added the vulnerability to its Known Exploited Vulnerabilities catalog on Tuesday and issued the patching deadline under Binding Operational Directive 26-04, which was itself issued last Wednesday. That directive requires U.S. government agencies to prioritize patching based on each vulnerability's assessed risk of exploitation.

Key factors the directive instructs agencies to weigh include whether a flaw appears in the Known Exploited Vulnerabilities catalog, whether affected assets are publicly accessible online, whether exploitation can be automated at scale, and whether successful exploitation grants partial or full control of a targeted system. CVE-2026-48907 meets all four criteria.

The JCE security team addressed the vulnerability in early June with the release of JCE Pro 2.9.99.6.

In a warning accompanying that release, the team made clear that the threat extends beyond unpatched installations. "If you have not yet updated, please do so immediately. The vulnerability is being actively exploited, working exploit code is public, and the attacks are automated, so a site with no public registration is not safe," the team said.

The team also cautioned that patching alone is insufficient for systems already compromised. "One important point: updating closes the entry point but does not clean a site that was already compromised. If you were hit before updating, the update will not remove what the attacker left behind," it added.

Remediation guidance for affected sites includes backing up any rogue editor profiles for forensic investigation, upgrading to JCE 2.9.99.6 or later, deleting attacker-created profiles, rotating all passwords — including administrator, database, and hosting account credentials — and running a full server-side malware scan to detect any additional implants or malicious tools.

CISA reiterated the systemic nature of the risk in its advisory, noting that "this type of vulnerability is a frequent attack vector for malicious cyber actors and poses significant risks to the federal enterprise."

Agencies that cannot apply mitigations are instructed to discontinue use of the affected product entirely, in line with BOD 26-04 guidance for cloud services. The Friday deadline leaves federal IT teams a narrow window to audit their Joomla deployments, apply the update, and verify that no prior compromise has left residual access for attackers.

[Disclaimer](/disclaimer)
