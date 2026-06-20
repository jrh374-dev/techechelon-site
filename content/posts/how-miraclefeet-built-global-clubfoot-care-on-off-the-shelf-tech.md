---
title: "How MiracleFeet Built Global Clubfoot Care on Off-the-Shelf Tech"
slug: how-miraclefeet-built-global-clubfoot-care-on-off-the-shelf-tech
excerpt: "On World Clubfoot Day, the nonprofit’s chief executive explains why connecting proven platforms let a roughly 50-person organization track a quarter-million patient visits a year across nearly 40 countries."
category: business
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-06-03T13:00:22Z"
coverImage: "https://static.wixstatic.com/media/e37254_b52aded879b9491c9c53e61554d24577~mv2.jpg"
readTime: 6
migratedFromWix: true
---

Clubfoot is one of the most treatable conditions in pediatric medicine. A baby born with the inward-twisting foot deformity can, in most cases, be corrected without major surgery through a months-long sequence of plaster casts and a brace, a protocol known as the Ponseti method, for an average of about $500.

And yet, of the roughly 200,000 children born with clubfoot each year, most live in low- and middle-income countries where that care is hard to reach. The result is a vast, avoidable gap of a fixable condition that, left untreated, hardens into a lifelong disability.

![Photo](https://static.wixstatic.com/media/e37254_b52aded879b9491c9c53e61554d24577~mv2.jpg)
*At a clinic visit, a health worker cradles a baby’s feet while recording the assessment in CAST, MiracleFeet’s mobile app. Built to work offline, the app lets frontline providers document each stage of a child’s clubfoot treatment even where internet is unreliable or absent.  Photo courtesy of MiracleFeet.*

[MiracleFeet](https://www.miraclefeet.org/), the nonprofit working to close that gap, has spent the better part of a decade attacking it with an unlikely tool set: a stack of off-the-shelf software stitched together to run a real-time clinical operation across more than 500 clinics in nearly 40 countries. This World Clubfoot Day, that system quietly processes more than a quarter of a million patient visits a year, managed by a core team of roughly 50 people and, notably, without a dedicated in-house software developer.

For Daphne Sorensen, MiracleFeet’s chief executive, that last detail is a deliberate strategy rather than a constraint. “I’ll be the first to say I’m not the technologist in the room,” she said, crediting Associate Director of Digital Systems Clifford Hakimi-Khiaban and partners including Dimagi, Vera Solutions, and OpenFn. But the question of what to build versus what to buy, she said, “at its heart” is “a question about stewardship.”

#### A bet on buying, not building

The architecture is straightforward by design. Frontline providers record each child’s treatment in CAST, a mobile app built on Dimagi’s CommCare platform that runs offline in clinics with little or no connectivity. That field data flows through an automated pipeline (built with the workflow-automation company OpenFn and the implementation firm Vera Solutions) into Salesforce, where MiracleFeet tracks treatment quality and outcomes in close to real time. No nightly exports, no manual re-keying.

![Photo](https://static.wixstatic.com/media/e37254_e488eb87a6f443f3b039399741e6fb02~mv2.jpg)
*A health worker logs visit details in CAST while a clinician examines a child’s foot. The app guides providers through a standardized, image-referenced scoring of each foot, turning a complex, multi-year treatment into structured data that syncs automatically to MiracleFeet’s central monitoring system.  Photo courtesy of MiracleFeet.*

MiracleFeet could have commissioned a custom system to connect those pieces, but it chose not to.

“In practice, for an organization our size, that would mean taking on the cost and risk of becoming a software company,” Sorensen said, “hiring and retaining specialized engineers, and holding critical knowledge in a few people’s heads, which often walks out the door when someone leaves.”

The established platforms, she argues, came with a track record an in-house build couldn’t match. CommCare and Salesforce have each scaled to thousands of users and millions of beneficiaries at a known, comparatively low cost, with a deep bench of experienced support talent available in the market. “Choosing to connect proven platforms rather than build from scratch lets us stay lean and focused on what we actually do, which is helping children walk,” she said. “For us, the right technology decision and the right stewardship decision turned out to be the same one.”

##### From data entry to data analysis

By the organization’s own estimate, drawn from OpenFn’s return-on-investment calculator, the automated pipeline saves roughly $215,000 and 22,000 staff hours every year. It is the kind of figure donors notice. But Sorensen is quick to reframe what the automation actually delivers.

“The deeper value isn’t only the money or the hours,” she said. “With more than a quarter of a million patient visits a year, it’s impossible to manage quality care for that many children on spreadsheets. So the automation isn’t really shaving down a cost we used to pay, it’s making something possible that otherwise wouldn’t exist at all.”

Freed from digitizing paper records, the team has turned its attention to the data itself, building new performance indicators out of existing data sets, and flagging in real time which children have dropped out of treatment so they can be drawn back into care as quickly as possible. The payoff compounds at scale. On a foundation already taking shape when Sorensen joined in 2020, MiracleFeet has grown from about 180 clinics to more than 500 without expanding its administrative team at anything close to the same rate.

That was possible, she said, only because the technology cleared a few specific bars. The app had to be offline-capable and mobile-optimized so it supported frontline workers rather than burdening them, and information had to move in real time from a rural clinic up to the people deciding where to direct resources. 

The limits, she is careful to note, are human, not technical. “Scale, for us, has never meant expansion for its own sake; it means reaching more children while maintaining high quality of care,” Sorensen said. “Technology can carry data across continents, but it can’t build the trust and local capacity that treatment depends on.”

##### Where AI fits, and where it doesn’t

Like much of the health sector, MiracleFeet is now weighing where artificial intelligence belongs in its work. Sorensen frames it less as a leap than as an extension of the pattern-spotting the organization already does. “The CAST app helps us spot patterns across hundreds of clinics that a human team would struggle to see,” she said.

The near-term experiments are pragmatic. The organization is looking at AI to pull disparate data sources into a more holistic picture, for instance, reviewing programs teams’ and partners’ monthly and quarterly narrative reports and weighing the initiatives they describe, along with local political or environmental factors against trends in dropouts, missed visits, and enrollments. It is exploring WhatsApp-based AI chat tools to give parents the consistent education and support that overstretched clinics often cannot. And it is putting AI to work on data integrity, surfacing duplicate patient records, flagging possible data falsification, and catching statistical anomalies.

Where Sorensen draws a firm line is at anything that might pass as a substitute for clinical judgment or human relationships. Clubfoot treatment works, she said, because of trained, trusted providers and because families stay engaged across several years of care. “No model replaces the physiotherapist’s hands, or the community health worker who knows a family by name,” she said. “My interest in AI is how it can help us better serve the children we treat.”

##### The lesson for lean health tech

That ethos — technology as a tool in service of people, not a replacement for them — is also Sorensen’s answer to what other global health organizations might take from MiracleFeet’s approach as it works toward Run Free 2030, its goal of dramatically widening access to clubfoot care by the end of the decade.

“The gap between what is medically possible and what a child actually experiences is the reason MiracleFeet exists,” she said. The takeaway, in her telling, is one of restraint: “You don’t have to build everything yourself, and you probably shouldn’t. Connect proven tools, design for the realities facing your frontline workers, and let the technology free your people to focus on care rather than paperwork.”

None of it, she is careful to add, replaces strong local health systems and skilled providers. But used well, Sorensen said, “powerful technology and robust data systems allow a relatively small organization to transform thousands of young lives every year,” one corrected step at a time.
