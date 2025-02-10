import { glob } from "glob"
import path from "path"
import fs from "fs"


export default async function (eleventyConfig, options) {
    const copy = async _ => {
        const files = await glob(`${options.assetPath}/**/*.{${options.fileExts.join(',')}}`)

        for (const file of files) {
            const { dir, base } = path.parse(file)
            const outdir = path.join(options.generatedPath, dir)

            fs.mkdirSync(outdir, { recursive: true })
            fs.copyFileSync(file, path.join(options.generatedPath, dir, base))

            const source = path.join(options.generatedPath, dir, base)
            const target = path.join(dir, base)

            eleventyConfig.addPassthroughCopy({ [source]: target })
        }
    }

    await copy()

    eleventyConfig.on('eleventy.after', copy)
}
