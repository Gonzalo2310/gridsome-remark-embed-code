import {OptionsCode} from "./InterfaceOptionsCode"

/**
 * @description Cuts the code snippet that is indicated from the file.
 * @param key
 * @param code
 * @param startKey
 * @param endKey
 * @return string
 */
const cutterSnippet = (key: string, code: string, {startKey, endKey}: OptionsCode): string => {
    if (key) {
        const regex = new RegExp(startKey + '\\s*:\\s*' + key, 'gm')
        const line = code.search(regex)
        if (line > -1) {
            const regex2 = new RegExp(endKey + '\\s*:\\s*' + key, 'gm')
            const line2 = code.search(regex2)
            if (line2 > -1) {
                let arrayCode = code.substring(line, line2).split('\n')
                arrayCode.splice(0, 1)
                arrayCode.splice(arrayCode.length - 1, 1)
                let codeReturn = ''
                arrayCode.forEach(item => {
                    if (item.indexOf(startKey) === -1 && item.indexOf(endKey) === -1) {
                        codeReturn += item + '\n'
                    }
                })
                return codeReturn
            }
        }
    }
    return ''
}

export default cutterSnippet
