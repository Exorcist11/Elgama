let reset = () => {
    document.getElementById("form").reset();
}

let isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

let check = () => {
    let P = parseInt(document.getElementById('soNguyenTo').value);
    let A = parseInt(document.getElementById('soAlpha').value);
    let x = parseInt(document.getElementById('soX').value);
    let k = parseInt(document.getElementById('soK').value);
    // Kiểm tra P
    if (!P) {
        alert("ERR: Chưa nhập số P!");
        return false;
    } else {
        if (!isPrime(P)) {
            alert("ERR: Số vừa nhập không phải số nguyên tố!");
            return false;
        }
    }
    if (!A) {
        alert("ERR: Chưa nhập số alpha!");
        return false;
    } else {
        if (A < 1 || A > P - 1) {
            alert("ERR: alpha phải thuộc Zp*!");
            return false;
        }
    }
    if (!x) {
        alert("ERR: Chưa nhập số x!");
        return false;
    } else {
        if (x < 2 || x > P - 2) {
            alert("ERR: x phải thuộc {2,3,..,p-2}!");
            return false;
        }
    }
    if (!k) {
        alert("ERR: Chưa nhập số k!");
        return false;
    } else {
        if (k < 1 || k > P - 1) {
            alert('ERR: k phải thuộc Zp-1!');
            return false;
        }
    }
    return true;
}
//Ramdom number
let randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// beta = alp^x mod p
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
// gdc
let gcd = (a, b) => {
    return (b == 0) ? a : gcd(b, a % b);
}
let modInverse = (a, m) => {
    for (let i = 1; i < m; i++)
        if (((a % m) * (i % m)) % m == 1)
            return i;
}

let khoaNgauNhien = () => {
    let P = document.getElementById('soNguyenTo')
    let A = document.getElementById('soAlpha');
    let x = document.getElementById('soX');
    let display = document.getElementById('soBeta');
    let k = document.getElementById('soK');
    let randomP = randomA = randomX = 0;
    do {
        randomP = randomIntFromInterval(100, 100000000);
        randomX = randomIntFromInterval(2, randomP - 2);
        randomA = randomIntFromInterval(1, randomP);
    } while (!isPrime(randomP));
    let randomK = randomIntFromInterval(100, randomP);
    while (gcd(randomK, randomP - 1) != 1) {
        randomK = randomIntFromInterval(100, randomP);
    }
    P.value = randomP;
    A.value = randomA;
    x.value = randomX;
    k.value = randomK;
    let beta = binhPhuongVaNhan(randomA, randomX, randomP);
    display.value = beta;
    console.log('Kpub: ', P.value, A.value, beta);
    console.log('Kpr: ', x.value);
}

let khoaTuyChon = () => {
    let P = parseInt(document.getElementById('soNguyenTo').value);
    let A = parseInt(document.getElementById('soAlpha').value);
    let x = parseInt(document.getElementById('soX').value);
    let display = document.getElementById('soBeta');

    let beta = binhPhuongVaNhan(A, x, P);
    display.value = beta;
    try {
        console.log(Number(modulo));
    } catch (error) {
        console.log(error)
    }
    console.log('Kpub: ', P, A, beta);
    console.log('Kpr: ', x);
}

let onMyfileChange = (fileInput) => {
    let display = document.getElementById('hashFile');
    if (fileInput.files[0] == undefined) {
        return;
    }

    var reader = new FileReader();
    reader.onload = (ev) => {
        crypto.subtle.digest('SHA-256', ev.target.result).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            display.value = hashHex;
            console.log('Hash: ', hashHex);
        });
    };
    reader.onerror = function (err) {
        console.error("Failed to read file", err);
    }
    reader.readAsArrayBuffer(fileInput.files[0]);
}

const hexToDecimal = hex => parseInt(hex, 16);

let delta = (msg, alp, gamal, k, p) => {
    let en_msg = [];
    let k_inv = modInverse(k, p - 1);
    for (let i = 0; i < msg.length; i++) {
        en_msg.push(msg[i]);
    }
    for (let i = 0; i < en_msg.length; i++) {
        en_msg[i] = ((en_msg[i] - alp * gamal) * k_inv, p - 1)
    }
    return en_msg;
}

let kyVanBan = () => {
    //check();

    let P = BigInt(parseInt(document.getElementById('soNguyenTo').value));
    let A = BigInt(parseInt(document.getElementById('soAlpha').value));
    let k = BigInt(parseInt(document.getElementById('soK').value));
    let msg = document.getElementById('hashFile').value;
    let soY = document.getElementById('soY');
    let gamal = binhPhuongVaNhan(A, k, P);
    soY.value = gamal;
    let convertMsg = hexToDecimal(msg);
    console.log('MSG: ', convertMsg);
    let delta;
    console.log("Gamal: ", gamal);
    console.log("Delata: ", delta);
    // Thực hiện ký văn bản

}


let Test = () => {
    let file = document.getElementById('inputFile');
    let display = document.getElementById('hashFile');

    let P = BigInt(parseInt(document.getElementById('soNguyenTo').value));
    console.log(P);
    console.log('Hash file: ', display.value);

}