// =====================================
// RESULTADO GLOBAL
// =====================================

let resultado = [];

// =====================================
// PROCESSAMENTO PRINCIPAL
// =====================================

async function processar(){

    try{

        mostrarLoading();
        
        const pedidosFile =
        document.getElementById(
            "arquivoPedidos"
        ).files[0];

        const masterFile =
        document.getElementById(
            "arquivoMaster"
        ).files[0];

const etiquetaFile =
document.getElementById(
    "arquivoEtiqueta"
).files[0];
        
     if(
    !pedidosFile ||
    !masterFile ||
    !etiquetaFile
){
         
alert(
    "Selecione os três arquivos."
);

            return;

        }

        const pedidos =
        await carregarPedidos(
            pedidosFile
        );

        atualizarLoading(25);
        
        const masters =
        await carregarMasters(
            masterFile
        );
        
const etiquetas =
await carregarEtiquetas(
    etiquetaFile
);
        atualizarLoading(50);
        
        cruzarDados(
            pedidos,
            masters
        );

        atualizarLoading(75);
        
    // console.log(
//     "RESULTADO",
//     resultado
// );

        atualizarDashboard();
        atualizarLoading(100);
        esconderLoading();

        if(
            typeof renderTabela ===
            "function"
        ){
            renderTabela();
        }

        console.log(
    `Cruzamento concluído:
    ${resultado.length}`
);

console.log(
    "Pedidos:",
    pedidos.length
);

console.log(
    "Masters:",
    masters.length
);

console.log(
    "Resultado:",
    resultado.length
);
    }catch(err){

        console.error(err);

        alert(
            "Erro ao processar."
        );

    }

}

// =====================================
// CRUZAMENTO
// =====================================

function cruzarDados(
    pedidos,
    masters
){

    resultado = [];

    const mapaMasters =
    new Map();

    masters.forEach(m=>{

        const chave =
        `${m.loja}|${m.produto}`;

        mapaMasters.set(
            chave,
            m
        );

    });

    pedidos.forEach(p=>{

        const chave =
        `${p.loja}|${p.produto}`;

        const master =
        mapaMasters.get(
            chave
        );

        let situacao =
        "";

        let diasMaster =
        0;

        let codigoMaster =
        "";

        let statusMaster =
        "";

        let localizacao =
        "";

        if(!master){

            situacao =
            "🔴 Sem Master";

        }else{

            diasMaster =
            master.diasSeparacao;

            codigoMaster =
            master.master;

            statusMaster =
            master.status;

            localizacao =
            master.localizacao;

            if(
                diasMaster >= 15
            ){

                situacao =
                "🟠 Master Antiga";

            }else{

                situacao =
                "🟢 Com Master";

            }

        }

      resultado.push({

    Loja:
    p.loja,

    Pedido:
    p.pedido,

    Produto:
    p.produto,

    Descricao:
    p.descricao,

    Quantidade:
    p.quantidade,

    DataPedido:
    p.dataPedido,

    StatusPedido:
    p.statusPedido,

    StatusCarga:
    p.statusCarga,

    Carga:
    p.carga,

    DataGeracaoCarga:
    p.dataGeracaoCarga,

    Master:
    codigoMaster,

    DiasMaster:
    diasMaster,

    StatusMaster:
    statusMaster,

    Localizacao:
    localizacao,

    Situacao:
    situacao

});
    });

}

// =====================================
// KPIs
// =====================================

function calcularKPIs(){

   const semMaster =
resultado.filter(
    x=>(x.Situacao || "").includes(
        "Sem Master"
    )
).length;

const comMaster =
resultado.filter(
    x=>(x.Situacao || "").includes(
        "Com Master"
    )
).length;

const masterAntiga =
resultado.filter(
    x=>(x.Situacao || "").includes(
        "Master Antiga"
    )
).length;

    const lojas =
    new Set(
        resultado.map(
            x=>x.Loja
        )
    ).size;

    const produtos =
    new Set(
        resultado.map(
            x=>x.Produto
        )
    ).size;

    return {

        total:
        resultado.length,

        semMaster,

        comMaster,

        masterAntiga,

        lojas,

        produtos

    };

}
