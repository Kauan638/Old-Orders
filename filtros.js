// =====================================
// FILTROS
// =====================================

function obterDadosFiltrados(){

    const loja =
    document
    .getElementById("fLoja")
    .value
    .toLowerCase()
    .trim();

    const pedido =
    document
    .getElementById("fPedido")
    .value
    .toLowerCase()
    .trim();

    const produto =
    document
    .getElementById("fProduto")
    .value
    .toLowerCase()
    .trim();

    const situacao =
    document
    .getElementById("fSituacao")
    .value;

    return resultado.filter(item=>{

        return(

            item.Loja
            .toString()
            .toLowerCase()
            .includes(loja)

            &&

            item.Pedido
            .toString()
            .toLowerCase()
            .includes(pedido)

            &&

            item.Produto
            .toString()
            .toLowerCase()
            .includes(produto)

            &&

            (
                !situacao ||
                item.Situacao ===
                situacao
            )

        );

    });

}

// =====================================
// TABELA
// =====================================

function renderTabela(){

    const dados =
    obterDadosFiltrados();
const limite = 1000;

const dadosExibidos =
dados.slice(0, limite);
    
    const tbody =
    document.getElementById(
        "tbody"
    );

    tbody.innerHTML = "";

    dadosExibidos.forEach(item=>{

        let classe = "";

        if(
            item.Situacao ===
            "🔴 Sem Master"
        ){

            classe =
            "sem-master";

        }

        if(
            item.Situacao ===
            "🟠 Master Antiga"
        ){

            classe =
            "master-antiga";

        }

        if(
            item.Situacao ===
            "🟢 Com Master"
        ){

            classe =
            "com-master";

        }

       let html = "";

        <tr class="${classe}">

            <td>
            ${item.Loja}
            </td>

            <td>
            ${item.Pedido}
            </td>

            <td>
            ${item.Produto}
            </td>

            <td>
            ${item.Descricao}
            </td>

            <td>
            ${item.Quantidade}
            </td>

            <td>
            ${item.Master || "-"}
            </td>

            <td>
            ${item.DiasMaster}
            </td>

            <td>
            ${item.Situacao}
            </td>

        </tr>

        `;

    });

}

// =====================================
// FILTROS AUTOMÁTICOS
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const campos = [

            "fLoja",
            "fPedido",
            "fProduto",
            "fSituacao"

        ];

        campos.forEach(id=>{

            document
            .getElementById(id)
            ?.addEventListener(
                "input",
                renderTabela
            );

            document
            .getElementById(id)
            ?.addEventListener(
                "change",
                renderTabela
            );

        });

    }
);
