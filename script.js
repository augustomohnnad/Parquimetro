//Abstração
class Parquimetro {
    #valor
    constructor() {
        this.valor = 0;
        this.troco = 0;
        
    };
    
    inserirMoeda = (valordigitado) => {
        this.valor = Number(valordigitado)
        displayValor.textContent = `Valor: ${this.valorFormatado}`
        
    };

    //Encapsulamento
    //Formata o valor de Number  para String em (REAL-BRL)
    get valorFormatado() {
        return this.#valor.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    }

    //mantem o valor em Number para usar no cauculo do troco
    get valor() {
        return this.#valor
    };

    set valor(valordigitado) {
        if(valordigitado >= 0) {
            this.#valor = valordigitado
        }
    };

    calcularTroco() {
        const v = this.valor;
        if(v >= 3) {
            this.troco = v - 3

        } else if(v >= 1.75 && v <= 3.00) {
            this.troco = v - 1.75

        } else if( v >= 1) {
            this.troco = v - 1
        } 
    };

};
//Herança
class tempoParquimetro extends Parquimetro {
    constructor() {
        super();
        this.tempoPorValor = "Tempo: 00h:00min";
    };
    validaValorTempo() {
        return this.valor >= 1
    }

    tempoPermanencia = () => {
        const valorInserido = this.valor;
        if(valorInserido >= 3.00) {
            this.tempoPorValor = "Tempo: 02h:00min (Tempo maximo permitido)"

        } else if( valorInserido >= 1.75) {
            this.tempoPorValor = "Tempo: 01h:00min"

        } else if(valorInserido >= 1.00 ) {
            this.tempoPorValor = "Tempo: 00h:30min"

        } else {
            this.tempoPorValor = "Valor insuficiente, valor minimo nesse Parquimetro é R$1,00"
        }

        return this.tempoPorValor
         
    };
    //Polimorfismo
    calcularTroco() { 
        super.calcularTroco()
        const displayTroco = document.querySelector('.display')

        if(this.troco > 0) {
            displayTroco.textContent = `Retire seu troco de ${this.troco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            })} Obrigado e volte sempre`

        
        } else {
            return displayTroco.textContent = 'Obrigado e volte sempre'
        }
           
    };
    
};

//Chamada da Instancia do Constructor, quando trabalhada a herança sempre chama a classe filha pois ela gritara para mae chamando seus metodos
const meuParquimetro = new tempoParquimetro()

// Instanciando o DOM
const btnConfirmar = document.querySelector(".confirmar")
const btnTeclado = document.querySelector('.teclado');
const display = document.querySelector('.display');
const displayValor = document.getElementById('valor');
const displayTempo = document.getElementById('tempo');


// Função para a ultilização do teclado
const numero = [];
function iniciarDisplay() {
    btnTeclado.addEventListener('click', (b) => {
        const botoes = b.target;
        const numeroBotao = botoes.innerText;

        if(!isNaN(numeroBotao)){
            numero.push(numeroBotao)     
        }
        if(numero.length <= 4) {
            const numeroFormatado = numero.slice(-4).join("") / 100
            meuParquimetro.inserirMoeda(numeroFormatado)
            
        }
        
    });
}

display.addEventListener('click', (iniciarDisplay()))

function limparDisplay() {
    numero.pop()
    

};

function calcularTempo() {
    const tempo = meuParquimetro.tempoPermanencia();
    displayTempo.textContent = tempo;
    btnConfirmar.style.display = meuParquimetro.validaValorTempo() ? "block" : "none";

};


btnConfirmar.addEventListener('click', () => {
    meuParquimetro.calcularTroco()
    setTimeout(() => {
       display.innerText = 'Aguarde a impressão do comprovante.'
    }, 2000);

});
