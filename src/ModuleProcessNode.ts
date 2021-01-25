import {nodeRecept} from './InterfaceNode'
import {OptionsCode} from "./InterfaceOptionsCode"
import {nextCharacter} from "./ModuleNextCharacter"
import fs from 'fs'

/**
 * @description Find and resolve the file where the code snippet is located.
 * @param value
 * @param embedKey
 * @param separator
 * @param separatorKeyStart
 * @param separatorSymbol
 * @param subdirectory
 * @return string
 */
const processNode = ({value}: nodeRecept, {embedKey, separator, separatorKeyStart, separatorSymbol, subdirectory}: OptionsCode):string => {
    const length_embed_key = embedKey.length
    const position_embed_key = value.indexOf(embedKey)
    let filename = ''
  if (position_embed_key > -1) {
        const {character, position } = nextCharacter(value, position_embed_key + length_embed_key)
      if (character === ':') {
            const regex = /[A-Za-z.\S]+/
            const filename_position = value.substring(position + 1).search(regex)
            if (filename_position !== -1) {
                filename = value.substring(position + 1 + filename_position).split(' ', 1)[0]
                if (filename.charAt(0) === '.' && filename.charAt(1) !== '.') {
                    filename = filename.substring(1)
                }
                if (separator === 'key') {
                    const key_in_name = filename.indexOf(separatorKeyStart)
                    if (key_in_name > -1) {
                        filename = filename.substring(0, key_in_name)
                    }
                }

               if (separator === 'symbol') {
                    const key_in_name = filename.indexOf(separatorSymbol)
                    if (key_in_name > -1) {
                        filename = filename.substring(0, key_in_name)
                    }
                }

                if (!fs.existsSync(subdirectory + filename)) {
                    throw Error(`Invalid snippet specified; no such file "${subdirectory + filename}"`)
                }
            }
        }
    }
    return filename
}

export default processNode
