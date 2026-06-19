// =====================================
// EXPORTAÇÃO EXCEL
// =====================================

function exportarExcel(){

    if(!resultado.length){

        alert(
            "Nenhum dado para exportar."
        );

        return;

    }

    const wb =
    XLSX.utils.book_new();

    // =====================================
    // RESULTADO COMPLETO
    // =====================================

   const resultadoExportacao =
resultado.map(item => ({

    ...item,

    StatusFinal:

    item.Master

    ? item.StatusMaster

    : "Sem Master"

}));

const wsResultado =
XLSX.utils.json_to_sheet(
    resultadoExportacao
);

    XLSX.utils.book_append_sheet(
        wb,
        wsResultado,
        "Resultado"
    );

    // =====================================
    // SEM MASTER
    // =====================================

    const semMaster =
    resultado.filter(

        x=>
        x.Situacao ===
        "🔴 Sem Master"

    );

    const wsSemMaster =
    XLSX.utils.json_to_sheet(
        semMaster
    );

    XLSX.utils.book_append_sheet(
        wb,
        wsSemMaster,
        "Sem Master"
    );

    // =====================================
    // MASTER ANTIGA
    // =====================================

    const masterAntiga =
    resultado.filter(

        x=>
        x.Situacao ===
        "🟠 Master Antiga"

    );

    const wsMasterAntiga =
    XLSX.utils.json_to_sheet(
        masterAntiga
    );

    XLSX.utils.book_append_sheet(
        wb,
        wsMasterAntiga,
        "Master Antiga"
    );

    // =====================================
    // RESUMO EXECUTIVO
    // =====================================

    const resumo = [

        {

            Total_Pedidos:
            resultado.length,

            Sem_Master:
            semMaster.length,

            Com_Master:
            resultado.filter(

                x=>
                x.Situacao ===
                "🟢 Com Master"

            ).length,

            Master_Antiga:
            masterAntiga.length,

            Lojas_Impactadas:

            new Set(

                resultado.map(
                    x=>x.Loja
                )

            ).size,

            Produtos_Impactados:

            new Set(

                resultado.map(
                    x=>x.Produto
                )

            ).size

        }

    ];

    const wsResumo =
    XLSX.utils.json_to_sheet(
        resumo
    );

    XLSX.utils.book_append_sheet(
        wb,
        wsResumo,
        "Resumo Executivo"
    );

    // =====================================
    // TOP LOJAS
    // =====================================

    const mapaLojas = {};

    resultado.forEach(item=>{

        if(!mapaLojas[item.Loja]){

            mapaLojas[item.Loja]=0;

        }

        mapaLojas[item.Loja]++;

    });

    const rankingLojas =

    Object.entries(mapaLojas)

    .map(item=>({

        Loja:item[0],

        Ocorrencias:item[1]

    }))

    .sort(
        (a,b)=>
        b.Ocorrencias -
        a.Ocorrencias
    );

    const wsLojas =
    XLSX.utils.json_to_sheet(
        rankingLojas
    );

    XLSX.utils.book_append_sheet(
        wb,
        wsLojas,
        "Ranking Lojas"
    );

    // =====================================
    // TOP PRODUTOS
    // =====================================

    const mapaProdutos = {};

    resultado.forEach(item=>{

        if(!mapaProdutos[item.Produto]){

            mapaProdutos[item.Produto]=0;

        }

        mapaProdutos[item.Produto]++;

    });

    const rankingProdutos =

    Object.entries(mapaProdutos)

    .map(item=>({

        Produto:item[0],

        Ocorrencias:item[1]

    }))

    .sort(
        (a,b)=>
        b.Ocorrencias -
        a.Ocorrencias
    );

    const wsProdutos =
    XLSX.utils.json_to_sheet(
        rankingProdutos
    );

    XLSX.utils.book_append_sheet(
        wb,
        wsProdutos,
        "Ranking Produtos"
    );

    // =====================================
    // DOWNLOAD
    // =====================================

    XLSX.writeFile(

        wb,

        `MASTER_CROSS_${
            new Date()
            .toISOString()
            .slice(0,10)
        }.xlsx`

    );

}
