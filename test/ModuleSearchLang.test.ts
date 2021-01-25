import searchLang from "../src/ModuleSearchLang"
import {nodeRecept} from "../src/InterfaceNode"

const options: Array<nodeRecept> = [
    {
        type: '',
        value: 'Lang: js',
        lang: ''
    },
    {
        type: '',
        value: 'other words Lang: html',
        lang: ''
    },
    {
        type: '',
        value: '',
        lang: ''
    },
    {
        type: '',
        value: 'Lang   : sh',
        lang: ''
    },
]


test('search lang. Normal.', () =>{
    expect(searchLang(options[0], '')).toStrictEqual('js')
})

test('search lang. search key and value', () =>{
    expect(searchLang(options[1], '')).toStrictEqual('html')
})

test('search lang. value no exist', () =>{
    expect(searchLang(options[2], '')).toStrictEqual('')
})

test('search lang. search key and value. spaces', () =>{
    expect(searchLang(options[3], '')).toStrictEqual('sh')
})

test('search lang. value no exist. File powershell', () =>{
    expect(searchLang(options[2], 'functions.ps1')).toStrictEqual('powershell')
})
