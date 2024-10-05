
const userName = document.querySelector('.name')
const login = document.querySelector('.login')
const email = document.querySelector('.email')
const passwordOne = document.querySelector('.passwordOne')
const passwordTwo = document.querySelector('.passwordTwo')
const btn = document.querySelector('.btn')

class Reg{
    constructor(){
        this.arr = JSON.parse(localStorage.getItem('users')) || []
    }
    person(name,login,email,password){
        const obj = {
            id: Math.floor(Math.random() * 1000),
            nm: name,
            log:login,
            mail: email,
            pass: password,
        }
        this.arr.push(obj)
        this.localStorage()
        window.location.href = 'login.html'
        localStorage.setItem('name',JSON.stringify(obj))
        console.log(this.arr);
    }
    checking(password){
        const toCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return toCheck.test(password)
    }
    checkingLogin(login,email){
        return this.arr.some(user => user.log === login || user.mail === email)
    }
    localStorage(){
        localStorage.setItem('users',JSON.stringify(this.arr))
    }
}
const reg = new Reg()
btn.addEventListener('click',()=>{
    console.log(JSON.parse(localStorage.getItem('users')));
    const one = login.value
    const two = email.value
    const four = userName.value
    const lol = passwordOne.value
    const lel = passwordTwo.value
    console.log(lol);    
    let  three = ``
    if(lol == lel){
        three = `${lol}`
        console.log(three);
        if(!reg.checking(three)){
            alert('ты не правильно заполнил пароль')
            return
        }
        // if(reg.checking(three)){
        //     three = lel
        // }
        // else{
        //     alert('ты не правильно заполнил пароль')
        //     return
        // }
    }
    else {
        alert('пароли не совпадают')
        return
    }
    if(!one || !two || !lol || !lel || !four){
        alert('заполни все поля')
        return
    }
    else if(reg.checkingLogin(one,two)){
        alert('этот логин занят')
        return
    }
    // else if(one && two && three && four){
    //     if(reg.checking(three)){
    //         reg.person(four,one,two,three)
    //     }
    // }
    // else{
    //     alert('aa')
    // }
    reg.person(four,one,two,three)
})
// reg.person()
// P@ssw0rd2024!
// Aa1@bcde