var deferredPrompt;
//for supporting older browsers 
if(!window.Promise){
    window.Promise = Promise;
}
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => console.log('registered'));
}
window.addEventListener('beforeinstallprompt',function (event) {
    event.preventDefault();
    deferredPrompt = event;
    return false;
})