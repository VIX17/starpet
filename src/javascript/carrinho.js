$(document).ready(function() {
    // Função para carregar os itens do carrinho
    function carregarCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let container = $('.cart-container');

        // Limpa o container para evitar duplicações
        container.html('');

        // Se o carrinho estiver vazio, mostre uma mensagem
        if (carrinho.length === 0) {
            container.html('<p>Seu carrinho está vazio!</p>');
            return;
        }

        // Percorre os itens no carrinho e os adiciona ao HTML
        carrinho.forEach(function(produto) {
            let produtoHTML = `
            <div class="produto" data-nome="${produto.nome}" data-preco="${produto.preco}">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <p>${produto.nome}</p>
                <div class="quantity-selector">
                    <button class="qty-btn decrease">-</button>
                    <input type="text" value="${produto.quantidade}" class="qty-input" readonly>
                    <button class="qty-btn increase">+</button>
                </div>
                <p class="product-price">R$${(produto.preco * produto.quantidade).toFixed(2)}</p>
                <button class="remove-item"><i class="fa-solid fa-trash"></i></button>
            </div>`;

            container.append(produtoHTML);
        });
    }

    // Função para limpar o carrinho
    function limparCarrinho() {
        localStorage.removeItem('carrinho'); // Remove o carrinho do LocalStorage
        carregarCarrinho(); // Atualiza a exibição do carrinho
    }

    // Carrega o carrinho ao abrir a página
    carregarCarrinho();

    // Evento de clique para o botão de limpar carrinho
    $('#btn-p').on('click', function() {
        limparCarrinho();
    });

    // Evento para aumentar a quantidade
    $('.cart-container').on('click', '.increase', function() {
        let produtoDiv = $(this).closest('.produto');
        let quantidadeInput = produtoDiv.find('.qty-input');
        let quantidade = parseInt(quantidadeInput.val());
        let preco = parseFloat(produtoDiv.data('preco'));

        // Aumenta a quantidade
        quantidadeInput.val(quantidade + 1);

        // Atualiza o preço
        produtoDiv.find('.product-price').text(`R$${(preco * (quantidade + 1)).toFixed(2)}`);

        // Atualiza o carrinho no localStorage
        atualizarCarrinho(produtoDiv.data('nome'), quantidade + 1);
    });

    // Evento para diminuir a quantidade
    $('.cart-container').on('click', '.decrease', function() {
        let produtoDiv = $(this).closest('.produto');
        let quantidadeInput = produtoDiv.find('.qty-input');
        let quantidade = parseInt(quantidadeInput.val());
        let preco = parseFloat(produtoDiv.data('preco'));

        // Diminui a quantidade, mas não permite que fique menos que 1
        if (quantidade > 1) {
            quantidadeInput.val(quantidade - 1);
            produtoDiv.find('.product-price').text(`R$${(preco * (quantidade - 1)).toFixed(2)}`);
            atualizarCarrinho(produtoDiv.data('nome'), quantidade - 1);
        }
    });

    // Evento para remover o item do carrinho
    $('.cart-container').on('click', '.remove-item', function() {
        let produtoDiv = $(this).closest('.produto');
        let nomeProduto = produtoDiv.data('nome');
        
        // Remove o produto do localStorage
        removerProduto(nomeProduto);
        
        // Remove o produto da interface
        produtoDiv.remove();
    });

    // Função para atualizar o carrinho no LocalStorage
    function atualizarCarrinho(nomeProduto, novaQuantidade) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let produtoIndex = carrinho.findIndex(produto => produto.nome === nomeProduto);
        
        if (produtoIndex !== -1) {
            carrinho[produtoIndex].quantidade = novaQuantidade;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
    }

    // Função para remover um produto do carrinho no LocalStorage
    function removerProduto(nomeProduto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter(produto => produto.nome !== nomeProduto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        // Atualiza a exibição do carrinho
        carregarCarrinho();
    }

    // Carrega o carrinho ao abrir a página
    carregarCarrinho();

     // Adiciona evento de clique ao ícone do carrinho
     $('#nav_logo').on('click', function() {
        window.location.href = 'index.html'; // Redireciona para a página do carrinho
    });
});
