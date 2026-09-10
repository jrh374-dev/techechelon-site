---
title: "Microsoft Excel KB5002914 Update Breaks Copy-and-Paste for Users Across Multiple Office Versions"
slug: microsoft-excel-kb5002914-update-breaks-copy-and-paste-for-users-across-multiple-office-versions
excerpt: "A security update shipped as part of Microsoft's September 2026 Patch Tuesday is breaking copy-and-paste and formula dragging in Excel across multiple Office versions, with users reporting that removing the patch restores functionality."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-09-10T21:01:26.897Z"
coverImage: "https://images.unsplash.com/photo-1787839253728-f6d42c2cfb8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5Mzc2NzZ8MHwxfHNlYXJjaHwxfHxNaWNyb3NvZnQlMjBFeGNlbCUyMHNwcmVhZHNoZWV0JTIwc29mdHdhcmUlMjBkZXNrdG9wJTIwc2NyZWVufGVufDF8MHx8fDE3ODkwNzQwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
coverCredit: "Photo by Jakub Żerdzicki on Unsplash"
coverCreditUrl: "https://unsplash.com/@jakubzerdzicki"
tags: ["microsoft", "excel", "patch tuesday", "software update", "office", "vulnerability"]
primaryEntity: "Microsoft Excel"
readTime: 2
hasDisclaimer: true
sourceUrls: ["https://www.darkreading.com/threat-intelligence/voice-callers-exploit-byod-microsoft-365-corporate-data", "https://www.bleepingcomputer.com/news/security/surfshark-vpn-says-hackers-breached-internal-testing-proxy-servers", "https://www.bleepingcomputer.com/news/microsoft/microsoft-excel-kb5002914-update-breaks-copy-and-paste-for-some-users"]
---

A security update released as part of Microsoft's September 2026 Patch Tuesday is disrupting core functionality in Excel, with users across multiple Office versions reporting that copy-and-paste operations and formula dragging stopped working after installing the patch.

The update in question, KB5002914, was released September 9 and quickly drew complaints on Reddit and the Microsoft Q&A forums, where affected users described being unable to perform basic spreadsheet tasks after installation.

"It seems that security update kb5002914 might have bricked autofill and copy paste in Excel 2016," one Reddit user wrote. Other users confirmed similar problems, with one noting that copy-and-paste shortcuts and formula dragging no longer worked and that their entire team was blocked after most employees had already installed the update.

The issue does not appear confined to a single Office release or deployment method. Users have reported the problem on Office LTSC Standard 2021, and on installations spanning Office versions 2016 through 2024, across both MSI and Click-to-Run delivery formats, according to forum reports.

BleepingComputer, which first reported on the issue, said it tested Excel 2019 Version 2508 (Build 19127.20302 Click-to-Run) and was unable to reproduce the reported copy-and-paste or autofill problems.

For affected users running MSI-based Office installations, uninstalling KB5002914 appears to restore normal functionality. One Microsoft Q&A contributor shared a PowerShell command using the Oarpmany.exe utility to remove the patch, reporting that copy-and-paste resumed working afterward.

Users on Click-to-Run installations have found that downgrading the Office build via XML or Group Policy also resolves the problem.

A separate workaround circulating among users involves leaving KB5002914 installed but replacing the updated excel.exe executable with an older version of the file. BleepingComputer cautioned against this approach, noting that substituting individual Office binaries could leave installations with mismatched files and introduce stability, compatibility, or security risks.

Microsoft had not publicly acknowledged the issue or offered an official fix as of the time of reporting. BleepingComputer said it had contacted Microsoft for comment and would update its coverage upon receiving a response.

The disruption comes amid a busy Patch Tuesday cycle — Microsoft's September 2026 release addressed 966 flaws, including two zero-days, according to related coverage. Administrators weighing whether to deploy KB5002914 in managed environments may want to assess rollout scope carefully until Microsoft issues guidance or a corrected update.

[Disclaimer](/disclaimer)
