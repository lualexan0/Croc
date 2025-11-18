// SELEÇÃO INTELIGENTE: Pega Kits e Produtos da lista
const todosProdutos = document.querySelectorAll('.produto-item, .kit-card');

const barraPedido = document.getElementById('barra-pedido');
const spanTotal = document.getElementById('valor-total');
const btnFinalizar = document.getElementById('btn-finalizar');

const TELEFONE_LOJA = "5521975384646"; 

todosProdutos.forEach((produto) => {
    // Busca os botões DENTRO do card
    const btnMais = produto.querySelector('.btn-mais');
    const btnMenos = produto.querySelector('.btn-menos');
    const spanQtd = produto.querySelector('.quantidade');

    let qtd = 0;

    btnMais.addEventListener('click', () => {
        qtd++;
        spanQtd.innerText = qtd;
        produto.setAttribute('data-qtd', qtd);
        atualizarTotalGeral();
    });

    btnMenos.addEventListener('click', () => {
        if (qtd > 0) {
            qtd--;
            spanQtd.innerText = qtd;
            produto.setAttribute('data-qtd', qtd);
            atualizarTotalGeral();
        }
    });
});

function atualizarTotalGeral() {
    let total = 0;
    let itensNoCarrinho = 0;

    todosProdutos.forEach((produto) => {
        const preco = parseFloat(produto.getAttribute('data-preco'));
        const quantidade = parseInt(produto.getAttribute('data-qtd')) || 0;

        if (quantidade > 0) {
            total += preco * quantidade;
            itensNoCarrinho += quantidade;
        }
    });

    spanTotal.innerText = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    if (itensNoCarrinho > 0) {
        barraPedido.classList.remove('oculto');
    } else {
        barraPedido.classList.add('oculto');
    }
}

btnFinalizar.addEventListener('click', () => {
    let mensagem = "*Olá! Gostaria de fazer o seguinte pedido:*\n\n";

    todosProdutos.forEach((produto) => {
        const quantidade = parseInt(produto.getAttribute('data-qtd')) || 0;

        if (quantidade > 0) {
            const nome = produto.getAttribute('data-nome');
            const preco = parseFloat(produto.getAttribute('data-preco'));
            const subtotal = (preco * quantidade).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            mensagem += ` ${quantidade}x ${nome} - ${subtotal}\n`;
        }
    });

    const totalFinal = spanTotal.innerText;
    mensagem += `\n*Total Geral: ${totalFinal}*`;
    mensagem += `\n\nAguardo confirmação!`;


    const linkZap = `https://api.whatsapp.com/send/?phone=${TELEFONE_LOJA}&text=${encodeURIComponent(
        mensagem
    )}&type=phone_number&app_absent=0`;

    window.open(linkZap, '_blank');
});
