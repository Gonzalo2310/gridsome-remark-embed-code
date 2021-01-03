/**
 * Thank to:
 Sam M. Manandhar (@mrinalini-m) Github: https://github.com/mrinalini-m
 for the code: https://github.com/mrinalini-m/gridsome-remark-embed-snippet
 that has been the basis for the development of this plugin.

 The const EXT_TO_LANG_MAP and the function getFileLang They have been kept the same as their code
 And the principal function y embedCode function they have been modified but would not be possible without their initial code.
 */

const fs = require(`fs`)
const path = require(`path`)
const visit = require('unist-util-visit')
//const normalize = require('normalize-path')

let localOptions = {}
const EXT_TO_LANG_MAP = {
  md: `markup`,
  js: `jsx`,
  rb: `ruby`,
  ps1: `powershell`,
  sh: `bash`,
  bat: `batch`,
  py: `python`,
  psm1: `powershell`,
  tex: `latex`,
  h: `c`,
}

const getFileLang = (file) => {
  if (!file.includes(`.`)) {
    return null
  }
  const extension = file.split(`.`).pop().toLowerCase()
  return EXT_TO_LANG_MAP.hasOwnProperty(extension)
    ? EXT_TO_LANG_MAP[extension]
    : extension
}
const nextCaracter = (line_string, position) => {
  const regex = /[^\d\s]/
  let line = line_string.substring(position)
  let character_position = line.search(regex)
  return {
    character: character_position > -1 ? line.charAt(character_position) : '',
    position: character_position + position
  }
}

const process_node = (node) => {
  const {value} = node
  let length_embed_key = localOptions.embedKey.length
  let position_embed_key = value.indexOf(localOptions.embedKey)
  let position_embed_key_final = 0
  let filename = ''
  if (position_embed_key > -1) {
    let {character, position} = nextCaracter(value, position_embed_key + length_embed_key)
    if (character === ':') {
      position_embed_key_final = position
      let regex = /[A-Za-z.\S]+/
      let filename_position = value.substring(position_embed_key_final + 1).search(regex)
      if (filename_position !== -1) {
        filename = value.substring(position_embed_key_final + 1 + filename_position).split(' ', 1)[0]
        if (filename.charAt(0) === '.' && filename.charAt(1) !== '.') {
          filename = filename.substring(1)
        }
        if (localOptions.separator === 'key') {
          let key_in_name = filename.indexOf(localOptions.separatorKeyStart)
          if (key_in_name > -1) {
            filename = filename.substring(0, key_in_name)
          }
        }

        if (localOptions.separator === 'symbol') {
          let key_in_name = filename.indexOf(localOptions.separatorSymbol)
          if (key_in_name > -1) {
            filename = filename.substring(0, key_in_name)
          }
        }

        if (!fs.existsSync(localOptions.directory + filename)) {
          throw Error(`Invalid snippet specified; no such file "${localOptions.directory + filename}"`)
        }
      }
    }
  }
  return filename
}
const cutterSnippet = (key, code) => {
  const regex = new RegExp(localOptions.startKey + '\\s*:\\s*' + key, 'gm')
  let line = code.search(regex)
  if (line > -1) {
    const regex2 = new RegExp(localOptions.endKey + '\\s*:\\s*' + key, 'gm')
    let line2 = code.search(regex2)
    if (line2 > -1) {
      let arrayCode = code.substring(line, line2).split('\n')
      arrayCode.splice(0, 1)
      arrayCode.splice(arrayCode.length - 1, 1)
      let code_return = ''
      arrayCode.forEach(item => {
        if (item.indexOf(localOptions.startKey) === -1 && item.indexOf(localOptions.endKey) === -1) {
          code_return += item + '\n'
        }
      })
      return code_return
    }
  }
  return code
}

const processContent = (code, {value}) => {
  if (localOptions.separator === 'key') {
    let key_in_name = value.indexOf(localOptions.separatorKeyStart)
    if (key_in_name > -1) {
      let key_final_in_name = value.indexOf(localOptions.separatorKeyEnd)
      if (key_final_in_name === -1) {
        return code
      }
      let dif = key_final_in_name - key_in_name
      return cutterSnippet(value.substring(key_in_name + 1, key_in_name + dif), code)
    } else {
      return code
    }
  }
  if (localOptions.separator === 'symbol') {
    let key_in_name = value.indexOf(localOptions.separatorSymbol)
    if (key_in_name === -1) {
      return code
    }
    let search_mark = value.substring(key_in_name + 1)
    let final_comment = search_mark.indexOf('`')
    let final_comment_html = search_mark.indexOf('-->')
    let final_comment_space = search_mark.indexOf(' ')
    if (final_comment > -1) {
      search_mark = search_mark.substring(0, final_comment)
    }
    if (final_comment_html > -1) {
      search_mark = search_mark.substring(0, final_comment_html)
    }
    if (final_comment_space > -1) {
      search_mark = search_mark.substring(0, final_comment_space)
    }
    return cutterSnippet(search_mark, code)
  }

  return code
}

const searchLang = ({value}, filename) => {
  let lang = ''
  const regex = new RegExp('Lang\\s*:', '')
  let position_lang = value.search(regex)
  if (position_lang > -1) {
    let {character, position} = nextCaracter(value, position_lang + 4)
    if (character === ':') {
      lang = value.substring(position + 1).trim()
      let final_comment = lang.indexOf('`')
      let final_comment_html = lang.indexOf('-->')
      if (final_comment > -1) {
        lang = lang.substring(0, final_comment)
      }
      if (final_comment_html > -1) {
        lang = lang.substring(0, final_comment_html)
      }
    }
  }
  return lang ? lang : getFileLang(filename)
}

const trimCode = (code) => {
  const regex = new RegExp('^\\S', '')
  if (code.search(regex) === -1) {
    const regexSpaces = new RegExp('\\S')
    const limit = code.search(regexSpaces)
    const tmpArray = code.split('\n')
    if (limit !== -1) {
      tmpArray.forEach((item, index) => tmpArray[index] = item.slice(limit))
    }
    code = tmpArray.join('\n')
  }
  return code
}

const embedCode = (node) => {
  try {
    if (!fs.existsSync(localOptions.directory)) {
      throw Error(`Invalid directory specified "${localOptions.directory}"`)
    }
    let filename = process_node(node)
    const code = processContent(fs.readFileSync(localOptions.directory + filename, 'utf8').trim(), node)
    const lang = searchLang(node, filename)
    node.type = 'code'
    node.value = trimCode(code)
    node.lang = lang
  } catch (error) {
    console.log(error)
    throw error
  }
}

const preprocessOptions = (options) => {
  let directory = options.subdirectory || ''
  let embedKey = options.embedKey || 'embed'
  let startKey = options.startKey || 'gridsome_start'
  let endKey = options.endKey || 'gridsome_end'
  let separator = options.separator || 'symbol'
  let separatorKeyStart = options.separatorKeyStart || '{'
  let separatorKeyEnd = options.separatorKeyEnd || '}'
  let separatorSymbol = options.separatorSymbol || '#'

  if (directory) {
    let temp_directory = directory.trim()
    if (temp_directory.charAt(0) !== '/') {
      temp_directory = '/' + temp_directory
    }
    if (temp_directory.charAt(temp_directory.length - 1) !== '/') {
      temp_directory += '/'
    }
    directory = temp_directory
  }
  embedKey = embedKey.trim()
  if (embedKey.indexOf(' ') > -1) {
    embedKey = 'embed'
  }
  startKey = startKey.trim()
  endKey = endKey.trim()
  if (separator.indexOf('symbol') === -1 && separator.indexOf('key') === -1) {
    separator = 'symbol'
  }

  return {
    directory,
    embedKey,
    startKey,
    endKey,
    separator,
    separatorKeyStart,
    separatorKeyEnd,
    separatorSymbol
  }
}

module.exports = (options) => {
  return async (tree, file) => {
    localOptions = preprocessOptions(options)
    localOptions.directory = localOptions.directory ? path.dirname(file.path) + localOptions.directory : path.dirname(file.path)

    visit(tree, (node) => {
      const {value} = node

      if (value && value.startsWith('<!--') && value.includes(localOptions.embedKey)) {
        embedCode(node)
      }
    })
    visit(tree, 'inlineCode', (node) => {
      const {value} = node
      if (value.includes(localOptions.embedKey)) {
        embedCode(node)
      }
    })

  }
}
