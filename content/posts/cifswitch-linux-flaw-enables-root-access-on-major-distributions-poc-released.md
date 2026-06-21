---
title: "CIFSwitch Linux Flaw Enables Root Access on Major Distributions, PoC Released"
slug: cifswitch-linux-flaw-enables-root-access-on-major-distributions-poc-released
excerpt: "A 19-year-old Linux kernel vulnerability called CIFSwitch allows unprivileged local attackers to forge CIFS authentication requests and gain root access, affecting Linux Mint, CentOS Stream 9, Rocky Linux 9, Kali Linux, and other major distributions."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-05-30T17:05:30.688Z"
coverImage: "https://static.wixstatic.com/media/e37254_239365bd335e4e87a17705250754a232~mv2.jpg"
readTime: 3
migratedFromWix: true
---

A newly identified local privilege escalation vulnerability in the Linux kernel, dubbed "CIFSwitch," could allow an unprivileged attacker to forge authentication requests and gain root access on a broad range of Linux distributions, according to the researcher who discovered it.

The flaw was uncovered by Asim Viladi Oglu Manizada, a security engineer at SpaceX, who published an extensive technical report detailing both the vulnerability's cause and a working proof-of-concept exploit.

At its core, CIFSwitch stems from the Linux kernel's CIFS subsystem failing to verify that cifs.spnego key requests originate from the kernel's own CIFS client. CIFS, or Common Internet File System, is a networking protocol that allows Linux systems to mount and access files on remote machines.

When a CIFS network share uses Kerberos for authentication, the kernel delegates that authentication work to a user-space helper program called cifs.upcall, which runs with root privileges. Because the kernel does not validate the source of those requests, an unprivileged local user can forge a cifs.spnego request and trigger the same authentication workflow.

"The kernel requests a cifs.spnego-type key, and the normal keyutils/request-key config runs cifs.upcall as root to fetch or build the Kerberos/SPNEGO material," Manizada explained in his report.

From there, the flaw allows an attacker to abuse attacker-controlled fields — which the privileged helper program trusts — to force a namespace switch and trigger a Name Service Switch lookup before privileges are dropped. That sequence enables loading a malicious NSS module, ultimately achieving root code execution.

Manizada said CIFSwitch was introduced in 2007, making it a 19-year-old bug, and cautioned that exploitation is "non-universal," depending on the kernel version in use, the presence of a vulnerable cifs-utils build, the availability of user namespaces, and whether SELinux or AppArmor policies are configured to block the attack path. Affected versions include cifs-utils 6.14 and higher, though some older variants are also vulnerable.

Distributions confirmed vulnerable in their default configurations include Linux Mint 21.3 and 22.3, CentOS Stream 9, Rocky Linux 9, AlmaLinux 9, Kali Linux versions 2021.4 through 2026.1, and SLES 15 SP7. Manizada also noted that various Ubuntu, Debian, Pop!_OS, openSUSE, Oracle Linux, and Amazon Linux versions may be vulnerable if cifs-utils is installed.

A separate group of distributions — including Ubuntu 26.04, Fedora 40 through 44, CentOS Stream 10, Rocky Linux 10, SLES 16, AlmaLinux 10, and openSUSE Leap 16 — are protected by default SELinux and AppArmor configurations that prevent exploitation. Amazon Linux 2 and Kali Linux versions 2019.4 and 2020.4 are not affected at all, as their cifs-utils builds lack the namespace-switch functionality the exploit depends on.

A kernel patch has been released that addresses the issue by adding validation of cifs.spnego request origins, identified as upstream commit 3da1fdf. The exact kernel versions shipping the fix vary by distribution. Manizada has also published a proof-of-concept exploit to help organizations verify whether applied patches and mitigations are effective.

For systems that cannot be patched immediately, Manizada recommends disabling or blacklisting the CIFS module if it is not in use, removing the cifs-utils package if unnecessary, and disabling unprivileged user namespaces.

CIFSwitch arrives amid a sustained wave of Linux privilege-escalation disclosures. Other recent vulnerabilities in the same class include flaws identified as "Copy Fail," "Dirty Frag," "Fragnesia," "DirtyDecrypt," and "PinTheft," highlighting an ongoing pattern of root-escalation risks across the Linux ecosystem. Security teams administering Linux infrastructure are advised to assess their distribution's patch status as vendor-specific updates continue to roll out.
