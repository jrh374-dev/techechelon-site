---
title: "Dell Patches Six Maximum-Severity Container Storage Flaws That Grant Admin Access"
slug: dell-patches-six-maximum-severity-container-storage-flaws-that-grant-admin-access
excerpt: "Dell has patched six critical-severity vulnerabilities in its Container Storage Modules, including two maximum-severity flaws that allow unauthenticated remote attackers to gain full administrative control over enterprise storage infrastructure connected to Kubernetes environments."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-10-02T23:01:53.088Z"
coverImage: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Dell_Technologies_Headquarters.jpg/1920px-Dell_Technologies_Headquarters.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
coverCredit: "via Wikipedia (Dell Technologies)"
coverCreditUrl: "https://en.wikipedia.org/wiki/Dell_Technologies"
tags: ["dell", "vulnerability", "kubernetes", "enterprise security", "patch", "cve"]
primaryEntity: "Dell Technologies"
readTime: 2
sourceUrls: ["https://therecord.media/vicksburg-mississippi-government-ransomware-attack", "https://arstechnica.com/cars/2026/10/tesla-sales-drop-2-percent-in-underwhelming-q3-2026", "https://www.bleepingcomputer.com/news/security/new-max-severity-dell-csm-flaws-give-hackers-admin-privileges"]
---

Dell has released patches for six critical-severity vulnerabilities in its Container Storage Modules (CSM), including two flaws rated at maximum severity that allow unauthenticated remote attackers to seize full administrative control over enterprise storage infrastructure, the company said Thursday.

CSM is the software layer that connects Dell's enterprise storage arrays — including PowerStore, PowerScale, PowerFlex, PowerMax, and Unity XT — to Kubernetes environments, extending the capabilities of standard Container Storage Interface drivers.

The two maximum-severity flaws, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/new-max-severity-dell-csm-flaws-give-hackers-admin-privileges), both reside in the Dell CSM Authorization security module and stem from what Dell describes as "missing authentication for critical functions" weaknesses.

The first, tracked as CVE-2026-63688, allows an unauthenticated remote attacker to access storage backend administrator credentials for all registered storage arrays and bypass authorization to gain full administrative control over the storage infrastructure.

The second, CVE-2026-63692, is present in the authorization proxy and tenant service. Dell warned in its security advisory that the flaw "enables an unauthenticated attacker to gain complete administrative control over the authorization service, potentially allowing unauthorized access to and manipulation of storage resources across all tenants."

Alongside those two, Dell patched four additional critical-severity CSM vulnerabilities. CVE-2026-67269 allows remote attackers without privileges to gain root access on cluster nodes. CVE-2026-54472 enables unauthorized administrative access to the CSM Authorization proxy. CVE-2026-61421 permits attackers to forge authentication tokens and obtain administrative privileges. CVE-2026-67273 allows cluster-wide read access to Kubernetes Secrets by bypassing Kubernetes access controls.

All six flaws can be exploited remotely and without authentication, raising the potential exposure for enterprises running unpatched versions of the software.

Dell said it has not yet flagged any of the six vulnerabilities as actively exploited in the wild. The company is nonetheless urging customers to treat the update as urgent, advising organizations to upgrade their container storage modules to version 1.18.0 or later, which addresses all of the disclosed flaws. "Dell recommends customers to upgrade at the earliest opportunity," the company said in its advisory.

The disclosure comes amid a documented pattern of state-sponsored actors targeting Dell products. In a campaign revealed in February, Mandiant and Google's Threat Intelligence Group identified a suspected Chinese state-backed group, designated UNC6201, that had been exploiting a separate maximum-severity hardcoded-credential vulnerability — CVE-2026-22769 — in Dell RecoverPoint for Virtual Machines since at least mid-2024. Researchers found overlaps between UNC6201 and Silk Typhoon, a Chinese cyberespionage group known for targeting government agencies using custom malware in Ivanti zero-day attacks. Days after that disclosure, the U.S. Cybersecurity and Infrastructure Security Agency ordered federal agencies to patch affected Dell systems within three days.

North Korea's Lazarus Group has also previously exploited Dell hardware, deploying a Windows rootkit by abusing an access control vulnerability tracked as CVE-2021-21551 in the Dell dbutil driver.

With critical Kubernetes storage infrastructure now in the crosshairs, the speed at which enterprise administrators apply version 1.18.0 will determine whether Thursday's advisory becomes a footnote or the starting point of a broader incident investigation.
