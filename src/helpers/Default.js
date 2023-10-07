import router from "@/router";

function ir(route){
    router.push(route);
}

function voltar(){
    router.go(-1);
}

function parametrosUrl(url){

    let parametros = url.split('?')[1];

    if(parametros){

        let itensParametros = parametros.split('&');
        let arrayParametros = [];
        
        itensParametros.forEach(item => {
            let [chave, valor] = item.split('=');
            arrayParametros.push({
                chave: chave,
                valor: valor
            });
        });

        return arrayParametros;

    } else {
        return null;
    }

}

function json2array(json){

    let arrayKeys = Object.keys(json);
    let arrayValues = Object.values(json);
    // console.log(arrayKeys);
    // console.log(arrayValues);
    let dados = arrayKeys.map((value, i) => {
        return arrayValues[i] = value;
    });
    console.log(dados);
}

export {
    ir,
    voltar,
    parametrosUrl,
    json2array
};