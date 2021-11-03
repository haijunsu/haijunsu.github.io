---
title: Event-driven Architecture
author: Haijun (Navy) Su
layout: post
tags: [event-driven, event]
---

Source: <https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven>

An event-driven architecture consists of **event producers** that generate a stream of events, and **event consummers** that listen from the events.
Events are delivered in near real time, so consumers can respond immediately to events as they occur. Producers are decoupled from consumers and consumers are also decoupled from each other, and every consumer sees all of the events.

An event driven architecture can use a **pub/sub** model or an event stream model.

![event-driven architecture](/images/event-driven.svg)

#### When to use this architecture
* Multiple subsystems must process the same events.
* Real-time processing with minimum time lag.
* Complex event processing, such as pattern matching or aggregation over time windows.
* High volume and high velocity of data, such as IoT.

#### Benefits
* Producers and consumers are decoupled
* No point-to point-integrations. It's easy to add new consumers to the system.
* Consumers can respond to events immediately as they arrive.
* Highly scalable and distributed.
* Subsystems have independent views of the event stream.

#### Challenges
* Guaranteed delivery. In some systems, especially in IoT scenarios, it's crucial to guarantee that events are delivered.
* Processing events in order or exactly once. Each consumer type typically runs in multiple instances, for resiliency and scalability. This can create a challenge if the envents must be proccessed in order (within a consumer type), or if the processing logic is not idempotent.


