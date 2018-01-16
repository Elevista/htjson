let _indent = '  '

function arrayToMap (arr, fn) {
  let ret = {}
  arr.forEach((v, k) => { ret[v] = fn(v, k) })
  return ret
}

let inlineTags = arrayToMap(['p', 'h1', 'h2', 'h3', 'h4', 'span', 'a', '$text', 'br'], x => true)

function judgeInline (obj) {
  if (obj instanceof Array) return true
  else if (obj instanceof Object) {
    let childLen = Object.keys(obj).filter(x => /^[^$_]/.test(x)).length
    if (!childLen) return true
    else if (childLen === 1) return !obj.$text
    return false
  } else return true
}

function normalizeChildren (node) {
  if (node instanceof Object) {
    let $tag = Object.keys(node).shift()
    if (node[$tag] instanceof Object) {
      if (node[$tag] instanceof Array) return normalize(node[$tag].slice(), $tag)
      else return normalize(Object.assign({}, node[$tag]), $tag)
    } else return normalize(node[$tag], $tag)
  } else return normalize(node, '$text')
}

function normalize (obj, $tag = '') {
  let $inline = judgeInline(obj, $tag) && !!inlineTags[$tag]
  if (!(obj instanceof Object)) obj = {$tag, $attrs: [], $text: obj}
  if (obj instanceof Array) obj = {$tag, $attrs: [], $: obj}
  if ($tag === '$text') return {$tag, $text: obj.$text}
  let ret = {$tag, $attrs: [], $children: [], $inline}
  for (let key of Object.keys(obj)) {
    let value = obj[key]
    switch (key[0]) {
      case '$':
        if (key.length === 1) {
          ret.$children.push(...obj.$.map(x => normalizeChildren(x)))
        }
        if (key === '$text') ret.$children.push({$tag: '$text', $text: value})
        break
      case '_':
        ret.$attrs.push([key.slice(1), value])
        break
      default:
        ret.$children.push(normalize(value, key))
    }
  }
  return ret
}

function compile (obj) {
  let {$tag: tag, $attrs: attrs = [], $text: text, $inline: inline, $children: children} = obj
  if (!tag) return compile(children[0])
  if (tag === '$text') return [text]
  let attr = attrs.length ? ' ' + attrs.map(([k, v]) => `${k}="${v}"`) : ''
  if (inline) return [`<${tag}${attr}>${text || children.map(x => compile(x)).join('')}</${tag}>`]
  return [
    `<${tag}${attr}>`,
    ...children.map(x => compile(x)),
    `</${tag}>`
  ]
}

function indenetTree (arr, depth = 0) {
  let indent = _indent.repeat(depth)
  if (!(arr instanceof Array)) return arr
  return arr.map(x => x instanceof Array ? indenetTree(x, depth + 1) : indent + x).join('\n')
}

const htjson = {
  compile (obj) {
    let normal = normalize(obj)
    let htmlTree = compile(normal)
    return indenetTree(htmlTree)
  }
}
Object.defineProperties(htjson, {
  indent: {
    set (v) { _indent = v },
    get () { return _indent }
  }
})

module.exports = module.exports.htjson = htjson
