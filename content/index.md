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

Nulla tincidunt sit amet diam ut elementum. 

Fusce fermentum feugiat quam id consequat. Morbi eu orci ipsum. Proin eu interdum odio, scelerisque viverra odio. Sed tincidunt cursus ante, non tempor massa ornare sit amet. Aenean ut rhoncus lectus. Proin eleifend magna nec elementum dictum. Fusce malesuada et ante nec mollis. Praesent pulvinar aliquet massa non eleifend. Donec erat dui, sagittis id maximus vitae, convallis sit amet enim. Pellentesque eu arcu vitae nunc placerat luctus. Sed pellentesque lobortis mi ac condimentum.

## LaTeX to SVG

Fusce scelerisque sit amet purus accumsan fringilla. In nec elit nibh. Curabitur vestibulum purus vestibulum, ullamcorper magna vel, lobortis est. Integer eu dapibus mi, in semper felis. Etiam a quam commodo, tempor nunc non, blandit mi.

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

Nulla `ac magna` sit amet libero interdum ultrices. Fusce vel dictum eros, et venenatis lacus. Aenean eu consectetur turpis. Quisque vitae tincidunt dolor. Morbi et enim massa. Donec vel lorem velit. Ut pulvinar neque sit amet tortor eleifend, quis aliquet magna porttitor. Curabitur convallis ut nulla vel dignissim. Sed venenatis turpis eget tincidunt tempor. Sed sit amet purus ut justo pharetra tincidunt dictum et eros.

## Phasellus eu dictum felis

Sed ornare nisl eu tortor scelerisque hendrerit. Integer nisi velit, feugiat at elementum at, congue et diam. Integer a ipsum in odio pellentesque egestas. Sed aliquam ipsum a ultricies eleifend. Cras viverra tortor ipsum, in sagittis velit suscipit sed. Pellentesque eget pellentesque orci. Donec at ante eu nunc fringilla ornare at pharetra nulla. Suspendisse eget efficitur odio, in elementum urna. Vestibulum commodo ullamcorper risus, a sollicitudin diam ultrices at. Donec quis eros velit. Praesent faucibus tellus metus, vitae maximus lacus pharetra eu. Praesent blandit hendrerit venenatis. Curabitur aliquam sollicitudin elit non feugiat. Aliquam imperdiet ac lorem a lacinia. Cras scelerisque, urna eu suscipit sodales, odio turpis porttitor lectus, in blandit lorem nulla ut purus. Sed euismod ut tellus quis iaculis.

## Morbi at ligula nisl

In vehicula purus et elit varius, non tincidunt urna faucibus. Nam convallis non dolor id molestie. Cras eu accumsan mauris. Donec elementum justo vel elit porttitor ultrices. Aenean nec quam ornare, fermentum sapien a, consectetur lacus. Donec suscipit sagittis enim, bibendum molestie nunc malesuada luctus. Nulla sed urna eget ex euismod ultrices id id ante. Integer porta lorem eget nisl venenatis, eget cursus mi scelerisque. Suspendisse iaculis massa non lacinia porttitor. Praesent et elit hendrerit, mattis eros eget, placerat justo. Ut efficitur nulla sit amet quam egestas accumsan.

###  Aliquam eget enim enim.

Ut sed tristique ipsum, non aliquet urna. Mauris nec rhoncus ex. Donec faucibus iaculis lorem, ac accumsan nibh lobortis id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc feugiat velit posuere, iaculis velit id, sollicitudin ligula. Cras porta, massa id blandit laoreet, diam mi varius erat, in tincidunt tortor ligula eget velit. Vivamus a erat odio. Nam sit amet sagittis est, quis elementum turpis.

Mauris nibh ipsum, vehicula sed lobortis a, euismod quis libero. Ut metus nisi, suscipit id elit vel, efficitur pulvinar urna. Donec ultricies et libero eu molestie. Etiam at enim mattis est gravida lobortis eu eu ipsum. Cras semper malesuada mauris a ornare. Nam semper enim in egestas fermentum. Morbi lobortis est vulputate pulvinar blandit. Sed egestas, nisl quis dignissim luctus, ex odio posuere nisl, at auctor nunc diam vitae mi.