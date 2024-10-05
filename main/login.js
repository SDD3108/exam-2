const login = document.querySelector('.login')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const btn = document.querySelector('.btn')

class Log{
    constructor(){
        this.arr = JSON.parse(localStorage.getItem('users')) || []
    }
    login(login,email,password){
        const found = this.arr.find(user => user.log == login && user.pass == password && user.mail == email)
        if(found){
            localStorage.setItem('name',JSON.stringify(found));
            window.location.href = 'main.html'
        }
        else{
            alert('пароль или логин не верный')
        }
    }
}
const log = new Log()
btn.addEventListener('click',()=>{
    const one = login.value
    const two = email.value
    const three = password.value
    if(one && two && three){
        log.login(one,two,three)
    }
    else{
        alert('заполни все поля')
    }
})
// localStorage.removeItem('users')