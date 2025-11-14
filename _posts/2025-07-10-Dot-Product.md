---
title: The Dot Product through Linear Transformations
date: 2025-10-7 15:00:00 -0400
categories: [Mathematics]
tags: [mathematics, desmos, linear algebra]
---
<!-- Chirpy is supposed to support MathJax but apparently it's a headache to set up -->
<!-- Someone collected all the difficutly regarding this: https://gist.github.com/matrix-morpheus/9080d5bad2386b13ff61ead0e5ada093 -->
<!-- So I'm just dumping a script tag here and calling it a day! -->
<script>
    window.MathJax = {
      tex: {inlineMath: [['$', '$'], ['\\(', '\\)']], 
        macros: { 
          vv: '\\vec{v}',
          vu: '\\vec{u}',
          puv: 'P_{\\vec{v}} \\vec{u}', // read, "the projection of u onto v"
          ihat: '\\hat{i}',
          jhat: '\\hat{j}',
          uhat: '\\hat{u}',
          vhat: '\\hat{v}'
        }
      },
      svg: {fontCache: 'global'}
    };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<!-- Excellent documentation at https://www.desmos.com/api/v1.11/docs/index.html -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=4f60de6866a94a18b9100d095623cc65"></script>
<script src="{{ "/assets/js/desmosLoader.js" | relative_url }}"></script>

<link rel="stylesheet" href="{{ "/assets/css/dotProduct.css" | relative_url }}"/>

<!-- Begin post -->

This post was inspired by [3blue1brown's video](https://www.youtube.com/watch?v=LyGKycYT2v0) on the dot product. Here I explain his derivation, adding interactive Desmos graph to further explore the ideas. 

# Motivation

The big question is, *how do we know how much one vector lies in the direction of another*? For example, consider the following example where three vectors are compared to $\vec{u}=(4,3)$. $\vec{v_1}$ is pointing in about the same direction, $\vec{v_2}$ is at $90^{\circ}$ to $\vec{u}$, and $\vec{v_3}$ is in a very different direction than $\vec{u}$. Click the buttons on the graph below to see.

<desmos-graph id="motivation" url="https://www.desmos.com/calculator/nzrgoe2gpk"></desmos-graph>

Drawing the vectors out, it's clear that some have different directions. But how can we put numbers to this? That's the idea: quantify how much two vectors are pointing in the same direction.

# Projecting onto a line
The idea with this approach is that we will measure how much one vector lies in the direction of another. This geometrically looks like projecting one vector onto another. First consider the vector $\vv$. Now draw a number line that points in the same direction as $\vv$. This happens to lie on its span. Now, consider the vector $\vu$. Looking at the plane, we can draw a perpendicular line that projects $\vu$ onto the span of $\vv$. Let the projection of $\vu$ onto $\vv$ be $\puv$.


> Note that while the number line lies on the span of $\vv$, the projections onto the number line are still real numbers in $\mathbb{R}$.
{: .prompt-warning }

The whole point is that when $\vu$ and $\vv$ point in the about the same direction, $\puv$ is big and positive. When they point in opposite directions, $\puv$ is big and negative. This matches the intuition from earlier. 

Notice that this defines a transformation (a function) from $\vu$ to a number on the number line. This transformation is $\mathbb{R}^2 \to \mathbb{R}$. It is also *linear*. But how? A neat (albeit not rigorous) way to tell if a transformation is linear to ask whether any straight line of evenly spaced dots remains straight and evenly spaced.


Play around with the graph below to see why projections match the intuition and make sense to describe how much two vectors lie in the same direction.

<desmos-graph id="end-goal" url="https://www.desmos.com/calculator/gqfaesh2zb">
  <div class="desmos-button-container">
    <button id="end-goal-projection-button" type="button" function="animateProjection">
    Project
      <script>
        function animateProjection (calculator, url) {
          console.log(url);
          const timer = ms => new Promise(res => setTimeout(res, ms));
          let expressions = calculator.getExpressions();
          let sliderId;
          for (expr of expressions){
            if (expr.latex && expr.latex.includes('A_{pi}=')){
              sliderId = expr.id;
            }
          }
          calculator.setExpression({ id: sliderId, latex: `A_{pi}=${0}` });
          let animationLength = 2000; // milliseconds
          let updateCount = 50; // will update 10 times
          // looks better than linear. 0<=x<=1, 0<=y<=1
          const interpolator = (x) => (Math.atan(8 * x - 4) / (2 * Math.atan(4))) + 0.5;
          async function loop (calculator) { 
            await timer(1000);
            for (i=1; i<=updateCount; i++){
              calculator.setExpression({ id: sliderId, latex: `A_{pi}=${interpolator(i / updateCount)}` });
              await timer(animationLength / updateCount);
            }
          };
          loop(calculator); 
        }
      </script>
    </button>
    <button id="end-goal-clear-button" type="button" function="clearProjectionAnimation">
      Clear
      <script>
        function clearProjectionAnimation (calculator, url){
          let expressions = calculator.getExpressions();
          let sliderId;
          for (expr of expressions){
            if (expr.latex && expr.latex.includes('A_{pi}=')){
              sliderId = expr.id;
            }
          }
          calculator.setExpression({ id: sliderId, latex: `A_{pi}=${0}` });
        }
      </script>
    </button>
  </div>
</desmos-graph>

The point of all this is that $\vu\rightarrow\puv$ is a linear transformation. Like any linear transformation, if we can figure out where $\ihat$ and $\jhat$ land on the number line, that matrix completely describes how to get $\puv$.

# Unit Vectors
Now we will find where $\ihat$ lands, which is the projection of $\ihat$ onto $\vu$. To begin, consider the unit vector $\uhat$. $\vu$ is any vector on the unit circle.

<desmos-graph id="unit-vector-symmetry" url="https://www.desmos.com/geometry/1nxjeivqwz"></desmos-graph>

