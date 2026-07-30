---
permalink: /projects/
title: "Projects"
description: "Scientific software, agentic engineering, visualization, workshops, and writing projects."
author_profile: true
redirect_from:
  - /portfolio/
  - /mathematics/
  - /math
---

This page collects scientific software, engineering experiments, workshops, visualization tools, and long-term writing projects. Each project is labelled by its current public status and linked when there is a public artifact to inspect.

## Scientific software

<ul class="project-list">
  <li class="project">
    <h3>Qu-FEM</h3>
    <p class="project__status"><span class="status-label">Public research code</span> Mathematica notebooks accompanying the finite-element preprint.</p>
    <p class="project__description">The notebooks reproduce the paper's numerical demonstrations and explicit quantum circuits for Poisson problems on a CAL-shaped domain and for unidirectional flow in a square duct.</p>
    <div class="project__links"><a href="https://github.com/AhmadAlkadri/Qu-FEM">Repository</a><a href="https://arxiv.org/abs/2510.18150">Paper</a></div>
  </li>
  <li class="project">
    <h3>Membrane mechanics simulation</h3>
    <p class="project__status"><span class="status-label">Private research project</span></p>
    <p class="project__description">A computational framework for studying deformable cylindrical lipid membranes interacting with surrounding viscous fluids. The project combines curved-surface mechanics, isogeometric discretization, arbitrary Lagrangian–Eulerian kinematics, and boundary-integral hydrodynamics.</p>
  </li>
  <li class="project">
    <h3>Chemical Thermodynamics</h3>
    <p class="project__status"><span class="status-label">Early-stage public library</span> Python package <code>chemthermo</code>.</p>
    <p class="project__description">Thermodynamic utilities with an SI-unit API, including component data, cubic equations of state, and temperature–pressure flash calculations. The repository includes runnable examples, tests, and optional reference-library validation dependencies.</p>
    <div class="project__links"><a href="https://github.com/AhmadAlkadri/Chemical-Thermodynamics">Repository</a></div>
  </li>
</ul>

## Agentic engineering and workshops

<ul class="project-list">
  <li class="project">
    <h3>Agentic Engineering: An Introduction</h3>
    <p class="project__status"><span class="status-label">Public workshop</span> First delivered at a UC Berkeley research-group meeting on July 8, 2026.</p>
    <p class="project__description">A demo-driven workshop on engineered tasks, acceptance tests, prompts, recovery loops, and the limits of coding agents. The public artifact includes slides, a speaking outline, runnable notebooks, staged exercises, runbooks, tests, and rehearsal fallbacks.</p>
    <div class="project__links"><a href="https://github.com/AhmadAlkadri/agentic-engineering-workshop">Workshop repository</a></div>
  </li>
</ul>

## Visualization

<ul class="project-list">
  <li class="project">
    <h3>MathAnimate</h3>
    <p class="project__status"><span class="status-label">Private alpha prototype</span></p>
    <p class="project__description">An agentic compiler for short explanatory Manim videos. It translates a teaching prompt into a structured storyboard and generated scene, checks syntax, plan fidelity, explanatory structure, rendering, and motion, attempts bounded repairs, and retains replayable artifacts and provenance for human review. A protected capture-and-replay path treats generated code as untrusted input rather than executing it directly on the host.</p>
  </li>
</ul>

## Writing

<ul class="project-list">
  <li class="project">
    <h3>Transport Phenomena notes and web book</h3>
    <p class="project__status"><span class="status-label">In preparation</span> One writing project with two editions.</p>
    <p class="project__description">The existing LaTeX notes form one edition; a planned parallel Quarto edition will preserve the chapter structure, equations, citations, references, and figures while adding web navigation and search. Later stages may incorporate video and interactive figures where they materially improve the exposition.</p>
  </li>
  <li class="project">
    <h3>Earlier mathematics notes</h3>
    <p class="project__status"><span class="status-label">Archived notes</span> Undergraduate expository writing.</p>
    <p class="project__description">Three older sets of notes remain available as originally published: an introduction to exterior algebra and generalized Stokes' theorem, elementary number theory notes, and an introduction to ergodic theory.</p>
    <div class="project__links"><a href="{{ '/files/ExteriorAlgebra.pdf' | relative_url }}">Exterior algebra</a><a href="{{ '/files/ElementaryNumberTheory.pdf' | relative_url }}">Number theory</a><a href="{{ '/files/ErgodicTheory.pdf' | relative_url }}">Ergodic theory</a></div>
  </li>
</ul>
