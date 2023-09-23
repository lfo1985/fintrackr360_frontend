import router from "@/router";

function ir(route){
    router.push(route);
}

function voltar(){
    router.go(-1);
}

export {
    ir,
    voltar
};