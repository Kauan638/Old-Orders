// =====================================
// LEITURA DOS ARQUIVOS
// =====================================

async function lerArquivo(file){

    return new Promise((resolve,reject)=>{

        const reader=new FileReader();

        reader.onload=e=>{

            try{

                let workbook;

                if(
                    file.name
                    .toLowerCase()
                    .endsWith(".csv")
                ){

                    workbook=XLSX.read(
                        e.target.result,
                        {
                            type:"string"
                        }
                    );

                }else{

                    workbook=XLSX.read(
                        e.target.result,
                        {
                            type:"array"
                        }
                    );

                }

                const sheet=
                workbook.Sheets[
                    workbook.SheetNames[0]
                ];

                const dados=
                XLSX.utils.sheet_to_json(
                    sheet,
                    {
                        defval:""
                    }
                );

                resolve(dados);

            }catch(err){

                console.error(err);

                reject(err);

            }

        };

        if(
            file.name
            .toLowerCase()
            .endsWith(".csv")
        ){

            reader.readAsText(
                file,
                "utf-8"
            );

        }else{

            reader.readAsArrayBuffer(
                file
            );

        }

    });

}

// =====================================
// PEDIDOS
// =====================================

async function carregarPedidos(file){

    const dados=
    await lerArquivo(file);

    return dados.map(r=>({

        loja:
        String(
            r.Nroempdestino || ""
        ).trim(),

        pedido:
        String(
            r.Nropedvenda || ""
        ).trim(),

        produto:
        String(
            r.Seqproduto || ""
        ).trim(),

        descricao:
        String(
            r.Desccompleta || ""
        ).trim(),

        quantidade:
        Number(
            r.Quantidade || 0
        ),

        dataPedido:
        r.Dtainclusaopedido || "",

        statusPedido:
        r["Status Pedido"] || "",

        statusCarga:
        r["Status Carga"] || "",

        carga:
        r.Nrocarga || ""

    }));

}

// =====================================
// MASTER
// =====================================

async function carregarMasters(file){

    const dados=
    await lerArquivo(file);

    return dados.map(r=>({

        loja:
        String(
            r.Destino || ""
        ).trim(),

        produto:
        String(
            r.Produto || ""
        ).trim(),

        master:
        String(
            r.Master || ""
        ).trim(),

        diasSeparacao:
        Number(
            r["Dias Em Separacao"] || 0
        ),

        status:
        String(
            r.Status || ""
        ).trim(),

        localizacao:
        String(
            r["Localização"] || ""
        ).trim()

    }));

}

// =====================================
// DEBUG
// =====================================

async function testarArquivos(){

    const pedidosFile=
    document.getElementById(
        "arquivoPedidos"
    ).files[0];

    const masterFile=
    document.getElementById(
        "arquivoMaster"
    ).files[0];

    if(!pedidosFile || !masterFile){

        alert(
            "Selecione os dois arquivos."
        );

        return;

    }

    const pedidos=
    await carregarPedidos(
        pedidosFile
    );

    const masters=
    await carregarMasters(
        masterFile
    );

    console.log(
        "PEDIDOS",
        pedidos
    );

    console.log(
        "MASTERS",
        masters
    );

    alert(
        `Pedidos: ${pedidos.length}
Masters: ${masters.length}`
    );

}
