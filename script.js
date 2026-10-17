/* =========================================
   DADOS
========================================= */

const CHAVE_AGENDAMENTOS =
    "merenda_agendamentos";

const CHAVE_ENTREGAS =
    "merenda_entregas";


/* =========================================
   AGENDAMENTOS INICIAIS
========================================= */

function obterAgendamentos() {

    const dados =
        localStorage.getItem(
            CHAVE_AGENDAMENTOS
        );

    if (dados) {

        return JSON.parse(dados);

    }


    /*
       EXEMPLO:

       Mesmo dia com DOIS tipos
       diferentes de lanche.
    */

    const agendamentos = [

        {
            id: 1,
            data: "2026-09-28",
            turno: "Manhã",
            lanche: "Pastel de frango + suco",
            quantidade: 120
        },

        {
            id: 2,
            data: "2026-09-28",
            turno: "Manhã",
            lanche: "Pastel vegetariano + suco",
            quantidade: 80
        },

        {
            id: 3,
            data: "2026-09-29",
            turno: "Tarde",
            lanche: "Sanduíche natural + suco",
            quantidade: 150
        },

        {
            id: 4,
            data: "2026-09-30",
            turno: "Manhã",
            lanche: "Biscoito integral + suco",
            quantidade: 100
        }

    ];


    salvarAgendamentos(
        agendamentos
    );


    return agendamentos;
}


/* =========================================
   SALVAR
========================================= */

function salvarAgendamentos(
    agendamentos
) {

    localStorage.setItem(

        CHAVE_AGENDAMENTOS,

        JSON.stringify(
            agendamentos
        )

    );

}


/* =========================================
   DATA
========================================= */

function formatarData(data) {

    if (!data) {

        return "";

    }


    const partes =
        data.split("-");


    return (

        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]

    );

}


/* =========================================
   DIA DA SEMANA
========================================= */

function diaSemana(data) {

    const dias = [

        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"

    ];


    const dataObj =
        new Date(
            data + "T00:00:00"
        );


    return dias[
        dataObj.getDay()
    ];

}


/* =========================================
   TABELA
========================================= */

function renderTabela() {

    const tabela =
        document.getElementById(
            "tabelaAgendamentos"
        );


    if (!tabela) {

        return;

    }


    let agendamentos =
        obterAgendamentos();


    const turno =
        document.getElementById(
            "turnoFiltro"
        ).value;


    const busca =
        document.getElementById(
            "busca"
        ).value
        .toLowerCase();


    if (
        turno !==
        "Todos os turnos"
    ) {

        agendamentos =
            agendamentos.filter(

                item =>
                    item.turno ===
                    turno

            );

    }


    if (busca) {

        agendamentos =
            agendamentos.filter(

                item =>

                    item.lanche
                    .toLowerCase()
                    .includes(busca)

            );

    }


    agendamentos.sort(

        (a,b) => {

            if (
                a.data ===
                b.data
            ) {

                return a.turno.localeCompare(
                    b.turno
                );

            }

            return a.data.localeCompare(
                b.data
            );

        }

    );


    if (
        agendamentos.length === 0
    ) {

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#718096;
                    "
                >

                    Nenhum agendamento encontrado.

                </td>

            </tr>

        `;

        return;

    }


    tabela.innerHTML =

        agendamentos.map(

            item => `

            <tr>

                <td>
                    ${formatarData(item.data)}
                </td>

                <td>
                    ${diaSemana(item.data)}
                </td>

                <td>
                    ${item.turno}
                </td>

                <td>
                    <strong>
                        ${item.lanche}
                    </strong>
                </td>

                <td>
                    ${item.quantidade}
                </td>

                <td>

                    <span
                        class="status agendado"
                    >

                        Agendado

                    </span>

                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="btn-mini entrega"
                            onclick="
                                abrirRegistro(
                                    ${item.id}
                                )
                            "
                        >

                            Registrar entrega

                        </button>


                        <button
                            class="btn-mini"
                            onclick="
                                editarAgendamento(
                                    ${item.id}
                                )
                            "
                        >

                            Editar

                        </button>


                        <button
                            class="btn-mini excluir"
                            onclick="
                                excluirAgendamento(
                                    ${item.id}
                                )
                            "
                        >

                            Excluir

                        </button>

                    </div>

                </td>

            </tr>

        `

        ).join("");

}


/* =========================================
   FORMULÁRIO
========================================= */

function abrirFormulario() {

    const formulario =
        document.getElementById(
            "formulario"
        );


    formulario.style.display =
        "block";


    document.getElementById(
        "novaData"
    ).value = "";


    document.getElementById(
        "novoTurno"
    ).value = "";


    document.getElementById(
        "novoLanche"
    ).value = "";


    document.getElementById(
        "novaQuantidade"
    ).value = "";

}


function fecharFormulario() {

    document.getElementById(
        "formulario"
    ).style.display =
        "none";

}


/* =========================================
   SALVAR NOVO AGENDAMENTO
========================================= */

function salvarAgendamento() {

    const data =
        document.getElementById(
            "novaData"
        ).value;


    const turno =
        document.getElementById(
            "novoTurno"
        ).value;


    const lanche =
        document.getElementById(
            "novoLanche"
        ).value.trim();


    const quantidade =
        Number(
            document.getElementById(
                "novaQuantidade"
            ).value
        );


    if (!data) {

        alert(
            "Informe a data."
        );

        return;

    }


    if (!turno) {

        alert(
            "Selecione o turno."
        );

        return;

    }


    if (!lanche) {

        alert(
            "Informe o tipo de lanche."
        );

        return;

    }


    if (
        quantidade <= 0
    ) {

        alert(
            "Informe uma quantidade válida."
        );

        return;

    }


    const agendamentos =
        obterAgendamentos();


    agendamentos.push({

        id:
            Date.now(),

        data:

            data,

        turno:

            turno,

        lanche:

            lanche,

        quantidade:

            quantidade

    });


    salvarAgendamentos(
        agendamentos
    );


    fecharFormulario();


    renderTabela();


    mostrarMensagem(
        "Agendamento cadastrado."
    );

}


/* =========================================
   EDITAR
========================================= */

function editarAgendamento(id) {

    const agendamentos =
        obterAgendamentos();


    const item =
        agendamentos.find(
            x =>
                x.id === id
        );


    if (!item) {

        return;

    }


    const novaQuantidade =
        prompt(

            "Quantidade:",

            item.quantidade

        );


    if (
        novaQuantidade === null
    ) {

        return;

    }


    item.quantidade =
        Number(
            novaQuantidade
        );


    salvarAgendamentos(
        agendamentos
    );


    renderTabela();


    mostrarMensagem(
        "Agendamento atualizado."
    );

}


/* =========================================
   EXCLUIR
========================================= */

function excluirAgendamento(id) {

    const confirmar =
        confirm(
            "Deseja excluir este agendamento?"
        );


    if (!confirmar) {

        return;

    }


    let agendamentos =
        obterAgendamentos();


    agendamentos =
        agendamentos.filter(

            item =>
                item.id !== id

        );


    salvarAgendamentos(
        agendamentos
    );


    renderTabela();


    mostrarMensagem(
        "Agendamento excluído."
    );

}


/* =========================================
   ABRIR REGISTRO
========================================= */

function abrirRegistro(id) {

    const agendamentos =
        obterAgendamentos();


    const item =
        agendamentos.find(
            x =>
                x.id === id
        );


    if (!item) {

        return;

    }


    /*
       GUARDA O LANCHES SELECIONADO
       PARA A OUTRA PÁGINA.
    */

    sessionStorage.setItem(

        "lancheSelecionado",

        JSON.stringify(item)

    );


    window.location.href =
        "registro-entrega.html";

}


/* =========================================
   CARREGAR REGISTRO
========================================= */

function carregarRegistro() {

    const elemento =
        document.getElementById(
            "entregaLanche"
        );


    if (!elemento) {

        return;

    }


    const dados =
        sessionStorage.getItem(
            "lancheSelecionado"
        );


    if (!dados) {

        return;

    }


    const item =
        JSON.parse(
            dados
        );


    document.getElementById(
        "entregaData"
    ).textContent =
        formatarData(
            item.data
        );


    document.getElementById(
        "entregaTurno"
    ).textContent =
        item.turno;


    document.getElementById(
        "entregaLanche"
    ).textContent =
        item.lanche;


    document.getElementById(
        "quantidadePrevista"
    ).textContent =
        item.quantidade;


    document.getElementById(
        "quantidadeEntregue"
    ).value =
        item.quantidade;

}


/* =========================================
   ENTREGAS
========================================= */

function obterEntregas() {

    const dados =
        localStorage.getItem(
            CHAVE_ENTREGAS
        );


    if (!dados) {

        return [];

    }


    return JSON.parse(
        dados
    );

}


function salvarEntregas(
    entregas
) {

    localStorage.setItem(

        CHAVE_ENTREGAS,

        JSON.stringify(
            entregas
        )

    );

}


/* =========================================
   REGISTRAR ENTREGA
========================================= */

function registrarEntrega() {

    const dados =
        sessionStorage.getItem(
            "lancheSelecionado"
        );


    if (!dados) {

        alert(
            "Nenhum agendamento selecionado."
        );

        return;

    }


    const item =
        JSON.parse(
            dados
        );


    const quantidade =
        Number(
            document.getElementById(
                "quantidadeEntregue"
            ).value
        );


    if (
        quantidade < 0 ||
        isNaN(quantidade)
    ) {

        alert(
            "Informe uma quantidade válida."
        );

        return;

    }


    const observacao =
        document.getElementById(
            "observacaoEntrega"
        ).value;


    let entregas =
        obterEntregas();


    entregas.push({

        id:
            Date.now(),

        data:
            item.data,

        turno:
            item.turno,

        lanche:
            item.lanche,

        prevista:
            item.quantidade,

        entregue:
            quantidade,

        observacao:
            observacao

    });


    salvarEntregas(
        entregas
    );


    renderHistorico();


    mostrarMensagem(
        "Entrega registrada com sucesso."
    );


    document.getElementById(
        "observacaoEntrega"
    ).value = "";

}


/* =========================================
   HISTÓRICO
========================================= */

function renderHistorico() {

    const tabela =
        document.getElementById(
            "historicoEntrega"
        );


    if (!tabela) {

        return;

    }


    const entregas =
        obterEntregas();


    if (
        entregas.length === 0
    ) {

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#718096;
                    "
                >

                    Nenhuma entrega registrada.

                </td>

            </tr>

        `;

        return;

    }


    tabela.innerHTML =

        entregas.map(

            item => {

                let status;

                let classe;


                if (
                    item.entregue === 0
                ) {

                    status =
                        "Não entregue";

                    classe =
                        "nao-entregue";

                }

                else if (
                    item.entregue <
                    item.prevista
                ) {

                    status =
                        "Parcial";

                    classe =
                        "parcial";

                }

                else {

                    status =
                        "Entregue";

                    classe =
                        "entregue";

                }


                return `

                    <tr>

                        <td>
                            ${formatarData(
                                item.data
                            )}
                        </td>

                        <td>
                            ${item.turno}
                        </td>

                        <td>
                            <strong>
                                ${item.lanche}
                            </strong>
                        </td>

                        <td>
                            ${item.prevista}
                        </td>

                        <td>
                            ${item.entregue}
                        </td>

                        <td>

                            <span
                                class="
                                    status
                                    ${classe}
                                "
                            >

                                ${status}

                            </span>

                        </td>

                        <td>

                            <button
                                class="
                                    btn-mini
                                    excluir
                                "
                                onclick="
                                    excluirEntrega(
                                        ${item.id}
                                    )
                                "
                            >

                                Excluir

                            </button>

                        </td>

                    </tr>

                `;

            }

        ).join("");

}


/* =========================================
   EXCLUIR ENTREGA
========================================= */

function excluirEntrega(id) {

    if (
        !confirm(
            "Deseja excluir este registro?"
        )
    ) {

        return;

    }


    let entregas =
        obterEntregas();


    entregas =
        entregas.filter(

            item =>
                item.id !== id

        );


    salvarEntregas(
        entregas
    );


    renderHistorico();


    mostrarMensagem(
        "Registro excluído."
    );

}


/* =========================================
   MENSAGEM
========================================= */

function mostrarMensagem(
    mensagem
) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        return;

    }


    toast.textContent =
        mensagem;


    toast.classList.add(
        "show"
    );


    setTimeout(

        () => {

            toast.classList.remove(
                "show"
            );

        },

        2500

    );

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        renderTabela();

        carregarRegistro();

        renderHistorico();

    }

);


/* =========================================
   ALIMENTOS E PRODUTOS

   Parte: Alimentos, Cadastro de Alimentos,
   Produtos e Cadastro de Produtos.

   REGRA DE NOMES:
   todo identificador deste bloco leva
   Alimento(s) ou Produto(s) no nome, para não
   colidir com as funções de Agendamento e
   Entrega.
   Exceções (utilitários genéricos):
   escaparTextoHtml, formatarDecimalBR,
   formatarEstoque.

   Identificadores criados neste bloco:

   CONSTANTES
   CHAVE_ALIMENTOS
   CHAVE_ULTIMO_ID_ALIMENTO
   CHAVE_PRODUTOS
   CHAVE_ULTIMO_ID_PRODUTO
   LISTA_NATUREZAS_ALIMENTO
   LISTA_GRUPOS_ALIMENTO
   LISTA_UNIDADES_ALIMENTO

   VARIÁVEIS
   idEdicaoAlimento
   idEdicaoProduto

   FUNÇÕES - ALIMENTOS
   obterAlimentos, salvarAlimentos,
   gerarIdAlimento, buscarAlimentoPorId,
   alimentoPossuiProdutos,
   montarOpcoesAlimento,
   renderTabelaAlimentos,
   abrirFormularioAlimento,
   fecharFormularioAlimento,
   salvarAlimento, editarAlimento,
   excluirAlimento

   FUNÇÕES - PRODUTOS
   obterProdutos, salvarProdutos,
   gerarIdProduto, buscarProdutoPorId,
   produtoPossuiVinculos,
   montarSelectAlimentoProduto,
   atualizarUnidadeProduto,
   formatarSubitensProduto,
   renderTabelaProdutos,
   abrirFormularioProduto,
   fecharFormularioProduto,
   salvarProduto, editarProduto,
   excluirProduto

   UTILITÁRIOS
   escaparTextoHtml, formatarDecimalBR,
   formatarEstoque
========================================= */


/* =========================================
   CHAVES DO LOCALSTORAGE
========================================= */

const CHAVE_ALIMENTOS =
    "merenda_alimentos";

const CHAVE_ULTIMO_ID_ALIMENTO =
    "merenda_alimentos_ultimo_id";

const CHAVE_PRODUTOS =
    "merenda_produtos";

const CHAVE_ULTIMO_ID_PRODUTO =
    "merenda_produtos_ultimo_id";


/* =========================================
   LISTAS DO FORMULÁRIO DE ALIMENTOS

   PROVISÓRIO: valores vistos no designer.
   Para acrescentar uma opção, basta incluir
   uma linha na lista correspondente.
========================================= */

const LISTA_NATUREZAS_ALIMENTO = [

    "Comida",
    "Bebida"

];


const LISTA_GRUPOS_ALIMENTO = [

    "Fruta",
    "Suco",
    "Panifício",
    "Laticínio"

];


const LISTA_UNIDADES_ALIMENTO = [

    {
        valor: "Kg",
        rotulo: "Kg (Quilograma)"
    },

    {
        valor: "L",
        rotulo: "L (Litro)"
    },

    {
        valor: "un",
        rotulo: "un (Unidade)"
    }

];


/* =========================================
   REGISTRO EM EDIÇÃO

   null = o formulário está cadastrando.
   Número = o formulário está editando
   o registro com esse id.
========================================= */

let idEdicaoAlimento = null;

let idEdicaoProduto = null;


/* =========================================
   ALIMENTOS - DADOS
========================================= */

function obterAlimentos() {

    const dados =
        localStorage.getItem(
            CHAVE_ALIMENTOS
        );

    if (dados) {

        return JSON.parse(dados);

    }


    /*
       DADOS DEMONSTRATIVOS DO DESIGNER.

       Servem apenas para a tela ficar
       visualmente igual ao protótipo.
       NÃO são regra de negócio.
    */

    const alimentos = [

        {
            id: 1,
            nome: "Banana",
            descricao: "Banana caturra fresca",
            natureza: "Comida",
            grupo: "Fruta",
            unidadeBase: "Kg"
        },

        {
            id: 2,
            nome: "Suco de Uva",
            descricao: "Suco de uva integral",
            natureza: "Bebida",
            grupo: "Suco",
            unidadeBase: "L"
        },

        {
            id: 3,
            nome: "Biscoito",
            descricao: "Biscoito doce Maria",
            natureza: "Comida",
            grupo: "Panifício",
            unidadeBase: "Kg"
        },

        {
            id: 4,
            nome: "Leite",
            descricao: "Leite integral UHT",
            natureza: "Bebida",
            grupo: "Laticínio",
            unidadeBase: "L"
        },

        {
            id: 5,
            nome: "Pastel",
            descricao: "Pastel assado de queijo",
            natureza: "Comida",
            grupo: "Panifício",
            unidadeBase: "un"
        }

    ];


    salvarAlimentos(
        alimentos
    );


    localStorage.setItem(
        CHAVE_ULTIMO_ID_ALIMENTO,
        5
    );


    return alimentos;
}


function salvarAlimentos(
    alimentos
) {

    localStorage.setItem(

        CHAVE_ALIMENTOS,

        JSON.stringify(
            alimentos
        )

    );

}


/*
   O id nunca é reaproveitado: o próximo
   é sempre maior que o último já gerado
   e maior que qualquer id existente.
*/

function gerarIdAlimento() {

    const alimentos =
        obterAlimentos();

    let maior =
        Number(
            localStorage.getItem(
                CHAVE_ULTIMO_ID_ALIMENTO
            )
        ) || 0;


    alimentos.forEach(

        item => {

            if (item.id > maior) {

                maior = item.id;

            }

        }

    );


    const novoId =
        maior + 1;


    localStorage.setItem(
        CHAVE_ULTIMO_ID_ALIMENTO,
        novoId
    );


    return novoId;
}


function buscarAlimentoPorId(id) {

    const alimentos =
        obterAlimentos();

    const alimento =
        alimentos.find(
            x =>
                x.id === id
        );

    if (!alimento) {

        return null;

    }

    return alimento;
}


function alimentoPossuiProdutos(id) {

    const produtos =
        obterProdutos();

    return produtos.some(
        item =>
            item.alimentoId === id
    );
}


/* =========================================
   ALIMENTOS - OPÇÕES DOS SELECTS
========================================= */

function montarOpcoesAlimento() {

    const natureza =
        document.getElementById(
            "novaNaturezaAlimento"
        );

    const grupo =
        document.getElementById(
            "novoGrupoAlimento"
        );

    const unidade =
        document.getElementById(
            "novaUnidadeAlimento"
        );


    if (
        !natureza ||
        !grupo ||
        !unidade
    ) {

        return;

    }


    natureza.innerHTML =

        `<option value="">Selecione</option>` +

        LISTA_NATUREZAS_ALIMENTO.map(

            item => `
                <option value="${item}">
                    ${item}
                </option>
            `

        ).join("");


    grupo.innerHTML =

        `<option value="">Selecione</option>` +

        LISTA_GRUPOS_ALIMENTO.map(

            item => `
                <option value="${item}">
                    ${item}
                </option>
            `

        ).join("");


    unidade.innerHTML =

        `<option value="">Selecione</option>` +

        LISTA_UNIDADES_ALIMENTO.map(

            item => `
                <option value="${item.valor}">
                    ${item.rotulo}
                </option>
            `

        ).join("");

}


/* =========================================
   ALIMENTOS - TABELA
========================================= */

function renderTabelaAlimentos() {

    const tabela =
        document.getElementById(
            "tabelaAlimentos"
        );


    if (!tabela) {

        return;

    }


    let alimentos =
        obterAlimentos();


    const busca =
        document.getElementById(
            "buscaAlimento"
        ).value
        .toLowerCase();


    if (busca) {

        alimentos =
            alimentos.filter(

                item =>

                    item.nome
                    .toLowerCase()
                    .includes(busca)

                    ||

                    (item.descricao || "")
                    .toLowerCase()
                    .includes(busca)

                    ||

                    item.natureza
                    .toLowerCase()
                    .includes(busca)

                    ||

                    item.grupo
                    .toLowerCase()
                    .includes(busca)

            );

    }


    alimentos.sort(

        (a,b) =>
            a.id - b.id

    );


    if (
        alimentos.length === 0
    ) {

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#718096;
                    "
                >

                    Nenhum alimento encontrado.

                </td>

            </tr>

        `;

        return;

    }


    tabela.innerHTML =

        alimentos.map(

            item => `

            <tr>

                <td>
                    <strong>
                        ${item.id}
                    </strong>
                </td>

                <td>
                    ${escaparTextoHtml(item.nome)}
                </td>

                <td>
                    ${
                        item.descricao
                        ? escaparTextoHtml(item.descricao)
                        : "—"
                    }
                </td>

                <td>
                    ${escaparTextoHtml(item.natureza)}
                </td>

                <td>
                    ${escaparTextoHtml(item.grupo)}
                </td>

                <td>
                    ${escaparTextoHtml(item.unidadeBase)}
                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="btn-mini"
                            onclick="
                                editarAlimento(
                                    ${item.id}
                                )
                            "
                        >

                            Editar

                        </button>


                        <button
                            class="btn-mini excluir"
                            onclick="
                                excluirAlimento(
                                    ${item.id}
                                )
                            "
                        >

                            Excluir

                        </button>

                    </div>

                </td>

            </tr>

        `

        ).join("");

}


/* =========================================
   ALIMENTOS - FORMULÁRIO
========================================= */

function abrirFormularioAlimento() {

    const formulario =
        document.getElementById(
            "formularioAlimento"
        );


    idEdicaoAlimento = null;


    document.getElementById(
        "tituloFormularioAlimento"
    ).textContent =
        "Cadastrar Alimento";


    document.getElementById(
        "novoNomeAlimento"
    ).value = "";


    document.getElementById(
        "novaNaturezaAlimento"
    ).value = "";


    document.getElementById(
        "novoGrupoAlimento"
    ).value = "";


    document.getElementById(
        "novaUnidadeAlimento"
    ).value = "";


    document.getElementById(
        "novaUnidadeAlimento"
    ).disabled = false;


    document.getElementById(
        "avisoUnidadeAlimento"
    ).style.display =
        "none";


    document.getElementById(
        "novaDescricaoAlimento"
    ).value = "";


    formulario.style.display =
        "block";

}


function fecharFormularioAlimento() {

    idEdicaoAlimento = null;

    document.getElementById(
        "formularioAlimento"
    ).style.display =
        "none";

}


/* =========================================
   SALVAR ALIMENTO (CADASTRO E EDIÇÃO)
========================================= */

function salvarAlimento() {

    const nome =
        document.getElementById(
            "novoNomeAlimento"
        ).value.trim();

    const natureza =
        document.getElementById(
            "novaNaturezaAlimento"
        ).value;

    const grupo =
        document.getElementById(
            "novoGrupoAlimento"
        ).value;

    const unidadeBase =
        document.getElementById(
            "novaUnidadeAlimento"
        ).value;

    const descricao =
        document.getElementById(
            "novaDescricaoAlimento"
        ).value.trim();


    if (!nome) {

        alert(
            "Informe o nome do alimento."
        );

        return;

    }


    if (!natureza) {

        alert(
            "Selecione a natureza."
        );

        return;

    }


    if (!grupo) {

        alert(
            "Selecione o grupo alimentar."
        );

        return;

    }


    if (!unidadeBase) {

        alert(
            "Selecione a unidade de medida base."
        );

        return;

    }


    const alimentos =
        obterAlimentos();


    let mensagem;


    if (
        idEdicaoAlimento === null
    ) {

        alimentos.push({

            id:
                gerarIdAlimento(),

            nome:
                nome,

            descricao:
                descricao,

            natureza:
                natureza,

            grupo:
                grupo,

            unidadeBase:
                unidadeBase

        });

        mensagem =
            "Alimento cadastrado.";

    }
    else {

        const item =
            alimentos.find(
                x =>
                    x.id ===
                    idEdicaoAlimento
            );

        if (!item) {

            fecharFormularioAlimento();

            return;

        }

        item.nome =
            nome;

        item.descricao =
            descricao;

        item.natureza =
            natureza;

        item.grupo =
            grupo;


        /*
           Com produtos vinculados, a unidade
           base não pode mudar (PROVISÓRIO).
        */

        if (
            !alimentoPossuiProdutos(
                item.id
            )
        ) {

            item.unidadeBase =
                unidadeBase;

        }

        mensagem =
            "Alimento atualizado.";

    }


    salvarAlimentos(
        alimentos
    );

    fecharFormularioAlimento();

    renderTabelaAlimentos();

    mostrarMensagem(
        mensagem
    );

}


/* =========================================
   EDITAR ALIMENTO
========================================= */

function editarAlimento(id) {

    const alimento =
        buscarAlimentoPorId(
            id
        );


    if (!alimento) {

        return;

    }


    const formulario =
        document.getElementById(
            "formularioAlimento"
        );

    const possuiProdutos =
        alimentoPossuiProdutos(
            alimento.id
        );


    idEdicaoAlimento =
        alimento.id;


    document.getElementById(
        "tituloFormularioAlimento"
    ).textContent =
        "Editar Alimento";


    document.getElementById(
        "novoNomeAlimento"
    ).value =
        alimento.nome;


    document.getElementById(
        "novaNaturezaAlimento"
    ).value =
        alimento.natureza;


    document.getElementById(
        "novoGrupoAlimento"
    ).value =
        alimento.grupo;


    document.getElementById(
        "novaUnidadeAlimento"
    ).value =
        alimento.unidadeBase;


    document.getElementById(
        "novaUnidadeAlimento"
    ).disabled =
        possuiProdutos;


    document.getElementById(
        "avisoUnidadeAlimento"
    ).style.display =
        possuiProdutos
        ? "block"
        : "none";


    document.getElementById(
        "novaDescricaoAlimento"
    ).value =
        alimento.descricao || "";


    formulario.style.display =
        "block";


    formulario.scrollIntoView({

        behavior: "smooth",
        block: "start"

    });

}


/* =========================================
   EXCLUIR ALIMENTO
========================================= */

function excluirAlimento(id) {

    const confirmar =
        confirm(
            "Deseja excluir este alimento?"
        );

    if (!confirmar) {

        return;

    }


    /*
       Com produtos vinculados, a exclusão
       é bloqueada (PROVISÓRIO).
    */

    if (
        alimentoPossuiProdutos(id)
    ) {

        alert(
            "Este alimento possui produtos vinculados. Exclua ou altere os produtos antes."
        );

        return;

    }


    let alimentos =
        obterAlimentos();

    alimentos =
        alimentos.filter(
            item =>
                item.id !== id
        );

    salvarAlimentos(
        alimentos
    );


    if (
        idEdicaoAlimento === id
    ) {

        fecharFormularioAlimento();

    }


    renderTabelaAlimentos();

    mostrarMensagem(
        "Alimento excluído."
    );

}


/* =========================================
   PRODUTOS - DADOS
========================================= */

function obterProdutos() {

    const dados =
        localStorage.getItem(
            CHAVE_PRODUTOS
        );

    if (dados) {

        return JSON.parse(dados);

    }


    /*
       Garante que os alimentos de exemplo
       já existam antes de criar produtos
       que fazem referência a eles.
    */

    obterAlimentos();


    /*
       DADOS DEMONSTRATIVOS DO DESIGNER.

       Servem apenas para a tela ficar
       visualmente igual ao protótipo.
       NÃO são regra de negócio.

       Em especial, estoqueProvisionado e
       estoqueDisponivel são valores de
       exemplo: o grupo ainda não definiu
       o significado nem o cálculo deles.
    */

    const produtos = [

        {
            id: 101,
            alimentoId: 3,
            descricao: "pacote 400g",
            quantidadeBase: 0.4,
            subitens: 40,
            estoqueProvisionado: 600,
            estoqueDisponivel: 50
        },

        {
            id: 102,
            alimentoId: 2,
            descricao: "caixa 200mL",
            quantidadeBase: 0.2,
            subitens: 1,
            estoqueProvisionado: 1000,
            estoqueDisponivel: 200
        },

        {
            id: 103,
            alimentoId: 4,
            descricao: "saco 1L",
            quantidadeBase: 1,
            subitens: 1,
            estoqueProvisionado: 1000,
            estoqueDisponivel: 20
        },

        {
            id: 104,
            alimentoId: 1,
            descricao: "Kg",
            quantidadeBase: 1,
            subitens: 1,
            estoqueProvisionado: 500,
            estoqueDisponivel: 30
        }

    ];


    salvarProdutos(
        produtos
    );


    localStorage.setItem(
        CHAVE_ULTIMO_ID_PRODUTO,
        104
    );


    return produtos;
}


function salvarProdutos(
    produtos
) {

    localStorage.setItem(

        CHAVE_PRODUTOS,

        JSON.stringify(
            produtos
        )

    );

}


/*
   O primeiro id de produto é 101 (como no
   designer) e nunca é reaproveitado.
*/

function gerarIdProduto() {

    const produtos =
        obterProdutos();

    let maior =
        Number(
            localStorage.getItem(
                CHAVE_ULTIMO_ID_PRODUTO
            )
        ) || 0;


    if (maior < 100) {

        maior = 100;

    }


    produtos.forEach(

        item => {

            if (item.id > maior) {

                maior = item.id;

            }

        }

    );


    const novoId =
        maior + 1;


    localStorage.setItem(
        CHAVE_ULTIMO_ID_PRODUTO,
        novoId
    );


    return novoId;
}


function buscarProdutoPorId(id) {

    const produtos =
        obterProdutos();

    const produto =
        produtos.find(
            x =>
                x.id === id
        );

    if (!produto) {

        return null;

    }

    return produto;
}


/*
   PONTO ÚNICO para futuros vínculos do
   produto (Cardápio, estoque etc.).
   Hoje nada referencia produtos, então
   sempre retorna falso.
*/

function produtoPossuiVinculos(id) {

    return false;

}


/* =========================================
   PRODUTOS - SELECT DE ALIMENTO VINCULADO
========================================= */

function montarSelectAlimentoProduto() {

    const select =
        document.getElementById(
            "novoAlimentoProduto"
        );


    if (!select) {

        return;

    }


    const alimentos =
        obterAlimentos();


    alimentos.sort(

        (a,b) =>
            a.nome.localeCompare(
                b.nome,
                "pt-BR"
            )

    );


    select.innerHTML =

        `<option value="">Selecione</option>` +

        alimentos.map(

            item => `
                <option value="${item.id}">
                    ${escaparTextoHtml(item.nome)}
                    (Unidade Base:
                    ${escaparTextoHtml(item.unidadeBase)})
                </option>
            `

        ).join("");

}


/* =========================================
   PRODUTOS - DICA DA UNIDADE BASE
========================================= */

function atualizarUnidadeProduto() {

    const select =
        document.getElementById(
            "novoAlimentoProduto"
        );

    const dica =
        document.getElementById(
            "dicaUnidadeProduto"
        );


    if (
        !select ||
        !dica
    ) {

        return;

    }


    const alimento =
        buscarAlimentoPorId(
            Number(select.value)
        );


    if (!alimento) {

        dica.textContent =
            "Selecione o alimento para ver a unidade.";

        return;

    }


    dica.textContent =
        "Unidade: " +
        alimento.unidadeBase +
        " (definida no alimento)";

}


/* =========================================
   PRODUTOS - SUBITENS NA TABELA

   PROVISÓRIO: o "~" aparece quando há mais
   de 1 subitem. É uma inferência dos
   exemplos do designer, não uma regra
   confirmada pelo grupo.
========================================= */

function formatarSubitensProduto(
    subitens
) {

    if (
        subitens === null ||
        subitens === undefined
    ) {

        return "—";

    }


    if (subitens > 1) {

        return "~" + subitens + " un";

    }


    return subitens + " un";
}


/* =========================================
   PRODUTOS - TABELA
========================================= */

function renderTabelaProdutos() {

    const tabela =
        document.getElementById(
            "tabelaProdutos"
        );


    if (!tabela) {

        return;

    }


    const alimentos =
        obterAlimentos();


    const busca =
        document.getElementById(
            "buscaProduto"
        ).value
        .toLowerCase();


    let linhas =
        obterProdutos().map(

            item => ({

                produto:
                    item,

                alimento:
                    alimentos.find(
                        x =>
                            x.id ===
                            item.alimentoId
                    ) || null

            })

        );


    if (busca) {

        linhas =
            linhas.filter(

                linha =>

                    (
                        linha.alimento
                        ? linha.alimento.nome
                        : ""
                    )
                    .toLowerCase()
                    .includes(busca)

                    ||

                    (linha.produto.descricao || "")
                    .toLowerCase()
                    .includes(busca)

            );

    }


    linhas.sort(

        (a,b) =>
            a.produto.id -
            b.produto.id

    );


    if (
        linhas.length === 0
    ) {

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#718096;
                    "
                >

                    Nenhum produto encontrado.

                </td>

            </tr>

        `;

        return;

    }


    tabela.innerHTML =

        linhas.map(

            linha => {

                const item =
                    linha.produto;

                const alimento =
                    linha.alimento;

                const nomeAlimento =
                    alimento
                    ? escaparTextoHtml(alimento.nome)
                    : "—";

                const unidade =
                    alimento
                    ? " " + escaparTextoHtml(alimento.unidadeBase)
                    : "";

                return `

            <tr>

                <td>
                    <strong>
                        ${item.id}
                    </strong>
                </td>

                <td>

                    <strong>
                        ${nomeAlimento}
                    </strong>

                    <span class="linha-secundaria">
                        (${escaparTextoHtml(item.descricao || "")})
                    </span>

                </td>

                <td>
                    ${
                        alimento
                        ? nomeAlimento
                        : "Alimento não encontrado"
                    }
                </td>

                <td>
                    ${formatarDecimalBR(item.quantidadeBase)}${unidade}
                </td>

                <td>
                    ${formatarSubitensProduto(item.subitens)}
                </td>

                <td>
                    ${formatarEstoque(item.estoqueProvisionado)}
                </td>

                <td>
                    ${formatarEstoque(item.estoqueDisponivel)}
                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="btn-mini"
                            onclick="
                                editarProduto(
                                    ${item.id}
                                )
                            "
                        >

                            Editar

                        </button>


                        <button
                            class="btn-mini excluir"
                            onclick="
                                excluirProduto(
                                    ${item.id}
                                )
                            "
                        >

                            Excluir

                        </button>

                    </div>

                </td>

            </tr>

        `;

            }

        ).join("");

}


/* =========================================
   PRODUTOS - FORMULÁRIO
========================================= */

function abrirFormularioProduto() {

    const alimentos =
        obterAlimentos();


    if (
        alimentos.length === 0
    ) {

        alert(
            "Cadastre um alimento antes de cadastrar um produto."
        );

        return;

    }


    const formulario =
        document.getElementById(
            "formularioProduto"
        );


    idEdicaoProduto = null;


    document.getElementById(
        "tituloFormularioProduto"
    ).textContent =
        "Cadastrar Produto";


    montarSelectAlimentoProduto();


    document.getElementById(
        "novoAlimentoProduto"
    ).value = "";


    document.getElementById(
        "novaDescricaoProduto"
    ).value = "";


    document.getElementById(
        "novaQuantidadeBaseProduto"
    ).value = "";


    document.getElementById(
        "novosSubitensProduto"
    ).value = "";


    atualizarUnidadeProduto();


    formulario.style.display =
        "block";

}


function fecharFormularioProduto() {

    idEdicaoProduto = null;

    document.getElementById(
        "formularioProduto"
    ).style.display =
        "none";

}


/* =========================================
   SALVAR PRODUTO (CADASTRO E EDIÇÃO)
========================================= */

function salvarProduto() {

    const alimentoId =
        document.getElementById(
            "novoAlimentoProduto"
        ).value;

    const descricao =
        document.getElementById(
            "novaDescricaoProduto"
        ).value.trim();

    const quantidadeBase =
        Number(
            document.getElementById(
                "novaQuantidadeBaseProduto"
            ).value
        );

    const textoSubitens =
        document.getElementById(
            "novosSubitensProduto"
        ).value.trim();


    if (!alimentoId) {

        alert(
            "Selecione o alimento vinculado."
        );

        return;

    }


    if (!descricao) {

        alert(
            "Informe a descrição do produto."
        );

        return;

    }


    if (
        isNaN(quantidadeBase) ||
        quantidadeBase <= 0
    ) {

        alert(
            "Informe uma quantidade base válida."
        );

        return;

    }


    let subitens = null;


    if (textoSubitens !== "") {

        subitens =
            Number(
                textoSubitens
            );

        if (
            !Number.isInteger(subitens) ||
            subitens < 1
        ) {

            alert(
                "Informe uma quantidade de subitens válida."
            );

            return;

        }

    }


    const produtos =
        obterProdutos();


    let mensagem;


    if (
        idEdicaoProduto === null
    ) {

        /*
           Produto novo: os campos de estoque
           ficam null (sem regra definida).
        */

        produtos.push({

            id:
                gerarIdProduto(),

            alimentoId:
                Number(alimentoId),

            descricao:
                descricao,

            quantidadeBase:
                quantidadeBase,

            subitens:
                subitens,

            estoqueProvisionado:
                null,

            estoqueDisponivel:
                null

        });

        mensagem =
            "Produto cadastrado.";

    }
    else {

        const item =
            produtos.find(
                x =>
                    x.id ===
                    idEdicaoProduto
            );

        if (!item) {

            fecharFormularioProduto();

            return;

        }


        /*
           Na edição, os campos de estoque
           são preservados como estão.
        */

        item.alimentoId =
            Number(alimentoId);

        item.descricao =
            descricao;

        item.quantidadeBase =
            quantidadeBase;

        item.subitens =
            subitens;

        mensagem =
            "Produto atualizado.";

    }


    salvarProdutos(
        produtos
    );

    fecharFormularioProduto();

    renderTabelaProdutos();

    mostrarMensagem(
        mensagem
    );

}


/* =========================================
   EDITAR PRODUTO
========================================= */

function editarProduto(id) {

    const produto =
        buscarProdutoPorId(
            id
        );


    if (!produto) {

        return;

    }


    const formulario =
        document.getElementById(
            "formularioProduto"
        );


    idEdicaoProduto =
        produto.id;


    document.getElementById(
        "tituloFormularioProduto"
    ).textContent =
        "Editar Produto";


    montarSelectAlimentoProduto();


    document.getElementById(
        "novoAlimentoProduto"
    ).value =
        String(
            produto.alimentoId
        );


    document.getElementById(
        "novaDescricaoProduto"
    ).value =
        produto.descricao || "";


    document.getElementById(
        "novaQuantidadeBaseProduto"
    ).value =
        produto.quantidadeBase;


    document.getElementById(
        "novosSubitensProduto"
    ).value =
        (
            produto.subitens === null ||
            produto.subitens === undefined
        )
        ? ""
        : produto.subitens;


    atualizarUnidadeProduto();


    formulario.style.display =
        "block";


    formulario.scrollIntoView({

        behavior: "smooth",
        block: "start"

    });

}


/* =========================================
   EXCLUIR PRODUTO
========================================= */

function excluirProduto(id) {

    const confirmar =
        confirm(
            "Deseja excluir este produto?"
        );

    if (!confirmar) {

        return;

    }


    /*
       Hoje nada referencia produtos.
       Este é o ponto onde um futuro vínculo
       (Cardápio, estoque etc.) bloquearia
       a exclusão.
    */

    if (
        produtoPossuiVinculos(id)
    ) {

        alert(
            "Este produto possui vínculos e não pode ser excluído."
        );

        return;

    }


    let produtos =
        obterProdutos();

    produtos =
        produtos.filter(
            item =>
                item.id !== id
        );

    salvarProdutos(
        produtos
    );


    if (
        idEdicaoProduto === id
    ) {

        fecharFormularioProduto();

    }


    renderTabelaProdutos();

    mostrarMensagem(
        "Produto excluído."
    );

}


/* =========================================
   UTILITÁRIOS
========================================= */

/*
   Evita que texto digitado seja
   interpretado como HTML na tabela.
*/

function escaparTextoHtml(texto) {

    return String(texto)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#39;");

}


/*
   0.4 -> "0,4" (padrão brasileiro).
*/

function formatarDecimalBR(numero) {

    return String(numero)
        .replace(".", ",");

}


/*
   PONTO ÚNICO de exibição do estoque.
   Sem valor (null) mostra "—".
   Quando o grupo definir a lógica de
   estoque, só a origem do valor muda.
*/

function formatarEstoque(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "—";

    }


    return valor + " un";
}


/* =========================================
   INICIALIZAÇÃO - ALIMENTOS E PRODUTOS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        montarOpcoesAlimento();

        renderTabelaAlimentos();

        renderTabelaProdutos();

    }
);