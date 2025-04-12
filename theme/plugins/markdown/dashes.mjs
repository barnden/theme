/**
 * Adds support for converting "--" to endash and "---" to emdash
 */

export default function (md) {
    function tokenize(state, silent) {
        let { pos } = state
        let ch = state.src.charCodeAt(pos)

        if (ch !== 0x2D /* - */)
            return false

        const start = pos
        const max = state.posMax

        while (pos < max && ch == 0x2D /* - */) {
            ch = state.src.charCodeAt(++pos)
        }

        const marker = state.src.slice(start, pos)
        const length = marker.length

        if (length != 2 && length != 3)
            return false

        if (ch != 0x09 && ch != 0x20)
            return false

        state.pos = pos

        if (silent)
            return true

        const dashType = length == 2 ? "ndash" : "mdash"
        const token = state.push(`dash_inline`, '', 0)
        token.markup = marker
        token.content = `&${dashType};`
        token.info = dashType

        return true
    }

    md.inline.ruler.after("emphasis", "dash", tokenize)
    md.renderer.rules["dash_inline"] = (tokens, idx, options) => {
        const { info } = tokens[idx]
        return `&${info};`
    }
}