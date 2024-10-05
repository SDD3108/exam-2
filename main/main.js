const blocks = document.querySelector('.blocks')
const basket = document.querySelector('.basket')
const accountBtn = document.querySelector('.account')
const btn = document.querySelector('.btn')
const search = document.querySelector('.search')
const select = document.querySelector('.select')

class Main{
    constructor(){
        // this.normName = JSON.parse(localStorage.getItem('name'))
        // this.users = JSON.parse(localStorage.getItem('arr'))
        // this.normUser = this.users.find(user => user.name == this.normName)
        // this.basketKey = `basket_${this.normUser?.log}`
        this.arr = JSON.parse(localStorage.getItem('products')) || []
        // this.prices = []
    }
    toApi(){
        // fetch(`https://fakestoreapi.com/products`)
        fetch(`https://dummyjson.com/products`)
        .then(response => response.json())
        .then(answer => {
            console.log(answer.products);
            this.arr = answer.products
            this.toLocalStorage()
            this.render(this.arr)
            // lol.forEach(element => {
            //     const block = document.createElement('div')
            //     block.classList.add('block')
            //     blocks.append(block)
            //     block.innerHTML += `
            //     <img src="${element.images[0]}">
            //     <button id="btn-${element.id}">basket</button>
            //     `
            //     this.arr.push(Math.floor(element.price))
            //     this.toPush(element.id,element.images[0],element.title)
            // });
        })
    }
    render(answer){
        blocks.innerHTML = ''
        answer.forEach(element => {
            const block = document.createElement('div')
            block.classList.add('block')
            blocks.append(block)
            block.innerHTML += `
            <img src="${element.images[0]}">
            <button id="btn-${element.id}">basket</button>
            `
            // this.arr.push(Math.floor(element.price))
            this.toPush(element.id,element.images[0],element.title)
        });
    }
    toUp(){
        const sort = [...this.arr].sort((a, b) => a.price - b.price)
        this.render(sort)
    }
    toDefault(){
        this.render(this.arr)
    }
    toDown(){
        const sort = [...this.arr].sort((a, b) => b.price - a.price)
        this.render(sort)
    }
    toSearch(value){
        // почемуто код правильный,вроде. но при этом он не работает
        const filtered = this.arr.filter(element => element.title.startsWith(value) || element.title.includes(value))
        // const filtered = this.arr.filter(element => element.title.includes(value))
        console.log(filtered);
        
        this.render(filtered)
    }
    //     // search.addEventListener('input',(realValue)=>{
    //     //     const inputValue = realValue.target.value
    //     //     blocks.innerHTML = ''
    //     //     lol.forEach(element =>{
    //     //         const filmName = element.name
    //     //         if(filmName.includes(inputValue)){
    //     //             const block = document.createElement('div')
    //     //             blocks.append(block)
    //     //             block.innerHTML = `
    //     //             <img src=${element.poster.previewUrl}>
    //     //             <h2> ${element.name} </h2>
    //     //             <p> ${element.shortDescription} </p>
    //     //             `
    //     //         }
    //     //     })
    //     //     })
    // }
    // toDisplayProducts(products){
    //     // blocks.innerHTML = ''
    //     // products.forEach(element => {
    //     //     const title = element.title
    //     //     if(){}
    //     //     const block = document.createElement('div')
    //     //     block.classList.add('block')
    //     //     blocks.append(block)
    //     //     block.innerHTML += `
    //     //     <img src="${element.images[0]}">
    //     //     <button id="btn-${element.id}">basket</button>
    //     //     `
    //     //     this.toPush(element.id,element.images[0],element.title)
    //     // })
    // }
    toHello(){
        const user = JSON.parse(localStorage.getItem('name'))
        if(user.nm){
            accountBtn.textContent = `Hi ${user.nm}`
        }
        else if(!user.nm || user.nm == undefined){
            accountBtn.textContent = 'Hi гость'
        }
    }
    toPush(id,img,title){
        const btn = document.getElementById(`btn-${id}`)
        btn.addEventListener('click',()=>{
            const user = JSON.parse(localStorage.getItem('name'))
            if(!user){
            alert('Сначала нужно войти в аккаунт, чтобы добавить в корзину')
            window.location.href = 'registration.html'
            }
            else{   
                const lel = +prompt('сколько штук ты хочешь')
                const obj = {
                ids: id,
                img: img,
                title: title,
                pieces: lel,
                }
                const basketKey = `key-${user.id}`
                let basketArr = JSON.parse(localStorage.getItem(basketKey)) || []
                const checking = basketArr.find(element => element.ids == obj.ids)
                if(checking){
                    console.log(this.arr);
                    checking.pieces += lel
                    alert(`now ${id} добавлено до ${checking.pieces}`)
                }
                else{
                    console.log(this.arr);
                    basketArr.push(obj)
                    alert(`product id ${id} addet to the basket`)
                }
                localStorage.setItem(basketKey, JSON.stringify(basketArr))
                // this.toLocalStorage()
            }
        })
    }
    toLocalStorage(){
        localStorage.setItem('products',JSON.stringify(this.arr))
    }
}
const main = new Main()
main.toApi()
main.render(JSON.parse(localStorage.getItem('products')) || [])
main.toHello()


basket.addEventListener('click',()=>{
    // basket/basket.js
    window.location.href = 'basket.html'  
})
// accountBtn.addEventListener('click',()=>{
//     // window.location.href = 'registration.html'
//     const user = JSON.parse(localStorage.getItem('name'))
//     if(user || user.nm){
//         accountBtn.textContent = 'выйти'
//     }
    // else{
    //     accountBtn.textContent = 'войти'
    //     window.location.href = 'registration.html'
    // }
// })
accountBtn.addEventListener('mouseover',()=>{
    const user = JSON.parse(localStorage.getItem('name'))
    if(user && user.nm){
        accountBtn.textContent = 'выйти'
    }
    else{
        accountBtn.textContent = 'войти'
        // window.location.href = 'registration.html'
    }
})
// accountBtn.addEventListener('mouseout',()=>{
//     const user = JSON.parse(localStorage.getItem('name'))
//     if(user && user.nm){
//         accountBtn.textContent = `Hi ${user.nm}`
//     }
//     else{
//         accountBtn.textContent = 'Hi гость'
//     }
// })
// accountBtn.addEventListener('click',()=>{
//     const user = JSON.parse(localStorage.getItem('name'));
//     if(user && user.nm){
//         localStorage.removeItem('name')
//         alert('Вы вышли из аккаунта')
//         accountBtn.textContent = 'Hi гость'
//         window.location.href = 'main.html'
//     }
//     else{
//         window.location.href = 'registration.html'
//     }
// })
select.addEventListener('change',(e)=>{
    console.log(e);
    console.log(select.value);
    const trueValue = select.value
    if(trueValue == 'По Нарастанию цены'){
        main.toUp()
    }
    else if(trueValue == 'По Убыванию цены'){
        main.toDown()
    }
    else if(trueValue == 'По Умолчанию'){
        main.toDefault()
    }
    // main.toFilter(select.value)
    
})
// search.addEventListener('input',(e)=>{
//     const value = e.target.value
//     main.toSearch(value)
// })
btn.addEventListener('click',()=>{
    const value = search.value
    main.toSearch(value)
})
//     
//     // 
//     // blocks.innerHTML = ''
//     lol.forEach(element => {
//         const title = element.title
//         if(title.includes(value)){
//             const block = document.createElement('div')
//             block.classList.add('block')
//             blocks.append(block)
//             block.innerHTML += `
//             <img src="${element.images[0]}">
//             <button id="btn-${element.id}">basket</button>
//             `
//             this.toPush(element.id,element.images[0],element.title)
//         }
//     })
// })
// localStorage.removeItem('undefined')

// localStorage.removeItem('notes')
// P@ssw0rd2024!