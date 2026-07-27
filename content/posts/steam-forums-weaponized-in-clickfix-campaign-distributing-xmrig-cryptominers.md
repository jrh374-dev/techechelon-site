---
title: "Steam Forums Weaponized in ClickFix Campaign Distributing XMRig Cryptominers"
slug: steam-forums-weaponized-in-clickfix-campaign-distributing-xmrig-cryptominers
excerpt: "Attackers are posting fake troubleshooting replies on Steam discussion forums to trick gamers into running PowerShell commands that install XMRig cryptocurrency-mining software, exploiting a social engineering technique known as ClickFix."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-07-25T23:08:11.214Z"
coverImage: "https://images.pexels.com/photos/28582719/pexels-photo-28582719.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by Andrey Matveev on Pexels"
coverCreditUrl: "https://www.pexels.com/@zeleboba"
tags: ["clickfix", "cryptomining", "xmrig", "steam", "malware", "powershell"]
primaryEntity: "Steam (service)"
readTime: 3
sourceUrls: ["https://www.bleepingcomputer.com/news/security/steam-forum-clickfix-attacks-infect-gamers-with-xmrig-cryptominers", "https://techcrunch.com/2026/07/25/the-hacker-who-humiliated-spyware-makers-and-was-never-caught", "https://arstechnica.com/space/2026/07/spacex-eyes-tower-catch-for-next-starship-after-auspicious-end-to-13th-flight"]
---

Threat actors are exploiting Steam's discussion forums in an active social engineering campaign that tricks gamers into running malicious PowerShell commands, ultimately installing XMRig cryptocurrency-mining software on their machines.

The campaign, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/security/steam-forum-clickfix-attacks-infect-gamers-with-xmrig-cryptominers/), involves attackers creating throwaway Steam accounts and posting replies to threads where users have described problems such as game crashes or lost inventory items. Those replies instruct victims to open PowerShell as an administrator and execute a command that silently fetches and launches an XMRig miner executable.

The technique is a variant of what security researchers call ClickFix — a class of social engineering attacks that presents fake error messages, verification prompts, or troubleshooting steps to induce victims into executing malicious code themselves. Because the victim initiates the command manually, the attack can sidestep certain automated security protections that would otherwise flag and block the payload.

Once run, the PowerShell script presents itself as a Windows optimization tool labeled "msf utility \ PC Opt." It displays a sequence of plausible-sounding maintenance messages — cleaning temporary files, flushing the DNS cache, updating drivers, scanning for malware, and running System File Checker — while pausing for random intervals between 1.5 and 8 seconds to reinforce the illusion of legitimacy.

Most of those displayed functions perform no actual task. The genuine malicious activity is contained within a routine called "Advanced-Optimization," which disables TLS certificate validation and confirms it is operating with administrator privileges before proceeding.

With elevated access confirmed, the script creates the directory C:\Windows\Background and registers it as an exclusion in Microsoft Defender's scanning configuration — effectively blinding the built-in antivirus to anything placed there. It then creates a temporary outbound Windows Firewall rule permitting connections to the domain msfconfig[.]icu over TCP port 443 and downloads the XMRig payload from that address into a randomly named temporary file.

After verifying the downloaded file is a valid executable, the script moves it to C:\Windows\Background\system.exe and registers a scheduled task named "XMRig-[computer name]" that launches the miner with SYSTEM privileges each time Windows starts.

The script also attempts to stop any pre-existing scheduled task or running process matching that naming pattern, and tries to delete a configuration file at C:\Windows\Background\config.json. It is not clear whether that cleanup targets remnants of a prior installation of the same malware or a competing miner already present on the device.

Users who may have executed such a command should check for the presence of the C:\Windows\Background directory, a Microsoft Defender exclusion for that path, and any scheduled task beginning with "XMRig-." If those indicators are found, running a full antivirus scan is a recommended first step. If the scanner does not detect the miner, manually stopping and removing the scheduled task, clearing the Defender exclusion, and deleting the directory and its contents are the next steps. In cases where the infection's full scope cannot be determined, reinstalling the operating system may be the more prudent course.

As a general principle, security researchers advise against running PowerShell commands obtained from unknown users in any online forum, regardless of how credible the accompanying explanation appears.

The Steam campaign reflects a broader pattern of ClickFix abuse that has expanded well beyond traditional phishing vectors, with attackers increasingly targeting platforms — gaming forums, browser popups, and compromised websites — where users may lower their guard. As long as these techniques continue to bypass automated defenses by relying on human action, gaming communities and other non-traditional targets are likely to remain attractive to financially motivated threat actors.
