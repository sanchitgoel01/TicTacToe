(function(e){function t(t){for(var c,r,i=t[0],s=t[1],l=t[2],d=0,b=[];d<i.length;d++)r=i[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&b.push(a[r][0]),a[r]=0;for(c in s)Object.prototype.hasOwnProperty.call(s,c)&&(e[c]=s[c]);u&&u(t);while(b.length)b.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],c=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(c=!1)}c&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var c={},a={app:0},o=[];function r(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=c,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)r.d(n,c,function(t){return e[t]}.bind(null,c));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"19c7":function(e,t,n){"use strict";n("f795")},4897:function(e,t,n){},"557b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23"),a=Object(c["f"])("h1",null,"2-Player Online Tic-Tac-Toe",-1);function o(e,t,n,o,r,i){var s=Object(c["k"])("SessionManager"),l=Object(c["k"])("GameBoard");return Object(c["g"])(),Object(c["c"])("div",null,[a,r.inGame?(Object(c["g"])(),Object(c["c"])(l,{key:1,socket:r.socket,gameCode:r.gameCode},null,8,["socket","gameCode"])):(Object(c["g"])(),Object(c["c"])(s,{key:0,socket:r.socket,onEnterGame:i.enterGame},null,8,["socket","onEnterGame"]))])}var r=Object(c["o"])("data-v-1ef00adc");Object(c["i"])("data-v-1ef00adc");var i={id:"gameboard"},s={style:{"font-size":"0.75rem"}},l=Object(c["e"])(" Game Code: "),u=Object(c["e"])(),d=Object(c["f"])("br",null,null,-1),b=Object(c["f"])("br",null,null,-1),f=Object(c["e"])(" You are playing as "),m=Object(c["e"])("! "),h={class:"container stack"},O={key:0};Object(c["h"])();var j=r((function(e,t,n,a,o,r){var j=Object(c["k"])("Cell"),k=Object(c["k"])("RematchButton");return Object(c["g"])(),Object(c["c"])("div",i,[Object(c["f"])("p",s,[l,Object(c["f"])("b",null,Object(c["l"])(n.gameCode),1),u,d,b,f,Object(c["f"])("b",null,Object(c["l"])(e.board.playerMark),1),m]),Object(c["f"])("h3",null,Object(c["l"])(r.getStatusMsg()),1),Object(c["f"])("div",h,[(Object(c["g"])(),Object(c["c"])(c["a"],null,Object(c["j"])(3,(function(t){return Object(c["f"])("div",{key:"row-"+t,class:"row center"},[(Object(c["g"])(),Object(c["c"])(c["a"],null,Object(c["j"])(3,(function(n){return Object(c["f"])(j,{mark:r.getMark(t-1,n-1),pos:[t-1,n-1],onCellClicked:function(e){return r.cellClicked(t-1,n-1)},key:"cell-"+t+n,canInteract:e.canInteract},null,8,["mark","pos","onCellClicked","canInteract"])})),64))])})),64))]),e.board.isGameOver?(Object(c["g"])(),Object(c["c"])("div",O,[Object(c["f"])("h3",null,Object(c["l"])(r.gameResultMsg)+"!",1),Object(c["f"])(k,{socket:n.socket,onRematch:t[1]||(t[1]=function(e){return r.resetGame()})},null,8,["socket"])])):Object(c["d"])("",!0)])})),k=Object(c["o"])("data-v-cf22d47c");Object(c["i"])("data-v-cf22d47c");var p={key:0,class:"unselectable"};Object(c["h"])();var g=k((function(e,t,n,a,o,r){return Object(c["g"])(),Object(c["c"])("div",{class:"cell "+r.borderStyle,onClick:t[1]||(t[1]=function(){return r.cellClick&&r.cellClick.apply(r,arguments)})},[n.mark.length>0?(Object(c["g"])(),Object(c["c"])("p",p,Object(c["l"])(n.mark),1)):Object(c["d"])("",!0)],2)})),v={name:"Cell",props:{mark:String,canInteract:Boolean,pos:Array},emits:["cell-clicked"],methods:{cellClick:function(){!this.canInteract||this.mark.length>0||this.$emit("cell-clicked")}},computed:{borderStyle:function(){var e=this.pos[0],t=this.pos[1],n="";return 1==t&&(n+="bord-left bord-right"),2!=e&&(n+=" bord-down"),n}}};n("7948");v.render=g,v.__scopeId="data-v-cf22d47c";var C=v,y=Object(c["o"])("data-v-d141c3f0"),G=y((function(e,t,n,a,o,r){return Object(c["g"])(),Object(c["c"])("button",{id:"rematch-btn",disabled:o.isDisabled,onClick:t[1]||(t[1]=function(){return r.btnClick&&r.btnClick.apply(r,arguments)})},Object(c["l"])(o.rematchText),9,["disabled"])})),_=0,I=1,w=2,R=3,M={name:"RematchButton",props:["socket"],events:["rematch"],data:function(){return{state:_,isDisabled:!1,rematchText:"Request Rematch"}},created:function(){var e=this;this.socket.on("rematch-requested",(function(){e.state=I,e.rematchText="Accept Rematch!"})),this.socket.on("reset-game",(function(){e.state=_,e.isDisabled=!1,e.rematchText="Request Rematch",e.$emit("rematch")}))},methods:{btnClick:function(){var e=this;this.state!=w&&this.state!=R&&(this.isDisabled=!0,this.state=w,this.rematchText="Rematch Requested",this.socket.emit("request-rematch",(function(t){"invalid"==t&&(e.state=R,e.rematchText="Rematch Denied!")})))}}};n("19c7");M.render=G,M.__scopeId="data-v-d141c3f0";var T=M,x=(n("dca8"),n("d4ec")),N=n("bee2"),W=n("ade3"),P={EMPTY:0,X:1,O:-1};Object.freeze(P);var S={RUNNING:0,X_WIN:1,O_WIN:2,DRAW:3};Object.freeze(S);var J=function(){function e(){Object(x["a"])(this,e),Object(W["a"])(this,"_mark",""),Object(W["a"])(this,"_board",[[0,0,0],[0,0,0],[0,0,0]]),Object(W["a"])(this,"_result",0)}return Object(N["a"])(e,[{key:"getCell",value:function(e,t){var n=this._board[e][t];return n==P.EMPTY?"":n==P.O?"O":n==P.X?"X":void 0}},{key:"fillCell",value:function(e,t){var n,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this._mark;n="X"==c?P.X:"O"==c?P.O:P.EMPTY,this._board[e][t]=n}},{key:"reset",value:function(){this._result=S.RUNNING,this.clearBoard()}},{key:"clearBoard",value:function(){for(var e=0;e<3;e++)for(var t=0;t<3;t++)this._board[e][t]=P.EMPTY}},{key:"isGameOver",get:function(){return this._result!=S.RUNNING}},{key:"isDraw",get:function(){return this._result==S.DRAW}},{key:"isWinner",get:function(){return"X"==this._mark&&this._result==S.X_WIN||"O"==this._mark&&this._result==S.O_WIN}},{key:"gameResult",set:function(e){this._result=e}},{key:"playerMark",set:function(e){this._mark=e},get:function(){return this._mark}}]),e}(),B={name:"GameBoard",props:["socket","gameCode"],components:{Cell:C,RematchButton:T},data:function(){return{canInteract:!1,board:new J}},created:function(){var e=this;this.socket.on("enable-turn",(function(){e.canInteract=!0})),this.socket.on("fill-cell",(function(t){var n=t.row,c=t.col,a=t.mark;e.board.fillCell(n,c,a)})),this.socket.on("end-game",(function(t){e.canInteract=!1,e.board.gameResult=t})),this.socket.emit("fetch-board"),this.socket.emit("fetch-data",(function(t){e.board.playerMark=t.mark,e.board.gameResult=t.gameResult}))},methods:{getMark:function(e,t){return this.board.getCell(e,t)},cellClicked:function(e,t){!this.board.isGameOver&&this.canInteract&&(this.board.fillCell(e,t),this.canInteract=!1,this.socket.emit("cell-clicked",{row:e,col:t}))},getStatusMsg:function(){return this.board.isGameOver?"Game Over!":this.canInteract?"It is your turn!":"Waiting for other player..."},resetGame:function(){this.board.reset()}},computed:{gameResultMsg:function(){return this.board.isGameOver?this.board.isWinner?"You won":this.board.isDraw?"The game is a draw":"You lost":""}}};n("5985");B.render=j,B.__scopeId="data-v-1ef00adc";var D=B,X=Object(c["o"])("data-v-42d56e69");Object(c["i"])("data-v-42d56e69");var Y={id:"session-menu",class:"flex container stack mx-auto"},A=Object(c["f"])("h3",null,"Waiting for another player to join...",-1),E=Object(c["f"])("h3",null,"Game Code:",-1);Object(c["h"])();var q=X((function(e,t,n,a,o,r){return Object(c["g"])(),Object(c["c"])("div",null,[Object(c["f"])("div",Y,[o.isWaiting?(Object(c["g"])(),Object(c["c"])(c["a"],{key:0},[Object(c["f"])("h3",null,"Game Code: "+Object(c["l"])(o.gameCode.toUpperCase()),1),A,Object(c["f"])("button",{class:"session-btn",onClick:t[1]||(t[1]=function(e){return r.onCancelGameClck()})}," Cancel Game ")],64)):o.showJoinGameInput?(Object(c["g"])(),Object(c["c"])(c["a"],{key:1},[E,Object(c["n"])(Object(c["f"])("input",{id:"codeInput","onUpdate:modelValue":t[2]||(t[2]=function(e){return o.gameCodeInput=e})},null,512),[[c["m"],o.gameCodeInput]]),Object(c["f"])("button",{class:"mt-3 session-btn",onClick:t[3]||(t[3]=function(e){return r.onJoinGameClck()})},"Join"),Object(c["f"])("button",{class:"mt-2 session-btn",onClick:t[4]||(t[4]=function(e){o.showJoinGameInput=!1,o.error=""})}," Cancel ")],64)):(Object(c["g"])(),Object(c["c"])(c["a"],{key:2},[Object(c["f"])("button",{class:"session-btn",onClick:t[5]||(t[5]=function(e){return r.newGame()})},"New Game"),Object(c["f"])("button",{class:"mt-3 session-btn",onClick:t[6]||(t[6]=function(e){return o.showJoinGameInput=!0})}," Join Game ")],64))])])})),U={name:"SessionManager",props:["socket"],data:function(){return{attemptedConnection:!1,showJoinGameInput:!1,isWaiting:!1,gameCodeInput:"",gameCode:"",error:""}},emits:["enter-game"],created:function(){var e=this;this.socket.on("joined-game",(function(t){e.attemptedConnection=!1,t.error?e.error=t.error:(e.gameCodeInput="",e.gameCode=t.gameCode,t.numPlayers<1?e.isWaiting=!0:(e.socket.removeAllListeners("joined-game"),e.$emit("enter-game",e.gameCode)))}))},methods:{newGame:function(){this.attemptedConnection||(this.attemptedConnection=!0,this.socket.connected||this.socket.open(),this.socket.emit("new-game"))},onJoinGameClck:function(){this.attemptedConnection||0==this.gameCodeInput.length||(this.attemptedConnection=!0,this.socket.connected||this.socket.open(),this.socket.emit("join-game",this.gameCodeInput.toLowerCase()))},onCancelGameClck:function(){this.socket.emit("cancel-creation",this.gameCode),this.gameCode="",this.isWaiting=!1}}};n("b755");U.render=q,U.__scopeId="data-v-42d56e69";var z=U,$=n("8e27"),L=n.n($),V="/";var F={name:"App",components:{GameBoard:D,SessionManager:z},data:function(){return{socket:L()(V,{withCredentials:!0,autoConnect:!1}),inGame:!1,gameCode:""}},methods:{enterGame:function(e){this.gameCode=e,this.inGame=!0}}};n("fcdf");F.render=o;var H=F;n("557b");Object(c["b"])(H).mount("#app")},5985:function(e,t,n){"use strict";n("d033")},7948:function(e,t,n){"use strict";n("4897")},"883b":function(e,t,n){},b755:function(e,t,n){"use strict";n("883b")},d033:function(e,t,n){},e8e0:function(e,t,n){},f795:function(e,t,n){},fcdf:function(e,t,n){"use strict";n("e8e0")}});
//# sourceMappingURL=app.a24881c6.js.map