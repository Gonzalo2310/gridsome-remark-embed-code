import cutterSnippet from "../src/ModuleCutterSnippet"
import {OptionsCode} from "../src/InterfaceOptionsCode"

const options: Array<OptionsCode> = [
    {
        subdirectory: '',
        embedKey: '',
        startKey: 'gridsome_start',
        endKey: 'gridsome_end',
        separator: '',
        separatorKeyStart: '',
        separatorKeyEnd: '',
        separatorSymbol: ''
    },
    {
        subdirectory: '',
        embedKey: '',
        startKey: 'start',
        endKey: 'end',
        separator: '',
        separatorKeyStart: '',
        separatorKeyEnd: '',
        separatorSymbol: ''
    }
]
const optionsCode: Array<string> = [
    '<form>\n' +
    '   <div class="form-group">\n' +
    '      <label for="exampleInput">JQuery input simple</label>\n' +
    '      <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
    '     <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
    '   </div>\n' +
    '   <div>\n' +
    '     <span id="contenido"></span>\n' +
    '   </div>\n' +
    '</form>',

    ' <!-- gridsome_start: input -->\n' +
    ' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
    ' <!-- gridsome_end: input -->\n' +
    ' <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
    ' </div>\n' +
    ' <!-- start: span -->\n' +
    ' <div>\n' +
    '   <span id="contenido"></span>\n' +
    ' </div>\n' +
    ' <!-- end: span -->',

    ' <!-- start: input -->\n' +
    ' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
    ' <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
    ' </div>\n' +
    ' <!-- start: span -->\n' +
    ' <div>\n' +
    '   <span id="contenido"></span>\n' +
    ' </div>\n' +
    ' <!-- end: span -->\n'+
    ' <!-- end: input -->'
]

test('Cutter Snippets. normal.', () => {
    expect(cutterSnippet('input', optionsCode[1], options[0])).toStrictEqual(' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n')
})

test('Cutter Snippets. change startKey and endKey', () => {
    expect(cutterSnippet('span', optionsCode[1], options[1])).toStrictEqual(' <div>\n' +
        '   <span id="contenido"></span>\n' +
        ' </div>\n')
})

test('Cutter Snippets. No code word.', () => {
    expect(cutterSnippet('', optionsCode[1], options[0])).toStrictEqual('')
})

test('Cutter Snippets. No keyword + key combination', () => {
    expect(cutterSnippet('span', optionsCode[1], options[0])).toStrictEqual('')
})

test('Cutter Snippets. Without fragments in the file', () => {
    expect(cutterSnippet('input', optionsCode[0], options[0])).toStrictEqual('')
})

test('Cutter Snippets. Elimination of nested marks', () => {
    expect(cutterSnippet('input', optionsCode[2], options[1])).toStrictEqual(
        ' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
        ' <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
        ' </div>\n' +
        ' <div>\n' +
        '   <span id="contenido"></span>\n' +
        ' </div>\n')
})
