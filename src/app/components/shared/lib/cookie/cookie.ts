import {setCookie, parseCookies, destroyCookie} from 'nookies';

export function setThisCookie(name:string, value:string) {
    setCookie(null, name, value, {
        path: '/',
    });
}

export function getThisCookie() {
    const cookies = parseCookies();
    return cookies || null;
}

export function destroyThisCookie(ctx:null, name:string, path:string) {
    destroyCookie(null, name, path);
}