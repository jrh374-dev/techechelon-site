---
title: "Google's First Orbital Data Center Satellite Comes Online, Runs Gemma 4 AI Model in Space"
slug: googles-first-orbital-data-center-satellite-comes-online-runs-gemma-4-ai-model-in-space
excerpt: "Google's Suncatcher prototype satellite — carrying a single Tensor Processing Unit and running DeepMind's Gemma 4 — has completed its commissioning phase and begun active operations in orbit, marking the first time an AI model has run inference workloads on a space-based data center."
category: ai
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2026-10-30T17:02:24.161Z"
coverImage: "https://upload.wikimedia.org/wikipedia/commons/3/32/Googleplex_HQ_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
coverCredit: "via Wikipedia (Google)"
coverCreditUrl: "https://en.wikipedia.org/wiki/Google"
tags: ["google", "suncatcher", "space computing", "tpu", "gemma", "satellite"]
primaryEntity: "Google"
readTime: 3
featured: true
hasDisclaimer: true
sourceUrls: ["https://techcrunch.com/2026/10/30/googles-first-data-center-satellite-is-online-and-writing-poetry", "https://thehill.com/policy/technology/6182701-musk-starlink-ukraine-controversy-global-influence", "https://techcrunch.com/2026/10/30/doordash-said-its-only-received-several-hundred-orders-from-ai-agents"]
---

Google's Suncatcher program has reached its first operational milestone: a prototype satellite carrying a Tensor Processing Unit is active in orbit, communicating with the ground, and running inference workloads — beginning with a haiku.

The spacecraft, [first reported by TechCrunch](https://techcrunch.com/2026/10/30/googles-first-data-center-satellite-is-online-and-writing-poetry), launched earlier this month aboard a SpaceX Falcon 9 rocket alongside more than 100 other spacecraft. After roughly three weeks of commissioning during which engineers tested the satellite's subsystems, the craft was declared ready for active use.

Engineers sent their first prompt this week, asking the pre-loaded model — Google DeepMind's Gemma 4 — to write a haiku about being in space. The satellite responded: "Blue marble below / Data streams in silent grace / Starlight feeds my core."

A Google spokesperson told TechCrunch that the satellite is operating nominally.

The spacecraft carries a single TPU and generates up to 1 kilowatt of electricity. That power ceiling limits the TPU to operating windows of approximately twenty minutes at a time, a constraint that complicates space-to-ground communications and will shape the design of future satellites in the program.

The ongoing test campaign will assess how the chip performs under thermal stress and in the radiation environment of orbit. Radiation can cause "bit flips" — altering stored values in computer memory in ways that corrupt data without triggering standard monitoring tools. Ground-based testing in particle accelerators suggested radiation would have a minimal effect on inference workloads while posing greater risk during model training, but the Suncatcher team will now evaluate those dynamics in actual orbital conditions rather than simulations.

If the onboard TPU performs to expectations, Google plans to launch two additional satellites carrying advanced chips in 2027. Those spacecraft will support higher power generation and demonstrate inter-satellite optical links — a capability that sets the Suncatcher program apart from most competing visions for space-based computing.

Google's Starcloud project is designed around high-speed links between satellites to support coherent distributed workloads. SpaceX's planned orbital data centers are also expected to use laser links, but those satellites are anticipated to orbit too far apart to share processing effectively. Other companies, including Starcloud and Cowboy Space, are focused on running inference workloads on individual satellites rather than coordinated clusters.

The Google and SpaceX efforts are intertwined in other ways. Alphabet, Google's parent company, holds a significant investment stake in SpaceX. Both programs will also ultimately depend on Starship, SpaceX's heavy-lift rocket, becoming fully and rapidly reusable. A peer-reviewed analysis published earlier this month by Suncatcher researchers estimated that SpaceX would need to fly Starship 1,800 times to achieve the same learning-driven cost reductions the company realized with its earlier vehicles.

Suncatcher's long horizon — the program is explicitly designed to build infrastructure that will be economical in the 2030s — comes against a complicated near-term backdrop for Alphabet. The company's stock fell this week after earnings showed that efforts to integrate AI into its search products are weighing on advertising revenue growth, underscoring the tension between long-range infrastructure bets and short-term business pressures.

How Alphabet navigates that tension in the coming quarters may determine the pace and scale of investment that Suncatcher can sustain as it works toward a future constellation performing large inference workloads entirely in orbit.

[Disclaimer](/disclaimer)
