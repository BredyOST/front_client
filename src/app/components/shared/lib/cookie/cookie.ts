import {setCookie, parseCookies, destroyCookie} from 'nookies';

export function setThisCookie(name, value) {

    setCookie(null, name, value, {
        path: '/',
    });

}

export function getThisCookie() {
    const cookies = parseCookies();
    return cookies || null;
}

export function destroyThisCookie(ctx, name, path) {
    destroyCookie(null, name, path);
}