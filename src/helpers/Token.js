function Token(){
    function set(token){
        localStorage.setItem('token', token);
    }
    function get(){
        return localStorage.getItem('token') || null;
    }
    function remove(){
        localStorage.removeItem('token');
    }
    return {
        set:set,
        get:get,
        remove:remove
    }
}

export default Token;