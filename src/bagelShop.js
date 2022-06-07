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

        const product = this.getBagelCode(productCode);
        if (product === null || product === undefined) {
            return 'Product not found'
        }
        let total = product.price * quantity;
        total = parseFloat(total.toFixed(2));

        if (this.isEmptyObject(currentBasket)) {
            console.log('first');
            lastIndex = 0;
            currentBasket.push({
                id: 1,
                productCode: productCode,
                quantity: quantity,
                total: total
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
                    quantity: quantity,
                    total: total
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
    getItemPrice(productCode) {
        const product = this.getBagelCode(productCode);
        return product.price;
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
        let extraDiscount = 0, pairPromo = [];
        let discountFrom = [];
        let currentQuantity = 0;
        for (const item of currentBasket) {

            const product = this.getBagelCode(item.productCode);

            if (item.quantity >= product.promotion) {
                const numDiscount = Math.floor(item.quantity / product.promotion)
                discount = numDiscount * product.discount;
                total += (item.quantity * product.price) - discount;

                currentQuantity = numDiscount * product.promotion;
                currentQuantity = item.quantity - currentQuantity;

                discountFrom.push(
                    {
                        name: product.flavour + ' ' + product.name + ' ' + product.special,
                    });

            } else {
                total += (item.quantity * product.price);

            }
            if (product.pair && currentQuantity > 0) {
                const result = product.pairPromotion * currentQuantity;
                pairPromo.push(result);
                discountFrom.push(
                    {
                        name: 'Coffee & Plain Bagel for 1.25',
                    });
                extraDiscount
            }
        }
        console.log('Total: ', total);
        if (pairPromo.length > 0) {
            const promoDiscount = pairPromo.reduce(function (sum, discount) {
                console.log("ACC:" + sum + "  :" + discount);
                return sum + discount;
            }, 0);
            extraDiscount = Math.floor(promoDiscount / 0.13) * 0.13;
            console.log(Math.floor(promoDiscount / 0.13));
            console.log('extraDiscount ' + extraDiscount);
            total = total - extraDiscount;
        }

        total = parseFloat(total.toFixed(2))
        let newDiscount = 0;
        newDiscount = discount + extraDiscount
        console.log('total ' + total + 'newDiscount ' + newDiscount);
        this.setBasket(currentBasket);
        let updateBasket = JSON.parse(JSON.stringify(currentBasket));
        updateBasket.push(
            {
                Alltotal: total,
                Alldiscount: newDiscount
            });

        if (discountFrom.length > 0) {
            for (let i = 0; i < discountFrom.length; i++) {
                const discount = discountFrom[i].name;

                updateBasket.push(
                    {
                        discountFrom: discount
                    });
            }
        }


        return updateBasket;
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
                discount: 0.45,
                special: '6 for 2.49'
            },
            {
                productCode: 'BGLP',
                name: 'Bagel',
                flavour: 'Plain',
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
                price: 0.49,
                promotion: 6,
                pair: false,
                discount: 0.45,
                special: '6 for 2.49'
            },
            {
                productCode: 'COF',
                flavour: ' ',
                name: 'Coffee',
                price: 0.99,
                promotion: 99999,
                pair: true,
                pairPromotion: 0.065,
                discount: 0,
                special: 'Coffee & Plain Bagel for 1.25'

            }
        ]
        const result = bagelCode.find(element => element.productCode === productCode);
        console.log('result '+result);
        return result;
    }
    updateBasketLimit(limit) {
        this.limit = limit;
    }
    isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }
    printReceipt() {
        const currentBasket = this.getBasket();
        const updateBasket = this.getTotal(currentBasket);
        let currentdate = new Date();
        let datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const fs = require('fs');
        const header = ` ~~~ Bob's Bagels ~~~\n${datetime}\n----------------------------\n`
        let str = "";
        const productSize = currentBasket.length;
        for (let i = 0; i < productSize; i++) {

            const product = this.getBagelCode(updateBasket[i].productCode);
            str += product.flavour + ' ' + product.name + ' \t' + updateBasket[i].quantity + ' '
                + ' £' + updateBasket[i].total + '\n'
        }
        str += '----------------------------\n';
        str += 'Total: ' + updateBasket[productSize].Alltotal + ' Discount: ' + updateBasket[productSize].Alldiscount + '\n'

        const extraSize = updateBasket.length;
        if (extraSize > productSize) {
            str += 'You savings today from \n';
            for (let i = extraSize - 1; i > productSize; i--) {
                str += '- ' + updateBasket[i].discountFrom + '\n';
            }
        }

        const footer = '\nThank you for your order!'

        fs.writeFile('receipt.txt', header + str + footer, (err) => {
            if (err) throw err;
        })


    }
    sendMessage() {
        const key = require('../config.js');
        const accountSid = key.API.TWILIO_API_KEY;
        const authToken = key.API.TWILIO_AUTH_TOKEN;

        const twilio = require('twilio');
        const client = new twilio(accountSid, authToken);
        const currentdate = new Date();
        const recieved = currentdate.getHours() + "."
            + currentdate.getMinutes();
        const delivered = currentdate.getHours() + 1 + "."
            + currentdate.getMinutes();

        /*
    client.messages
        .create({
            body: `We have recieved your order at ${recieved} ! Your driver will delivered delicious bagels before ${delivered}\n~~Enjoy BoB's Bagels~~ `,
            to: '+4407842871923', // Text this number
            from: '+13516668860', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
     */
    }
   
}
let listOfBaskets = [];
let currentdate = new Date();
let datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear();

const myBasket = new Basket();

//listOfBaskets.push({ date: datetime });
/*
myBasket.updateBasketLimit(20);
console.log('Price :' + myBasket.getItemPrice('BGLP'));
myBasket.addBagel('BGLP', 20);
myBasket.addBagel('COF', 2);
myBasket.addBagel('COF4', 2);
myBasket.getTotal()
myBasket.printReceipt();
myBasket.sendMessage();
listOfBaskets.push(myBasket.getBasket());
console.log('listOfBaskets[0] '+listOfBaskets.length);
console.log('listOfBaskets '+listOfBaskets[0].date);
console.log('listOfBaskets '+listOfBaskets[1][0].productCode);
console.log('listOfBaskets '+listOfBaskets[1][1].productCode);
*/

/*
const Basket2 = new Basket();
Basket2.addBagel('BGLO', 2);
Basket2.addBagel('BGLP', 12);
Basket2.addBagel('BGLE', 6);
Basket2.addBagel('COF', 3);
//Basket2.removeById(3);
Basket2.getTotal();
Basket2.printReceipt();
listOfBaskets.push(Basket2);
*/



module.exports = Basket
