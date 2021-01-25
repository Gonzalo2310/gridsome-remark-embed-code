/**
 * @description Removes excessive spaces from the code fragment while respecting the original tabulation.
 * @param code
 * @return string
 */
const trimCode = (code:string):string => {
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

export default trimCode
