---
title: The Dot Product through Linear Transformations
date: 2025-12-30 19:00:00 -0500
categories: [Mathematics]
tags: [mathematics, desmos, linear algebra]
math: true
---
<!-- cSpell:words ihat, jhat, uhat, vhat, desmos, mathjax -->
<!-- cSpell:ignoreRegExp (\${1,2})([\s\S]*?)\1 -->

<!-- Prod fails if there are any JS comments in a <script> tag here because it smushes it into one line. -->
<!-- So only put comments in a JS file. -->
<script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']], 
        macros: { 
          vv: '\\vec{v}',
          vu: '\\vec{u}',
          puv: 'P_{\\vec{v}} \\vec{u}',
          ihat: '\\hat{\\imath}',
          jhat: '\\hat{\\jmath}',
          uhat: '\\hat{u}',
          vhat: '\\hat{v}'
        }
      },
      svg: {fontCache: 'global'}
    };
</script>
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=4f60de6866a94a18b9100d095623cc65"></script>
<script src="{{ '/assets/js/dotProduct/desmosLoader.js' | relative_url }}" type="module"></script>

<link rel="stylesheet" href="{{ '/assets/css/dotProduct.css' | relative_url }}"/>

<!-- Begin post -->

This post was inspired by [3blue1brown's video](https://www.youtube.com/watch?v=LyGKycYT2v0) on the dot product. Here I explain his derivation, adding interactive Desmos graph to further explore the ideas. 

## Prerequisites
-  Understand vectors.
-  Understand matricies as linear transformations.
-  Previous dot product knowledge not required!

## Motivation

The big question is, *how do we know how much one vector lies in the direction of another*? For example, consider the following example where three vectors are compared to $\vec{u}=(4,3)$. $\vec{v_1}$ is pointing in about the same direction, $\vec{v_2}$ is at $90^{\circ}$ to $\vv$, and $\vec{v_3}$ is in a very different direction than $\vv$.

<desmos-graph id="motivation" data-url="https://www.desmos.com/calculator/nzrgoe2gpk">
<div class="desmos-button-container">
    <button id="make-close" type="button" data-function="changeVectorMotivation" data-arg="0">Close</button>
    <button id="make-perpendicular" type="button" data-function="changeVectorMotivation" data-arg="1">90$^{\circ}$</button>
    <button id="make-far" type="button" data-function="changeVectorMotivation" data-arg="2">Far</button>
  </div>
<p>Graph 1. Some vectors point in same/opposite direction.</p>
</desmos-graph>

Drawing the vectors out, it's clear that some have different directions. But how can we put numbers to this? That's the idea: quantify how much two vectors are pointing in the same direction.

## Projecting onto a Line
The idea with this approach is that we will measure how much one vector lies in the direction of another. This geometrically looks like projecting one vector onto another. First consider the vector $\vu$. Now draw a number line that points in the same direction as $\vu$. This lies on its span. Now, consider any vector in the plane. Let's call it $\vv$. Looking at the plane, we can draw a perpendicular line that projects $\vv$ onto the number line — the span of $\vu$. I will introduce a new notation to describe this. Let the function $P:\mathbb{R}^2 \to \mathbb{R}$ take in a vector in the plane and produce its position on the number line. Note that while the number line lies on the span of $\vu$, the projections onto the number line are still real numbers in $\mathbb{R}$.

> For this article, $\vv$ refers to any vector in the plane and $\vu$ refers to the vector with a number line on it.
{: .prompt-info }

The whole point is that when $\vv$ and $\vu$ point in the about the same direction, $P(\vv)$ is big and positive. When they point in opposite directions, $P(\vv)$ is big and negative. This matches the intuition from earlier. 

Notice that this defines a transformation (a function) from $\vv$ to a number on the number line. This transformation is also *linear*. But how? A neat visual (albeit not rigorous) way to tell if a transformation is linear to ask whether any straight line of evenly spaced dots remains straight and evenly spaced. Play around with the graph below to see why projections match the intuition and why they make sense to describe how much two vectors lie in the same direction. Click "Project" to see that it is indeed linear. Drag around $\vu$ and $\vv$ to get a feel for it.`

<desmos-graph id="end-goal" data-url="https://www.desmos.com/calculator/gqfaesh2zb">
  <div class="desmos-button-container">
    <button id="end-goal-projection-button" type="button" data-function="animateProjection">Project</button>
    <button id="end-goal-clear-button" type="button" data-function="clearProjectionAnimation">Clear</button>
  </div>
  <p>Graph 2. This is what "projection" looks like, and how alignment can be measured.</p>
</desmos-graph>

So, $P$ is a *linear transformation*. The input space is $\mathbb{R}^2$ and the output space is the number line along $\vu$. Like any linear transformation, if you can figure out where $\ihat$ and $\jhat$ land on the output space (the number line), that matrix completely defines $P$.

## Unit Vectors and Projection
 To find $P$ we will first find where $\ihat$ lands when projected onto $\vu$. To begin, consider the *unit* vector $\uhat$. Let it be any vector on the unit circle. If you project $\ihat$ onto $\uhat$, it is the symmetrical to projecting $\uhat$ onto $\ihat$. This is clear in the below Desmos graph. The two projections make two congruent triangles. No matter where $\uhat$ is on the unit circle, the congruence is preserved. Drag $\uhat$ around in the below graph to see.

<desmos-graph id="unit-vector-symmetry" data-url="https://www.desmos.com/geometry/6v3rfp0lao">
<p>Graph 3. The symmetry projecting $\ihat$ onto $\uhat$</p>
</desmos-graph>

This is a very elegant geometry. The takeaway is that although the projection of $\ihat$ onto $\uhat$ looks like it would need trigonometry, it is just the $x$ component of $\uhat$. The same argument shows that the projection of $\jhat$ onto $\uhat$ is the $y$ component of $\uhat$. Overall, $\ihat$ lands on $\vu_{x}$ and $\jhat$ lands on $\vu_{y}$. Therefore the matrix is is $\begin{bmatrix} \vu_{x} & \vu_{y} \end{bmatrix}$. With this geometry, as long as $\vu$ is a unit vector, applying this matrix to $\vv$ projects it onto $\vu$.

$$P(\vv) = \begin{bmatrix} \uhat_{x} & \uhat_{y} \end{bmatrix} \begin{bmatrix} \vv_{x} \\ \vv_{y} \end{bmatrix}$$

So you multiply the $x$ components and multiply the $y$ components then add them... This is the dot product! In conventional notation this is $\uhat \cdot \vv$. So, when $\uhat$ is a unit vector, the dot product is the length of $\vv$'s projection onto the span of $\vu$!

<desmos-graph id="ihat-jhat-projection" data-url="https://www.desmos.com/calculator/xsr02tyqaw">
  <div class="desmos-button-container">
    <button id="ihat-jhat-projection-button" type="button" data-function="animateMatrix">Project</button>
    <button id="ihat-jhat-projection-clear-button" type="button" data-function="clearProjectionAnimation">Clear</button>
  </div>
  <p>Graph 4. Click "Project". $\ihat$ and $\jhat$ project onto $\uhat$, then add. This is the linear transformation $\begin{bmatrix} \uhat_{x} & \uhat_{y} \end{bmatrix}$!</p>
</desmos-graph>

## Generalizing to Alignment of Arbitrary Vectors
On one hand, this answers the question from the beginning. This quantity is positive when the vectors point in the same direction, zero when they are perpendicular, and negative when they point in different directions. This measures their alignment, solving the problem set out in the beginning of this article. But when $\vu$ isn't a unit vector this still works, the number is just scaled. How much is it scaled by? What should it mean to take the dot product with a non-unit vector?

I always wondered what the *value* of the dot product represented. I knew the value indicated alignment but didn't understand what the particular value meant. Now I see it related to projection. The dot product is equal to the magnitude of the unit projection scaled by the magnitude of the vector. A bit of algebra is the neatest way to explain this.

Assume we accept it is possible to take the dot product $\vu \cdot \vv$. Recall $\vu = \| \vu \|\uhat$. It follows that $\begin{bmatrix} \vu_{x} & \vu_{y} \end{bmatrix} = \|\vu\|\begin{bmatrix} \uhat_{x} & \uhat_{y} \end{bmatrix}$. Subbing that in gives:

$$
\begin{gather*}
\vu \cdot \vv \\
\begin{bmatrix} \vu_{x} & \vu_{y} \end{bmatrix} \begin{bmatrix} \vv_{x} \\ \vv_{y} \end{bmatrix} \\
\|\vu\|\begin{bmatrix} \uhat_{x} & \uhat_{y} \end{bmatrix} \begin{bmatrix} \vv_{x} \\ \vv_{y} \end{bmatrix} \\
\end{gather*}
$$

> $$ \vu \cdot \vv = \| \vu \| ( \uhat \cdot \vv ) $$
{: .prompt-info}

<desmos-graph id="scaled-unit-projection" data-url="https://www.desmos.com/calculator/wtkmjnqb5e" data-function="observeScaledUnitProjectionText">
<p>Graph 5. The more general dot product is a scaled unit projection.</p>
<p>$\vu \cdot \vv = \| \vu \| ( \uhat \cdot \vv )$</p>
<p id="u-v-container"><span id="u-dot-v"></span>$\,=\,$<span id="mag-u"></span>$\,\cdot\,$<span id="uhat-dot-v"></span></p>
</desmos-graph>

## Conclusion
The takeaways from all this are:
- The relation between $\vu$ and the matrix $\begin{bmatrix} \vu_{x} & \vu_{y} \end{bmatrix}$.
- The dot product can be thought of as a scaled projection.
- The sign of the dot product $\vu \cdot \vv$ is:
  - Positive when they point in the same direction.
  - Zero when they are perpendicular.
  - Negative when they point in opposite directions.
- The dot product measures alignment of vectors.

I could keep writing about how this relates to more ideas in linear algebra, but I'll stop here. Here are some more ideas for you to explore if you are interested:
- Taking the angle between two vectors using the dot product: $\cos(\theta) = \dfrac{\vu \cdot \vv}{\| \vu \| \| \vv \|}$
- There is a one-to-one between a 1 by 2 vector $\vu = \begin{bmatrix} \vu_{x} \\\\ \vu_{y} \end{bmatrix}$ and a 2 by 1 matrix, $\begin{bmatrix} \vu_{x} & \vu_{y} \end{bmatrix}$. That matrix is ${\vu}^T$, read "u transpose". The transpose has some deep geometric meaning that needs the dot product to understand. See [Mathemaniac's](https://www.youtube.com/watch?v=g4ecBFmvAYU) and [Sam Levy's](https://www.youtube.com/watch?v=wjYpzkQoyD8) amazing videos for more details.

Overall, the dot product is used everywhere in linear algebra. This intuition of projection will enrich your understanding as you continue to work with it.
