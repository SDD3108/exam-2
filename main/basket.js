const back = document.querySelector('.back')
const blocks = document.querySelector('.blocks')

class Basket{
    constructor(){
        // this.currentUserName = JSON.parse(localStorage.getItem('name'))
        // this.users = JSON.parse(localStorage.getItem('products'))
        // this.currentUser = this.users.find(user => user.name === this.currentUserName)
        // this.basketKey = `basket_${this.currentUser?.log}`
        // this.arr = JSON.parse(localStorage.getItem(this.basketKey)) || []
        this.currentUser = JSON.parse(localStorage.getItem('name'))
        this.key = `key-${this.currentUser.id}`
        this.arr = JSON.parse(localStorage.getItem(this.key)) || []
    }
    render(){
        console.log(this.arr);
        blocks.innerHTML = ''
        this.arr.forEach(element => {
            const block = document.createElement('div')
            blocks.append(block)
            block.innerHTML += `
            <img src="${element.img}">
            <h2> ${element.title} </h2>
            `
            const toPieces = document.createElement('div')
            toPieces.classList.add('pieces')
            block.append(toPieces)
            toPieces.innerHTML = `
            <button class="minus" data-ids="${element.ids}"> - </button>
            <h2> ${element.pieces} </h2>
            <button class="plus" data-ids="${element.ids}"> + </button>
            `
        });
        this.plus()
        this.minus()
    }
    plus(){
        const plus = document.querySelectorAll('.plus')
        plus.forEach(element=>{
            element.addEventListener('click',(e)=>{
                const ids = e.target.getAttribute('data-ids')
                const index = this.arr.findIndex(item => item.ids == ids)
                if(index !== -1){
                    this.arr[index].pieces++
                    this.localStorage()
                    this.render()
                }
                
            })
        })
    }
    minus(){
        const minus = document.querySelectorAll('.minus')
        minus.forEach(element=>{
            element.addEventListener('click',(e)=>{
                const ids = e.target.getAttribute('data-ids')
                const index = this.arr.findIndex(item => item.ids == ids)
                if(index !== -1){
                    if(this.arr[index].pieces > 0){
                        this.arr[index].pieces--
                        this.localStorage()
                        this.render()
                    }
                    
                }
                
            })
        })
    }
    localStorage(){
        // localStorage.setItem('products',JSON.stringify(this.arr))
        const currentUser = JSON.parse(localStorage.getItem('name'))
        const key = `key-${currentUser.id}`
        localStorage.setItem(key, JSON.stringify(this.arr))
    }
}
const basket = new Basket()
basket.render()
back.addEventListener('click',()=>{
    window.location.href = 'main.html'
})