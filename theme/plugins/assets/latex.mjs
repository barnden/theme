import fs from "fs"
import path from "path"
import util from "util"
import { minimatch } from "minimatch"

import { glob } from "glob"
import { exec } from "node:child_process"

const run = util.promisify(exec)

export async function renderSVG(file, options) {
    file = path.normalize(file)
    const { name, dir } = path.parse(file)

    const outdir = path.join(options.generatedPath, dir)
    const svg = path.join(outdir, `${name}.svg`)

    if (fs.existsSync(svg)) {
        const { mtime: svgTime } = fs.statSync(svg)
        const { mtime: texTime } = fs.statSync(file)

        if (svgTime >= texTime) {
            if (options?.verbosity === "debug")
                console.log(`[latex] Skipping ${file}.`)

            return
        }
    }

    console.log(`[latex] Rendering ${file}`)
    
    // FIXME: Tested only on macOS 15.3
    const regex = Object.entries(options?.sed?.substitutions ?? {}).map(([pattern, replace]) => `s:${pattern}:${replace.startsWith('--') ? "var(" + replace + ")" : replace}:g`).join(";")
    
    const libgs = options.dvisvgm?.libgs ? `LIBGS=${options.dvisvgm.libgs}` : ""
    const dvi = path.join(options.tempPath, `${name}.dvi`)
    const pdflatex = `latex -output-directory=${options.tempPath} ${file}`
    const dvisvgm = `${libgs} dvisvgm --exact --no-font --output="${outdir}/%f" "${dvi}"`
    const sed = `${options.sed?.gsed ? "g" : ""}sed -i '${regex}' "${svg}"`
    
    try {
        await fs.mkdir(outdir, { recursive: true }, err => err ? console.error(err) : null)
        
        await run(pdflatex)
        await run(dvisvgm)
        await run(sed)
    } catch (error) {
        console.error(`[latex] Error compiling ${file}: ${error}`)
    }
}

export default async function (eleventyConfig, options) {
    const pattern = `${options.assetPath}/**/*.tex`
    const files = await glob(pattern)
    const paths = new Set(files.map(e => path.resolve(e)))

    const addPassthrough = async (file) => {
        const { name, dir } = path.parse(file)
        const svg = path.join(options.generatedPath, dir, `${name}.svg`)

        if (!fs.existsSync(svg))
            await renderSVG(file, options)

        eleventyConfig.addPassthroughCopy({ [svg]: path.join(dir, `${name}.svg`) })
    }

    files.forEach(addPassthrough)

    eleventyConfig.on('eleventy.before', async ({ runMode }) => {
        if (runMode != "build")
            return

        for (const file of files)
            await renderSVG(file, options)
    })

    eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
        for (const changedFile of changedFiles) {
            const normalizedFile = path.normalize(changedFile)
            const file = path.resolve(changedFile)

            if (!minimatch(normalizedFile, pattern))
                continue

            if (!paths.has(file)) {
                paths.add(file)
                addPassthrough(normalizedFile)

                continue
            }

            await renderSVG(normalizedFile, options)
        }
    })
}