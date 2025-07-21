import assets from "./theme/plugins/assets.mjs"
import filters from "./theme/plugins/filters.mjs"
import markdown from "./theme/plugins/markdown.mjs"
import shiki from "./theme/plugins/shiki.mjs"
import shortcode from "./theme/plugins/shortcode.mjs"

import { EleventyRenderPlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy"

export const config = {
    dir: {
        input: "content",
        output: "__site",
        includes: "../_includes",
        layouts: "../theme/_layouts",
        data: "../_data"
    }
}

export default function (eleventyConfig) {
    const assetConfig = {
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
                    "#f00": "--red",
                    "#800080": "--background",
                    "#0f0": "--green",
                    "#00f": "--blue"
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
    }

    eleventyConfig.addPlugin(assets, assetConfig)

    eleventyConfig.addPlugin(markdown, { anchor: { level: 2 } })
    eleventyConfig.addPlugin(shiki, { theme: "synthwave-84" })
    eleventyConfig.addPlugin(filters)
    eleventyConfig.addPlugin(shortcode, { svg: { ...assetConfig.assets, ...assetConfig.latex } })

    eleventyConfig.addPlugin(EleventyRenderPlugin)
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)

    eleventyConfig.addUrlTransform(page => {
        if (page.url.endsWith(".html"))
            return page.url.slice(0, -1 * ".html".length)
    })

    eleventyConfig.addNunjucksFilter("pageFromURL", (arr, url) => arr.find(item => item.url.slice(1, -1) == url))
}