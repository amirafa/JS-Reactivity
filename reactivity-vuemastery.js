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

Object.keys(data).forEach(key=>{
    let value=data[key]
    const dep=new Dep()
    Object.defineProperty(data,key,{
        get(){
            dep.depend();
            return value
        },
        set(newVal){
            value=newVal
            dep.notify();
        }
    })
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
console.log("**********************************");
