import { Quote } from "./Quote.js";

class Game {
    currentStep = 0;
    lastStep = 7;

    quotes = [
        {
            text: 'Pan Tadeusz',
            category: 'Utwór literacki'
        },
        {
            text: 'janko muzykant',
            category: 'Utwór literacki'
        },
        {
            text: 'akademia pana kleksa',
            category: 'Film'
        },
        {
            text: 'killer',
             category: 'Film'
        },
        {
            text: 'javascript',
            category: 'Język programowania'
        }
    ];

    constructor({lettersWrapper, categoryWrapper, wordWrapper, outputWrapper}) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {text, category} = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    }

    guess(letter, e) {
        e.target.disabled = true;
        if (this.quote.guess(letter)) {
            this.drawQuote();
        } else {
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        }
        if (this.currentStep === this.lastStep) {
            this.loosing();
        }
    }

    drawLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (e) => this.guess(label, e))
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote() {
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) {
            this.winning();
        }
    }

    start() {
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        this.drawLetters();
        this.drawQuote();
    }

    winning() {
        this.wordWrapper.innerHTML = 'GRATULACJE WYGRYWASZ';
        this.lettersWrapper.innerHTML = '';
    }

    loosing() {
        this.wordWrapper.innerHTML = 'NIESTETY PRZEGRYWASZ';
        this.lettersWrapper.innerHTML = '';
    }
}

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output')
});
game.start();
