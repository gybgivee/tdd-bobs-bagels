const Basket = require("../src/bagelShop.js")

describe("Show Basket List", () => {

    it("Get item Price", () => {
        const myBasket = new Basket();
        const expected = 0.39
        const result=myBasket.getItemPrice('BGLP')
        expect(result).toEqual(expected)
    })
    it("Single Basket List", () => {
        const myBasket = new Basket();
        const expected = [
            {
                'id':1,
                'productCode': 'COF',
                'quantity': 2,
                'total':1.98
            }
        ]
        myBasket.addBagel('COF', 2);
        expect(myBasket.Basket).toEqual(expected)
    })
   it("Add Too many products In Basket List", () => {

        const myBasket = new Basket();
        const firstExpected = [
            {
                'id':1,
                'productCode': 'COF',
                'quantity': 30,
                'total':29.7
            }
        ]
        const secondExpected = 'Sorry,your items in basket are already reach the limit';
        myBasket.addBagel('COF', 30);
        expect(myBasket.Basket).toEqual(firstExpected)
        const alert = myBasket.addBagel('BGLP', 2);
        expect(alert).toEqual(secondExpected)
        

    })
    it("Remove an item by Id",()=>{
        const myBasket = new Basket();
        const expected   = [
            {
                'id':1,
                'productCode': 'COF',
                'quantity': 2,
                 'total':1.98
            }]
        myBasket.addBagel('COF', 2);
        myBasket.addBagel('BGLE', 3);
        expect(myBasket.removeById(2)).toEqual(expected)
      })
      it("Remove non-exist item by Id",()=>{
        const myBasket = new Basket();
        const expected   =  'Item not found';
        myBasket.addBagel('COF', 2);
        myBasket.addBagel('BGLE', 3);
        expect(myBasket.removeById(3)).toEqual(expected)
      })
      it("Get Total with promotion", () => {

        const myBasket = new Basket();
        const expected = 10.43
        myBasket.addBagel('BGLO', 2);
        myBasket.addBagel('BGLP', 12);
        myBasket.addBagel('BGLE', 6);
        myBasket.addBagel('COF', 3);
        const result = myBasket.getTotal()
        const size=result.length;
        expect(result[size-3].Alltotal).toEqual(expected);
      })
      it("updateBasketLimit", () => {

        const myBasket = new Basket();
        const expected = 'Sorry,your items in basket are already reach the limit'
        myBasket.updateBasketLimit(20);
        myBasket.addBagel('BGLP', 20);
        const result=myBasket.addBagel('COF', 2);
        
        expect(result).toEqual(expected);
      })
      



})
