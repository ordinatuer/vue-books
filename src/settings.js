//let api = 'http://85.143.217.153:8085'
let api = 'http://books.loc'
export default {
    image: {
        api: api,
        imgSrc: api+'/img/',
        h: 1500,
        l: 1000,
        nL: 46,
        nH: 18,
        padding: 200
    },
    teil: {
        x: 0,
        y: 0,
        l: -1,
        h: -1,
        type: 1,
        size: 150,
        r: 60,
        fill: '#999',
        teil_id: 0,
        modelId: null,
        text: 'New Teil',
        image: null,
        i: 0
    }
}