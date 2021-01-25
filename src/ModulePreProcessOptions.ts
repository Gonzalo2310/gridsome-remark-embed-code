import {OptionsCode} from "./InterfaceOptionsCode";

/**
 * @description Resolves plugin options
 * @param options
 * @return options
 */
const preProcessOptions = (options: OptionsCode):OptionsCode => {
    return {
        subdirectory: preProcessDirectory(options.subdirectory),
        embedKey: preProcessStringOptionsKeys(options.embedKey, 'embed'),
        startKey: preProcessStringOptionsKeys(options.startKey, 'gridsome_start'),
        endKey: preProcessStringOptionsKeys(options.endKey, 'gridsome_end'),
        separator: preProcessSeparator(options.separator),
        separatorKeyStart: preProcessStringOptionsKeys(options.separatorKeyStart, '{'),
        separatorKeyEnd: preProcessStringOptionsKeys(options.separatorKeyEnd, '}'),
        separatorSymbol: preProcessStringOptionsKeys(options.separatorSymbol, '#')
    }
}
/**
 * @description Resolves the folder configured in the plugin options.
 * @param directory
 *
 * @return string
 */
const preProcessDirectory = (directory: string):string => {
    const regex = /[/\s][\s/]/gm
    if (directory) {
        directory.trim()
        const char1 = directory.charAt(0)
        const char2 = directory.charAt(1)
        switch(char1) {
            case '/':
                break
            case '.':
                if (char2=== '/') directory=directory.substring(1)
                else directory='/' + directory.substring(1)
                break

        }
        if (directory.charAt(directory.length - 1) !== '/') directory += '/'
        directory = directory.replace(regex, '/')
    }
    return directory
}

/**
 * @description Resolves string options by removing spaces and if it does not exist, assigning a default value.
 * @param option
 * @param optionDefault
 *
 * @return string
 */
const preProcessStringOptionsKeys = (option: string, optionDefault: string): string => {
    if (!option || option.trim().indexOf(' ') > -1) {
        return  optionDefault
    }
    return option.trim()
}
/**
 * @description Resolves the separator option that can have only two possible values
 * @return string
 * @param separator
 */
const preProcessSeparator = (separator: string): string => {
    const cleanSeparator = preProcessStringOptionsKeys(separator, 'symbol')
    if (['symbol', 'key'].includes(cleanSeparator)) return cleanSeparator
    return 'symbol'
}

export default preProcessOptions
