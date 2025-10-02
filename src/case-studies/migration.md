---
layout: case-study.njk
title: Difficult migration
summary: Orchestrated a zero-downtime big-bang Kafka migration across 40+ teams that even the cloud provider adopted as their playbook. 
---

## Context

![Context](/assets/context.svg){.icon-right}

A company’s self-hosted Kafka carried everything: orders, payments, riders, restaurants. It had been a quick escape from a failing inhouse tool, but was fragile, complex, and under-supported. A major incident exposed how thin operational knowledge had become. 

Migration to managed services was inevitable, but downtime wasn’t an option. No hot migration of this scale had ever been attempted, not even by the cloud provider. Mike had stepped into quite a challenge.

---

## Approach

![Approach](/assets/approach.svg){.icon-right}

This began by working with the owning team, framing the migration as evolution not loss and stepping into the role they needed Mike to play for success. Their path became a plan tested for scale, pairing technical orchestration with organisational readiness, and told as a story leadership could back.

Mike set out to win full commitment across the 1,800-strong organisation. Success depended on every discipline — product, data science, operations, and engineering — aligning behind a single stop-the-line release.

Everything you’ve ever read tells you to avoid doing migrations this way, *if you can*. **We couldn’t.**

---

## Delivery

![Delivery](/assets/delivery.svg){.icon-right}

Gradual cutover proved extremely challenging; only a big-bang migration would work. The team spent four months hardening the approach, test harnesses, repeated dry runs, AWS engineers ride-along. The engineers focused on the technical challenge; Mike supported this work but focused on ensuring the entire tech org was ready to move when the team was.


The leadership team was deeply technical and constantly probing for unseen shortcuts.  Gantt chants and slide decks were not going to cut it. To shield the engineers, Mike built deep technical understanding. He used it to give leadership confidence in the detail, while also listening for unaddressed concerns and making sure the team heard what mattered. This pattern of demonstrably distilling data flow in both directions is a repeating pattern in our work, and part of why we're different. 

By the time the switch came, the organisation wasn’t just aware — it was already moving in step with the team. The migration landed cleanly because the ground had been prepared for it.

---

## Outcome

![Outcome](/assets/outcome.svg){.icon-right}

*For customers and partners, the transition was invisible — orders, payments, and deliveries flowed without interruption, protecting trust and leadership credibility. At the same time, an entire class of incident, risk, and complexity was removed forever.*

Over 3 days 40+ teams migrated in 30-minute slots without disruption,  30k messages per second sustained throughout the changes, peaking 10–20× higher. Retiring self-hosted Kafka delivered material cost savings and simplified operations. The cloud provider later turned this into their playbook for future migrations.
