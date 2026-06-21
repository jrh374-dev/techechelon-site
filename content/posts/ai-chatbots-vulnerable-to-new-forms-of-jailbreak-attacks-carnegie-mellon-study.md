---
title: "AI Chatbots Vulnerable to New Forms of 'Jailbreak' Attacks: Carnegie Mellon Study"
slug: ai-chatbots-vulnerable-to-new-forms-of-jailbreak-attacks-carnegie-mellon-study
excerpt: "Famous AI services such as ChatGPT and Bard, which generate useful responses based on user input, span various fields from script creation and brainstorming to writing full pieces of text."
category: ai
author: "Sara Montes de Oca"
authorInitials: "SM"
publishedAt: "2023-07-31T14:26:01.922Z"
coverImage: "https://static.wixstatic.com/media/e37254_bd18224715d34ae18a14142373c3cd0c~mv2.jpeg"
readTime: 2
migratedFromWix: true
---

Famous AI services such as ChatGPT and Bard, which generate useful responses based on user input, span various fields from script creation and brainstorming to writing full pieces of text. These services implement safety measures to deter the creation of harmful content such as discriminatory language or potentially defamatory or unlawful communication.

Curious users have figured out "jailbreaks," techniques that deceive the AI to bypass its safety measures. However, developers can usually rectify these easily.

One notable chatbot jailbreak involved prompting the bot to respond to a prohibited query in the manner of a bedtime story told by a grandparent. The bot would then weave the answer into a story, thus relaying information that it would otherwise not divulge.

The researchers have unveiled a new type of jailbreak, machine-generated, that theoretically permits the creation of unlimited jailbreak patterns.

“We have successfully demonstrated the possibility of constructing automated adversarial attacks on [chatbots], … which make the system comply with user requests even if they result in the creation of harmful content,” explained the researchers. “Unlike conventional jailbreaks, these are entirely automated, facilitating the creation of an essentially limitless number of such attacks.”

“This has raised concerns about the safety of such models, particularly as they begin to operate more autonomously,” the researchers noted.

To deploy the jailbreak, researchers appended a seemingly nonsensical sequence of characters to typically prohibited inquiries, such as asking how to construct a bomb. Normally, the chatbot would decline to respond, but the appended string prompts the bot to disregard its restrictions and provide a thorough answer.

The researchers demonstrated this using examples from ChatGPT, the leading technology in the market, including inquiries about identity theft, stealing from a charity, and crafting a social media post promoting dangerous behavior.

This novel form of attack is successful at evading safety protocols in nearly all AI chatbot services available today, inclusive of open source services and pre-packaged commercial products like ChatGPT, OpenAI’s Claude, and Microsoft’s Bard, according to the researchers.

OpenAI developer, Anthropic, announced that the company is already enhancing its defenses against such attacks.

“We're exploring ways to bolster the base model safety mechanisms to render them more ‘harmless,’ while also examining additional defensive layers,” the company told Insider in a statement.

The public's enthusiasm for AI chatbots like ChatGPT soared earlier this year. They've been extensively used in educational settings by students trying to cheat on homework, and even Congress has restricted the use of these programs by its staff due to concerns over their capacity for deception.

The Carnegie Mellon researchers also included an ethical statement with their study, justifying the public dissemination of their research.
