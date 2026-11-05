---
title: "DigiCert Data Breach Exposes Customer PII and Identity Documents After Server Migration Error"
slug: digicert-data-breach-exposes-customer-pii-and-identity-documents-after-server-migration-error
excerpt: "DigiCert has disclosed a data breach stemming from a February 2025 server migration error that left an internal system publicly accessible, exposing customer contact details and, in some cases, passports, driver's licenses, and other identity documents."
category: security
author: "Jay Goldberg"
authorInitials: "JG"
publishedAt: "2026-11-05T17:02:22.569Z"
coverImage: "https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by panumas nikhomkhai on Pexels"
coverCreditUrl: "https://www.pexels.com/@cookiecutter"
tags: ["digicert", "data breach", "certificate authority", "pii", "cybersecurity", "identity documents"]
primaryEntity: "DigiCert"
readTime: 2
sourceUrls: ["https://www.darkreading.com/cybersecurity-operations/securitydatapipeline-com-launches-as-a-new-educational-resource-for-the-ai-era", "https://www.bleepingcomputer.com/news/security/hackers-backdoor-linux-servers-using-trojanized-cwp-web-server", "https://www.bleepingcomputer.com/news/security/digicert-data-breach-exposes-customer-information-identity-documents"]
---

DigiCert, one of the internet's largest certificate authorities, has disclosed a data breach in which a misconfigured server migration exposed customer names, contact details, and personal identity documents to unauthorized external access.

The breach originated from a February 2025 server migration that inadvertently made an internal business system — previously accessible only through a VPN — reachable from the public internet, according to an incident report filed on Mozilla's Bugzilla platform.

The exposed system included a self-registration feature originally intended for internal applications. An authorization flaw allowed externally created accounts to access archived customer data in read-only mode, even though those accounts were not assigned to any specific application.

DigiCert first detected unauthorized accounts on the exposed system in June 2026, but initially concluded they posed no data-access risk. The company later received an external report through its managed security research program alerting it that those accounts could, in fact, read archived customer records.

Security fixes were deployed to restrict access and close the authorization gap, but DigiCert did not confirm at that point that any data had actually been viewed. It was not until October 19 that an investigation established that an unauthorized account had accessed customer information during a window between June 27 and July 2, 2026.

"The incident was initially handled as an account-creation issue rather than a data-access event," DigiCert acknowledged in its incident report.

The company has begun sending breach notification letters to affected customers. The exposed information was limited to names, business email addresses, phone numbers, and business addresses. For a subset of customers, records also included personal identification documents — driver's licenses, passports, utility bills, or other documents bearing a name and address.

Cloud architect Fabian Bader shared a copy of the notification on X, writing: "Thanks @digicert that your data leak was 'limited' to only my full PII data and potentially any verification documents I submitted for my certificate."

DigiCert says it is still reviewing which customers had identification documents exposed and will notify those individuals separately once that review is complete.

The company said the unauthorized account carried read-only permissions and could not alter records, approve certificate validations, or issue certificates. DigiCert's core certificate authority infrastructure, its CertCentral platform, and DigiCert ONE were not affected, and customer login credentials and previously issued certificates remain secure, the company said.

In response to the incident, DigiCert has restricted access to the affected system, disabled the self-registration feature, and implemented additional access controls.

The breach underscores a recurring risk in cloud and infrastructure migration projects, where temporary or misconfigured network exposure can quietly persist for months before discovery. With identity documents — not just email addresses — among the exposed records, affected customers face an elevated risk of identity fraud that extends well beyond typical credential-based threats. DigiCert has not disclosed the total number of individuals affected.
