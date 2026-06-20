---
title: "Microsoft Reverses Course on Edge Password Memory Exposure and Adds Automatic Driver Rollback to Windows"
slug: microsoft-reverses-course-on-edge-password-memory-exposure-and-adds-automatic-driver-rollback-to-win
excerpt: "Microsoft reversed its position on a password-in-memory vulnerability in the Edge browser and announced Cloud-Initiated Driver Recovery, a new Windows Update feature that lets the company remotely roll back faulty drivers without end-user action."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-15T17:01:15.398Z"
coverImage: "https://static.wixstatic.com/media/e37254_c3bbdc169a634f4f9ebe91ec351b59d7~mv2.png"
readTime: 3
migratedFromWix: true
---

Microsoft announced two separate security and reliability changes to its Windows platform on Thursday, reversing an earlier position on a password-handling vulnerability in the Edge browser and introducing a new feature that allows the company to remotely roll back faulty Windows drivers.

The Edge reversal follows public disclosure earlier this month by security researcher Tom Jøran Sønstebyseter Rønning, who demonstrated on May 4 that all credentials stored in Edge's built-in password manager were being decrypted at launch and kept in plaintext in process memory — even when not actively in use.

Rønning also published a proof-of-concept tool capable of allowing attackers with Administrator privileges to extract passwords from other users' Edge processes. Without such privileges, the tool was limited to processes launched by the same user.

Microsoft initially told Rønning that the behavior was "by design," a position it later repeated, calling it "an expected feature of the application." That stance changed Wednesday, when the company announced that future Edge versions will no longer load saved passwords into memory at startup.

"Edge is the only Chromium-based browser I've tested that behaves this way. By contrast, Chrome uses a design that makes it far harder for attackers to extract saved passwords by simply reading process memory," Rønning said.

Microsoft Edge Security Lead Gareth Evans attributed the reversal to the company's Secure Future Initiative and broader customer feedback. "That means looking not only at whether something meets the bar for a security issue, but also at where we can reduce exposure through defense-in-depth improvements. In this case, reducing the exposure of passwords in memory is a practical step in that direction," Evans said.

The fix is already live in the Edge Canary channel and will be included in the next update for all supported releases — Stable, Beta, Dev, Canary, and the Extended Stable channel used by enterprise customers — beginning with build 148.

On the reliability front, Microsoft separately announced Cloud-Initiated Driver Recovery, a feature that enables the company to remotely trigger rollbacks of problematic Windows drivers distributed through Windows Update without requiring any action from hardware partners or end users.

Under the current system, drivers with quality issues require hardware partners to submit replacements, or users to manually uninstall the faulty software — a process that can leave devices running subpar drivers for extended periods.

"With Cloud-Initiated Driver Recovery, Microsoft can now trigger a recovery action directly from the Hardware Dev Center Driver Shiproom, rolling back a problematic driver to the previously known-good version via the Windows Update pipeline," the company said in a statement.

The rollback will only be initiated for drivers rejected due to quality issues during shiproom evaluation. Devices where a Driver Shiproom-approved driver cannot be located will not attempt the recovery process. The feature requires no new client software or partner tooling, operating entirely through existing Windows Update infrastructure.

Microsoft said the feature is currently being tested between May and August, with automatic rollbacks for drivers rejected during Flighting or Gradual Rollout set to begin in September 2026.

The announcement came shortly after Microsoft unveiled a Driver Quality Initiative at WinHEC 2026 — the Windows Hardware Engineering Conference — held last week in Taipei. That initiative aims to raise driver quality, reliability, and security across the Windows ecosystem in coordination with OEM, silicon, and hardware partners.

Together, the two announcements reflect an intensifying focus at Microsoft on hardening its software ecosystem against both external threats and internal reliability failures — areas that have drawn scrutiny following high-profile incidents tied to driver and update quality in recent years. Whether the Edge fix will satisfy security researchers who have flagged broader concerns about browser credential handling remains to be seen.
