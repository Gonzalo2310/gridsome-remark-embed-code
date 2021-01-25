import {nodeRecept} from "./InterfaceNode"
import {OptionsCode} from "./InterfaceOptionsCode"
import processNode from "./ModuleProcessNode"
import processContent from "./ModuleProcessContent"
import searchLang from './ModuleSearchLang'
import trimCode from "./ModuleTrimCode"
import fs from 'fs'

/**
 * @description Solve the node.
 * @param node
 * @param localOptions
 * @return nodeRecept
 */
const embedCode = (node:nodeRecept, localOptions:OptionsCode) => {
        if (!fs.existsSync(localOptions.subdirectory)) {
            throw Error(`Invalid directory specified "${localOptions.subdirectory}"`)
        }
        let filename = processNode(node, localOptions)
        const code = processContent(fs.readFileSync(localOptions.subdirectory + filename, 'utf8').trim(), node, localOptions)
        const lang = searchLang(node, filename)

        node.type = 'code'
        node.value = trimCode(code)
        node.lang = lang
        return node
}

export default embedCode
