import {nextCharacter} from "../src/ModuleNextCharacter"

test('Next character test normal', () =>{
    expect(nextCharacter('embed:', 5)).toStrictEqual({
        character: ':',
        position: 5
    })
})

test('Next character test excess spaces', () =>{
    expect(nextCharacter('embed   :', 5)).toStrictEqual({
        character: ':',
        position: 8
    })
})

test('Next character test: error ', () =>{
    expect(nextCharacter('embed', 5)).toStrictEqual({
        character: '',
        position: -1
    })
})
