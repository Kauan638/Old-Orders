// =====================================
// DASHBOARD
// =====================================

let graficoStatus = null;
let graficoLojas = null;
let graficoEtiquetas = null;

// =====================================
// ATUALIZA DASHBOARD
// =====================================

function atualizarDashboard(){

    const kpis =
    calcularKPIs();

    document.getElementById(
        "kpiTotal"
    ).innerText =
    kpis.total;

    document.getElementById(
        "kpiSemMaster"
    ).innerText =
    kpis.semMaster;

    document.getElementById(
        "kpiComMaster"
    ).innerText =
    kpis.comMaster;

    document.getElementById(
        "kpiMasterAntiga"
    ).innerText =
    kpis.masterAntiga;

    document.getElementById(
        "kpiLojas"
    ).innerText =
    kpis.lojas;

    document.getElementById(
        "kpiProdutos"
    ).innerText =
    kpis.produtos;

    // =====================================
    // KPIs ETIQUETAS
    // =====================================

    const aguardando =
    resultado.filter(
        x =>
        (x.SituacaoEtiqueta || "")
        .includes("Aguardando")
    ).length;

    const montagem =
    resultado.filter(
        x =>
        (x.StatusMaster || "")
        .includes("Em Montagem")
    ).length;

    const montadas =
    resultado.filter(
        x =>
        (x.SituacaoEtiqueta || "")
        .includes("Montada")
    ).length;

    const naoChecada =
    resultado.filter(
        x =>
        (x.SituacaoEtiqueta || "")
        .includes("Não Checada")
    ).length;

    const canceladas =
    resultado.filter(
        x =>
        (x.SituacaoEtiqueta || "")
        .includes("Cancelada")
    ).length;

    document.getElementById(
        "kpiAguardando"
    ).innerText =
    aguardando;

    document.getElementById(
        "kpiMontagem"
    ).innerText =
    montagem;

    document.getElementById(
        "kpiMontadas"
    ).innerText =
    montadas;

    document.getElementById(
        "kpiNaoChecada"
    ).innerText =
    naoChecada;

    document.getElementById(
        "kpiCanceladas"
    ).innerText =
    canceladas;

    atualizarGraficoStatus();

    atualizarGraficoLojas();

    if(
        typeof atualizarGraficoEtiquetas
        === "function"
    ){
        atualizarGraficoEtiquetas();
    }

    atualizarRanking();

}
    // ==========================
    // KPI ETIQUETAS
    // ==========================

    const aguardando =
    resultado.filter(x=>
        (x.SituacaoEtiqueta || "")
        .includes("Aguardando")
    ).length;

    const montagem =
    resultado.filter(x=>
        (x.StatusMaster || "")
        .includes("Em Montagem")
    ).length;

    const montadas =
    resultado.filter(x=>
        (x.SituacaoEtiqueta || "")
        .includes("Montada")
    ).length;

    const naoChecada =
    resultado.filter(x=>
        (x.SituacaoEtiqueta || "")
        .includes("Não Checada")
    ).length;

    const canceladas =
    resultado.filter(x=>
        (x.SituacaoEtiqueta || "")
        .includes("Cancelada")
    ).length;

    document.getElementById(
        "kpiAguardando"
    ).innerText =
    aguardando;

    document.getElementById(
        "kpiMontagem"
    ).innerText =
    montagem;

    document.getElementById(
        "kpiMontadas"
    ).innerText =
    montadas;

    document.getElementById(
        "kpiNaoChecada"
    ).innerText =
    naoChecada;

    document.getElementById(
        "kpiCanceladas"
    ).innerText =
    canceladas;

    atualizarGraficoStatus();

    atualizarGraficoLojas();

    atualizarRanking();

}


// =====================================
// STATUS
// =====================================

function atualizarGraficoStatus(){

    const semMaster =
    resultado.filter(
        x=>x.Situacao ===
        "🔴 Sem Master"
    ).length;

    const comMaster =
    resultado.filter(
        x=>x.Situacao ===
        "🟢 Com Master"
    ).length;

    const masterAntiga =
    resultado.filter(
        x=>x.Situacao ===
        "🟠 Master Antiga"
    ).length;

    const ctx =
    document.getElementById(
        "graficoStatus"
    );

    if(graficoStatus){

        graficoStatus.destroy();

    }

    graficoStatus =
    new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[

                "Sem Master",
                "Com Master",
                "Master Antiga"

            ],

            datasets:[{

                data:[

                    semMaster,
                    comMaster,
                    masterAntiga

                ],

                backgroundColor:[

                    "#ef4444",
                    "#22c55e",
                    "#f59e0b"

                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    labels:{
                        color:"white"
                    }

                }

            }

        }

    });

}

// =====================================
// TOP LOJAS
// =====================================

function atualizarGraficoLojas(){

    const mapa = {};

    resultado.forEach(item=>{

        if(!mapa[item.Loja]){

            mapa[item.Loja]=0;

        }

        mapa[item.Loja]++;

    });

    const ranking =
    Object.entries(mapa)

    .sort(
        (a,b)=>b[1]-a[1]
    )

    .slice(0,10);

    const labels =
    ranking.map(
        x=>x[0]
    );

    const valores =
    ranking.map(
        x=>x[1]
    );

    const ctx =
    document.getElementById(
        "graficoLojas"
    );

    if(graficoLojas){

        graficoLojas.destroy();

    }

    graficoLojas =
    new Chart(ctx,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                label:
                "Ocorrências",

                data:valores,

                backgroundColor:
                "#3b82f6"

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    display:false

                }

            },

            scales:{

                y:{

                    beginAtZero:true,

                    ticks:{
                        color:"white"
                    }

                },

                x:{

                    ticks:{
                        color:"white"
                    }

                }

            }

        }

    });

}

// =====================================
// RANKING
// =====================================

function atualizarRanking(){

    const mapa = {};

    resultado.forEach(item=>{

        if(!mapa[item.Loja]){

            mapa[item.Loja]=0;

        }

        mapa[item.Loja]++;

    });

    const ranking =
    Object.entries(mapa)

    .sort(
        (a,b)=>b[1]-a[1]
    );

    const tbody =
    document.getElementById(
        "rankingLojas"
    );

    tbody.innerHTML="";

    ranking.forEach(item=>{

        tbody.innerHTML += `

        <tr>

            <td>
            ${item[0]}
            </td>

            <td>
            ${item[1]}
            </td>

        </tr>

        `;

    });

}
