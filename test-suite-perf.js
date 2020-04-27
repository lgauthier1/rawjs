import './raw.js'
import _ from 'lodash'
import Sugar from 'Sugar'
const a = Array(10000).fill().map((_, i) => ({ name: 'John', age: i }))
'vanilla' >> a.map(v => v.age)
'raw ' + Object.extend.version >> Array.map(a, 'age')
'sugar ' + Sugar.VERSION >> Sugar.Array.map(a, 'age')
'lodash ' + _.VERSION >> _.map(a, 'age')
