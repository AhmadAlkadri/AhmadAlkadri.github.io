---
title: 'Thin Slices: A Guiding Philosophy for Agentic Engineering'
date: 2026-08-12
layout: article
permalink: /posts/2026/08/thin-slices/
excerpt: 'Agents can generate implementation faster than humans can evaluate it. Thin slicing structures agentic work around small, verifiable units that bring human judgment back into the loop early. [View the Thin Slices repository](https://github.com/AhmadAlkadri/thin-slices).'
tags:
  - agentic engineering
  - workflow
  - AI
math: true
share: true
toc: true
---

<a class="thin-slices-repository" href="https://github.com/AhmadAlkadri/thin-slices">
  <span class="thin-slices-repository__icon fab fa-github" aria-hidden="true"></span>
  <span>View the Thin Slices repository</span>
</a>

There is an instruction I have found myself using over and over again with coding agents:

> **Implement this feature using the philosophy of thin slices.**

Sometimes I say **thin vertical slices**. Increasingly, I just say **thin slices**.

The important part is not the terminology. It is what happens to the work after you give the instruction.

Instead of asking the agent to imagine the complete system, write a specification for it, critique its own specification, revise it, implement the revised plan, and then keep following its own recommendations, I want it to do something much simpler:

**Make the smallest meaningful part of the thing real.**

Not a stub. Not an architectural placeholder. Not a pile of interfaces waiting to be connected later.

Something real enough that I can run it, look at it, use it, measure it, or otherwise decide what I think about it.

Then stop.

Because now I can give feedback.

That last part has become increasingly important to how I think about agentic engineering.

I don't think the right aspiration is to remove the human from the loop.

I think the right aspiration is to get the human to the **useful part of the loop as quickly as possible**.

## What is a thin slice?

Here is my current best attempt at a definition:

**Definition (Thin Slice).** Given a current state $X$ and a larger goal $G$, a **thin slice** is a bounded unit of work $S$ that:

1. establishes **one coherent end-to-end capability** or resolves **one specific uncertainty**;
2. includes only the scope necessary to make that result real and observable;
3. admits **evidence sufficient to decide what was learned or achieved**; and
4. leaves the system in a durable state from which the next decision can be made.

**Thinness refers to semantic scope, not implementation size.**

> **A thin slice tries to prove reality early, not design completeness.**

I like the $(X,G,S)$ notation because I am a mathematician and it makes me happy.

I should also immediately admit that this is mostly advertising.

This is not how I actually sit down and reason about slices. There is no optimization problem running in my head. There is no unique minimal $S^*$. There is no thin-slice norm.

The notation is just an attempt to put a boundary around an intuition.

A less mathematical version might be:

> **Build the smallest version that gets me to useful evidence and human feedback.**

That is much closer to how I actually think about it.

## You need *a* thin slice, not *the* thin slice

There is another consequence of there being no unique minimal $S^*$.

Fortunately, I don't think I need one.

**I do not need to find *the* thin slice. I need to find *a* thin slice that works.**

That distinction has become much more important to me in the age of generative AI.

Before anything exists, I am asking an agent to infer what I mean from a description. There may be an enormous space of plausible implementations, interfaces, abstractions, visualizations, numerical formulations, or even interpretations of the problem hidden inside that description.

Once one real version exists, the problem changes.

Now I can say:

> Make this more general.
>
> Make this simpler.
>
> Keep this behaviour, but change that one.
>
> Show me three alternatives.
>
> Apply the same idea to this other case.
>
> Make this less ugly.
>
> Vary the geometry.
>
> Preserve the numerical method.
>
> Try the same thing at a different scale.

The first working version becomes a reference point.

I am no longer trying to describe the entire destination perfectly in advance. I am navigating from something that exists.

And this is one of the properties of generative AI that I think thin slicing exploits particularly well.

The Google/Kaggle whitepaper describes AI compressing the development cycle unevenly: implementation that once took weeks can collapse to hours, iteration cycles can shrink from weeks to minutes, and an agentic environment can move from a description to a working prototype in minutes [1](#reference-1).

Once generating another implementation becomes that cheap, the value of establishing **one trustworthy instance** changes enormously.

Terence Tao describes a striking analogue in mathematics. In *Machine-Assisted Proof*, he imagines a future in which a PDE researcher might work an argument out fully for one equation and then let AI tools adapt that argument to large families of related equations, potentially studying hundreds of equations where papers today might treat one or two [4](#reference-4).

I love this example because it makes the point particularly clearly.

The magic is not that the machine somehow gives me hundreds of correct results for free.

It is that **one valid foothold can become the seed for an enormous space of cheap variations**.

Those variations still require judgment.

They may still require verification.

Some will be wrong.

Some will expose cases where the original idea does not generalize.

Some will reveal that what I thought was the interesting direction is not interesting at all.

Excellent.

That is still a radically different problem from trying to specify the perfect final object before I have seen the first one.

The first slice does not have to be optimal.

It has to be **real enough to generate the next question**.

## What does "vertical" mean?

The phrase I originally kept using was **thin vertical slices**.

"Vertical" is particularly helpful when the thing being built has architectural layers.

Imagine a feature that might eventually involve something like:

```text
API

Logic

Models

Infrastructure

Tests
```

One way to develop it is horizontally.

Build out the models. Build the infrastructure. Design the logic. Add APIs. Build a testing framework. Eventually connect everything together and discover whether the feature actually behaves the way you wanted.

A vertical slice goes the other direction.

It follows **one capability** through whichever layers are necessary to make that capability real:

{% capture one_capability_diagram %}
                         one thin slice
                              ↓
┌───────────────────┬─┬───────────────────┐
│        API        │█│                   │
├───────────────────┼─┼───────────────────┤
│       Logic       │█│                   │
├───────────────────┼─┼───────────────────┤
│      Models       │█│                   │
├───────────────────┼─┼───────────────────┤
│   Infrastructure  │█│                   │
├───────────────────┼─┼───────────────────┤
│       Tests       │█│                   │
└───────────────────┴─┴───────────────────┘
                              ↑
                     one real capability
{% endcapture %}
{% include technical-figure.html id="thin-vertical-slice" text=one_capability_diagram alt="A text-art diagram shows one thin slice crossing API, Logic, Models, Infrastructure, and Tests layers to make one real capability." caption="Representative layers only: a real slice crosses whatever layers are necessary." %}

Those layers are only an example.

A thin slice does **not** have to touch API, logic, models, infrastructure, and tests every time. That would turn the idea into a checklist, which is almost the opposite of the point.

It touches whatever is necessary to make one capability real and observable.

For a software feature, that might mean a tiny path through an API, some logic, and a test.

For a scientific-computing problem, it might mean one geometry, one discretization, one solver path, one benchmark, and one comparison against a known result.

For an investigation, it might mean no new feature at all. The slice might answer one question: why does this fixture fail? Do these two implementations agree? Does this approximation reproduce the asymptotic behaviour I expect?

So I still like **thin vertical slice** when the vertical picture is useful.

But the philosophy I have ended up using is broader.

Sometimes the slice cuts vertically through software layers.

Sometimes it cuts through an uncertainty.

Sometimes it cuts through a scientific question.

The invariant is that **one bounded thing becomes real enough to evaluate**.

## I did not invent vertical slicing

I should probably say something explicitly that may already be obvious to a software engineer:

**I did not invent vertical slicing.**

Really, that is how I ended up with the name in the first place.

The terminology belongs to an older engineering tradition of trying to deliver small pieces of real, end-to-end behaviour instead of completing technical layers in isolation.

In 2003, Bill Wake made the metaphor unusually literal while describing good user stories. Think of a system as a layered cake, he wrote: network, persistence, logic, presentation. If you split the work horizontally, you can complete an entire layer without giving the customer much of anything. His recommendation was to slice **vertically through the layers**, so that each piece contains some of the whole and remains valuable [6](#reference-6).

The surrounding Agile tradition points in much the same direction. The *Manifesto for Agile Software Development* values working software over comprehensive documentation, and its accompanying principles call for early and continuous delivery, frequent working software, and working software as the primary measure of progress [5](#reference-5).

There are even wonderfully literal exercises for teaching the idea.

Henrik Kniberg's guide to **Elephant Carpaccio**, an exercise he credits to Alistair Cockburn, describes its purpose as learning how to break stories into *really thin vertical slices* [7](#reference-7).

A neighbouring idea is Cockburn's **walking skeleton**: establish a tiny end-to-end implementation that connects the major architectural pieces, get the system walking, and then grow it incrementally from something that already works [8](#reference-8).

These ideas are not identical.

A walking skeleton is not my definition of a thin slice.

An Agile user story is not necessarily a scientific experiment.

Vertical Slice Architecture, in the more specific architectural sense, is not the workflow I am proposing here.

And I do not think there is a clean historical line in which one person invented a concept and everyone else inherited exactly the same thing.

What I see instead is a very persistent engineering instinct:

> **Get something small working end to end. Make it observable. Learn from it. Then grow from there.**

That instinct is old.

What interests me is what happens when you give it to an agent that can generate the next implementation almost immediately.

That is the part that feels different.

Generative AI changes the economics of an old engineering idea.

The cost of another attempt has collapsed.

The amount I can generate between two moments of human judgment has exploded.

And so a development style that already valued small working increments becomes, to me, an unusually natural way to control agentic work.

This also makes one slightly funny part of my own workflow less mysterious.

These days, I rarely paste the definition from the beginning of this article into a coding agent. I usually ask ChatGPT to write the Codex or Claude Code prompt for me, and at this point I can often tell it little more than:

> **Use thin slices.**

ChatGPT has accumulated enough context from our previous projects, and from repeatedly dogfooding the framework, that those few words now carry a lot of shared meaning.

That is not quite the same as claiming that a bare instruction will reconstruct the whole philosophy from scratch. At the beginning, though, I was giving similarly simple instructions before that shared context existed, and they often worked surprisingly well.

I cannot tell you whether any particular model was trained on any particular one of these sources, and I do not want to pretend that I know.

But **thin vertical slice is not private vocabulary I invented for my agents**.

It points at a dense and well-documented cluster of software-engineering ideas: small valuable increments, end-to-end behaviour, working software, testability, evolutionary design, short feedback loops.

A capable coding agent often seems to have something to latch onto.

My own use of the idea has simply become broader.

Sometimes I still mean a conventional vertical slice through a software stack.

Sometimes I mean one benchmark.

One geometry.

One solver path.

One discrepancy.

One scientific uncertainty.

That is why I gradually stopped insisting on the word **vertical**.

The engineering idea is the seed.

**Thin slices** is the broader philosophy I have ended up using around it.

## The human needs something to react to

This is the part I now think is essential.

There is a seductive idea in agentic engineering that if an agent is sufficiently capable, I should be able to give it enough autonomy to work out my intent for me.

Write the spec.

Critique the spec.

Improve the spec.

Implement the improved spec.

Review the implementation.

Address the review.

Continue until done.

I have tried workflows that look like this.

They can work remarkably well for a while.

But there is a fundamental problem:

**the agent does not magically acquire my intent by talking to itself for longer.**

If an early assumption is slightly wrong, the agent can reason coherently from that assumption.

Then it can critique the resulting plan using essentially the same understanding of the problem.

Then it can revise the plan.

Then it can produce more internally consistent work around the revision.

The whole process can become increasingly polished while moving further away from what I actually wanted.

The agent can, in effect, **agree itself into a wall**.

This is not an argument against agents planning, reviewing, testing, or criticizing their own work. I use all of those things.

It is an argument against confusing **self-consistency with alignment to human intent**.

At some point, I have to look.

My claim is that I should arrange the work so that this happens **very early**.

A thin slice gives me something to react to before too many downstream decisions depend on it.

That changes how I think about the target of a slice:

> **Find the smallest unit of work that gets the project back into a meaningful human-feedback loop.**

## The "80% problem"

There is some recent discussion in the agentic-engineering literature that points in the same direction.

In the Google/Kaggle whitepaper [*The New SDLC With Vibe Coding*](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) [1](#reference-1), Addy Osmani, Shubham Saboo, and Sokratis Kartakis describe what they call the **80% problem**. Osmani's accompanying discussion, [“The New Software Lifecycle”](https://addyosmani.com/blog/new-sdlc-vibe-coding/) [2](#reference-2), summarizes the broader point similarly: implementation is being compressed dramatically, while requirements, architecture, and verification remain dominated by judgment.

The paper puts the problem this way:

> **"AI agents can rapidly generate approximately 80% of the code for a feature…"**

The difficult remainder is concentrated in edge cases, integration points, error handling, and subtle correctness requirements where contextual understanding matters. Osmani describes the same ceiling as agents getting the first 80% quickly while the last 20% still needs context the models usually lack.

It helps to separate three claims that are easy to collapse into one another.

An agent may generate approximately 80% of the code for a feature.

That does **not** mean that the remaining 20% is merely cleanup. The remaining work can contain requirements, architecture, verification, integration, edge cases, and contextual decisions about what the system should actually do and what evidence should count as correctness. It may be a small fraction of the lines while determining most of whether the result is correct, useful, and aligned.

The first statement may be a useful description of implementation speed. The second is the interpretation I reject. The third is much closer to the problem that matters.

I also do not want to make too much of the number **80%**. The number is almost suspiciously satisfying because 80/20 immediately lights up familiar Pareto-pattern-recognition circuitry. That is a reason to be skeptical of it, not a reason to treat it as a law. I do not know whether the durable number is 70%, 80%, 90%, or something else entirely.

In one sense, 80% is good news. It suggests a world in which agents can absorb a very large fraction of implementation without making the human disappear. The remaining work is not merely an annoying cleanup tail. It includes deciding what we are actually building, what counts as correct, which tradeoffs matter, and what to do after seeing the result.

In another sense, the same number describes the problem. An agent can build a remarkable amount before the human discovers that the direction itself was wrong.

That matters because, for many interesting problems, **we do not completely know what we are going to build until we start building it**. An agent cannot recover a fully specified future from my intent when I do not possess that specification myself. Even if it could somehow read my mind perfectly, it would still find a person whose mind changes after seeing what exists.

I have a deliberately heuristic geometric picture in mind here. The important part is that the **future intent set is not known *a priori***. The orange path is only a hindsight ideal; in practice, we are discovering the target as we build.

{% capture implementation_space_caption %}
<strong>A geometric intuition for thin slicing.</strong> The project begins at $x_0 \in \mathcal{M}$, a point in a large implementation space containing many plausible trajectories. The blue path $\gamma(t)$ shows a thin-slice, human-corrected trajectory: repeated local observations and feedback keep the realised implementation in contact with evolving intent as tokens accumulate. The orange path $\gamma^*(t)$ is the <em>Platonic</em> or hindsight-ideal path: the trajectory one might have followed if the future intent set $\mathcal{I}$ were already fully visible from the start. The purple path illustrates a self-confirming “agree-yourself-into-a-wall” drift into an assumed-intent basin $\mathcal{A}$, where the system settles into a locally coherent but misaligned interpretation of what is wanted. The many faint background paths indicate that, before observation, there is a large space of possible implementations; thin slicing works by repeatedly conditioning that space on human judgment rather than allowing one long speculative commitment to run unchecked. The black recovery arc emphasises that late correction can be expensive: once a project has wandered deeply into the wrong region of implementation space, returning to the right neighbourhood may require traversing a long path in a non-Euclidean landscape. The figure is <em>intentionally metaphorical rather than formal</em>, but it captures the central intuition: thin slices keep agentic work close to intent by collapsing ambiguity early and often.
{% endcapture %}
{% include technical-figure.html id="thin-slices-implementation-space" src="/assets/diagrams/generated/thin-slices-implementation-space.png" ratio="1672 / 941" alt="Diagram of a large implementation space with many faint possible trajectories. A blue human-corrected thin-slice path stays near evolving intent, an orange hindsight-ideal path reaches a future intent set, and a purple self-confirming path drifts into an assumed-intent basin; a large recovery arc indicates the cost of late correction." caption=implementation_space_caption %}

I suspect something similar may be true in science. Agents may eventually automate enormous portions of the technical work while questions, interpretation, verification, and changes of direction remain dependent on scientific judgment. But that is a conjecture, not a law. Perhaps as systems become more capable, 80% moves toward 100%. I genuinely do not know.

So the literal percentage is not the point. The *shape* of the problem is what interests me.

Agents can generate implementation extraordinarily quickly.

Requirements, architecture, and verification remain much more dependent on context and human judgment.

That creates an uncomfortable possibility: a large agent-generated system can be internally coherent while still solving the wrong problem. Waiting until the end to expose that work to human judgment compounds the problem, because early assumptions have already propagated through interfaces, abstractions, tests, documentation, and integrations.

The asymmetry is therefore not simply that agents write most of the code and leave a cleanup tail behind. The work that remains depends on context, judgment, and timing.

The 80% problem suggests that the human should concentrate attention where context, ambiguity, correctness, and intent matter most. Thin slicing responds by injecting that contextual judgment before speculative implementation compounds.

It creates a real behaviour early enough for the human to decide whether the requirement is right, whether the architecture is holding, and whether the proposed verification measures the right thing.

Instead of:

{% capture speculative_path_diagram %}
spec
  ↓
larger spec
  ↓
implementation
  ↓
more implementation
  ↓
agent review
  ↓
agent revisions
  ↓
almost finished system
  ↓
human finally looks
{% endcapture %}
{% include technical-figure.html id="speculative-pipeline" text=speculative_path_diagram alt="A text-art sequence shows spec, larger spec, implementation, more implementation, agent review, agent revisions, an almost finished system, and a human finally looking." caption="A long speculative path delays the human feedback boundary." %}

I want something closer to:

{% capture human_feedback_diagram %}
intent
  ↓
thin slice
  ↓
evidence
  ↓
human looks
  ↓
updated intent
  ↓
next thin slice
{% endcapture %}
{% include technical-figure.html id="human-feedback-loop" text=human_feedback_diagram alt="A text-art sequence shows intent, a thin slice, evidence, human review, updated intent, and the next thin slice." caption="A thin slice brings human judgment back into the loop early." %}

This is where thin slicing enters. If human judgment still matters, I want to invoke it before a large amount of speculative implementation accumulates around an assumption I have not examined yet.

The point is not that agents permanently own the first 80% and humans permanently own the last 20%. I expect that boundary to move. The point is to keep returning the work to human judgment wherever intent, ambiguity, correctness, or interpretation still matter.

The loop is also more than a scheduling device. A thin slice is a **decision instrument**. It does not remove judgment from requirements, architecture, or verification. It gives judgment something concrete to act on.

For requirements, a real slice lets me ask: Is this actually what I meant? Is the behaviour or interaction useful? What requirement did I fail to specify? What behaviour had I silently assumed? What should the next slice preserve, change, or discard?

For architecture, the first real end-to-end path can reveal an awkward boundary that was difficult to see in the abstract. I can ask whether the data model is organized around the right concept, whether the architecture supports the behaviour I actually need, whether an abstraction is genuinely helping, and what should become general only after a concrete path proves its value.

For verification, the slice gives me something against which to define evidence. What would actually convince me this works? Does the test verify the intended property or merely the current implementation? Could a passing test be encoding the wrong requirement? Does the benchmark, plot, UI, numerical result, or generated artifact expose the behaviour that matters? Is the result accepted, negative, blocked, or inconclusive?

These are not three separate ceremonies. They are three ways that a small real path can improve the next decision. The slice does not remove judgment; it gives judgment something concrete to act on.

## Thin slices as rapid prototypes

Thin slices also resemble rapid prototypes.

Engineers have long used prototypes because a real artifact can expose problems that specifications and abstractions conceal. Barry Boehm's [“A Spiral Model of Software Development and Enhancement”](https://doi.org/10.1109/2.59) [3](#reference-3) is a useful related precedent: development can proceed through repeated cycles in which uncertainty and risk are made concrete early. I do not mean that thin slicing is simply a renamed spiral model, or that this exact philosophy already existed in that form. I mean that it shares an older engineering intuition about learning through bounded construction.

A prototype is not merely a demonstration of an idea that has already been completely understood. It can be a tool for discovering what the idea should become.

A real interface can reveal that the interaction is wrong. A plot can reveal that the interesting quantity is not the one I first planned to compute. A benchmark can expose an assumption in the numerical method. The artifact is useful partly because it gives the question a form in which I can finally inspect it.

Coding agents make another prototype-like iteration extraordinarily cheap.

Thin slicing disciplines that cheap iteration by giving it bounded scope, explicit evidence, and a deliberate stopping point. The goal is not merely to produce a disposable demo and then start over. It is closer to rapid prototyping with a verification contract and a deliberate human-feedback boundary.

Whenever practical, a thin slice should leave the repository in a durable, verifiable state. The useful path should survive even as the requirements and architecture evolve around what the evidence reveals.

The goal is not to preserve every first attempt. It is to preserve enough reality that the next decision is made in contact with what actually exists.

## Review the output, not just the code

There is another practical reason I want these loops to be short:

**reviewing code you did not write is hard.**

This was true before coding agents. It becomes much more important when an agent can generate changes faster than I can carefully understand them.

If an agent hands me several thousand lines of unfamiliar implementation and asks whether it correctly captured my intent, that is not a particularly favorable interface between human and machine.

I can read the diff.

I can inspect the tests.

I can ask another agent to review it.

I can trace the architecture.

Sometimes I absolutely should.

But when possible, I would much rather **interact with the capability itself**.

Show me the page.

Let me click the button.

Give me the plot.

Run the animation.

Show me the benchmark.

Let me inspect the generated artifact.

Give me one numerical result I know how to interpret.

Let me try the CLI.

Let me watch the workflow fail.

Give me *something*.

The closer I can bring review to the actual output of the system, the easier it becomes for me to provide high-quality information that the agent could not have invented for itself.

> "No, I don't like how this interaction feels."

> "That quantity isn't scientifically interesting."

> "The animation needs to emphasize the interface, not the mesh."

> "This is technically correct, but this isn't how anybody in the field would describe it."

> "Yes. **That.** Now keep going."

Those statements can contain enormous amounts of information.

And they require very little knowledge of how the agent implemented the thing.

## A disclaimer about implementation

This is probably the right place for an important disclaimer.

**I am not a computer scientist, and I am not writing this from the perspective of someone who has spent a career building production software systems.**

It is entirely possible that there are classes of software engineering where I am underestimating how much implementation-level understanding the human needs to retain, or where abstracting that understanding away would be irresponsible.

I want to be careful about generalizing too confidently beyond my experience.

What I *can* say is that this way of working has been enormously successful for me in scientific work.

In many of the problems I care about, the implementation really is a means to an end.

I care that the numerical method is correct.

I care that the benchmark behaves as it should.

I care that the scientific assumptions are justified.

I care that the visualization reveals the phenomenon I am trying to understand.

I care that the computation is reproducible and that I can trust the evidence it produces.

Whether I personally wrote the serialization layer, assembled the plotting machinery, refactored an internal abstraction, or implemented some piece of infrastructure is much less intrinsically important to me.

Those things matter because the result depends on them, not because manipulating them is the object of my work.

And if current models are capable of handling more and more of those implementation details for me, subject to appropriate tests and verification, then I am quite happy to abstract them away.

So far, my experience increasingly suggests that they are.

That does **not** mean implementation quality stops mattering.

It means I want to spend my own attention at the level where I have the most leverage.

For me, that is usually intent, scientific judgment, verification, and the interpretation of outputs.

Someone with decades of experience designing large production systems may draw that boundary somewhere else.

I would actually be very interested to know where.

So when I say something like:

> **The agent should increasingly own implementation detail.**

I mean it from this particular vantage point.

I do not mean that implementation no longer matters.

I mean that, to the extent that an agent can reliably handle it, **I am willing to let implementation become an abstraction**.

My job then becomes making sure the abstraction is producing the thing I actually wanted.

## Thin slicing makes that abstraction safer

This caveat actually makes me like thin slicing more, not less.

If I am going to surrender some implementation-level control, then I need another way to prevent the agent from wandering too far before I notice.

Thin slices provide that.

I don't have to understand every line the agent writes before I can steer.

I can constrain how far it travels between points of human judgment.

That feels like an important distinction.

The choice is not necessarily:

```text
understand every implementation detail
              OR
delegate the entire system
```

There is another possibility:

{% capture human_steered_diagram %}
state intent
    ↓
delegate a bounded slice
    ↓
inspect evidence / behaviour
    ↓
update intent
    ↓
delegate again
{% endcapture %}
{% include technical-figure.html id="human-steered-loop" text=human_steered_diagram alt="A text-art sequence shows stating intent, delegating a bounded slice, inspecting evidence or behaviour, updating intent, and delegating again." caption="The implementation can be machine-owned while the trajectory remains human-steered." %}

The implementation can be increasingly machine-owned while the **trajectory remains human-steered**.

That is much closer to the kind of agentic engineering I want.

## Thin does not mean incomplete

Suppose I want authentication.

"Authentication" could eventually mean identity providers, sessions, password recovery, authorization, rate limiting, audit logs, administrative tooling, security hardening, polished UI, and many other things.

The thin-slice question is not:

> How do I implement 10% of each of those?

It might instead be:

> What is the thinnest authentication capability I can actually experience?

Perhaps:

One user can authenticate.

One protected operation recognizes that identity.

One focused test demonstrates that the boundary is real.

And perhaps there is an ugly little login UI that nobody intends to keep.

Excellent.

**Now I can look at it.**

Maybe I immediately realize the interaction is wrong.

Maybe the identity model is awkward.

Maybe the session behaviour exposes an architectural issue.

Maybe it works perfectly and the obvious next step is to support a second authentication method.

Now I can **fatten the slice**.

Thin slicing is not a commitment to permanently tiny features.

It is a way of establishing a working path early enough that subsequent complexity grows around something real.

The first slice can be extremely thin.

Then I can make it thicker.

Then I can add another slice.

Eventually the collection of slices may become a substantial, sophisticated system.

Which raises the question that has become something of a running joke in my own work:

**How thin do you want this slice?**

There is no canonical answer.

Do I want the absolute skeletal path that proves the architecture?

Do I want enough visual polish that I can meaningfully react to it?

Do I understand this part well enough that the slice can be substantially thicker?

Thinness is a knob.

If uncertainty is high, turn it down.

If the agent keeps misunderstanding the intent, turn it way down.

If failure would invalidate a large amount of downstream work, turn it down.

If the path is already well understood and the work is routine, turn it up.

If I have a working slice in front of me and know exactly what I dislike about it, **fatten it**.

There is no virtue in maximum thinness.

The goal is to get back to informed human judgment before too much speculative work accumulates.

## Agents can generate faster than I can understand

This is where thin slicing starts to feel less like a project-management trick and more like an **epistemic strategy**.

An agent can plausibly create:

* an architecture;
* interfaces;
* schemas;
* abstractions;
* infrastructure;
* tests;
* documentation;
* configuration;
* several layers of implementation;

all before I have deeply interacted with the first thing it produced.

Every one of those additions can be reasonable.

That does not mean the system is moving in the right direction.

There is a dangerous asymmetry here:

**agents can produce implementation faster than I can update my understanding of what is being implemented.**

Thin slices put a governor on that asymmetry.

Not by limiting the number of lines the agent may write.

Not by limiting its context window.

Not by imposing arbitrary time boxes.

By demanding periodic contact with reality and judgment.

Make something work.

Verify what can be verified.

Put it in front of me.

Ask what I learned.

Update the intent.

Continue.

This connects closely to Osmani's description of the changing software lifecycle: implementation is being compressed from weeks toward hours or less, while requirements, architecture, and verification remain comparatively slow because they are judgment work. He summarizes the shift in implementation as one "from writing into reviewing."

That framing resonates strongly with my experience, with one addition:

**if implementation has become writing-into-reviewing, then I want the artifacts to become reviewable as early as possible.**

That is what the slice is for.

## One slice, then stop

{% include technical-figure.html src="/assets/diagrams/generated/fixture.svg" ratio="574.8125 / 70" alt="A goal narrows to a smallest meaningful slice and then produces evidence." caption="A slice is valuable when it produces evidence for the next decision." %}

My basic control flow looks like this:

{% include technical-figure.html src="/assets/diagrams/generated/thin-slice-loop.svg" ratio="1508.96875 / 174" alt="A goal or uncertainty is bounded, evidence is defined, work is executed and verified, then the result is checkpointed or recorded before stopping." caption="The Stop node creates a deliberate human-feedback boundary." %}

The `Stop` node matters.

Agents like to continue.

If the feature works, there is an obvious improvement nearby.

If a prerequisite is missing, perhaps the agent can create the prerequisite.

If a test exposes an architectural issue, perhaps it can refactor the architecture.

If the first version looks rough, perhaps it can polish it.

Sometimes I want exactly that.

But I want the continuation to be a **decision made after looking at the new state of the world**.

The slice creates a natural point at which agency returns to me.

Maybe I look at the output for ten seconds and say:

> Great. Keep going.

Fine.

The interruption still had value.

The project crossed a human-feedback boundary.

The agent is no longer continuing merely because its previous reasoning suggested that it should.

It is continuing with a tiny new piece of information:

**yes, this is still what I want.**

Sometimes that is all the feedback required.

Sometimes it changes the entire project.

## Failure counts too

Human review is not the only kind of evidence a slice can produce.

A slice can establish that the idea was wrong.

Suppose I ask an agent to implement an endpoint and discover that the data contract it depends on does not actually exist.

The tempting response is:

> No problem. I designed the missing contract, updated the consumers, added a schema abstraction, and completed the endpoint.

Maybe that work is excellent.

But the original slice just discovered something important.

**I was not where I thought I was.**

That is evidence.

A slice can end as:

* accepted;
* negative;
* blocked; or
* inconclusive.

This matters enormously in scientific work.

If a benchmark does not reproduce the expected behaviour, I would much rather preserve a small, legible result that establishes the discrepancy than ask the agent to keep modifying the formulation until the plot looks convincing.

The purpose of the slice was not necessarily to succeed.

It was to learn something trustworthy enough to determine what should happen next.

## Thin slices become campaigns

Some goals genuinely require many slices.

Then I use a **thin-slice campaign**.

{% include technical-figure.html src="/assets/diagrams/generated/thin-slice-campaign.svg" ratio="1932.859375 / 238.71875" alt="A campaign designs slices, assigns a fresh-context worker, verifies the result, preserves outcomes, and continues until complete." caption="The campaign preserves a larger dependency structure while each worker remains bounded." %}

The campaign can maintain the larger dependency structure.

But each worker still has a narrow responsibility and a point at which it returns evidence.

This has been especially useful because it prevents one enormous agent session from becoming the sole holder of the project's reasoning.

Workers can often start with fresh context.

The repository contains the durable state.

The slice tells the worker what it owns.

The tests and artifacts tell me what happened.

I remain responsible for steering the larger trajectory.

## I want to spend more time looking

I think this is ultimately where my own view of agentic engineering is heading.

I don't want to spend most of my time writing implementation code if an agent can do that part well.

I also don't want to spend all of my time writing enormous specifications describing every implementation detail the agent should produce.

I want to spend my time on the places where I have the most leverage:

**What am I actually trying to do?**

**What would convince me that this works?**

**What should I look at?**

**What is wrong with what I'm seeing?**

**What surprised me?**

**What do I want now that this exists?**

That is not less involvement.

In some ways it feels like **more** involvement.

But the involvement moves.

Instead of continuously translating intent into syntax, I can spend more time **forming, expressing, testing, and revising the intent itself**.

And this is why I don't think the ideal agentic workflow is:

> Write the perfect specification, hand it to an autonomous agent, and come back when the software is finished.

For many interesting problems, I don't know the perfect specification yet.

I learn what I want by interacting with partial versions of the thing.

I discover scientific questions by looking at plots.

I discover bad interfaces by using them.

I discover missing requirements when the first implementation forces me to make a choice I had not realized existed.

I discover what the next slice should be because the previous one is sitting in front of me.

Agents make it astonishingly cheap to create those partial versions.

So I want to exploit that.

Not by using the extra generation capacity only to build **more** before looking.

By using it to **shorten the distance between having an idea and being able to react to it**.

For me, that may be the central point of thin slicing.

## What thin slicing is exploiting

At this point, I can probably summarize the pieces of the argument more simply.

Thin slicing is not really a claim that smaller units of work are inherently virtuous.

It is a way of exploiting several asymmetries.

**Generation is becoming cheap; judgment is not.**

Agents can produce implementation faster than I can decide whether the implementation captures the thing I actually wanted.

**Intent is often easier to refine against something real.**

I can learn more from ten seconds with the wrong interface, the wrong plot, or the wrong numerical result than from another page of increasingly precise speculation about what I might want.

**Early feedback is more valuable than late feedback.**

An assumption is cheap to change before the rest of the system has grown around it.

**A trustworthy exemplar is generative.**

Once one path actually works and I understand why I trust it, generative AI makes variations, extensions, and neighbouring possibilities extraordinarily cheap to produce.

**Verification can turn failure into progress.**

A negative, blocked, or inconclusive slice can still tell me something important enough to change the next decision.

None of these ideas appeared from nowhere.

Agile development has spent decades emphasizing working increments and short feedback loops [5](#reference-5).

Vertical slicing gives those increments an end-to-end shape [6](#reference-6).

Walking skeletons establish a working path before the system is fully grown [8](#reference-8).

Rapid prototyping and spiral development use bounded construction to expose uncertainty early [3](#reference-3).

The recent Google/Kaggle discussion adds a new asymmetry: implementation is being compressed much more aggressively than the human work of specification, architecture, verification, and judgment [1](#reference-1).

And Tao's example suggests what the same economics might mean for research: once one case has been worked out deeply enough, AI can help explore a much larger neighbourhood around it [4](#reference-4).

Thin slicing is my attempt to put those observations into one practical control loop.

> **Thin slicing tries to convert cheap generation into useful iteration without allowing generation to outrun understanding.**

I think that may be the shortest version of the argument.

## A starter prompt

You do not need a framework to try this.

You can begin with:

> **Implement this feature using the philosophy of thin slices.**
>
> Inspect the current state first. Identify a small coherent end-to-end capability or uncertainty that can become real and observable. Bound the slice explicitly, including its non-goals.
>
> Define the evidence needed to evaluate the slice before implementation. Prefer outputs that a human can directly inspect, exercise, or understand when possible, in addition to appropriate automated tests.
>
> Execute only that slice. Verify it with the strongest relevant checks. If it is blocked, negative, or inconclusive, preserve that result rather than silently expanding scope.
>
> Leave a durable checkpoint and stop so the result can be reviewed before deciding what comes next.

That is considerably more verbose than what I usually type.

These days, I usually have ChatGPT write the Codex or Claude Code prompt, and because we have been using this framework repeatedly, I can often tell it little more than:

> **Use thin slices.**

The rest is accumulated context: the philosophy, the examples, and the habits that those few words have come to invoke.

If you are trying the idea without that shared history, I would start with the fuller prompt above.

## The repository

I have started collecting the minimal version of this workflow in a repository called **Thin Slices**.

Importantly, I do not want the repository to turn the philosophy into an elaborate agent framework.

That would be a fairly embarrassing way to introduce it.

The core is deliberately small: a skill for one thin slice, a skill for a thin-slice campaign, lightweight templates, examples, and behaviour tests.

I did considerably more archaeology while developing it. That work is preserved for provenance, but the result became simpler rather than more complicated.

I think that is appropriate.

Thin slicing is not primarily machinery.

It is a way of controlling the distance between **intent and evidence**.

Or, perhaps more importantly, between **agent action and human judgment**.

Agents have made it astonishingly cheap to produce another iteration.

So I want many iterations.

Small ones.

Real ones.

Things I can touch.

Things I can reject.

Things I can point at and say:

> No, not that.

Or:

> **Yes. That. More like that.**

And then I keep going.

## References

1. <a id="reference-1"></a>Addy Osmani, Shubham Saboo, and Sokratis Kartakis, *The New SDLC With Vibe Coding*. Google / Kaggle, May 2026. [Kaggle whitepaper](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding).

2. <a id="reference-2"></a>Addy Osmani, “The New Software Lifecycle.” June 16, 2026. [Author's discussion of the whitepaper](https://addyosmani.com/blog/new-sdlc-vibe-coding/).

3. <a id="reference-3"></a>Barry W. Boehm, “A Spiral Model of Software Development and Enhancement,” *IEEE Computer*, 21(5), 61–72, 1988. [DOI](https://doi.org/10.1109/2.59).

4. <a id="reference-4"></a>Terence Tao, “Machine-Assisted Proof,” *Notices of the American Mathematical Society*, 72(1), 6–13, 2025. [DOI](https://doi.org/10.1090/noti3041).

5. <a id="reference-5"></a>[*Manifesto for Agile Software Development*](https://agilemanifesto.org/), and [*Principles behind the Agile Manifesto*](https://agilemanifesto.org/principles), 2001.

6. <a id="reference-6"></a>Bill Wake, “INVEST in Good Stories, and SMART Tasks,” XP123, August 17, 2003. [Article](https://xp123.com/invest-in-good-stories-and-smart-tasks/).

7. <a id="reference-7"></a>Henrik Kniberg, “Elephant Carpaccio facilitation guide,” Crisp, July 25, 2013. [Article](https://blog.crisp.se/2013/07/25/henrikkniberg/elephant-carpaccio-facilitation-guide).

8. <a id="reference-8"></a>Clint Shank, “Start with a Walking Skeleton,” in Richard Monson-Haefel, *97 Things Every Software Architect Should Know*, O'Reilly Media, 2009. [Chapter](https://www.oreilly.com/library/view/97-things-every/9780596800611/ch60.html).

If you spot an error, know of related work I’ve missed, or have thoughts about this approach, I’d be glad to hear from you. [Feel free to email me.](mailto:{{ site.author.email }})
