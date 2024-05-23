import { randomText } from './src/textUtils'

console.log(randomText({ length: 15, type: 'word' }))
console.log(randomText({ length: 2, type: 'paragraph' }))
console.log(randomText({ length: 5, type: 'sentence' }))
