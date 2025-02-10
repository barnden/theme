---
title: Vestibulum ut magna nibh
math: true
showToC: true
---

## KaTeX

Sed eu lorem eget orci ullamcorper placerat. Nullam non lectus mauris. Suspendisse felis nisl, porta vel erat non, tristique iaculis arcu. Integer ut placerat tellus. Duis eleifend pharetra est, non varius mauris viverra vel. Mauris accumsan, nisi sit amet mattis iaculis, sem sapien malesuada elit, sit amet hendrerit enim justo et augue. $\Gamma(z) : \{z \in \mathbb{C}\ |\ \mathfrak{R}(z) > 0\} \to \mathbb{C}$

$$
\Gamma(z) = \int_{0}^{\infty} t^{z - 1}e^{-t}\,\mathrm{d}t
$$

## LaTeX to SVG

{% svg "particle-cloth.svg" %}

## Code

```js
eleventyConfig.addPlugin(assets, {
    assets: {
        assetPath: "assets",
        generatedPath: "__generated",
        tempPath: "__tmp",
    },
    latex: {
        dvisvgm: { libgs: "/opt/homebrew/lib/libgs.dylib" },
        sed: {
            gsed: true,
            substitutions: {
                "#a4dded": "--foreground",
                "#ff8000": "--orange",
                "#f00":    "--red",
                "#800080": "--background",
                "#0f0":    "--green",
                "#00f":    "--blue"
            }
        },
    },
    scss: {
        files: [
            "theme/_styles/bundle.scss",
            "assets/**/*.scss",
        ],
    },
    staticAssets: {
        fileExts: ["vs", "fs", "glsl", "js", "svg", "css"],
    }
})
```

Nulla `ac magna` sit amet libero interdum ultrices. Fusce vel dictum eros, et `venenatis` lacus.

## Blocks

### Color Block

+++white white

Ut sed tristique ipsum, non aliquet urna. Mauris nec rhoncus ex. Donec faucibus iaculis lorem, ac accumsan nibh lobortis id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc feugiat velit posuere, iaculis velit id, sollicitudin ligula.
+++

+++purple purple

Cras semper malesuada mauris a ornare. Nam semper enim in egestas fermentum. Morbi lobortis est vulputate pulvinar blandit. Sed egestas, nisl quis dignissim luctus, ex odio posuere nisl, at auctor nunc diam vitae mi.
+++

+++pink pink

Cras porta, massa id blandit laoreet, diam mi varius erat, in tincidunt tortor ligula eget velit. Vivamus a erat odio. Nam sit amet sagittis est, quis elementum turpis. Suspendisse iaculis massa non lacinia porttitor. Praesent et elit hendrerit, mattis eros eget, placerat justo. Ut efficitur nulla sit amet quam egestas accumsan.
+++

+++red red

Donec suscipit sagittis enim, bibendum molestie nunc malesuada luctus. Nulla sed urna eget ex euismod ultrices id id ante. Integer porta lorem eget nisl venenatis, eget cursus mi scelerisque.
+++

+++orange orange

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam mollis lorem quis venenatis sollicitudin. Nunc dolor nulla, placerat et dolor non, auctor dapibus massa. Morbi non blandit ex. Vestibulum lobortis nisl sed nisi vulputate, at molestie enim pharetra.
+++

+++yellow yellow

Ut dictum at magna non interdum. Donec rutrum tortor volutpat molestie luctus. Cras commodo, eros eu cursus commodo, leo neque facilisis ante, quis porta nunc ligula nec orci. Aliquam et nibh volutpat, mattis nisi id, mollis nisi. In ac elementum libero. Aliquam venenatis elementum purus nec pellentesque.
+++

+++green green

Sed sollicitudin lorem tempus, tempor est sit amet, pharetra augue. Mauris faucibus lacus ut risus dictum eleifend. Suspendisse lectus odio, mattis vitae tempus quis, varius sed neque. Sed eget diam malesuada, malesuada eros nec, pretium nibh. Pellentesque elementum felis vel posuere faucibus. Sed a ipsum elit.
+++

+++blue blue

Aenean eu consectetur turpis. Quisque vitae tincidunt dolor. Morbi et enim massa. Donec vel lorem velit. Ut pulvinar neque sit amet tortor eleifend, quis aliquet magna porttitor. Curabitur convallis ut nulla vel dignissim. Sed venenatis turpis eget tincidunt tempor. Sed sit amet purus ut justo pharetra tincidunt dictum et eros.
+++

+++teal teal

Aenean nec odio sem. Donec placerat, libero id dignissim posuere, leo justo vehicula massa, in scelerisque leo sem volutpat augue. Praesent vel sodales odio. Fusce scelerisque vehicula cursus. Vivamus ornare massa ac dolor ultricies, vitae egestas felis lacinia. Praesent rutrum nisl felis, vel luctus mi bibendum nec. 
+++

+++cyan cyan

Vestibulum nec venenatis dui, quis imperdiet ante. In nec nunc velit. Nam ullamcorper, ante at semper suscipit, mi felis fermentum nibh, eu maximus dolor eros et lacus. Ut vitae vestibulum ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
+++


+++indigo indigo

Mauris nibh ipsum, vehicula sed lobortis a, euismod quis libero. Ut metus nisi, suscipit id elit vel, efficitur pulvinar urna. Donec ultricies et libero eu molestie. Etiam at enim mattis est gravida lobortis eu eu ipsum.
+++


### Quote
> And now I see with eye serene
>
> The very pulse of the machine

### Algorithm Pseudocode

+++algorithm Montgomery Ladder
- # Inputs: base $g$, binary expansion $A = \{A_i\}_{i=0}^{m}$ of $g$
- function MontgomeryLadder($g$, $A$)
    - $x_1$ := $g$
    - $x_2$ := $g^2$
    - &nbsp;
    - for $i$ in $\{m - 2, \dots, 0\}$ do
        - if $A_i \equiv 0$ then
            - $x_2$ := $x_1 * x_2$
            - $x_1$ := $x_1^2$
        - else
            - $x_1$ := $x_1 * x_2$
            - $x_2$ := $x_2^2$
    - &nbsp;
    - return $x_1$
+++
