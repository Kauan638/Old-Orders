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

const dataInicio =
document
.getElementById("fDataInicio")
.value;

const dataFim =
document
.getElementById("fDataFim")
.value;

    return resultado.filter(item=>{

let passouData = true;

if(dataInicio || dataFim){

    const dataPedido =
    new Date(item.DataPedido);

    if(dataInicio){

        const inicio =
        new Date(dataInicio);

        if(dataPedido < inicio){
            passouData = false;
        }
    }

    if(dataFim){

        const fim =
        new Date(dataFim);

        fim.setHours(
            23,59,59,999
        );

        if(dataPedido > fim){
            passouData = false;
        }
    }
}
        
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

&&

passouData

        );

    });

}

// =====================================
// TABELA
// =====================================

function renderTabela(){

    const dados =
    obterDadosFiltrados();

    const tbody =
    document.getElementById(
        "tbody"
    );

    let html = "";

    dados.slice(0,1000).forEach(item=>{

        let classe = "";

        if(
            item.Situacao ===
            "🔴 Sem Master"
        ){
            classe = "sem-master";
        }

        if(
            item.Situacao ===
            "🟠 Master Antiga"
        ){
            classe = "master-antiga";
        }

        if(
            item.Situacao ===
            "🟢 Com Master"
        ){
            classe = "com-master";
        }

        html += `

        <tr class="${classe}">
            <td>${item.Loja}</td>
            <td>${item.Pedido}</td>
            <td>${item.Produto}</td>
            <td>${item.Descricao}</td>
            <td>${item.Quantidade}</td>
            <td>${item.Master || "-"}</td>
            <td>${item.DiasMaster}</td>
            <td>${item.Situacao}</td>
        </tr>

        `;

    });

    tbody.innerHTML = html;

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
