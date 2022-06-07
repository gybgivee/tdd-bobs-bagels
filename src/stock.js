class Stock{
    constructor(stock=[]){
        this.stock = stock;

    }
getStock(productCode) {
    const stock = this.stock;
    const result = stock.find(element => element.productCode === productCode);
    console.log('result '+result);
    return result;
}
updateStock(productCode, quantity) {
    const product = this.getStock(productCode);
    console.log(product);
        product.stock = product.stock + quantity;
        console.log('product '+product);
    return product;
    
}

}
const stock = [
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
const myStock = new Stock(stock);
const myStock1=myStock.getStock('BGLO')
const myStock2=myStock.updateStock('BGLO',10);
console.log('myStock2 :'+myStock2.stock);
const myStock3=myStock.updateStock('BGLO',-10);
console.log('myStock3 :'+myStock3.stock);


module.exports = Stock