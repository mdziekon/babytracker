if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const d=e=>n(e,c),a={module:{uri:c},exports:o,require:d};i[c]=Promise.all(s.map((e=>a[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"0b61c89bb2f4b0d9c55db52b23a345c5"},{url:"assets/index-AJTXH3Hj.css",revision:null},{url:"assets/index-hbWHcX8n.js",revision:null},{url:"favicon.ico",revision:"882022bb26e924cc399d58ce0a511ec2"},{url:"favicon.svg",revision:"68104a78b23ce3d066f6bd9f6ed0e8ec"},{url:"index.html",revision:"e41555085ba6db618c080c5df5fd5484"},{url:"maskable-icon-512x512.png",revision:"a2234c55a8a1ac9b5a5e5dd89a30a415"},{url:"pwa-192x192.png",revision:"7e359270a9811736f291c0654b3b980f"},{url:"pwa-512x512.png",revision:"d14906233a555cde82a3fa0cd691b67a"},{url:"pwa-64x64.png",revision:"43f488ddf7a4e66520439325483490c7"},{url:"manifest.webmanifest",revision:"873709ddff8a42e25d9b1b79621dbca6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
