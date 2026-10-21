---
title: "PHP Ships Emergency Patches for Critical PHP2Shell Remote Code Execution Flaws"
slug: php-ships-emergency-patches-for-critical-php2shell-remote-code-execution-flaws
excerpt: "The PHP security team released emergency patches for two critical unauthenticated remote code execution vulnerabilities, CVE-2026-109618 and CVE-2026-109619, affecting all PHP installations that serve web requests, with early exploitation already observed in the wild."
category: security
author: "TechEchelon Staff"
authorInitials: "TE"
publishedAt: "2026-10-21T15:02:26.065Z"
coverImage: "https://images.unsplash.com/photo-1584169417032-d34e8d805e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5Mzc2NzZ8MHwxfHNlYXJjaHwxfHxQSFAlMjBzZXJ2ZXIlMjBkYXRhJTIwY2VudGVyJTIwd2ViJTIwaW5mcmFzdHJ1Y3R1cmUlMjByYWNrc3xlbnwxfDB8fHwxNzkyNTk0OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
coverCredit: "Photo by İsmail Enes Ayhan on Unsplash"
coverCreditUrl: "https://unsplash.com/@ismailenesayhan"
tags: ["php", "remote code execution", "vulnerability", "php2shell", "patch", "web security"]
primaryEntity: "PHP"
readTime: 3
featured: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws", "https://www.bleepingcomputer.com/news/security/clickfix-has-never-been-bigger-and-ai-tools-are-its-most-convincing-lure-yet", "https://www.darkreading.com/cyberattacks-data-breaches/decades-old-windows-utility-modern-clickfix-attack"]
---

The PHP security team released emergency patches on October 21 for two critical remote code execution vulnerabilities — CVE-2026-109618 and CVE-2026-109619 — tracked collectively as PHP2Shell, affecting all PHP installations that serve web requests.

The flaws were discovered by researchers at Calif, Wiz, and OpenAI, and affect PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP, and LiteSpeed deployments. Both vulnerabilities allow unauthenticated attackers to achieve remote code execution.

"We consider the risk highest for mod_php, with a demonstrated exploit where an unauthenticated request can trigger the attack before any application code runs," the PHP security team said in a statement.

Both flaws stem from the same root cause: PHP can leave its memory in a corrupted state when a request ends abnormally. CVE-2026-109618 exploits a chain of weaknesses that trigger out-of-memory corruption, enabling remote code execution as the web worker account. CVE-2026-109619 enables unauthenticated heap use-after-free, memory disclosure, and remote code execution with the web worker's privileges through a stale global state condition.

Administrators running PHP 8.x are urged to install PHP 8.5.12, 8.4.27, 8.3.36, or 8.2.35 immediately. Those on PHP 7 or earlier are advised to migrate to a supported release.

"PHP 8.1 and older no longer receive updates from the PHP project. Some distributions and LTS vendors provide backported fixes, so contact your vendor for details, or upgrade to a supported version," the PHP developers added. The team also published minimal source-backports for PHP 7.4, PHP 8.0, and PHP 8.1 to assist those building from source.

The patches follow a warning issued Tuesday by PHP developers urging administrators to prepare for the imminent updates. Before the fixes were released, Cloudflare CTO Dane Knecht confirmed the company had already deployed a set of WAF rules to block known PHP2Shell exploitation methods and that early attacks targeting the two vulnerabilities were already being observed. Knecht emphasized those protections were temporary and urged all administrators to apply the official patches.

The UK National Cyber Security Centre also issued a warning urging UK organizations to update PHP-running systems immediately or take them offline until patching is possible.

PHP core developer Gina Peter Banyard stated that no mitigation would fully block potential attacks, and that official security patches represent the only permanent defense.

For administrators unable to patch immediately, the PHP security team outlined several partial mitigations. For CVE-2026-109618, these include setting memory_limit=-1 at the server configuration level and applying a low post_max_size — 8M for applications without file upload requirements, or 32M where uploads are needed. For CVE-2026-109619, administrators are advised to set session.upload_progress.enabled=0 and restart workers, and on PHP 8.5, to set fatal_error_backtraces=0. The team cautioned that none of these measures fully prevent exploitation.

PHP powers between 75% and 80% of all websites, including those running WordPress, Joomla, and Drupal. According to VirusTotal estimates, more than 5.1 million PHP hosts are exposed online, with roughly 3.8 million having at least one port open — a scale that underscores the urgency of rapid patch adoption across web infrastructure globally.

With early exploitation already confirmed before the patches dropped, the window between disclosure and widespread attack activity is narrowing, placing particular pressure on hosting providers, managed service operators, and enterprise IT teams to prioritize deployment.
