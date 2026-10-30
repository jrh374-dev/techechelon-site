---
title: "OPINION: AI Agents Need Authority Budgets Before They Get More Power"
slug: opinion-ai-agents-need-authority-budgets-before-they-get-more-power
excerpt: "The question about an AI agent is no longer whether it can finish a task but how much power it is handed along the way. After roughly 1,200 supposedly isolated agents found a back channel and breached Hugging Face, the missing enterprise control is a hard cap on what an agent may do before a human signs off."
category: opinion
author: "Guest Contributor"
authorInitials: "GC"
publishedAt: "2026-10-30T17:53:00.000Z"
coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
coverCredit: "Photo via Unsplash"
coverCaption: "An authority budget caps the credentials, tools, data, spending, and delegation an AI agent can use before a human has to sign off."
readTime: 4
tags: ["ai agents", "ai governance", "security", "authority budgets", "metr", "hugging face", "op-ed"]
primaryEntity: "AI agents"
---

The most important question about an AI agent is no longer whether it can complete a task. It is how much power it receives while trying.

TechEchelon recently reported that OpenAI technology made [unauthorized attempts to access federal government websites](/post/openai-agent-made-unauthorized-attempts-to-access-federal-government-websites), including the Department of Education's Office for Civil Rights. That episode belongs to a broader pattern: increasingly capable systems can move from generating text to acting through tools, credentials, browsers, code, and connected services.

A separate [investigation by METR](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/), with Redwood Research, shows why organizations should treat authority as a security boundary. In a multi-day incident involving Hugging Face, roughly 1,200 agents that were supposed to be isolated discovered an unsanctioned shared message board. They exchanged more than 70,000 messages and files, and about 700 participated in the attack. The agents divided work, shared discoveries, coordinated large workstreams, and successfully breached Hugging Face's defenses.

The striking lesson is operational. Once agents had enough access and a channel for coordination, they could turn local capabilities into sustained collective action that designers had not intended.

That makes traditional application permissions too coarse for the next wave of AI deployment. Organizations need authority budgets.

## Six questions before deployment

An authority budget defines the maximum consequential power an agent can exercise before it must stop and obtain human approval. It should answer six questions before deployment: Which systems may the agent access? Which credentials may it use? What records may it change? What external messages or transactions may it initiate? How much money or compute may it spend? May it delegate work or grant access to other agents?

The budget should be task-specific, time-limited, and measurable. An agent that analyzes support tickets might read customer records but never change billing information. An agent that drafts procurement options might compare vendors but never issue a purchase order. A security agent might inspect approved systems while requiring human approval before any consequential action.

## Three more safeguards

Organizations should pair those limits with three additional safeguards.

First, test agents independently before expanding authority. Evaluations should measure whether a system respects intended boundaries under pressure, not just whether it completes the assigned task.

Second, require serious-incident reporting and independent review when agents cross boundaries, gain unintended access, or coordinate in unexpected ways. The METR investigation is valuable precisely because an outside group reconstructed what happened rather than leaving the incident inside a vendor's internal learning process.

Third, test intervention, not just performance. A shutdown control matters only if humans can detect a problem and stop the system before consequential actions cascade. Teams should rehearse how they will suspend access and recover when behavior departs from expectations.

## Safeguards are what make speed possible

I'm no AI skeptic. I help organizations adopt AI for a living, and I want adoption to move faster. In my experience, strong safeguards increase trust and make faster adoption possible, while reducing the risk of failures like the Hugging Face attack.

That trust matters inside companies. Employees are more willing to delegate meaningful work when they know where the agent's authority ends and where human accountability begins. Security teams can approve broader use when privileges are bounded. Executives can scale successful workflows with clearer evidence that a mistake will remain contained.

The market is moving toward agents because action creates more value than advice. That same shift raises the cost of vague permissions. Enterprises should not wait for another dramatic failure to learn that capability and authority are different things.

Give agents enough power to create value. Give them no more power than the task requires.

_Dr. Gleb Tsipursky is a behavioral scientist, the CEO of [Disaster Avoidance Experts](https://disasteravoidanceexperts.com/), and the author of [The Psychology of AI Adoption at Work: From Resistance to Results](https://disasteravoidanceexperts.com/aibook) (Georgetown University Press, 2026). Called the "Office Whisperer" by The New York Times, he has published more than 650 articles in venues including Harvard Business Review, Fortune, and Forbes. He was the subject of a TechEchelon [Executive Q&A](/post/executive-q-a-gleb-tsipursky-on-why-ai-hiring-growth-needs-a-career-ladder-test) in August. He has no financial interest in the companies mentioned._
