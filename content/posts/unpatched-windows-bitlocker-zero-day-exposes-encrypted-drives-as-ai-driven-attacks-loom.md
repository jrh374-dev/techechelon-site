---
title: "Unpatched Windows BitLocker Zero-Day Exposes Encrypted Drives as AI-Driven Attacks Loom"
slug: unpatched-windows-bitlocker-zero-day-exposes-encrypted-drives-as-ai-driven-attacks-loom
excerpt: "A researcher has released proof-of-concept exploits for two unpatched Windows flaws — a BitLocker bypass and a privilege-escalation bug — as Palo Alto Networks warns organizations have a three-to-five-month window before AI-driven cyberattacks become routine."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-05-13T19:07:02.785Z"
coverImage: "https://static.wixstatic.com/media/e37254_1b065ae94cc04ca09bd075ec5f3f5591~mv2.png"
readTime: 3
migratedFromWix: true
---

A cybersecurity researcher has publicly released proof-of-concept exploits for two unpatched Microsoft Windows vulnerabilities — a BitLocker bypass dubbed YellowKey and a privilege-escalation flaw called GreenPlasma — intensifying pressure on enterprise security teams already bracing for a wave of AI-assisted cyberattacks.

The researcher, known online as Chaotic Eclipse or Nightmare Eclipse, said the decision to release the exploits without notifying Microsoft first stemmed from dissatisfaction with how the company handles vulnerability reports. The disclosures follow the researcher's earlier release of the BlueHammer and RedSun flaws, both of which were exploited in the wild shortly after being made public.

YellowKey is described as a BitLocker bypass affecting Windows 11 and Windows Server 2022 and 2025. It works by placing specially crafted FsTx files on a USB drive or an EFI partition, rebooting into the Windows Recovery Environment (WinRE), and triggering a command shell by holding down the CTRL key. According to the researcher, the resulting shell gains unrestricted access to the BitLocker-protected storage volume.

Independent security researcher Kevin Beaumont confirmed the exploit is valid and described BitLocker as having a functional backdoor, recommending users enable a BitLocker PIN alongside a BIOS password as a mitigation measure.

Will Dormann, principal vulnerability analyst at Tharros Labs, also verified the YellowKey technique and offered a technical explanation. "Windows looks for \System Volume Information\FsTx directories on attached drives, and will replay any NTFS logs," Dormann said. The result, he explained, is that a key recovery file is deleted, causing Windows to launch a command prompt instead of the actual recovery environment — "with the disk still unlocked."

Dormann clarified that the current YellowKey exploit leverages BitLocker's auto-unlock feature and therefore does not function against drives protected by TPM combined with a PIN, nor does it work on drives removed from their original device.

Chaotic Eclipse, however, claimed in an update that the underlying vulnerability extends further. "No, TPM+PIN does not help, the issue is still exploitable regardless," the researcher said, adding that a PoC for that variant has not been released. Microsoft, in a statement, said it is "committed to investigating reported security issues" and supports coordinated vulnerability disclosure.

GreenPlasma, the second flaw, is a privilege-escalation vulnerability that the researcher describes as a "Windows CTFMON Arbitrary Section Creation Elevation of Privileges Vulnerability." An unprivileged user can create arbitrary memory-section objects in directories writable by SYSTEM, potentially enabling manipulation of privileged services or kernel-mode drivers. The released PoC is incomplete and lacks the component needed to achieve a full SYSTEM shell.

Chaotic Eclipse has also warned of "a big surprise" targeting next month's Patch Tuesday and criticized Microsoft for quietly patching the earlier RedSun vulnerability without assigning it a CVE identifier.

The disclosures arrive as Palo Alto Networks technology chief Lee Klarich warned Wednesday of a narrowing window for organizations to prepare for AI-driven exploits. "We now estimate a narrow three-to-five-month window for organizations to outpace the adversary before AI-driven exploits start to become the new norm," Klarich wrote in a blog post.

Klarich pointed to AI models such as Anthropic's Mythos and OpenAI's GPT-5.5-Cyber as tools lowering the barrier for attackers to find and exploit unknown software vulnerabilities. Last month, Anthropic limited Mythos access to a select group of companies — including Palo Alto Networks, CrowdStrike, Amazon, Apple, and JPMorgan — to identify and address vulnerabilities before broader exposure.

"The big question just a few weeks ago was: 'Are we overstating the model capabilities?' With more testing, I can confidently say we weren't," Klarich wrote. "In fact, these models are likely even better at finding vulnerabilities than we initially realized."

Palo Alto said it plans to roll out an initial set of defensive capabilities, including virtual patching tools, "very soon." With unpatched zero-days circulating publicly and AI-assisted exploit development accelerating, security teams face mounting pressure to close gaps before attackers do it for them.
