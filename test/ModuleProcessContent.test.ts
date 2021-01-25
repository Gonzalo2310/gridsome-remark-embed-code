import processContent from "../src/ModuleProcessContent"
import {OptionsCode} from "../src/InterfaceOptionsCode"
import {nodeRecept} from "../src/InterfaceNode"

const options: Array<OptionsCode> = [
    {
        subdirectory: '',
        embedKey: '',
        startKey: 'start',
        endKey: 'end',
        separator: 'symbol',
        separatorKeyStart: '',
        separatorKeyEnd: '',
        separatorSymbol: '#'
    },
    {
        subdirectory: '',
        embedKey: '',
        startKey: 'start',
        endKey: 'end',
        separator: 'key',
        separatorKeyStart: '{',
        separatorKeyEnd: '}',
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
    ' <!-- end: span -->\n' +
    ' <!-- end: input -->'
]

const optionsNode:Array<nodeRecept> = [
    {
        type: '',
        value: '`embed: archivo.js #input Lang: js`',
        lang: ''
    },
    {
        type: '',
        value: '`embed: archivo.js#span`',
        lang: ''
    },
    {
        type: '',
        value: '`embed: archivo.js {span}`',
        lang: ''
    },
    {
        type: '',
        value: '`embed: archivo.html{input}`',
        lang: ''
    },
    {
        type: '',
        value: '`embed: archivo.html { input }`',
        lang: ''
    }
]

 test('Search for snippets in code. with spaces. symbol', () => {
     expect(processContent(optionsCode[2], optionsNode[0], options[0])).toStrictEqual(
         ' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
         ' <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
         ' </div>\n' +
         ' <div>\n' +
         '   <span id="contenido"></span>\n' +
         ' </div>\n')
 })

test('Search for snippets in code. symbol ', () => {
    expect(processContent(optionsCode[2], optionsNode[1], options[0])).toStrictEqual(
        ' <div>\n' +
        '   <span id="contenido"></span>\n' +
        ' </div>\n')
})

test('Search for snippets in code. With spaces. key', () => {
    expect(processContent(optionsCode[2], optionsNode[2], options[1])).toStrictEqual(
        ' <div>\n' +
        '   <span id="contenido"></span>\n' +
        ' </div>\n')
})

test('Search for snippets in code. key', () => {
    expect(processContent(optionsCode[2], optionsNode[3], options[1])).toStrictEqual(
        ' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
        ' <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
        ' </div>\n' +
        ' <div>\n' +
        '   <span id="contenido"></span>\n' +
        ' </div>\n')
})

test('Search for snippets in code. key. Spaces between marks', () => {
    expect(processContent(optionsCode[2], optionsNode[4], options[1])).toStrictEqual(
        ' <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
        ' <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
        ' </div>\n' +
        ' <div>\n' +
        '   <span id="contenido"></span>\n' +
        ' </div>\n')
})
