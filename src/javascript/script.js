$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    let cartItemCount = 0;

    // Evento para os botões de adicionar ao carrinho
    $('.dish-shop').on('click', function() {
        let nomeProduto = $(this).data('nome');
        let precoProduto = parseFloat($(this).data('preco'));
        let imagemProduto = $(this).data('imagem');

        // Obter detalhes do produto
        let produto = {
            nome: nomeProduto,
            preco: precoProduto,
            quantidade: 1,
            imagem: imagemProduto
        };

        // Adicionar produto ao LocalStorage
        adicionarAoCarrinho(produto);
        
        // Atualiza o contador do carrinho
        cartItemCount++;
        $('#nav_shop').attr('data-count', cartItemCount);  // Atualiza o ícone do carrinho
    });

    // Função para salvar o produto no LocalStorage
    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        
        // Verifique se o produto já está no carrinho
        const produtoExistente = carrinho.find(item => item.nome === produto.nome);
        if (produtoExistente) {
            // Se já existe, apenas atualize a quantidade
            produtoExistente.quantidade += 1;
        } else {
            // Caso contrário, adicione o novo produto
            carrinho.push(produto);
        }
        
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Adiciona evento de clique ao ícone do carrinho
    $('#nav_shop').on('click', function() {
        window.location.href = 'carrinho.html'; // Redireciona para a página do carrinho
    });
});