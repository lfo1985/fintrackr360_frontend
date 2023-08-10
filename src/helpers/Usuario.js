function Usuario(){
    function set(usuario){
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    function get(){
        return localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;
    }
    function remove(){
        localStorage.removeItem('usuario');
    }
    return {
        set: set,
        get: get,
        remove: remove
    }
}

export default Usuario;