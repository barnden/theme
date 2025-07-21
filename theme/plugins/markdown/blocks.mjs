// Mostly copied from markdown-it lib/rules_block/fence.mjs

export default function (md) {
    function tokenize(state, startLine, endLine, silent) {
        let pos = state.bMarks[startLine] + state.tShift[startLine]
        let max = state.eMarks[startLine]

        if (pos + 3 > max)
            return false

        const marker = state.src.charCodeAt(pos)

        if (marker !== 0x2B /* + */)
            return false

        // marker length
        let mem = pos
        pos = state.skipChars(pos, marker)

        let len = pos - mem
        if (len < 3)
            return false

        const markup = state.src.slice(mem, pos)
        const params = state.src.slice(pos, max)

        if (marker === 0x2B /* + */)
            if (params.indexOf(String.fromCharCode(marker)) >= 0)
                return false

        // found start; report success in validation
        if (silent)
            return true

        // look for end-of-block
        let nextLine = startLine
        let haveEndMarker = false

        while (true) {
            nextLine++

            // unclosed block autoclosed by end of document or end of parent
            if (nextLine >= endLine)
                break

            pos = mem = state.bMarks[nextLine] + state.tShift[nextLine]
            max = state.eMarks[nextLine]

            // non-empty line with negative indent (i.e. lists)
            if (pos < max && state.sCount[nextLine] < state.blkIndent)
                break

            if (state.src.charCodeAt(pos) !== marker)
                continue

            // closing fence should be indented by fewer than 4 spaces
            if (state.sCount[nextLine] - state.blkIndent >= 4)
                continue

            pos = state.skipChars(pos, marker)

            // closing code fense must be at least as long as the opening one
            if (pos - mem < len)
                continue

            // tail has spaces only
            pos = state.skipSpaces(pos)

            if (pos < max)
                continue

            haveEndMarker = true
            break
        }

        // If a fence has heading spaces, they should be removed from its inner block
        len = state.sCount[startLine]

        state.line = nextLine + (haveEndMarker ? 1 : 0)

        const token = state.push('cblock', 'code', 0)
        token.info = params
        token.content = state.getLines(startLine + 1, nextLine, len, true)
        token.markup = markup
        token.map = [startLine, state.line]

        return true
    }

    md.block.ruler.after("fence", "cblock", tokenize)
    md.renderer.rules["cblock"] = (tokens, idx, options) => {
        const { info, content } = tokens[idx]
        let parsedContent = content

        const args = info.split(' ')
        const classes = args[0].replaceAll('.', ' ')
        const type = classes[0]
        const title = md.render(args.slice(1).join(' ')).trim()

        switch (type) {
            // TODO: Add anchors and references for theorems, lemma, proof, etc. blocks.
            case "algorithm":
                parsedContent = content
                    .replaceAll(/(?<!(?:\w|#.*|\\))(break|continue|while|def|function|return|yield|then|not|is|or|for\ all|for|if|else|in|of|do)(?!\w)/g, "**$1**")
                    .replaceAll(/(\s+)\:=(\s+)/g, "$1$$\\leftarrow$$$2")
                    .replaceAll(/(^|\s)\#(.*)/g, `$1*\\# $2*{style="color: var(--black-140);font-style: normal;"}`)
                    .replaceAll(/(?<!(?:\w|#.*|\\))(true|false|undefined)(?!\w)/g, `*$1*{style="color: var(--blue);font-style: normal;"}`)
                    .replaceAll(/(?<!(?:\w|#.*|\\))(<>)(?!\w)/g, `*$1*{style="color: var(--green);font-style: normal;"}`)
                break

            default:
                break
        }

        let result = `<div class="bgn-block ${classes}">`

        if (title.length > 0)
            result += `<h4>${title}</h4>`
        
        result += `<div>${md.render(parsedContent)}</div></div>`

        return result
    }
}