---
title: The Dot Product through Linear Transformations
date: 2025-10-7 15:00:00 -0400
categories: [Mathematics]
tags: [mathematics, desmos, linear algebra]
---
<!-- Chirpy is supposed to support markdown but apparently it's a headache to set up -->
<!-- Someone collected all the difficutly regarding this: https://gist.github.com/matrix-morpheus/9080d5bad2386b13ff61ead0e5ada093 -->
<!-- So I'm just dumping a script tag here and calling it a day! -->
<script>
    window.MathJax = {
      tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
      svg: {fontCache: 'global'}
    };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<!-- Excellent documentation at https://www.desmos.com/api/v1.11/docs/index.html -->
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=4f60de6866a94a18b9100d095623cc65"></script>
<script src="{{ "/assets/js/graph1.js" | relative_url }}"></script>

This post was inspired by [3blue1brown's video](https://www.youtube.com/watch?v=LyGKycYT2v0) on the dot product. Here I explain his derivation, adding interactive Desmos graph to further explore the ideas. 

# Motivation

The big question is, *how do we know how much one vector lies in the direction of another*? For example, consider the vectors $\vec{u}=(3,4)$ and $\vec{v}=(-1,1)$. Just looking at the numbers, are they pointing in more or less the same direction or different directions?

<desmos-graph id="motivation" width="600px" height="600px" url="https://desmos.com/calculator/fczsrpeo75"></desmos-graph>

<div id="calculator" style="width: 600px; height: 400px;"></div>

  <script>
    // Create the embedded calculator
    const elt = document.getElementById("calculator");
    const myCalculator = Desmos.GraphingCalculator(elt);

    // The shared graph’s ID (from desmos.com/calculator/<ID>)
    const sharedId = "fczsrpeo75";

    // Fetch the JSON of that shared graph
    fetch(`https://www.desmos.com/calculator/${sharedId}`, {
      headers: {
        "Accept": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        const graphState = json.state;
        // Load it into the embedded calculator
        myCalculator.setState(graphState);
      })
      .catch(err => {
        console.error("Could not load Desmos graph JSON:", err);
      });
  </script>

It looks like the vectors are pointing away. But here they are pointing together.

<
u=(2,1) and v=(1,1) 


And here is perpendicular vectors.

<
u=(-1,1) and v=(1,1) 
>

How can we put numbers to this? 
Projecting onto a line
The idea with this approach is that we will measure how much one vector lies in the direction of another. This geometrically looks like projecting one vector onto another. This is what we're going for. 

<
Graph of projecting u onto v and noting what we want to do. Hide equations. 
>

Unit Vectors
To begin, consider the unit vectors v hat and i hat. 

