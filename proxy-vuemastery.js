let data={price:0,quantity:0}
let target,total,doubleTotal

class Dep{
    constructor(){
        this.subscribers = []
    }
    depend(){
        if(target && ! this.subscribers.includes(target)){
            this.subscribers.push(target)
        }
    }
    notify(){
        this.subscribers.forEach(sub => {
            sub()
        })
    }
}

let deps=new Map()

Object.keys(data).forEach(key=>{
    deps.set(key,new Dep());
})

let data_without_proxy = data;

data=new Proxy(data_without_proxy,{
    get(obj,key){
        deps.get(key).depend(); 
        return obj[key];
    },
    set(obj,key,newVal){
    obj[key]=newVal;
    deps.get(key).notify();
    return true
    }
})


function watcher(myFunc){
    target=myFunc;
    target();
    target=null
}

watcher(()=>{
    total=data.price*data.quantity
})
watcher(()=>{
    doubleTotal=data.price*data.quantity*2
})

console.log("**********************************");
console.log("You Have This Object : ",data)
console.log(`You Can Set Or Get Price|Quantity - currnet Price = ${data.price} and current Quantity = ${data.quantity}`)
console.log(`you can get total and doubleTotal`);
console.log(`Becoz of Proxy you Can add property and its reActive :)`);
console.log("**********************************");
