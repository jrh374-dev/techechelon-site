---
title: "Ransomware Attack on IDC Frontier's IDCF Cloud Disrupts 495 Companies and Government Clients in Japan"
slug: ransomware-attack-on-idc-frontiers-idcf-cloud-disrupts-495-companies-and-government-clients-in-japan
excerpt: "IDC Frontier, a SoftBank subsidiary, disclosed a ransomware attack on its IDCF Cloud service that disrupted 495 companies and government clients in eastern Japan, with the threat actor claiming to have encrypted 3.6 petabytes of data."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-10-08T21:02:00.267Z"
coverImage: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5Mzc2NzZ8MHwxfHNlYXJjaHwxfHxJREMlMjBGcm9udGllciUyMFRva3lvJTIwZGF0YSUyMGNlbnRlciUyMHNlcnZlciUyMGluZnJhc3RydWN0dXJlfGVufDF8MHx8fDE3OTE0OTMzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
coverCredit: "Photo by Louie Martinez on Unsplash"
coverCreditUrl: "https://unsplash.com/@thetalkinglens"
tags: ["ransomware", "idc frontier", "idcf cloud", "softbank", "japan", "cloud security"]
primaryEntity: "IDC Frontier"
readTime: 3
featured: true
hasDisclaimer: true
sourceUrls: ["https://www.bleepingcomputer.com/news/security/low-cost-android-phones-ship-with-residential-proxy-malware", "https://www.bleepingcomputer.com/news/security/ransomware-attack-disrupts-japans-idcf-cloud-used-by-govt-clients", "https://www.darkreading.com/cyberattacks-data-breaches/venezuelan-cartel-malware-honcho-nabbed-atm-jackpotting"]
---

IDC Frontier, a cloud and digital infrastructure subsidiary of SoftBank Group, disclosed that its IDCF Cloud service was struck by a ransomware attack early Wednesday, knocking out a data center cluster that serves government agencies and businesses across eastern Japan.

The company said the attack began on October 7 at 3:40 AM local time, forcing an immediate shutdown of affected network and system resources. "Our investigation has determined that a disruption in East Japan Region 1 was caused by a ransomware attack by a third party," the company said in an announcement. "We are continuing to investigate the precise cause and the scope of the impact," it added.

IDC Frontier confirmed that 495 companies and local governments relying on its cloud platform have been affected.

IDCF Cloud is an infrastructure-as-a-service platform through which IDC Frontier rents virtual servers, storage, and networking capacity to customers running websites, applications, and business systems in Japanese data centers. IDC Frontier is a subsidiary of SoftBank Group, a multinational investment holding company headquartered in Tokyo.

Following detection of the intrusion, the company isolated and shut down impacted systems within East Japan Region 1 to contain the compromise. It has also proactively disabled customer access to management consoles across all regions while it verifies their security posture, with access to be restored after each region is cleared.

Screenshots captured by customers before console access was revoked showed a message from the threat actor claiming the breach of East Japan Region 1's infrastructure took seven minutes. The threat actor claimed to have encrypted 225 databases corresponding to 3.6 petabytes of data, reached 239 hypervisors, sealed 16,000 virtual machine disks, and wiped 554,153 snapshots. IDC Frontier has not independently confirmed these figures.

The attack arrives amid a sharp increase in cybersecurity incidents targeting Japanese organizations. Security firm Macnica logged 119 incidents involving personal information theft or exposed data since the start of 2026, with 83 of those occurring between July 1 and October 6 alone. By comparison, Macnica recorded 84 incidents throughout all of 2025 and 62 during 2024.

Macnica researcher Yutaka Sejiyama told BleepingComputer that attackers are systematically probing websites and APIs for access-control, configuration, and authentication weaknesses, as well as exploiting known n-day vulnerabilities. Sejiyama added that the rise of capable, low-cost AI tools may be enabling broader and more detailed exploration of security weaknesses, lowering the effort required to target smaller organizations.

In a separate incident, Japanese seafood and food group Nissui Corporation announced Wednesday that its logistics subsidiary, Nissui Logistics, suffered a system outage due to suspected unauthorized access to a third-party data center. As a result, the company said goods are not being shipped or received, and it is investigating whether personal information or customer data was compromised. Nissui employs approximately 11,500 people and operates an international supply chain spanning fishing, aquaculture, processing, and sales. It remains unclear whether Nissui's outage is connected to the attack on IDCF Cloud.

IDC Frontier said it is continuing to work to identify and block the intrusion route and to verify the security of its remaining regions. With nearly 500 affected entities — including local government bodies — and a threat actor claiming to have destroyed millions of snapshots and encrypted petabytes of data, the pace and scope of recovery will be closely watched across the Japanese public and private sectors.

[Disclaimer](/disclaimer)
