---
layout: case-study.njk
title: Difficult migration
summary: Orchestrated a zero-downtime big-bang Kafka migration across 40+ teams that even the cloud provider adopted as their playbook. 
---

## Context

![Context](/assets/context.svg){.icon-right}

A company’s self-hosted Kafka carried everything: orders, payments, riders, restaurants. It had been a quick escape from a failing bespoke bus, but was fragile, complex, and under-supported. A major incident exposed how thin operational knowledge had become. 

Migration to managed services was inevitable, but downtime wasn’t an option — and no migration of this scale had ever been attempted, not even by the cloud provider. Mike had stepped into quite a challenge.

---

## Approach

![Approach](/assets/approach.svg){.icon-right}

This began by working with the owning team, framing the migration as evolution not loss and stepping into the role they needed me to play for success. Their path became a Plan — scale-tested, technical orchestration paired with organisational readiness, told as a story leadership could back.

I set out to win full commitment across the 1,800-strong organisation. Success depended on every discipline — product, data science, operations, and engineering — aligning behind a single stop-the-line release.

Everything you’ve ever read tells you to avoid doing migrations this way, *if you can*. **We couldn’t.**

---

## Delivery

![Delivery](/assets/delivery.svg){.icon-right}

Gradual cutover proved extremely challenging; only a big-bang migration would work. We spent four months hardening the approach — test harnesses, repeated dry runs, AWS engineers ride-along. The engineers focused on the technical challenge; my role was to ensure the entire tech org was ready to move when they were.

That meant more than progress reporting. The leadership team was deeply technical and constantly probing for unseen shortcuts. To protect the engineers, I had to live the plan in enough detail to field those challenges myself — firm on why shortcuts wouldn’t hold, but alert to the rare signal worth acting on. That tough audience sharpened me, and in turn helped me land the asks across the org with greater clarity and conviction.

By the time the switch came, the organisation wasn’t just aware — it was already moving in step with the team. The migration landed cleanly because the ground had been prepared for it.

---

## Outcome

![Delivery](/assets/outcome.svg){.icon-right}

*For customers and partners, the transition was invisible — orders, payments, and deliveries flowed without interruption, protecting trust and leadership credibility. At the same time, an entire class of incident, risk, and complexity was removed forever.*

Over 3 days 40+ teams migrated in 30-minute slots without disruption,  30k messages per second sustained throughout the changes, peaking 10–20× higher. Retiring self-hosted Kafka cut costs and simplified operations — and the cloud provider later adopted it as the playbook
