

Test = () => {
    let P = parseInt(document.getElementById('soNguyenTo').value);
    let A = parseInt(document.getElementById('soAlpha').value);
    let res = document.getElementById('resultDisplay');
    try {
        res.value = P + A;
    } catch (error) {
        console.log(error);
    }
}