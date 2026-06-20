---
title: "ShinyHunters Used Canvas XSS Flaws to Deface Portals and Pressure Instructure Into Ransom Talks"
slug: shinyhunters-used-canvas-xss-flaws-to-deface-portals-and-pressure-instructure-into-ransom-talks
excerpt: "ShinyHunters exploited cross-site scripting flaws in Instructure's Canvas LMS to deface school login portals and demand a ransom, following an initial breach the group claims netted 275 million records from more than 8,800 educational organizations."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-05-11T19:01:20.473Z"
coverImage: "https://static.wixstatic.com/media/e37254_24ac7fcfae3e47a791bc6d0b10d5c1d8~mv2.jpeg"
readTime: 2
migratedFromWix: true
---

Education technology company Instructure has confirmed that the hacker group ShinyHunters exploited cross-site scripting vulnerabilities in its Canvas learning management system to deface login portals across hundreds of institutions and demand a ransom, marking the second breach of the company in less than two weeks.

The initial intrusion was discovered on April 29, when Instructure found that its network had been compromised and, the company said, "immediately revoked the unauthorized party's access, started an investigation, and engaged outside forensic experts."

Within days of that disclosure, ShinyHunters published Instructure on its data leak site, claiming to have stolen more than 3.6 terabytes of uncompressed data — including usernames, email addresses, course names, enrollment information, and messages.

The hackers then returned on May 7, exploiting the same cross-site scripting vulnerabilities used in the original attack. By injecting malicious JavaScript into user-generated content features within Canvas, ShinyHunters obtained authenticated administrator sessions, which gave them the ability to perform privileged actions on the platform.

Instructure confirmed that the exploited flaw affected the Free-for-Teacher environment — a free, limited version of Canvas available to individual educators. "The unauthorized actor made changes to the pages that appeared when some students and teachers were logged in through Canvas," the company said.

The defacement campaign was designed to coerce Instructure into negotiations. ShinyHunters added a message to Canvas login portals warning that both the company and schools using its platform had until May 12 to make contact and discuss a ransom payment. The message appeared on portals including that of the University of Texas San Antonio.

Instructure temporarily took Canvas offline to contain the malicious activity, investigate the cause, and apply additional safeguards. The platform was restored and made available again on May 9. The company also shut down Free-for-Teacher accounts pending resolution of the underlying vulnerabilities.

Instructure said no data was compromised in the defacement operation itself, though the data exfiltrated during the original breach remains a significant concern. ShinyHunters claims the attack affects 8,809 educational organizations — including schools, universities, colleges, and online platforms — and asserts that 275 million records belonging to students, teachers, and other staff members were stolen.

Canvas is widely used by schools and universities around the world to manage assignments and coursework, making the scope of the alleged theft particularly consequential for the institutions that rely on it.

The incident arrives as broader warnings about the abuse of software vulnerabilities are intensifying across the industry. Google's Threat Intelligence Group said in a separate report Monday that it had thwarted an attempt by hackers to use an AI model to plan a "mass vulnerability exploitation operation," underscoring how the tools and techniques available to criminal threat actors are growing more capable.

With a ransom deadline of May 12 now passed, the extent of Instructure's exposure — and whether any negotiation took place — remains to be seen. The company has not disclosed the full scope of the stolen data or whether law enforcement has been formally engaged.
