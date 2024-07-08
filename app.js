function createWord() {
    let animals = ['aslan', 'kaplan', 'zurafa', 'timsah', 'gergedan', 'maymun', 'esek', 'jaguar', 'ayi', 'kanarya'];
    return animals[Math.floor(Math.random() * animals.length)];
}

let correctLetters = []; // Gerekli harfler

function explodeLetters() {  // Burada kelimemizi harflere ayiriyoruz
    let animalName = createWord();
    correctLetters = animalName.split('');
    console.log(correctLetters);
    createHTML_el(correctLetters);
}

explodeLetters();

function createHTML_el(correctLetters) {  // Burada bir html yapisi kuruyoruz.
    const wantedLettersDiv = document.getElementsByClassName('wanted-letters')[0];
    wantedLettersDiv.innerHTML = ''; // Önceki span'ları temizle

    for (let i = 0; i < correctLetters.length; i++) {
        const span = document.createElement('span');
        wantedLettersDiv.appendChild(span);
        span.classList.add('correct-letters');
        span.textContent = '_'; // Tahmin edilecek harfler için yer tutucu . Bu sayede ekranda gorulmeyen cerceveler bir cizgi sayesinde gozukuyor.
    }
}

document.addEventListener('keydown', (e) => {
    compareLetters(e);
});    // Ekranda her bir harfe bastiginda gerceklesecek olaylar

let spanSet = new Set();  // Burada bir kosul anlami verdik. Eger girilen yanlis kelime , spanSet  adli setimizde yok ise yanlis kelimeyi ekrana yazdiriyoruz.Varsa bir daha yazdirmiyoruz.
let wrongSpans = document.getElementsByClassName('wrong-span');

function compareLetters(e) {
    const key = e.key.toLowerCase();

    if (correctLetters.includes(key)) {
        console.log(key);
        updateCorrectLetters(key);  //! Burasi onemli
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (!spanSet.has(key)) {
            spanSet.add(key);
            const span = document.createElement('span');
            const wrongSpanDiv = document.getElementsByClassName('wrong-letters')[0];
            wrongSpanDiv.appendChild(span);
            span.classList.add('wrong-span');
            span.textContent = key;
        }
    }
}

function updateCorrectLetters(key) {
    guessedLetters.push(key);

    const correctSpans = document.getElementsByClassName('correct-letters');
    for (let i = 0; i < correctLetters.length; i++) {
        if (correctLetters[i] === key) {
            correctSpans[i].textContent = key;
        }
    }
}


//  Bir onceki koddaki eksiklerim
// 1) Girilen verileri kucuk harfe cevirmemek
// 2) Ekranda kelimelerin bos halini gosterememek. Bunu , kelimelerin yerine - isareti koyarak cozduk.
// 3) Klavyeden girilen degerin , aradim harfler arasinda olup olmadigini kontrol edememek ve eger arasindaysa bunu ekrana yazdiramamak. Bunu updateCorrectLetters funk ile cozduk
