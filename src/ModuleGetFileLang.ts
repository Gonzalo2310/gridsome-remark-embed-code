const EXT_TO_LANG_MAP:{[key: string]: string} = {
    md: 'markup',
    js: 'jsx',
    rb: 'ruby',
    ps1: 'powershell',
    sh: 'bash',
    bat: 'batch',
    py: 'python',
    psm1: 'powershell',
    tex: 'latex',
    h: 'c'
}

/**
 * @description Searches for the language according to the file extension when it is not specified.
 * @param file
 * @return string
 */
const getFileLang = (file:string):string => {
    if (!file || !file.includes('.')) {
        return ''
    }
    const extension = Array.isArray(file.split('.')) ? file.split('.').pop() : ''
    if (!extension ) return ''
    return EXT_TO_LANG_MAP.hasOwnProperty(extension.toLowerCase())
        ? EXT_TO_LANG_MAP[extension]
        : extension
}

export default getFileLang
