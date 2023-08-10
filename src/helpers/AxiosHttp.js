import axios from 'axios';
import Token from './Token';
import config from '@/config';
import Usuario from './Usuario';
import { useStore } from 'vuex';

function AxiosHttp(){

    var token = Token().get();
    var options = { 
        headers: { 
            'Authorization': 'Bearer ' + token
        }
    }
    
    function get(route, callback = null, callbackErro = null){
        
        const store = useStore();

        store.dispatch({type: 'defineEstadoLoader', loader: true});
        
        axios
            .get(config.baseURL + route, options)
            .then(response => {
                if(callback != null){
                    callback(response.data);
                }
                store.dispatch({type: 'defineEstadoLoader', loader: false});
            }).catch(e => {
                store.dispatch({type: 'defineEstadoLoader', loader: false});
                if(callbackErro != null){
                    callbackErro(e.response.data);
                } else {
                    if(e.response.status == 401){
                        Token().remove();
                        Usuario().remove();
                    }
                    window.location = '#/erro/'+e.response.status+'/'+btoa(e.response.data.msg);
                }
            });
    }

    function post(route, data = {}, callback = null, callbackErro = null){

        const store = useStore();
        
        store.dispatch({type: 'defineEstadoLoader', loader: true});
        
        axios
            .post(config.baseURL + route, data, options)
            .then(function(response){
                store.dispatch({type: 'defineEstadoLoader', loader: false});
                if(callback != null){
                    callback(response.data);
                }
            }).catch(e => {
                store.dispatch({type: 'defineEstadoLoader', loader: false});
                if(callbackErro != null){
                    callbackErro(e.response.data);
                } else {
                    if(e.response.status == 401){
                        Token().remove();
                        Usuario().remove();
                    }
                    window.location = '#/erro/'+e.response.status+'/'+btoa(e.response.data.msg);
                }
            });
    }

    function login(credentials, callback = null, callbackErro = null){
        
        axios
            .post(config.baseURL + 'login', {
                email: credentials.email,
                password: credentials.password
            }).then(function(response){
                Token().set(response.data.token);
                Usuario().set(response.data.usuario);
                if(callback != null){
                    callback(response.data);
                }
            }).catch(e => {
                if(callbackErro != null){
                    callbackErro(e.response.data);
                }
            });
    }

    function logout(callback = null, callbackErro = null){

        axios
            .post(config.baseURL + 'logout', {}, options).then(function(response){
                if(response.data.sucesso){
                    if(callback != null){
                        Token().remove();
                        Usuario().remove();
                        window.location = '#/login';
                        callback(response.data);
                    }
                }
            }).catch(e => {
                if(callbackErro != null){
                    callbackErro(e.response.data);
                } else {
                    window.location = '#/erro/'+e.response.status+'/'+btoa(e.response.data.msg);
                }
            });
    }

    return {
        get: get,
        post: post,
        login: login,
        logout: logout
    }

}

export default AxiosHttp;