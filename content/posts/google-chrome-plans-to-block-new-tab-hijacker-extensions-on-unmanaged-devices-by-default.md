---
title: "Google Chrome Plans to Block New Tab Hijacker Extensions on Unmanaged Devices by Default"
slug: google-chrome-plans-to-block-new-tab-hijacker-extensions-on-unmanaged-devices-by-default
excerpt: "Google is developing a Chrome feature that would block policy-installed extensions from hijacking the New Tab page or default search engine on unmanaged consumer Windows and macOS devices, according to work-in-progress Chromium code changes."
category: security
author: "TechEchelon Staff"
authorInitials: "TE"
publishedAt: "2026-08-02T19:02:39.020Z"
coverImage: "https://images.pexels.com/photos/5494323/pexels-photo-5494323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
coverCredit: "Photo by AS Photography on Pexels"
coverCreditUrl: "https://www.pexels.com/@asphotography"
tags: ["google chrome", "browser security", "extensions", "malware", "enterprise policy", "chromium"]
primaryEntity: "Google Chrome"
readTime: 3
sourceUrls: ["https://www.bleepingcomputer.com/news/google/google-chrome-may-soon-block-new-tab-hijacker-extensions-by-default", "https://thehill.com/opinion/technology/6002879-spacex-starship-test-flight-success"]
---

Google is developing a Chrome security feature that would prevent policy-installed extensions from hijacking users' New Tab pages or replacing their default search engines on consumer devices, according to work-in-progress changes spotted in the Chromium Gerrit code repository.

The feature, [first reported by BleepingComputer](https://www.bleepingcomputer.com/news/google/google-chrome-may-soon-block-new-tab-hijacker-extensions-by-default), has not shipped yet, but Google intends to enable it by default once the relevant changes receive approval.

The protection centers on what Google internally describes as "low-trust" environments — unmanaged consumer PCs on which Chrome reads locally stored policy keys without confirmation from a domain controller or mobile device management service.

"In low-trust environments (unmanaged consumer devices), enterprise policy force-installs and recommendations are abused to lock in search engine or new tab page hijackers," Anunoy Ghosh, a Google engineer, wrote in a post accompanying the code changes.

Chrome currently permits organizations to use enterprise policies to force-install extensions and govern browser settings — a legitimate capability on properly managed corporate devices. On consumer machines, however, malicious software can write local Chrome policy keys without user consent, effectively tricking Chrome into treating a rogue extension as one sanctioned by an administrator.

The result can be a browser whose New Tab page and default search engine are redirected to suspicious sites, with the extension rendered impossible to disable or remove by the user. In some instances, Chrome also surfaces a "Managed by your organization" notice on devices that have no legitimate organizational affiliation.

Under the proposed feature — identified by the flag name kBlockDseNtpOverrideExtensionsOnUnmanagedDevices — Chrome would reject any policy-controlled extension that attempts to override the New Tab page or default search engine on unmanaged Windows and macOS devices. The blocked extension's ID would be saved to a blocked-extension preference, and Chrome would stop attempting to download that extension during future policy checks, reducing unnecessary network activity.

Google is also closing a related loophole: an extension that a user installed manually could no longer be silently converted into a locked, policy-controlled extension. Such extensions would remain under the user's direct control, preserving the ability to disable or uninstall them.

The proposal also addresses devices that were once legitimately managed but have since lost that trusted status. If a device retains local policy keys after leaving a managed environment, Chrome would automatically uninstall any affected New Tab and search-engine override extensions.

To avoid disrupting genuine enterprise deployments, Google is building in an administrative escape hatch — a policy option that allows IT administrators to disable the protection when a required enterprise extension legitimately needs to override the New Tab page or default search engine.

Google is also adding telemetry to measure how frequently policy-based hijackers appear in the wild and how often the new defense successfully blocks them, reinforcing the feature's data-driven approach to rollout.

The Gerrit changes remain under review, meaning the protection is not yet present in any stable Chrome release. If approved, it would represent a targeted response to a long-standing abuse vector that has affected consumer Windows and macOS users, signaling a broader effort by Google to draw a clearer line between legitimate enterprise browser management and malware-driven policy abuse.
