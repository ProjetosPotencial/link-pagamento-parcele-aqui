# Link de Pagamento — Protótipo (V1)

Protótipo navegável do **Link de Pagamento** do Parcele Aqui, para aprovação dos stakeholders. É um arquivo HTML único e autossuficiente (sem build, sem dependências), que simula a navegação dentro do backoffice.

## Como visualizar

Abra o `index.html` em qualquer navegador. Para publicar (GitHub Pages, Vercel, Netlify), basta servir a pasta — o ponto de entrada é o `index.html`.

## O que está incluído

O protótipo é um shell de backoffice com a identidade do Parcele Aqui, e a navegação acontece pela barra superior (e pela barra lateral):

- **Dashboard** — visão geral do backoffice (estrutura baseada no print real), com KPIs zerados, "Faturamento Mensal" e "Mix de Pagamentos".
- **Link de Pagamento** — tela de criação do link (preenchida pelo parceiro, dentro do backoffice).
- **Checkout (Capitale)** — pré-visualização do que o cliente final vê ao abrir o link, no ambiente do parceiro (exemplo: Capitale).

A barra lateral traz o ícone do Parcele Aqui e o item **"Link de Pagamento" (badge Novo)** abaixo de "White Label".

## Decisões aplicadas (a partir da revisão do Cristhian)

Tela de criação:
- Fluxo baseado em **boletos**: código de barras (apenas números), cedente, valor (máscara R$) e data de vencimento, com "Adicionar boleto" montando um carrinho e somando o total.
- Sem seleção de forma de pagamento, sem endereço de fatura e sem repasse — essas informações ficam com quem recebe o link.
- Descrição/motivo obrigatório, com dica de preenchimento.
- Dados do destinatário (nome, e-mail e telefone com máscara).
- V1 apenas com boleto (pendência regulatória para Pix na origem).

Checkout (cliente final):
- Reflete exatamente os boletos lançados na tela de criação (vazio na criação = checkout zerado).
- Seleção de forma de pagamento (crédito ativo; débito e Pix preparados; "Dividir" oculto/Em breve).
- **Parcelamento com as taxas reais do Parcele Aqui** (1x a 12x), no formato `Nx – Valor total: R$ X – Taxa: Y%`, com 12x recomendada por padrão.
- Campos do cartão com bandeiras, CPF/CNPJ do titular e endereço da fatura.
- Linha de segurança + "powered by" da Potencial Tecnologia.

Identidade visual:
- Tokens do Design System do Parcele Aqui (amarelo `#FFB800` como acento, neutros, Kufam + DM Sans).
- Botões no formato pill (r-full); ícones no estilo Lucide (traço fino) e ícone oficial do Pix.
- Logo da Capitale (oficial) no checkout como parceiro.

## Pendências / observações

- **Logo da Potencial Tecnologia**: atualmente usa uma versão recriada. Para usar o arquivo oficial, substituir o SVG inline nos pontos `powered by` (rodapé da criação e coluna esquerda do checkout).
- **Bandeiras dos cartões**: marcas inline simplificadas (Visa, Mastercard, Amex, Elo). Podem ser trocadas pelos SVGs oficiais, se desejado.
- Os dados (boletos, KPIs) são simulados apenas para a demonstração.

## Estrutura

```
link-pagamento-prototipo/
├── index.html      # protótipo completo (HTML/CSS/JS em um único arquivo)
├── README.md
└── .gitignore
```
