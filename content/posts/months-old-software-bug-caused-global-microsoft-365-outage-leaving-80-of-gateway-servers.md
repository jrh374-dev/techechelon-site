---
title: "Months-Old Software Bug Caused Global Microsoft 365 Outage, Leaving 80% of Gateway Servers Unresponsive"
slug: months-old-software-bug-caused-global-microsoft-365-outage-leaving-80-of-gateway-servers
excerpt: "A software bug introduced in July triggered last week's nearly 24-hour Microsoft 365 outage, Microsoft said, causing more than 80% of its networking gateway servers to go unresponsive and disrupting Outlook, Teams, Exchange Online, and Copilot worldwide."
category: security
author: "TechEchelon Staff"
authorInitials: "TE"
publishedAt: "2026-11-16T19:02:49.846Z"
coverImage: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by Pixabay on Pexels"
coverCreditUrl: "https://www.pexels.com/@pixabay"
tags: ["microsoft", "microsoft 365", "outage", "exchange online", "cloud infrastructure", "incident report"]
primaryEntity: "Microsoft 365"
readTime: 3
featured: true
sourceUrls: ["https://www.bleepingcomputer.com/news/microsoft/microsoft-says-months-old-bug-caused-global-microsoft-365-outage", "https://www.cnbc.com/2026/11/16/bitcoin-slides-to-62000-following-liquidation-cascade-then-rebounds-slightly.html", "https://www.darkreading.com/cyberattacks-data-breaches/china-nexus-actors-breach-10-organizations-ai-driven-attacks"]
---

A software bug introduced in July triggered last week's nearly 24-hour Microsoft 365 outage, the company said in a preliminary post-incident report, causing more than 80% of its networking gateway servers to become unresponsive and disrupting services for users worldwide.

The incident, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/microsoft/microsoft-says-months-old-bug-caused-global-microsoft-365-outage), began at 11:20 AM ET on November 12 and continued until 11:10 AM ET the following day, when Microsoft confirmed that services had been fully restored — a window of roughly 24 hours that left users unable to access Outlook, Exchange Online, Teams, and Copilot.

According to Microsoft, the outage resulted from three compounding problems: a previously undetected software bug, a surge in traffic following a Microsoft Teams failover, and reduced server capacity due to an unrelated issue.

The bug itself had been dormant for more than three months. Microsoft introduced it via an update to its Microsoft 365 networking gateway servers in July, but the flaw went undetected because company testing relied on less powerful hardware than what runs in production environments.

"The contention issue is worsened on machines with more cores and newer hardware; whereas our load testing tended to focus on weaker hardware with fewer cores," Microsoft said in its preliminary report, adding that "the traffic mix and SKUs used in our labs" also failed to surface the problem.

The bug was eventually triggered after Microsoft Teams automatically switched to the networking infrastructure used by Exchange Online approximately 15 hours before the outage began, increasing load on those servers. Complicating matters, nearly 14% of gateway server capacity was already offline due to a separate, unrelated issue.

As servers stopped responding, Microsoft's automated systems began redirecting users to other available servers — which then became overwhelmed by the additional traffic and failed in turn. Within less than two hours, the defect had spread across the entire fleet.

Safeguards designed to prevent problems from cascading between regions also failed to contain the disruption, allowing it to propagate globally. While Teams, OneDrive, and SharePoint were able to switch to alternative infrastructure and recover earlier, Exchange Online lacked that capability, leaving mailboxes inaccessible for the duration of the outage.

Recovery proved difficult because restarting affected servers caused them to be quickly overwhelmed again by backed-up traffic. Microsoft engineers ultimately developed a targeted fix and deployed it across affected servers, allowing services to stabilize throughout November 13.

Charles Lamanna, Microsoft's executive vice president of Copilot, Agents, and Platform, apologized for the disruption in a statement posted to X. "We are deeply sorry for the impact to all our customers and recognize the impact that this has on their normal business and operations," Lamanna said.

Microsoft said it has since increased capacity, improved monitoring, and added safeguards to prevent traffic redirection from triggering similar cascading failures. A final post-incident report is expected later this week, as the company's investigation continues.

The episode underscores a persistent challenge in large-scale cloud infrastructure: software defects that survive months of standard testing can remain latent until a specific combination of traffic conditions, hardware characteristics, and capacity constraints brings them to the surface simultaneously.
