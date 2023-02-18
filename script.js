
let reset = () => {
    document.getElementById("form").reset();
}

let isPrime = (n) => {
    if (n < 2) return false
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false
    }
    return true;
}

let check = () => {
    let P = parseInt(document.getElementById('soNguyenTo').value);
    let A = parseInt(document.getElementById('soAlpha').value);
    let x = parseInt(document.getElementById('soX').value);
    // Kiểm tra P
    if (!P) {
        alert("Chưa nhập số P!");
        return false;
    } else {
        if (!isPrime(P)) {
            alert("Số vừa nhập không phải số nguyên tố!");
            return false;
        } else {
            console.log(P);
            if (!x) {
                alert("Chưa nhập số x!");
                return false;
            } else {
                if (x > P - 2 || x < 2) {
                    alert("2 <= x <= P-2");
                    return false;
                } else {
                    console.log(x);
                    return true;
                }
            }
        }
    }
    return true;
}

let randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let binhPhuongVaNhan = (bas, exp, mod) => {
    let t = 1;
    while (exp > 0) {
        if (exp % 2 != 0)
            t = (t * bas) % mod;


        bas = (bas * bas) % mod;
        exp >>= 1;
    }
    return t % mod;
}




let Test = () => {
    let P = parseInt(document.getElementById('soNguyenTo').value);
    let A = parseInt(document.getElementById('soAlpha').value);
    let x = parseInt(document.getElementById('soX').value);
    let modulo = binhPhuongVaNhan(A,x,P);
    console.log(Number(modulo));
}