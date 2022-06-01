class Basket {

    constructor(Basket = [], limit = 30, currentQuantity = 0) {
        this.Basket = Basket;
        this.limit = limit;
        this.currentQuantity = currentQuantity;
    }
    getBasket() {
        return this.Basket;
    }
    setBasket(Basket) {
        this.Basket = Basket;
    }
    getLimit() {
        return this.limit;
    }
    setLimit(limit) {
        this.limit = limit;
    }
    getCurrentQuantity() {
        return this.currentQuantity;
    }
    setCurrentQuantity(currentQuantity) {
        this.currentQuantity = currentQuantity;
    }
    clearBasket() {
        this.Basket = [];
    }
    addBagel(productCode, quantity) {

        const currentBasket = this.getBasket();
        const limitBasket = this.getLimit();
        let curentQuantity = this.getCurrentQuantity();
        let lastIndex;


        if (this.isEmptyObject(currentBasket)) {
            console.log('first');
            lastIndex = 0;
            currentBasket.push({
                id: 1,
                productCode: productCode,
                quantity: quantity
            })
            curentQuantity += quantity;
            console.log('curentQuantity' + curentQuantity);

        }
        else if (curentQuantity < limitBasket) {
            console.log('second');
            lastIndex = Object.keys(currentBasket).length;
            console.log('lastIndex ' + lastIndex);
            currentBasket.push(
                {
                    id: lastIndex + 1,
                    productCode: productCode,
                    quantity: quantity
                })
            curentQuantity += quantity;
            console.log('curentQuantity' + curentQuantity);
        }
        else {
            console.log('Sorry,your items in basket are already reach the limit');
          return 'Sorry,your items in basket are already reach the limit';
        }

        this.setBasket(currentBasket);
        this.setCurrentQuantity(curentQuantity);
        console.log('length:', currentBasket.length);
        console.log('Basket', this.getBasket());
        return currentBasket;


    }
    removeById(id) {

        const currentBasket = this.getBasket();

        const item = currentBasket.find(element => element.id === id);

        console.log('my Item: ' + item);
        if (item) {
            const newIndex = currentBasket.indexOf(item)
            currentBasket.splice(newIndex, 1);
            console.log('currentBasket ', currentBasket);
            return currentBasket;
        } else {
            console.log('Item not found');
            return 'Item not found';
        }
    }
    getTotal() {
        const currentBasket = this.getBasket();
        let discount = 0, total = 0;
        let extraDiscout = 0, pairPromo = [];
        for (const item of currentBasket) {
            const product = this.getBagelCode(item.productCode);
            if (product.pair) {
                const result = product.pairPromotion * item.quantity;
                pairPromo.push(result)
            }
            if (item.quantity >= product.promotion) {
                discount = Math.floor(item.quantity / product.promotion) * product.price;
                console.log('discount' + discount);
                total += (item.quantity * product.price) - discount;
            } else {
                total += (item.quantity * product.price);
            }
        }
        console.log('Total: ', total);
        if (pairPromo.length > 0) {
            const promoDiscount = pairPromo.reduce(function (sum, discount) {
                console.log("ACC:" + sum + "  :" + discount);
                return sum + discount;
            }, 0);
            extraDiscout = Math.floor(promoDiscount / 0.13) * 0.13;
            console.log(Math.floor(promoDiscount / 0.13));
            console.log('extraDiscout ' + extraDiscout);
            total = total - extraDiscout;
        }

        console.log('Total: ', parseFloat(total.toFixed(2)) + typeof total);

        return parseFloat(total.toFixed(2));
    }
    getBagelCode(productCode) {
        const bagelCode = [
            {
                productCode: 'BGLO',
                name: 'Bagel',
                flavour: 'Onion',
                price: 0.49,
                promotion: 6,
                pair: false,
                discount: 0.45
            },
            {
                productCode: 'BGLP',
                name: 'Bagel',
                flavour: 'Plain',
                price: 0.39,
                promotion: 12,
                pair: true,
                pairPromotion: 0.065,
                discount: 0.69
            },
            {
                productCode: 'BGLE',
                name: 'Bagel',
                flavour: 'Everything',
                price: 0.49,
                promotion: 6,
                pair: false,
                discount: 0.45
            },
            {
                productCode: 'COF',
                name: 'Coffee',
                price: 0.99,
                promotion: 6,
                pair: true,
                pairPromotion: 0.065,
                discount: 0,

            }
        ]
        const result = bagelCode.find(element => element.productCode === productCode);
        return result;
    }

    isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }

}

let listOfBaskets = [];

const myBasket = new Basket();
myBasket.addBagel('COF', 2);
myBasket.addBagel('BGLE', 3);
listOfBaskets.push(myBasket);

const Basket2 = new Basket();
Basket2.addBagel('COF', 20);
Basket2.addBagel('BGLP', 2);
Basket2.removeById(3);
Basket2.getTotal();
listOfBaskets.push(Basket2);


module.exports = Basket
