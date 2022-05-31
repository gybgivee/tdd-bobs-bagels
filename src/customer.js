class Customer {

    constructor(customer = []) {
        this.customer = customer;
    }
    getCustomer() {
        return this.customer;
    }
    setCustomer(customer) {
        this.customer = customer;
    }
    clearCustomer() {
        this.customer = [];
    }
    addBagel(productCode, quantity) {

        const currentCustomer = this.getCustomer();

        let lastIndex;

        if (this.isEmptyObject(currentCustomer)) {
            lastIndex = 0;
            currentCustomer.push({
                id: 1,
                productCode: productCode,
                quantity: quantity
            })
        } else {

            lastIndex = Object.keys(currentCustomer).length;
            console.log('lastIndex ' + lastIndex);
            currentCustomer.push(
                {
                    id: lastIndex + 1,
                    productCode: productCode,
                    quantity: quantity
                })
        }
        this.setCustomer(currentCustomer);
        console.log('Customer', this.getCustomer());
        return currentCustomer;

    }
    removeById(id){
       
        const currentCustomer = this.getCustomer();
       
        const listFinder = currentCustomer.find(element => element.id === id);
        console.log('listFinder ',listFinder);
        if(listFinder){
        const newIndex = currentCustomer.indexOf(listFinder)
        currentCustomer.splice(newIndex,1);
        console.log('currentCustomer ',currentCustomer);
        return currentCustomer;
        }else{
            return 'Item not found'
        }
       
    }
   
    getTotal() {
        const currentCustomer = this.getCustomer();
        let discount = 0, total = 0;
        let extraDiscout=0,pairPromo = [];
        for (const iterator of currentCustomer) {
            const product = this.getBagelCode(iterator.productCode);
            if (product.pair) {
                const result = product.pairPromotion*iterator.quantity;
                pairPromo.push(result)
            }
            if (iterator.quantity >= product.promotion) {
                discount = Math.floor(iterator.quantity / product.promotion) * product.price;
                console.log('discount' + discount);
                total += (iterator.quantity * product.price) - discount;
            } else {
                total += (iterator.quantity * product.price);
            }
        }
        console.log('Total: ', total);
        if (pairPromo.length > 0) {
                const promoDiscount = pairPromo.reduce(function (sum, discount) {
                    console.log("ACC:" + sum + "  :" + discount);
                    return sum + discount;},0);
                    extraDiscout = Math.floor(promoDiscount / 0.13) * 0.13;
                    console.log(Math.floor(promoDiscount / 0.13) );
                    console.log('extraDiscout '+extraDiscout);
                    total=total-extraDiscout;
        }
        
        console.log('Total: ',parseFloat(total.toFixed(2))+typeof total);
       
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
class Shop {
    constructor(listOfCustomers = []) {
        this.listOfCustomers = listOfCustomers;

    }
    addListsOfCustomer(customer) {
        const newList = this.listOfCustomers;
        console.log(customer.Customer);
        newList.push(customer);
        console.log(newList);
        return newList;
    }
}
let listOfCustomers = [];
//const myShop = new Shop();
const myCustomer = new Customer();
myCustomer.addBagel('COF', 2);
myCustomer.addBagel('BGLE', 3);
listOfCustomers.push(myCustomer);

const customer2 = new Customer();
customer2.addBagel('COF', 2);
customer2.addBagel('BGLP', 2);
customer2.removeById(3);
customer2.getTotal();
listOfCustomers.push(customer2);


