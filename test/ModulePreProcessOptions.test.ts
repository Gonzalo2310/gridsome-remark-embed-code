import preProcessOptions from "../src/ModulePreProcessOptions"
import {OptionsCode} from "../src/InterfaceOptionsCode"

const options:Array<OptionsCode> = [
    {
        subdirectory: '',
        embedKey: '',
        startKey: '',
        endKey: '',
        separator: '',
        separatorKeyStart: '',
        separatorKeyEnd: '',
        separatorSymbol: ''
    },
    {
        subdirectory: '',
        embedKey: 'my',
        startKey: 'start',
        endKey: 'end',
        separator: 'bounce',
        separatorKeyStart: '[',
        separatorKeyEnd: ']',
        separatorSymbol: '@'
    }
]

test('Process Options test default values', () =>{
    expect(preProcessOptions(options[0])).toStrictEqual(
        {
            subdirectory: '',
            embedKey: 'embed',
            startKey: 'gridsome_start',
            endKey: 'gridsome_end',
            separator: 'symbol',
            separatorKeyStart: '{',
            separatorKeyEnd: '}',
            separatorSymbol: '#'
        }
    )
})

test('Process Options test own values', () =>{
    expect(preProcessOptions(options[1])).toStrictEqual(
        {
            subdirectory: '',
            embedKey: 'my',
            startKey: 'start',
            endKey: 'end',
            separator: 'symbol',
            separatorKeyStart: '[',
            separatorKeyEnd: ']',
            separatorSymbol: '@'
        }
    )
})
