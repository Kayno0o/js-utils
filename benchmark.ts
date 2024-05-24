import Benchmark from 'benchmark'
import { randomText } from './'

const suite = new Benchmark.Suite()

suite
  .add('randomText:50', () => randomText({ isCrypto: false, length: 50 }))
  .add('randomText:50:crypto', () => randomText({ isCrypto: true, length: 50 }))
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .run({ async: false })
