import fs from "fs"

import latex from "./assets/latex.mjs"
import styles from "./assets/styles.mjs"
import staticAssets from "./assets/static.mjs"

export default function (eleventyConfig, options) {
    eleventyConfig.addWatchTarget(options.assets.assetPath)
    fs.mkdirSync(options.assets.tempPath, { recursive: true })

    eleventyConfig.addPlugin(latex, { ...options.assets, ...options.latex })
    eleventyConfig.addPlugin(styles, { ...options.assets, ...options.scss })
    eleventyConfig.addPlugin(staticAssets, { ...options.assets, ...options.staticAssets })
}