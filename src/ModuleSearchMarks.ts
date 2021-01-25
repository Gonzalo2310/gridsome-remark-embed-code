/**
 * @description Cleans the chain of possible end marks
 * @param search_mark
 * return string
 */
const searchMarks = (search_mark:string):string => {
    const final_comment = search_mark.indexOf('`')
    const final_comment_html = search_mark.indexOf('-->')
    if (final_comment > -1) {
        search_mark = search_mark.substring(0, final_comment)
    }
    if (final_comment_html > -1) {
        search_mark = search_mark.substring(0, final_comment_html)
    }
 return search_mark
}

export default searchMarks
