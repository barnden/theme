import fs from "fs"
import path from "path"
import * as sass from "sass"
import { glob } from "glob"
import { minimatch } from "minimatch"

async function compile(source, output, silenceDeprecations = []) {
    if (fs.existsSync(output)) {
        const { mtime: outputTime } = fs.statSync(output)
        const { mtime: sourceTime } = fs.statSync(source)

        if (outputTime >= sourceTime)
            return
    }

    console.log(`[styles] Compiling ${output}`)
    const result = await sass.compileAsync(source)

    fs.writeFileSync(output, result.css)
}

async function getFiles(eleventyConfig, options) {
    const { assetPath, generatedPath } = options

    const globbed = (await Promise.all(options.files.map(file => glob(file)))).flat()
    const entries = globbed.map(file => {
        const { dir, name: filename } = path.parse(file)

        const stem = path.join(...dir.split(path.sep).filter((value, idx) => idx != 0 && !value.startsWith("_")))

        const outputPath = path.join(generatedPath, stem)
        const outputFile = path.join(outputPath, `${filename}.css`)
        const serveFile = path.join(assetPath, stem, `${filename}.css`)

        fs.mkdirSync(outputPath, { recursive: true })
        eleventyConfig.addPassthroughCopy({ [outputFile]: serveFile })

        if (!minimatch(file, `${options.assetPath}/**`)) {
            eleventyConfig.addWatchTarget(file)
        }

        return [path.resolve(file), outputFile] 
    })

    return Object.fromEntries(entries)
}

export default async function (eleventyConfig, options) {
    // FIXME: Handle file creation
    const styles = await getFiles(eleventyConfig, options)

    const compileAll = async () => await Promise.all(Object.entries(styles).map(entry => compile(...entry)))

    await compileAll()

    eleventyConfig.on('eleventy.after', async ({ runMode }) => {
        if (runMode != "build")
            return

        await compileAll()
    })

    eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
        for (const changedFile of changedFiles) {
            const file = path.resolve(changedFile)

            if (!styles.hasOwnProperty(file))
                continue

            await compile(file, styles[file])
        }
    })
}