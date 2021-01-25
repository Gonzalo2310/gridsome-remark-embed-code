import {nextCharacter} from "./ModuleNextCharacter"
import getFileLang from "./ModuleGetFileLang"
import {nodeRecept} from "./InterfaceNode"
import searchMarks from "./ModuleSearchMarks"

/**
 * @description Looks to see if the language is defined in the node. If so it returns it, if not it returns the language resolved according to the file extension.
 * @param value
 * @param filename
 * @return string
 */
const searchLang = ({value}:nodeRecept, filename:string):string => {
    let lang = ''
    const regex = new RegExp('Lang\\s*:', '')
    const position_lang = value.search(regex)
    if (position_lang > -1) {
        let {character, position} = nextCharacter(value, position_lang + 4)
        if (character === ':') {
            lang = value.substring(position + 1).trim()
            lang = searchMarks(lang)
        }
    }
    return lang ? lang : getFileLang(filename)
}

export default searchLang
