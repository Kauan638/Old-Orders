// =====================================
// DASHBOARD
// =====================================

let graficoStatus = null;
let graficoLojas = null;
let graficoEtiquetas = null;


// =====================================
// DASHBOARD PRINCIPAL
// =====================================

function atualizarDashboard(){

    document.getElementById("kpiTotal").innerText =
    resultado.length;

    document.getElementById("kpiSemMaster").innerText =
    resultado.filter(
        x=>x.Situacao==="🔴 Sem Master"
    ).length;

    document.getElementById("kpiComMaster").innerText =
    resultado.filter(
        x=>x.Situacao==="🟢 Com Master"
    ).length;

    document.getElementById("kpiMasterAntiga").innerText =
    resultado.filter(
        x=>x.Situacao==="🟠 Master Antiga"
    ).length;

    document.getElementById("kpiLojas").innerText =
    new Set(
        resultado.map(x=>x.Loja)
    ).size;

    document.getElementById("kpiProdutos").innerText =
    new Set(
        resultado.map(x=>x.Produto)
    ).size;


    // KPIs ETIQUETAS

    document.getElementById("kpiAguardando").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Aguardando")
    ).length;

    document.getElementById("kpiMontagem").innerText =
    resultado.filter(
        x=>(x.StatusMaster || "")
        .includes("Em Montagem")
    ).length;

    document.getElementById("kpiMontadas").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Montada")
    ).length;

    document.getElementById("kpiNaoChecada").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Não Checada")
    ).length;

    document.getElementById("kpiCanceladas").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Cancelada")
    ).length;


    atualizarGraficoStatus();
    atualizarGraficoLojas();
    atualizarGraficoEtiquetas();

}


// =====================================
// GRAFICO STATUS
// =====================================

function atualizarGraficoStatus(){

    const ctx =
    document.getElementById("graficoStatus");

    if(!ctx) return;

    if(graficoStatus)
        graficoStatus.destroy();

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

                    resultado.filter(
                        x=>x.Situacao==="🔴 Sem Master"
                    ).length,

                    resultado.filter(
                        x=>x.Situacao==="🟢 Com Master"
                    ).length,

                    resultado.filter(
                        x=>x.Situacao==="🟠 Master Antiga"
                    ).length

                ],

                backgroundColor:[
                    "#ef4444",
                    "#22c55e",
                    "#f59e0b"
                ]

            }]

        }

    });

}


// =====================================
// GRAFICO LOJAS
// =====================================

function atualizarGraficoLojas(){

    const ctx =
    document.getElementById("graficoLojas");

    if(!ctx) return;

    const mapa = {};

    resultado.forEach(item=>{

        mapa[item.Loja] =
        (mapa[item.Loja] || 0) + 1;

    });

    const ranking =
    Object.entries(mapa)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,10);

    if(graficoLojas)
        graficoLojas.destroy();

    graficoLojas =
    new Chart(ctx,{

        type:"bar",

        data:{

            labels:
            ranking.map(x=>x[0]),

            datasets:[{

                data:
                ranking.map(x=>x[1]),

                backgroundColor:
                "#3b82f6"

            }]

        }

    });

}


// =====================================
// GRAFICO ETIQUETAS
// =====================================

function atualizarGraficoEtiquetas(){

    const ctx =
    document.getElementById(
        "graficoEtiquetas"
    );

    if(!ctx) return;

    if(graficoEtiquetas)
        graficoEtiquetas.destroy();

    graficoEtiquetas =
    new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[
                "Aguardando",
                "Em Montagem",
                "Montadas",
                "Não Checada",
                "Cancelada"
            ],

            datasets:[{

                data:[

                    resultado.filter(
                        x=>(x.SituacaoEtiqueta || "")
                        .includes("Aguardando")
                    ).length,

                    resultado.filter(
                        x=>(x.StatusMaster || "")
                        .includes("Em Montagem")
                    ).length,

                    resultado.filter(
                        x=>(x.SituacaoEtiqueta || "")
                        .includes("Montada")
                    ).length,

                    resultado.filter(
                        x=>(x.SituacaoEtiqueta || "")
                        .includes("Não Checada")
                    ).length,

                    resultado.filter(
                        x=>(x.SituacaoEtiqueta || "")
                        .includes("Cancelada")
                    ).length

                ],

                backgroundColor:[
                    "#eab308",
                    "#3b82f6",
                    "#22c55e",
                    "#64748b",
                    "#ef4444"
                ]

            }]

        }

    });

}
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


function atualizarGraficoEtiquetas(){

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

    const ctx =
    document.getElementById(
        "graficoEtiquetas"
    );

    if(!ctx) return;

   if(graficoEtiquetas){

    graficoEtiquetas.destroy();

}

graficoEtiquetas =
new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[

                "Aguardando",
                "Em Montagem",
                "Montadas",
                "Não Checada",
                "Cancelada"

            ],

            datasets:[{

                data:[

                    aguardando,
                    montagem,
                    montadas,
                    naoChecada,
                    canceladas

                ],

                backgroundColor:[

                    "#eab308",
                    "#3b82f6",
                    "#22c55e",
                    "#64748b",
                    "#ef4444"

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{
                        color:"white"
                    }

                }

            }

        }

    });

}
