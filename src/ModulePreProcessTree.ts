import path from 'path'
import visit from 'unist-util-visit'
import {OptionsCode} from "./InterfaceOptionsCode"
import preProcessOptions from "./ModulePreProcessOptions"
import embedCode from "./ModuleEmbebedCode"

/**
 * @description Evaluates nodes and sends positive candidates for resolution
 * @param tree
 * @param file
 * @param options
 * @constructor
 */
const ProcessTree = (tree: any, file: any, options: OptionsCode) => {
    try {
        let localOptions = preProcessOptions(options)
        localOptions.subdirectory = localOptions.subdirectory ? path.dirname(file.path) + localOptions.subdirectory : path.dirname(file.path)
        visit(tree, 'text', function (node: { type: string, value: string, lang: string }) {
            const {value} = node

            if (value && value.startsWith('<!--') && value.includes(localOptions.embedKey)) {
                embedCode(node, localOptions)
            }
        })
        visit(tree, 'inlineCode', function (node: { type: string, value: string, lang: string }) {
            const {value} = node
            if (value.includes(localOptions.embedKey)) {
                embedCode(node, localOptions)
            }
        })
    }catch(err) {
        console.log(err)
    }
}


export default ProcessTree


