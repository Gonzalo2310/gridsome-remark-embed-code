import searchMarks from "../src/ModuleSearchMarks"


test('Marks cleaning', () =>{
    expect(searchMarks('message -->')).toStrictEqual('message ')
})

test('Marks cleaning', () =>{
    expect(searchMarks('message ` ')).toStrictEqual('message ')
})

test('Marks cleaning', () =>{
    expect(searchMarks('message ')).toStrictEqual('message ')
})

test('Marks cleaning', () =>{
    expect(searchMarks('message --> ignored')).toStrictEqual('message ')
})
