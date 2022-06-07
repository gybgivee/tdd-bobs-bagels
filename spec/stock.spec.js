const Stock = require("../src/stock.js")
const myStockDetails = [
    {
        productCode: 'BGLO',
        name: 'Bagel',
        flavour: 'Onion',
        stock: 100,
        price: 0.49,
        promotion: 6,
        pair: false,
        discount: 0.45,
        special: '6 for 2.49'
    },
    {
        productCode: 'BGLP',
        name: 'Bagel',
        flavour: 'Plain',
        stock: 100,
        price: 0.39,
        promotion: 12,
        pair: true,
        pairPromotion: 0.065,
        discount: 0.69,
        special: '12 for 3.99'
    },
    {
        productCode: 'BGLE',
        name: 'Bagel',
        flavour: 'Everything',
        stock: 100,
        price: 0.49,
        promotion: 6,
        pair: false,
        discount: 0.45,
        special: '6 for 2.49'
    },
    {
        productCode: 'COF',
        flavour: ' ',
        stock: 100,
        name: 'Coffee',
        price: 0.99,
        promotion: 99999,
        pair: true,
        pairPromotion: 0.065,
        discount: 0,
        special: 'Coffee & Plain Bagel for 1.25'

    }
]

describe("Show Stock List", () => {

    it("Add stock", () => {
        const myStock = new Stock(myStockDetails);
        const expected = 110;
         myStock.updateStock('BGLO', 10);
        const result = myStock.getStock('BGLO');

        expect(result.stock).toEqual(expected);
    })
 
    it("Remove stock", () => {
        const myStock = new Stock(myStockDetails);
        const expected = 100;
         myStock.updateStock('BGLO', -10);
        const result = myStock.getStock('BGLO');
        expect(result.stock).toEqual(expected);
    })

    it("Delete stock", () => {
        const myStock = new Stock(myStockDetails);
        const expected = 0;
         myStock.updateStock('BGLO',-100);
        const result = myStock.getStock('BGLO');
        expect(result.stock).toEqual(expected);
    })
    


})
