import {nodeRecept} from "./InterfaceNode"
import {OptionsCode} from "./InterfaceOptionsCode"
import cutterSnippet from "./ModuleCutterSnippet"
import searchMarks from "./ModuleSearchMarks"

/**
 * @description Depending on the selected method, it searches for the keyword to send it to the function that will cut the corresponding code.
 * @param code
 * @param value
 * @param localOptions
 * @return string
 */
const processContent = (code:string, {value}:nodeRecept, localOptions:OptionsCode):string => {
    if (localOptions.separator === 'key') {
        const key_in_name = value.indexOf(localOptions.separatorKeyStart)
        if (key_in_name > -1) {
            const key_final_in_name = value.indexOf(localOptions.separatorKeyEnd)
            if (key_final_in_name !== -1) {
                const dif = key_final_in_name - key_in_name
                return cutterSnippet(value.substring(key_in_name + 1, key_in_name + dif), code, localOptions)
            }
        }
        return code
    }
    if (localOptions.separator === 'symbol') {
        const key_in_name = value.indexOf(localOptions.separatorSymbol)
        if (key_in_name === -1) {
            return code
        }
        let search_mark = value.substring(key_in_name + 1)
        const final_comment_space = search_mark.indexOf(' ')
        if (final_comment_space > -1) {
            search_mark = search_mark.substring(0, final_comment_space)
        }
        search_mark = searchMarks(search_mark)

        return cutterSnippet(search_mark, code, localOptions)
    }
    return code
}

export default processContent
