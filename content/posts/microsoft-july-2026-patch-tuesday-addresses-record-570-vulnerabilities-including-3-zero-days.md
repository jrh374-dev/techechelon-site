---
title: "Microsoft July 2026 Patch Tuesday Addresses Record 570 Vulnerabilities, Including 3 Zero-Days"
slug: microsoft-july-2026-patch-tuesday-addresses-record-570-vulnerabilities-including-3-zero-days
excerpt: "Microsoft's July 2026 Patch Tuesday fixes a record 570 vulnerabilities, including two actively exploited zero-days in Active Directory Federation Services and SharePoint Server, alongside a Windows 10 extended security update carrying the same patches."
category: security
author: "Marc Sabatini"
authorInitials: "MS"
publishedAt: "2026-07-14T19:05:26.301Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Aerial_Microsoft_West_Campus_August_2009.jpg/3840px-Aerial_Microsoft_West_Campus_August_2009.jpg"
coverCredit: "via Wikipedia (Microsoft)"
coverCreditUrl: "https://en.wikipedia.org/wiki/Microsoft"
tags: ["microsoft", "patch tuesday", "zero-day", "windows 10", "vulnerabilities", "cybersecurity"]
primaryEntity: "Microsoft"
readTime: 3
featured: true
sourceUrls: ["https://www.bleepingcomputer.com/news/microsoft/microsoft-releases-windows-10-kb5099539-extended-security-update", "https://www.cnbc.com/2026/07/14/jim-cramer-says-dont-bite-on-apple-sell-call-buy-his-new-chip-favorite.html", "https://www.bleepingcomputer.com/news/microsoft/microsoft-july-2026-patch-tuesday-fixes-massive-570-flaws-3-zero-days"]
---

Microsoft on Tuesday released its July 2026 Patch Tuesday security updates, patching 570 vulnerabilities across its product ecosystem — the largest single-month fix count the company has disclosed — along with a companion extended security update for Windows 10.

The release addresses 59 vulnerabilities rated "Critical," 48 of which involve remote code execution and 9 of which are elevation-of-privilege flaws. By category, the fixes span 254 elevation-of-privilege vulnerabilities, 145 remote code execution vulnerabilities, 102 information disclosure vulnerabilities, 35 denial-of-service vulnerabilities, 17 security feature bypass vulnerabilities, and 16 spoofing vulnerabilities.

Three zero-day vulnerabilities are included in the update — two actively exploited in the wild and one publicly disclosed without an available fix prior to Tuesday's release.

The first actively exploited zero-day, CVE-2026-56155, affects Active Directory Federation Services and allows an authorized attacker to elevate privileges locally. "Insufficient granularity of access control in Active Directory Federation Services (AD FS) allows an authorized attacker to elevate privileges locally," Microsoft warned. The company credited discovery to Jeremy Kingston and Scott Clark of Microsoft's Detection and Response Team, an internal incident response unit, suggesting the flaw was uncovered during active attack investigations.

The second exploited zero-day, CVE-2026-56164, is a missing authentication flaw in Microsoft SharePoint Server that allows a remote, unauthenticated attacker to elevate privileges over a network. Microsoft credited that finding to Jayson Frost with Mandiant Incident Response, Genwei Jiang with Google Cloud's FLARE OTF, and an anonymous researcher. The company noted that enabling the Antimalware Scan Interface on the server and setting the Request Body Scan mode to Full can help mitigate exposure.

The publicly disclosed zero-day, CVE-2026-50661, affects Windows BitLocker. Microsoft said a successful attacker with physical access to a target device could bypass BitLocker Device Encryption and access data stored on the system drive. The flaw was attributed to an anonymous researcher.

The volume of this month's disclosures reflects a shift Microsoft flagged last week, when it warned that Patch Tuesday totals would climb as the company has begun deploying an AI-powered vulnerability discovery system to identify flaws across the Windows codebase before attackers can.

The July 2026 release does not count an additional 468 Microsoft Edge and Chromium vulnerabilities patched by Google this month, nor does it include flaws fixed earlier in July across Mariner, Azure OpenAI, Azure Synapse, M365 Copilot, Microsoft Exchange Online, Microsoft Edge for Android, or Microsoft Entra Provisioning Service.

Alongside the broader Patch Tuesday rollout, Microsoft separately released Windows 10 KB5099539, an extended security update carrying the same July fixes. The update brings Windows 10 to build 19045.7548 and Windows 10 Enterprise LTSC 2021 to build 19044.7548.

KB5099539 also resolves several carry-forward issues: a compatibility problem in OLE Automation introduced by the June 2026 update that caused failures in applications using the IDispatch::Invoke method; a broken OneDrive shortcut in File Explorer when run in administrative mode; and a Recycle Bin dialog that displayed internal file names instead of original file names during permanent deletion.

The update also introduces a security hardening change enforcing TDI transport registration requirements. Applications that use sockets over unregistered third-party TDI transports may stop functioning after installation. Microsoft advised administrators to check Event Viewer for AFD Event ID 16003 to identify affected transports.

On the Remote Desktop front, KB5099539 adds SHA-2 certificate thumbprint support for trusted RDP publishers while retaining SHA-1 only for backward compatibility, with SHA-1 slated for future removal. Microsoft recommended that IT administrators migrate to SHA-256 thumbprints or stronger as soon as possible.

Last month, Microsoft quietly extended its free Windows 10 Extended Security Updates program for consumers by an additional year, pushing coverage to October 12, 2027 — a timeline that gives enrolled users continued access to updates like Tuesday's release as the broader Windows 10 end-of-support period recedes further into the past.
