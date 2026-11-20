---
title: "OPINION: The CEO's Therapy Is a Data Security Problem Hiding in Plain Sight"
slug: opinion-the-ceos-therapy-is-a-data-security-problem-hiding-in-plain-sight
excerpt: "A chief executive's mental health care leaves a trail across insurance claims, wellness apps, calendars and expense reports that most security teams have never mapped. Boards should treat it like any other crown-jewel data and give leaders a route to care with no line back into the company."
category: opinion
author: "Guest Contributor"
authorInitials: "GC"
publishedAt: "2026-11-20T22:38:00.000Z"
coverImage: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=1600&q=80"
coverCredit: "Photo via Unsplash"
coverCaption: "Executive mental health data rarely sits in one place. It spreads across claims, apps, calendars and expense reports."
readTime: 4
tags: ["executive mental health", "data privacy", "cybersecurity", "health data", "corporate governance", "op-ed"]
primaryEntity: "Executive mental health"
---

When a chief executive finally decides to talk to someone, the first privacy decision happens before any clinician is involved. It happens in a search bar late at night, when the query is something like "ceo therapist," typed on a laptop managed by the company's own IT department.

I have spent about 20 years in healthcare IT, and as a security practitioner I think that moment deserves more attention than it gets. Mental health information about a sitting CEO is some of the most sensitive data a company can generate, and most organizations have never mapped where it would flow.

## Why executives hide it

The concealment is real. In a 2026 CEREVITY review of 298 CEOs and senior executives who sought therapy through its network, 63 percent said they had deliberately hidden how serious things were from their boards. CEREVITY's report on that review names the pattern the CEO Burnout Cycle and describes the sequence: strain rises while results hold, and the executive makes a considered decision not to give the board the full picture.

That decision is a reading of the room, not paranoia. In [Businessolver's 2024 empathy study](https://businessolver.com/news/new-data-shows-toxic-workplaces-and-stigmas-linked-to-surge-in-employee-mental-health-issues/), which surveyed more than 3,000 employees, HR leaders and CEOs, 81 percent of CEOs agreed that companies view someone with mental health issues as weak or a burden, and 55 percent of CEOs said they had experienced a mental health issue.

So the executive wants privacy. The question for security teams is whether the company's own systems will give it to them.

## Map the data like any other crown-jewel asset

A security team would ask the usual questions: where is this data created, where is it stored, and who can read it.

**The insurance claim.** Therapy billed through the company health plan produces a claim with a diagnosis code. HIPAA applies to the plan and the provider, which the Department of Health and Human Services lists as covered entities, but the claim still exists in systems the executive does not control.

**The apps.** A growing share of mental health support arrives through apps and platforms that are not covered entities at all. In 2023 the Federal Trade Commission [alleged that BetterHelp](https://www.ftc.gov/news-events/news/press-releases/2023/03/ftc-ban-betterhelp-revealing-consumers-data-including-sensitive-mental-health-information-facebook) revealed consumers' email addresses, IP addresses and health questionnaire information to Facebook, Snapchat, Criteo and Pinterest for advertising; the company agreed to pay $7.8 million. A month earlier, [GoodRx paid a $1.5 million civil penalty](https://www.ftc.gov/news-events/news/press-releases/2023/02/ftc-enforcement-action-bar-goodrx-sharing-consumers-sensitive-health-info-advertising) in the first enforcement action under the FTC's Health Breach Notification Rule. In 2024 the agency [finalized changes](https://www.ftc.gov/news-events/news/press-releases/2024/04/ftc-finalizes-changes-health-breach-notification-rule) making clear that rule covers health apps not covered by HIPAA.

**The endpoints.** Calendar invites, corporate card statements, browser history and expense reports all leave signals on company infrastructure. None of it is a medical record. All of it can be read by somebody with the right admin rights.

**The people.** Executive assistants manage calendars. IT administrators see endpoint logs. Benefits staff see vendor invoices. Every one of them is trusted, and none of them should end up holding the CEO's health information by accident.

## What a security-minded board should do

First, name executive mental health information as its own data class in the data map, with an owner and access rules as strict as the ones for deal material.

Second, recommend that anything health-related stay off company infrastructure: personal devices, personal accounts and personal payment. An executive should not have to work that out alone at the worst possible moment.

Third, read the privacy terms of every wellness vendor the way you would read a payroll processor's. Ask who receives what, in what form, and whether any utilization report can be cut down to a group small enough to identify one person.

Fourth, stop making the executive choose between silence and disclosure to the people who evaluate them. The fix is one route to care with no line back into the company, the board or the employment record.

## Concealment has an operating cost

Keeping a secret is not free. Across ten studies covering more than 13,000 secrets, [Slepian and colleagues](https://business.columbia.edu/faculty/research/experience-secrecy) found that how often people's minds wandered to a secret, not how often they had to actively hide it, predicted lower well-being. A CEO spending attention on keeping a health matter quiet is spending it somewhere other than the job.

Security teams already know how to protect sensitive data. Most have simply never been asked to protect this kind.

_Elijah Fernandez, MSW, PMP, CISSP, is co-founder and chief technology officer of [CEREVITY Health](https://cerevity.com/), a private-pay concierge network of independent licensed clinicians for executives, founders, physicians, attorneys and finance leaders. He has spent about 20 years in healthcare IT, including as director of IT operations at a national mental health company, and writes about data privacy and security in mental health care. Disclosure: CEREVITY's network serves executives, and the review and report cited in this piece were produced by CEREVITY._
