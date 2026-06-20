---
title: "Nearly Every Linux System Built Since 2017 Vulnerable to \"Copy Fail\" Privilege-Escalation Flaw"
slug: nearly-every-linux-system-built-since-2017-vulnerable-to-copy-fail-privilege-escalation-flaw
excerpt: "A newly disclosed Linux kernel vulnerability, dubbed \"Copy Fail\" and tracked as CVE-2026-31431, allows any user with a basic account to gain full administrative control and escape cloud containers — affecting virtually every major Linux distribution released since 2017."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-01T13:04:43.477Z"
coverImage: "https://static.wixstatic.com/media/e37254_3dc7af3b79ab4dad957e23e8a976b087~mv2.jpg"
readTime: 2
migratedFromWix: true
---

Security researchers and European cybersecurity officials are urging administrators to patch a newly disclosed Linux kernel vulnerability that allows any user with a basic account to seize full administrative control of an affected machine — and to break out of cloud containers entirely.

The flaw, dubbed "Copy Fail" and tracked as CVE-2026-31431, affects every major Linux distribution released since 2017, including Ubuntu, Red Hat Enterprise Linux, Amazon Linux, and SUSE — the platforms running the majority of the world's servers and cloud infrastructure.

The vulnerability was publicly disclosed this week by researchers at cybersecurity firm Theori, which said it discovered the bug using an AI-powered scanning tool called Xint Code. The Common Vulnerability Scoring System has assigned the flaw a base score of 7.8.

Theori traced the flaw's origin to three separate, individually unremarkable changes made to the Linux kernel in 2011, 2015, and 2017. Their combined effect went unrecognized for nearly a decade.

The attack works by quietly tampering with the temporary, in-memory copy of a file while it is in use, without altering the original file stored on disk. Because standard security tools check files on disk rather than in memory, they detect nothing amiss. An attacker can exploit that gap to rewrite the rules of a trusted system program and take over the machine.

The container-escape dimension of the flaw adds a layer of risk for cloud operators. A compromised application running inside a supposedly isolated container environment can use the vulnerability to break out and seize control of the entire host server — a significant exposure given how broadly the cloud industry relies on Linux distributions.

Theori reported the issue to maintainers on March 23, and a fix was committed to the underlying Linux codebase on April 1. However, the EU's cybersecurity body, CERT-EU, noted in a formal advisory issued Thursday that no major distribution had yet delivered the patch to end users as of that warning. Patches and mitigations began reaching users Thursday, though some systems remain unprotected, and an interim workaround circulating online does not function correctly on all distributions.

The U.S. Cybersecurity and Infrastructure Security Agency has not yet added CVE-2026-31431 to its known exploited vulnerabilities catalog, indicating it has not been observed in active attacks as of this writing.

CERT-EU urged administrators to apply the kernel update as soon as patches are available for their specific distribution. Given the vulnerability's broad reach and the straightforward access requirements for exploitation — only a basic account is needed — security officials regard the window between patch availability and deployment as a critical exposure period.

The discovery underscores an ongoing challenge in open-source software maintenance: changes that appear benign in isolation can interact over years to create serious attack surfaces that evade detection until an outside researcher looks in an unexpected place.
