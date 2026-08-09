---
title: "ANALYSIS: The Manual Chart Review Bottleneck Healthcare Still Hasn't Solved"
slug: analysis-manual-chart-review-bottleneck-healthcare-still-hasnt-solved
excerpt: "Healthcare has made meaningful progress in connecting patient data. Finding the record is no longer the bottleneck. The next challenge is making that information usable at the moment a clinician needs it, and a new category called clinical clarity is emerging to close the gap."
category: opinion
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-08-10T14:00:00.000Z"
coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
coverCredit: "Photo via Unsplash"
coverCaption: "A clinician workstation, where the 45-minute chart problem lives."
readTime: 7
tags: ["clinical clarity", "healthcare data", "xcures", "prior authorization", "medical records", "healthcare ai"]
primaryEntity: "xCures"
qa:
  - question: "\"Clinical clarity\" is a term the industry is coalescing around, but it's still relatively new. How would you define it, and what makes it different from summarization or interoperability?"
    answer: "Clinical clarity is structured, decision-ready clinical understanding built from raw, unstructured patient records. It's the layer beyond moving data or summarizing it. What we're producing is a traceable output that a clinician, a lab director, or a revenue cycle team can act on directly, with a written clinical rationale attached to every field. Summarization gives you a paragraph. Clarity gives you a decision."
  - question: "A lot of health-tech vendors already claim they've solved interoperability. Where does clinical clarity fit relative to what FHIR and the HIE networks already provide?"
    answer: "Interoperability solves the transport problem: how records get from one system to another. That's necessary, but it's not sufficient. Once the records arrive, you still have a human being reading and interpreting them. Clinical clarity picks up at that point. We take retrieved records and turn them into structured data that a system can query and a person can trust, without the manual review step in the middle."
  - question: "Given how much progress there's been on the connectivity side, why is manual chart review still where clinical operations teams spend most of their time?"
    answer: "Because movement is not understanding. A record moving from one EHR to another is still a raw record when it arrives. Someone has to read it, decide what's relevant, reconcile it against other records. That's what drives the 45-minute-per-chart average you see in the resident-physician studies. Connectivity solved the plumbing. It didn't solve the reading."
  - question: "Every AI-in-healthcare company talks about accuracy. What actually sits behind the numbers xCures publishes?"
    answer: "Our extractors are validated against peer-reviewed, condition-specific clinical benchmarks, not internal test sets. Every output is traceable to a source document and carries a written clinical rationale. When the system isn't confident, it flags that rather than masking it. Those requirements came out of oncology, where the cost of a wrong extraction can be a patient who doesn't get the right therapy. That accuracy bar has stayed the same as we've expanded across other clinical domains."
  - question: "Prior authorization is where a lot of health systems are feeling operational pain right now. What does the math look like once clinical clarity is applied to that workflow?"
    answer: "The 2024 AMA survey pegs physicians and staff at 13 hours a week on prior-auth work, across roughly 39 requests per physician. Completing a decision-ready checklist through our system takes about 30 seconds. That's not a marginal improvement. That's the difference between prior auth being a full-time job for someone in your revenue cycle team and being a step that happens in the background of the actual clinical work."
---

Healthcare has made meaningful progress in connecting patient data. Finding the record is no longer the bottleneck. The next challenge is making that information usable at the moment a clinician needs it.

Consider a common scenario: a clinician opens a 200-page patient record. The information they need is in there somewhere: a prior diagnosis, a biomarker result, a medication history. It might sit in an image on page 147. It might be a scanned handwritten note from a specialist in another system. It might split across four EHRs that do not communicate.

On average, resident physicians spend 45 minutes in the EHR per patient, and only 13 of those minutes are actual chart review, according to a 2017–2018 study of 622 resident physicians at the University of Alabama at Birmingham. Multiply that across a patient panel. Multiply that across a health system. The math does not work.

For diagnostics labs, the problem looks different but costs just as much. Patient data arrives incomplete. Match rates are 15 percent or lower for cases requiring cross-system record assembly. That means 85 percent of patients who might qualify for a test or a therapy are invisible, not because they do not exist, but because the data to surface them is scattered and unstructured.

Records can now move between systems. FHIR mandates, API connectivity, and a growing ecosystem of health data networks made that possible over the past decade. That was real progress. But movement is not understanding. A record that travels from one system to another is still a raw record. A human still has to read it, interpret it, and confirm what is relevant.

Manual chart review remains the bottleneck. It costs health systems, labs, and value-based care organizations in time, accuracy, and missed revenue.

## What Data Access Gets Right, and What It Leaves Unfinished

Two distinct problems often get conflated in health data. Separating them is useful.

The first is **data access**: can a provider, lab, or payer retrieve a patient's records from across the systems in which they reside? Health information exchanges, FHIR-enabled APIs, and connectivity networks were built to address this. It is a hard infrastructure problem, and meaningful progress has been made.

The second is **data understanding**: once those records are retrieved, what do they actually say? Which diagnoses are confirmed versus suspected? Which medications are current? What does the full patient history mean for the decision being made right now?

Most tools today solve the first problem. They were built to move data. Very few were designed to make that data decision-ready.

The bottleneck has shifted. In most enterprise health settings, records can be retrieved. Time and cost now concentrate on what happens after retrieval: reading, interpreting, and structuring what arrives. That is where manual chart review lives, and it's what drives the 45-minute-per-chart average. Prior authorization teams, lab operations, and clinical ops departments manage this every day.

A new category is emerging to close that gap. In clinical operations, the term gaining traction is *clinical clarity*: structured, decision-ready clinical understanding built from raw, unstructured patient records. Not a summary. Not a data dump. A traceable output that a clinician, a lab director, or a revenue cycle team can act on directly.

[xCures](https://www.xcures.com) is one company positioning itself in this category. It describes itself as "the Clinical Clarity Engine for healthcare, assembling and structuring patient medical records into decision-ready data." The company assembles records from more than 550,000 healthcare locations and uses validated extractors, benchmarked against peer-reviewed clinical models, to produce structured data. Each output links back to its source document with written clinical justification. The stated goal is to eliminate the manual review step, not to assist it.

## Why More Data Is Not the Same as Better Decisions

The most common assumption in health data tooling is that more access produces better outcomes. In practice, more unstructured data can increase the burden rather than reduce it. A clinician with access to 10 disconnected EHR systems still has to read all of them. A lab operations team with a live connection to patient records still has to parse which records confirm the criteria they need.

> "Data has never moved faster, yet decisions still feel slow: more to review, more alerts, more noise. That's the paradox healthcare is stuck in. It doesn't need faster bureaucracy. It needs clinical clarity for better decisions."
>
> — Mika Newton, CEO, xCures

Connectivity tools are necessary infrastructure. They move records. They normalize data formats. They create the conditions under which a human can do the interpretive work. That interpretive work is what clinical clarity replaces.

| Domain | Accuracy | Sample size |
| --- | ---: | ---: |
| Comorbidity identification | 0.997 | 6,399 elements |
| HEDIS measure fulfillment | 0.936 | 7,199 elements |
| Cancer diagnosis | 0.982 | — |
| Cardiology | 0.990 | — |

*Extractor accuracy: condition-specific benchmarks across clinical domains. Results based on a retrospective analysis of a defined historical dataset and do not guarantee future performance. Source: xCures.*

Every output is traceable. Each data point links to the source document with a written clinical rationale.

For prior authorization, the output is a completed checklist rather than a stack of records for a reviewer to work through. A full checklist takes approximately 30 seconds to complete. Manual prior authorization work takes physicians and staff an average of 13 hours per week, across 39 requests per physician, according to the 2024 AMA Prior Authorization Physician Survey.

## The Landscape: Four Categories, One Gap

The current health data landscape is worth mapping plainly, because marketing language across vendors makes genuine differentiation hard to parse.

**Connectivity platforms** focus on moving records. They are infrastructure: they establish the pathways through which records travel. Their value is network breadth and API reliability. They do not validate or interpret the records they retrieve. A lab director or VP of clinical operations who needs a decision-ready output is not their intended use case.

**EHR systems** are digital recordkeeping tools. They capture what happens inside a single institution. Cross-system record retrieval is not a problem they were built to solve. For a patient whose history spans multiple health systems, a private lab, and a telehealth provider, the EHR shows only what that one institution recorded.

**Model-based summarization tools** are common in pilots and proofs of concept. The core limitation is validation. A model that summarizes a patient chart may produce a fluent, plausible output. Whether that output is clinically accurate, auditable, and defensible in a payer review is a separate question. For decisions that carry financial and clinical stakes, outputs without traceability are a liability.

**Manual review** remains the default in most organizations. It is the most expensive and least scalable option. Organizations rely on it not because it is the best approach, but because a validated, automated alternative has not been available at scale.

The gap across all four categories is the same. None of them produces decision-ready clinical information from unstructured records at scale, with validation that meets enterprise accuracy requirements. That is the gap clinical clarity is built to fill.

## What Extractor Validation Actually Requires

Clinical clarity is only as useful as the rigor behind the extractors that produce it. The oncology heritage of xCures is relevant here, not as a brand story, but as evidence of what building validated clinical extractors requires in practice.

xCures was built to process records for oncology patients. In that population, incomplete or inaccurate data has direct consequences for treatment eligibility, trial enrollment, and outcomes. The accuracy standards required of extractors in oncology are not comparable to general clinical data processing. That environment produced the extractor validation methodology xCures now applies across all clinical domains.

The extractors are validated against peer-reviewed, condition-specific benchmarks. Outputs are traceable to source documentation. The system flags uncertainty rather than masking it. These requirements emerged from years of processing records where the cost of error is a patient who does not receive the right care.

For enterprise buyers across diagnostics, provider systems, and value-based care, this lineage answers the core purchasing question: are the extractors accurate enough to rely on?

## What This Means for Healthcare Operations Today

Several converging pressures make clinical clarity operationally relevant for health organizations right now.

Prior authorization volume is rising, and payer requirements are becoming more granular. Revenue cycle teams face pressure to document medical necessity with less staff time. This is where [decision-ready checklists](http://xcures.com/decision-ready-checklists) change the math. Physicians and staff currently spend an average of 13 hours a week on prior authorization, across 39 requests per physician; completing a checklist in 30 seconds instead of assembling a case by hand cuts a meaningful chunk of that time, freeing staff for higher-value work.

Medical record retrieval is increasingly central to value-based care contracting. Risk adjustment accuracy, HEDIS performance, and care gap closure all depend on a complete and correctly interpreted patient history. An automated patient history assembled from cross-system records is what makes that possible at scale. Organizations relying on manual chart review are leaving accuracy on the table. In risk-based contracts, accuracy gaps translate directly to revenue gaps.

Clinical data requirements for diagnostics are also expanding. Labs that identify eligible patients from structured, cross-system record data hold a material advantage in test utilization, reimbursement capture, and patient access. Evidence-grade data, traceable to source and validated at the extractor level, is what turns scattered records into that advantage.

The connectivity layer of healthcare is largely built. The layer that turns retrieved records into decisions is where the operational gains are now.
