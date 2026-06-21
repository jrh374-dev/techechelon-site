---
title: "Executive Q&A: Insights and Strategies from GitGuardian's Eric Fourrier on Securing Codebases"
slug: executive-q-a-insights-and-strategies-from-gitguardian-s-eric-fourrier-on-securing-codebases
excerpt: "Eric Fourrier, the innovative mind behind GitGuardian, is at the forefront of tackling one of the most pressing issues in software development today: secrets management."
category: security
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2024-06-14T19:35:14.916Z"
coverImage: "https://static.wixstatic.com/media/e37254_3e13f25b62d04fe6aeb7c19fc4c544cc~mv2.png"
readTime: 11
migratedFromWix: true
---

Eric Fourrier, the innovative mind behind [GitGuardian](https://www.gitguardian.com/?utm_feeditemid=&utm_device=c&utm_term=gitguardian&utm_source=google&utm_medium=ppc&utm_campaign=&hsa_cam=10399074694&hsa_grp=102099926583&hsa_mt=e&hsa_src=g&hsa_ad=470110472087&hsa_acc=5867098142&hsa_net=adwords&hsa_kw=gitguardian&hsa_tgt=kwd-918952832307&hsa_ver=3&utm_adgroupid=102099926583&utm_source=google&utm_medium=cpc&utm_campaign=10399074694&utm_term=gitguardian&hsa_acc=5867098142&hsa_cam=10399074694&hsa_grp=102099926583&hsa_ad=470110472087&hsa_src=g&hsa_tgt=kwd-918952832307&hsa_kw=gitguardian&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw1K-zBhBIEiwAWeCOF-7qPIXaG-nKnT4Nb06vXxVw9lD5O15fPW29AnHzs_jVLEv43q4MBBoCbpEQAvD_BwE), is at the forefront of tackling one of the most pressing issues in software development today: secrets management. As the CEO and Founder of GitGuardian, Eric has dedicated his career to addressing the rampant problem of sensitive data leaks on platforms like GitHub. His work is pivotal in the field of cybersecurity, where he combines a deep understanding of data science with cutting-edge technology to mitigate the risks associated with secrets sprawl.

GitGuardian's latest report, the [2024 State of Secrets Sprawl](https://www.gitguardian.com/state-of-secrets-sprawl-report-2024), sheds light on the alarming increase in leaked secrets and the growing complexity of managing these risks. Eric's insights into this phenomenon, coupled with GitGuardian's advanced detection and remediation strategies, provide valuable guidance for organizations striving to secure their codebases and protect sensitive information.

![Photo](https://static.wixstatic.com/media/e37254_890afd001217429694f49f45853e88d8~mv2.jpeg)

In this exclusive Q&A, Eric discusses the findings of the 2024 report, the unique challenges different industries face, and the evolving role of AI in enhancing secrets detection. His expertise offers a comprehensive look at the current state of secrets management and the proactive measures necessary to safeguard against potential threats.

**Q: The 2024 State of Secrets Sprawl 2024 report by GitGuardian indicates a significant increase in leaked secrets on GitHub. What factors do you believe are driving this increase, and how does it correlate with the growth of new code repositories?**

Our numbers tracked closely with Github's overall growth. Their "State of the Octoverse" report in November 2023 claimed they had a 27% increase in the number of repositories while we saw a 28% increase in leaked secrets. Given how similar those percentages are, one could jump to the conclusion that there's a direct 1:1 correlation.

The reality is more nuanced. While the creation of new repositories implies new code commits, the leaks we tracked came from just 4.6% of active repositories. So although GitHub's expansion contributes to the leak rates, it's not the sole driving factor.

Using good secrets management practices requires knowing you're doing something improperly, getting training in doing it properly, and then being intentional about practicing it to build new habits. Building that awareness and then getting people to do something about it is the challenge.

Laws, industry frameworks, and regulations that require better secrets management practices are going into effect in the next year or two, so the 2025 and 2026 reports should be interesting to see what effect they've had.

**Q: Your study highlights that the IT sector experiences the most leaks, but other sectors are also affected. Can you elaborate on the challenges and risks specific industries face due to secrets sprawl?**

Indeed, the IT sector isn't alone. Take the automotive industry, for instance. With the rise of software-defined vehicles, consumer safety has become paramount. Vehicles today heavily rely on software applications, like in-vehicle infotainment systems, which store sensitive data and pose a broad attack surface when compromised.

Moreover, a significant portion of automotive software comprises open-source components, and vulnerabilities in one part can affect multiple car models across different manufacturers. So, scrutinizing every link in the supply chain is crucial to mitigate risks.

Also, the interconnected nature of modern vehicles and over-the-air updates create potential entry points for attackers. This elevates the risk of ransomware attacks and undermines the integrity of automotive applications in a way.

Another example is the finance industry, which also grapples with the threat of hardcoded credentials within its source code. These credentials, if exposed, can lead to severe consequences, including data breaches and financial losses. Modern applications are very interconnected in nature and the prevalence of third-party SDKs amplifies the risk even more, as seen in instances where sensitive data leaks from banking apps due to hardcoded credentials.

Every industry has its own unique risks. Leveraging platforms like GitGuardian can help mitigate these risks, ensure overall application security, and maintain customer trust.

**Q: You've introduced the concept of "zombie leaks." Could you explain the potential dangers these pose to organizations and why simply deleting leaky commits or repositories isn't sufficient?**

Secrets leaks are a known problem to both defenders and attackers, and both are actively scanning GitHub and other major players for leaked secrets. If the secret has been live in your repository–even if just in the commit history–for any amount of time, a bot has very likely found it. When we've tested publishing decoy tokens to a public repository, the time to exploit could be measured in seconds.

Hoping that an unfriendly bot or person didn't find that secret before you removed it is wishful thinking. There are no respected frameworks that recommend wishful thinking as a security strategy.If a secret leaks, it must be treated as compromised. The recommended best practice for a leaked secret is to revoke it and issue a new one.

**Q: How has GitGuardian's approach to secrets detection evolved with advancements in AI, and what role do you see AI playing in future developments?**

Although GitGuardian is not an AI company per se, we are definitely a data science-driven one. Our entire detection engine for identifying leaked secrets was built using a rigorous data science approach. It's what we call an 'expert system.'

Expanding this system with machine learning techniques allows us to achieve [remarkable results](https://blog.gitguardian.com/good-samaritan-confidence-scorer-ai/) on the hardest problems in our domain. This combination helps us not only identify potential matches but also sort and refine the data effectively.

We understand that false positives waste time, erode trust, and lead to alert fatigue. So the key question is: 'This looks like a secret, but is it really one?' We leverage AI in all its forms - traditional techniques, deep learning, large language models - to tackle this challenge, and we plan to continue doing so. The mix of expert systems and AI allows us to precisely determine whether a piece of data is indeed a legitimate secret leak that requires action. It's a crucial capability that sets our platform apart.

**Q: The report mentions that a high percentage of secrets remain valid for days after a leak is detected. What steps can organizations take to improve their response times and remediation processes?**

Some of it comes from wishful thinking as a security strategy. They hope that no one but us spotted it, and if they hide it properly, they'll be fine. The rest often comes from not having strategies in place to handle a secret leak.

Every good cybersecurity policy needs playbooks that detail the steps to take to investigate and remediate a security issue. The process to revoke a leaked secret, reissue the new one, and put the new one into production needs more than an abstract outline but clear and detailed steps that are tailored to how you revoke, reissue, and replace that specific type of secret in _your_ infrastructure and systems. GitGuardian works along with this by creating workflows that help align your AppSec and Dev teams when you're remediating a leaked secret. Security responders and developers need to work together to secure how the code sources the secret before revoking it and reissuing it.

**Q: Your report extends the discussion to PyPI and other platforms. What trends are you observing in these areas, and what implications do they have for developers and security teams?**

Like other software assets, it's not surprising to see secret leaks occur in open source packages. In 2023, we found 11,000 unique secrets in PyPI packages, a 38% increase since 2020. The problem is that this has serious implications for trust in your software supply chain. If a package contains a secret, can it truly be trusted? Probably not, because in some cases it could mean the maintainer's account was compromised by a malicious actor, posing very concerning risks.

While a secret exposed in a third-party package isn't a direct risk for the user, it's definitely a red flag that should be brought to security teams' and developers' attention. Have other leaks by that developer created opportunities for an attacker to inject malicious code into the package? This is especially worrisome considering we discovered 97 secrets dating back to 2017 that were still valid in late 2023, giving ample time for a compromise.

Attacks on packages/managers and errors within them have made software supply chain security an increasing concern. For example, President Biden's Executive Order 14028 on improving U.S. cybersecurity mandates that the provenance of every third-party component [must be detailed in a software bill of materials (SBOM)](https://blog.gitguardian.com/why-you-need-an-sbom-software-bill-of-materials/) if you want to sell software or dev services to federal agencies.

Both open source and proprietary code face secret leak risks that undermine supply chain integrity. Identifying and remediating them is crucial for maintaining trust and security.

**Q: Given the ongoing challenges with secrets management, what initiatives or programs does GitGuardian recommend or provide to enhance the awareness and skills of developers and IT professionals?**

Security relies on people as much as or more than tools. I'd suggest taking our [5-minute quiz](https://www.gitguardian.com/secrets-management-maturity-questionnaire) to find out where your company's policies and practices are in relation to our Secrets Maturity Model.

Once your further needs are identified, you can contact us to organize an informal “lunch and learn” for your development teams. These session are highly effective in raising awareness and addressing the elephant in the room that has become secrets management today. This is essential to foster a shared understanding of security issues without creating overwhelming pressure.

After that, it's a matter of identifying ways and opportunities to train your people and grow the culture of security within your company. Even with the best tools, you cannot ignore training and culture.

**Q: How should companies adjust their security policies or compliance measures in light of the findings from the latest secrets sprawl report?**

In an ideal world, every developer would use a secret scanner on their local machine, typically in the form of a pre-commit hook, to catch and block secrets before they ever make it into the codebase. However, in reality, companies have limited means to enforce this practice and ensure it is not circumvented. This is ultimately for the better, as the most effective security policies are those that provide the best user experience.

This is why it's essential for organizations to provide flexibility in where and how security integrates into the software development lifecycle. Developers should have the option to catch secrets at multiple points, whether on their local machine, in source control management, or even in the CI/CD pipeline. Equally important is training developers on the proper remediation steps when a caught secret blocks a commit, rather than leaving them to devise workarounds that could undermine security.But this isn't just something they need to do in light of our report. It's becoming part of important security standards. PCI DSS 4.0, requirement 8.6.2 [requires not putting secrets in your source code](https://blog.gitguardian.com/how-git-guardian-helps-with-pci-dss-4-0s-password-requirements/). It's only a best practice right now, but will be mandatory in 2025. And the best way to help those subject to PCI DSS 4.0's requirements is to use clever security gates and automations.

**Q: The use of DMCA takedowns has increased as a method to manage leaky repositories. What are the pros and cons of this approach, and how effective is it in the long term?**

In 2023, we noticed that more than 12% of the repositories taken down by GitHub under a DMCA notice were actually leaking sensitive information. The proportion was roughly the same in 2022, and it was 9% in 2021. What we're trying to explain in the report is that using legal measures like DMCA notices to protect your sensitive data is a terrible idea. You're not mitigating the risk of a hacker exploiting the exposed secret; you're just giving out evidence that something problematic happened and making the work of incident response teams more complicated.

This is why we tried to grab attention around the problem posed by "zombie leaks," which are secrets that appear to be gone because they were deleted, but they're actually still valid and, therefore, still a threat.

Here's a key thing to understand about leaked secrets compared to other code vulnerabilities: an exposed credential doesn't stop being a threat until it has been revoked.

In the case of secrets exposed on GitHub, we know that everything that happens there is monitored by malicious actors in real-time, and they put even more energy into tracking down these juicy bits of information.

The bottom line is that a DMCA takedown or making your leaky repository private will never be a replacement for proper secret management. It's just using wishful thinking as a security strategy, which is never a good idea.

**Q: Looking forward, what new challenges do you anticipate organizations will face regarding secrets management, and how is GitGuardian preparing to address these challenges?**

Technology is evolving. Ten years ago, Docker was a year old, and Kubernetes hadn't yet been released. Now, they're major technologies in creating architectures and domains into which secrets can sprawl. The challenges are the new forms secrets can take, and the new places secrets can find their way into.

Working with our own researchers, our customers, and our advisors, we're keeping track of both the evolution of secrets formats to keep our detection models up to date and the evolution of coding and delivery technologies so we can keep our tools looking in the right places for them. We are also focusing on remediation. Leaked secrets can’t be overlooked, and efficient remediation capabilities are what make the difference in improving companies’ security posture.
