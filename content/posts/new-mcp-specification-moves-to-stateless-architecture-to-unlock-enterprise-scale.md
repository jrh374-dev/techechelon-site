---
title: "New MCP Specification Moves to Stateless Architecture to Unlock Enterprise Scale"
slug: new-mcp-specification-moves-to-stateless-architecture-to-unlock-enterprise-scale
excerpt: "The Model Context Protocol's largest update since its remote launch rewrites its core as a stateless architecture, targeting the scalability and reliability gaps that have kept enterprise adoption limited."
category: ai
author: "Marc Sabatini"
authorInitials: "MS"
publishedAt: "2026-07-30T17:16:03.225Z"
coverImage: "https://images.unsplash.com/photo-1755516931537-c1c9f03aabee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5Mzc2NzZ8MHwxfHNlYXJjaHwxfHxBbnRocm9waWMlMjBTYW4lMjBGcmFuY2lzY28lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8MHx8fDE3ODU0MzE3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
coverCredit: "Photo by Sam on Unsplash"
coverCreditUrl: "https://unsplash.com/@samtakespictures"
tags: ["model context protocol", "mcp", "anthropic", "enterprise ai", "open source", "ai infrastructure"]
primaryEntity: "Model Context Protocol"
readTime: 2
sourceUrls: ["https://arstechnica.com/ai/2026/07/with-a-stateless-makeover-new-mcp-spec-targets-enterprise-scale", "https://www.cnbc.com/2026/07/30/amazon-zoox-robotaxi-rides-las-vegas.html", "https://www.bleepingcomputer.com/news/security/after-the-break-in-what-attackers-do-once-theyre-already-inside"]
---

The Model Context Protocol received its most significant update since remote MCP launched more than a year ago, with a new specification that rewrites the protocol's core to be stateless — a change aimed at removing the scalability barriers that have limited its use in large enterprise deployments.

MCP is an open source standard that governs how AI systems interact with external tools and data sources. The update, [first reported by Ars Technica](https://arstechnica.com/ai/2026/07/with-a-stateless-makeover-new-mcp-spec-targets-enterprise-scale), was announced by lead maintainers David Soria Parra and Den Delimarsky, both of whom work at Anthropic.

At its core, the change transforms MCP from a bidirectional stateful protocol into a request/response stateless protocol, meaning requests are no longer tied to a session bound to a specific server instance.

"It was one of the most highly-requested features from developers who were eager to get better reliability and scalability for their MCP servers," Soria Parra and Delimarsky wrote in the announcement blog post.

Beyond the stateless core, the update introduces Multi Round-Trip Requests, header-based routing, cacheable list results, authorization hardening, a formal extensions framework, and updated Tier 1 SDKs.

The specification also includes a new deprecation policy, which guarantees at least 12 months between the formal deprecation of a feature and its actual removal. A narrow exception exists for critical security updates. The policy reflects the same enterprise-readiness theme running through the broader release — long deprecation windows give organizations time to plan migrations without being caught off guard by sudden changes.

MCP started as a local-machine tool, designed to connect AI models to applications running on the same device. The shift to a stateless architecture represents a fundamental rethink of some of those original foundations, signaling an intent to make the protocol suitable for large-scale, distributed deployments.

The protocol is now managed by the Agentic AI Foundation, which operates under the Linux Foundation. Anthropic originally introduced MCP just under two years ago and retains significant influence over its direction, with several principal maintainers currently employed there. Nonetheless, the project has drawn contributors from OpenAI, Google, Microsoft, and Amazon, and has expanded into developer tools and a growing range of software and services used for knowledge and creative work.

Governance formally rests with individual maintainers rather than with any of the contributing companies, though the concentration of key maintainers at Anthropic means the company continues to shape the protocol's trajectory in practice.

The release comes as MCP adoption has been expanding beyond its original developer audience and into broader enterprise toolchains, where reliability, predictability, and scalability are requirements rather than nice-to-haves. Whether the stateless redesign is sufficient to satisfy those requirements at the scale larger organizations demand will likely become clearer as the updated specification moves from documentation into production deployments.
