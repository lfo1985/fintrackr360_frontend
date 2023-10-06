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

export {
    ir,
    voltar,
    parametrosUrl
};