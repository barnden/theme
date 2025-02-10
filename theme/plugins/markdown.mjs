import katex from "@vscode/markdown-it-katex"
import anchor from "markdown-it-anchor"
import footnote from "markdown-it-footnote"
import attrs from "markdown-it-attrs"
import blocks from "./markdown/blocks.mjs"

export default async function (eleventyConfig, options = {}) {
    eleventyConfig.amendLibrary("md", mdLib => {
        mdLib.use(katex.default, { strict: false, trust: true, errorColor: " #cc0000" })
        mdLib.use(footnote)
        mdLib.use(attrs)
        mdLib.use(blocks)
        mdLib.use(anchor, {
            ...(options?.anchor ?? {}), permalink: anchor.permalink.linkInsideHeader({
                placement: "before",
                symbol: "§"
            })
        })

        mdLib.renderer.rules.table_open = function () {
            return '<table class="table table-hover">\n'
        }
    })
}