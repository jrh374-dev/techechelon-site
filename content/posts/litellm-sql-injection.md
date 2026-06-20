---
title: "Critical SQL injection in LiteLLM puts enterprise AI gateways at remote-takeover risk"
slug: litellm-sql-injection
excerpt: "Patched versions are out, but adoption across cloud-hosted deployments is uneven. CISA expected to issue guidance this week."
category: security
subcategory: Vulnerabilities
author: Sara Montes de Oca
authorInitials: SM
publishedAt: 2026-05-01T19:00:00Z
coverImage: https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80&auto=format&fit=crop
coverCredit: Photo · Reuters
tags: [litellm, security, ai, vulnerability]
primaryEntity: LiteLLM
readTime: 4
---

A critical SQL injection vulnerability in LiteLLM, the popular open-source AI gateway, allows authenticated attackers to execute arbitrary database queries and, in default configurations, achieve remote code execution. The flaw, tracked as CVE-2026-3471, was disclosed Wednesday by researchers at Trail of Bits.

The vulnerability sits in the proxy server's handling of user-supplied filter parameters in the `/spend/logs` endpoint. An attacker with valid API key access — including a limited-scope key intended for read-only audit log access — can craft requests that escape the parameterized query and execute arbitrary SQL against the underlying Postgres or MySQL backend.

## Why this matters more than the average CVE

LiteLLM has become the de facto AI gateway for enterprise deployments that want to abstract over multiple model providers. It sits in front of OpenAI, Anthropic, and Bedrock endpoints at hundreds of large organizations. The default deployment pattern grants the LiteLLM service privileged database access, which in compromised configurations means an attacker with a limited-scope API key can pivot to full data exfiltration.

Patched versions (1.74.3 and 1.73.8) are available. CISA is expected to issue a known-exploited-vulnerabilities directive by Friday.
