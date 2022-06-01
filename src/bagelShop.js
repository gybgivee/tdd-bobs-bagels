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

         let total = product.price*quantity;
         total =parseFloat(total.toFixed(2));
         
        if (this.isEmptyObject(currentBasket)) {
            console.log('first');
            lastIndex = 0;
            currentBasket.push({
                id: 1,
                productCode: productCode,
                quantity: quantity,
                total:total
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
                    total:total
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
    getTotal(){

        const currentBasket = this.getBasket();
        let discountCheck=true;
        let discount = 0, total = 0;
        let extraDiscout = 0, pairPromo = [];
        let discountFrom=[];
        for (const item of currentBasket) {

            const product = this.getBagelCode(item.productCode);
          console.log('product '+product);
            if (item.quantity >= product.promotion) {
                discount = Math.floor(item.quantity / product.promotion) * product.discount;
                console.log('discount' + discount);
                total += (item.quantity * product.price) - discount;
                discountCheck=false;
                discountFrom.push(
                    {
                        name:product.flavour+' '+product.name+' '+product.special,
                    });

            } else {
                total += (item.quantity * product.price);
                discountCheck=false;
            }
            if (product.pair&&discountCheck) {
                const result = product.pairPromotion * item.quantity;
                pairPromo.push(result);
                discountFrom.push(
                    {
                        name:'Meal deal : '+product.special,
                    });
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

        total = parseFloat(total.toFixed(2))
        const newDiscount =  discount+extraDiscout
         console.log('total '+ total+'newDiscount '+newDiscount);
         this.setBasket(currentBasket);
         currentBasket.push(
            {
                Alltotal: total,
                Alldiscount:newDiscount
            });
        
        if(discountFrom.length>0){
            for(let i=0; i<discountFrom.length;i++){
                const discount = discountFrom[i].name;
                
                currentBasket.push(
                    {
                        discountFrom:discount
                    });
            }
        }
        console.log('currentBasket ', currentBasket[0], currentBasket[1], currentBasket[2]);
        console.log( currentBasket[3], currentBasket[4],currentBasket[5]);
        
        return currentBasket;
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
                special:'6 for 2.49'
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
                special:'12 for 3.99'
            },
            {
                productCode: 'BGLE',
                name: 'Bagel',
                flavour: 'Everything',
                price: 0.49,
                promotion: 6,
                pair: false,
                discount: 0.45,
                special:'6 for 2.49'
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
                special:'Coffee & Plain Bagel for 1.25'

            }
        ]
        const result = bagelCode.find(element => element.productCode === productCode);
        return result;
    }

    isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }
    printReceipt() {
        let currentdate = new Date();
        const currentBasket = this.getBasket();
        let datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        const fs = require('fs');
        const header = ` ~~~ Bob's Bagels ~~~\n${datetime}\n----------------------------\n`
        let str = "";
        const size =currentBasket.length-1;
        console.log(size);
        for (let i =0; i <size-2;i++){
            console.log(currentBasket[i].productCode);
            const product = this.getBagelCode(currentBasket[i].productCode);
        str+=product.flavour+' '+product.name+' \t'+currentBasket[i].quantity+' '
        +' £'+currentBasket[i].total+'\n'
        }
        
        str+='----------------------------\n';
        str+='Total: '+currentBasket[size-2].Alltotal+' Discount: '+currentBasket[size-2].Alldiscount+'\n'
        str+='You savings today from '+currentBasket[size-1].discountFrom;
        const footer = '\nThank you for your order!'
        fs.writeFile('receipt.txt', header+str+footer, (err) => {
            if (err) throw err;
        })
       

    }
}
let listOfBaskets = [];

const myBasket = new Basket();
myBasket.addBagel('COF', 2);
myBasket.addBagel('BGLE', 3);
listOfBaskets.push(myBasket);

const Basket2 = new Basket();
Basket2.addBagel('BGLO', 2);
Basket2.addBagel('BGLP', 12);
Basket2.addBagel('BGLE', 6);
Basket2.addBagel('COF', 3);
//Basket2.removeById(3);
Basket2.getTotal();
Basket2.printReceipt();
listOfBaskets.push(Basket2);


module.exports = Basket
