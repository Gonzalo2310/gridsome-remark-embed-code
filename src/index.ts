import {OptionsCode} from "./InterfaceOptionsCode"
import ProcessTree from "./ModulePreProcessTree"

/**
 * @description main function
 * @param options
 */
module.exports = (options: OptionsCode) => {
    return async (tree: any, file: any) => ProcessTree(tree, file, options)
}
