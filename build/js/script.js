!function(){"use strict";function e(e){return e.replace(/&#([0-9]{1,3});/gi,function(e,n){return String.fromCharCode(parseInt(n))})}var n=document.getElementById("btn-go"),t=document.getElementById("index-input"),r={url:"https://www.theguardian.com/crosswords/quick/",windowTarget:"_blank",index:{updateInterval:100},range:{lower:9093,upper:14781},interval:{indexGenerator:null},paused:!1,labels:{unpaused:"Go ".concat(e("&#187;")),paused:"Re-spin ".concat(e("&#187;"))}},u={get:function(e,n){return Math.floor(Math.random()*(n-e+1)+e)},set:function(e,n){var t=1<arguments.length&&void 0!==n?n:range,r=t.lower,a=t.upper;return e.value=u.get(r,a)}},a=function(e,n,t){return window.open(e+n,t)},o=function(){r.interval.indexGenerator=setInterval(function(){return u.set(t,r.range)},r.index.updateInterval)},d=function(){clearInterval(r.interval.indexGenerator)};n.addEventListener("click",function(){r.paused||a(r.url,Number(t.value),r.windowTarget),r.paused?o():d(),r.paused?(r.paused=!1,n.textContent=r.labels.unpaused):(r.paused=!0,n.textContent=r.labels.paused)}),o()}();