---
permalink: /research/
title: "Research"
description: "Research in continuum mechanics, membrane dynamics, and quantum scientific computing."
author_profile: true
---

My research spans two principal areas: continuum mechanics of lipid membranes and quantum scientific computing. The membrane work formed the central body of my Ph.D., while the quantum work investigates how discretized scientific models can be represented and interrogated on a quantum computer. Across both areas, I am interested in the passage from mathematical structure to computational representation, and in making explicit what evidence supports a numerical or algorithmic result.

## Continuum mechanics and membrane dynamics

I study lipid membranes as curved, deforming material surfaces coupled to surrounding fluids. The central questions are how geometry, bending elasticity, in-plane viscous flow, permeability, osmosis, and multicomponent transport enter a thermodynamically consistent description of a moving membrane-bulk system.

The continuum theory combines surface differential geometry, modified integral theorems, balance laws, and linear irreversible thermodynamics. It derives the membrane contribution to entropy production and uses it to identify thermodynamic forces and fluxes, constitutive relations, equations of motion, and boundary conditions without assuming that the interface is flat or stationary. In this formulation, the deviatoric membrane stress contributes a distinct driving force for permeation.

A related computational direction develops numerical methods for deformable membranes interacting with viscous surrounding fluids. It draws on finite-element and isogeometric surface mechanics, arbitrary Lagrangian-Eulerian kinematics, and boundary-integral hydrodynamics. Each computational capability is paired with analytical benchmarks, numerical convergence studies, or cross-implementation comparisons appropriate to the claim being tested.

<figure class="research-figure">
  <img src="{{ '/images/research/membrane-force-balance.webp' | relative_url }}"
       alt="Diagram progressing from a bulk region intersected by a membrane, to membrane surface tractions and moments, to a molecular lipid-bilayer view."
       width="1619" height="458" loading="lazy" decoding="async">
  <figcaption>Bulk and membrane tractions, the surface normal, and the director moment supported by the membrane. Reproduced from the source figure for <em>Irreversible thermodynamics of curved lipid membranes. II</em>; this is a mechanical schematic, not a numerical simulation.</figcaption>
</figure>

<div class="inline-links">
  <a href="https://doi.org/10.1103/wfj9-7l6r">Journal article</a>
  <a href="https://arxiv.org/abs/2412.19300">arXiv</a>
</div>

## Quantum scientific computing

This work asks how the structure introduced by a numerical discretization can be translated into explicit quantum operations, and how scientifically meaningful outputs can be extracted while accounting for state preparation, boundary conditions, non-unitary evolution, and measurement.

### Explicit block encodings for elliptic operators

Quantum algorithms for differential equations require circuit-level representations of discretized operators, but these representations are often treated as abstract inputs. This work gives explicit quantum circuits for elliptic boundary-value problems and identifies the indexing and circuit structure needed to construct them.

The framework treats periodic, Dirichlet, Neumann, and Robin conditions; higher-order finite differences through periodic extensions; irregular domains through a projection construction; and many-body convective operators. The emphasis is constructive: familiar discretized operators are translated into implementable block encodings with explicit circuit structure.

<figure class="research-figure">
  <img src="{{ '/images/research/block-encoding-irregular-domain.svg' | relative_url }}"
       alt="Computed Poisson solution on an L-shaped domain, shown as a two-dimensional color field."
       width="576" height="384" loading="lazy" decoding="async">
  <figcaption>A numerical Poisson solution on an irregular L-shaped domain using the projection construction studied in the block-encoding paper. Reproduced from the published figure source.</figcaption>
</figure>

<div class="inline-links">
  <a href="https://doi.org/10.22331/q-2025-06-04-1764">Journal article</a>
  <a href="https://arxiv.org/abs/2407.18347">arXiv</a>
  <a href="https://github.com/Kharazitd/BlockEncodingDemos">Code</a>
</div>

### Qu-FEM

Finite-element methods build global systems from local element contributions, but a quantum implementation must preserve that assembly structure rather than treating the final matrix as an arbitrary sparse operator. Qu-FEM develops a quantum formulation of finite-element assembly that retains the method's locality and geometric flexibility.

Two primitives, the unit of interaction and the local-to-global indicator matrix, assemble global arrays from element-level contributions. Spatially varying coefficients are incorporated through numerical integration, while Lagrange multipliers impose Dirichlet conditions without modifying the assembled block encoding.

<figure class="research-figure">
  <img src="{{ '/images/research/qufem-element-assembly.svg' | relative_url }}"
       alt="A highlighted quadrilateral finite element and its binary-numbered local nodes mapped into a larger global mesh."
       width="939" height="485" loading="lazy" decoding="async">
  <figcaption>Local-to-global insertion for a first-order quadrilateral element. This schematic motivates the indexing structure used by Qu-FEM.</figcaption>
</figure>

<div class="inline-links">
  <a href="https://arxiv.org/abs/2510.18150">Preprint</a>
  <a href="https://github.com/AhmadAlkadri/Qu-FEM">Code</a>
</div>

### Reaction rates from high-dimensional dynamics

Reaction rates can be expressed through observables of high-dimensional Fokker-Planck dynamics, but estimating those observables requires representing non-unitary propagation and controlling the cost of extracting matrix elements.

This work develops a Gaussian linear combination of Hamiltonian simulations for representing the propagation, together with a procedure for estimating matrix elements without an exponentially decaying success probability. The resulting complexity improvement is stated relative to comparable worst-case analytical guarantees rather than as a general comparison with specialized classical methods.

<figure class="research-figure">
  <img src="{{ '/images/research/reaction-rate-landscape.svg' | relative_url }}"
       alt="Stochastic molecular trajectories moving from a reactant region to a product region across a shaded probability landscape."
       width="584" height="391" loading="lazy" decoding="async">
  <figcaption>Stochastic trajectories connecting reactant and product regions in the Fokker-Planck formulation. Reproduced from the reaction-rate preprint; this is an explanatory landscape schematic, not a quantum simulation.</figcaption>
</figure>

<div class="inline-links">
  <a href="https://arxiv.org/abs/2601.15523">Preprint</a>
</div>
