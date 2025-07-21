import jsonify from "./shortcodes/jsonify.mjs"
import svg from "./shortcodes/svg.mjs"

export default function (eleventyConfig, options={}) {
    eleventyConfig.addPlugin(jsonify)
    eleventyConfig.addPlugin(svg, options?.svg ?? {})
}