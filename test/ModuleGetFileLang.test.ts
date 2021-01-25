import getFileLang from "../src/ModuleGetFileLang"

const options:Array<string> = [
    'file.md',
    'file.sh',
    'file.html',
    'file'
]

test('Get file lang for extension. .md => markup ', () =>{
    expect(getFileLang(options[0])).toBe('markup')
})

test('Get file lang for extension. .sh => bash ', () =>{
    expect(getFileLang(options[1])).toBe('bash')
})

test('Get file lang for extension. .html => no found. return extension ', () =>{
    expect(getFileLang(options[2])).toBe('html')
})

test('Get file lang for extension. No extension return null value', () =>{
    expect(getFileLang(options[3])).toBe('')
})
