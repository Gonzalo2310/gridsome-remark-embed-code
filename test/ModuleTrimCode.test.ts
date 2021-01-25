import trimCode from '../src/ModuleTrimCode'

const options:Array<string> = [
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
    '    <form>\n' +
    '       <div class="form-group">\n' +
    '          <label for="exampleInput">JQuery input simple</label>\n' +
    '          <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">\n' +
    '         <small id="inputHelp" class="form-text text-muted">Lo que escribas aqui se mostrara debajo</small>\n' +
    '       </div>\n' +
    '       <div>\n' +
    '         <span id="contenido"></span>\n' +
    '       </div>\n' +
    '    </form>'
]

test('trim code: no efects, result === origen', () =>{
    expect(trimCode(options[0])).toStrictEqual(options[0])
})

test('trim code: lateral space deleted, result === options[0]', () =>{
    expect(trimCode(options[1])).toStrictEqual(options[0])
})
