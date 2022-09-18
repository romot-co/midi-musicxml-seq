(this["webpackJsonpmidi-musicxml-seq"]=this["webpackJsonpmidi-musicxml-seq"]||[]).push([[0],{144:function(e,t){},146:function(e,t){},158:function(e,t,a){var n={"./en/main":[163,3],"./ja/main":[164,4]};function c(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],c=t[0];return a.e(t[1]).then((function(){return a.t(c,7)}))}c.keys=function(){return Object.keys(n)},c.id=158,e.exports=c},161:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(19),l=a.n(r),i=(a(98),a(99),a(92)),o=a(11),s=a(12),u=a(84),m=a(172),d=a(87),p=a(56),b=a(166),f=a(182),h=a(183),E=a(173),y=a(174),j=a(175),g=a(169),O=a(170),k=a(176),v=a(177),x=a(178),N=a(179),w=a(180),S=a(165),_=a(22),C=function(e){var t=e.keys,a=e.octave,n={0:"C",1:"C#",2:"D",3:"D#",4:"E",5:"F",6:"F#",7:"G",8:"G#",9:"A",10:"A#",11:"B"};return c.a.createElement("div",{className:"sequence-keys"},t.map((function(e,t){return c.a.createElement(c.a.Fragment,{key:t},c.a.createElement("div",{className:"sequence-key sequence-key-".concat(e.midi," sequence-key-").concat(e.color," sequence-key-").concat(e.pitch),id:"sequence-key-".concat(e.midi)},c.a.createElement("span",{className:"sequence-key-base"},n[e.pitch],a+1)),c.a.createElement(S.a,{target:"sequence-key-".concat(e.midi),placement:"right"},n[e.pitch],a))})))},q=a(25),M=a.n(q),T=a(14),L=function(e){var t=e.note,a=e.xScale,r=e.yScale,l=e.transpose,i=e.phoneme,o=e.lyric,u=e.index,m=e.edit,d=e.setEdit,p=e.locale,b=e.onChange,f=Object(n.useRef)(null),h=Object(n.useState)(""),E=Object(s.a)(h,2),y=E[0],j=E[1],g={left:"".concat(t.ticks*a,"px"),bottom:"".concat((t.midi-12)*r+l*r,"px"),width:"".concat(t.durationTicks*a,"px")};Object(n.useEffect)((function(){j(i)}),[i]),Object(n.useEffect)((function(){m===u&&f.current.select()}),[m]);var O=m===u;return c.a.createElement("div",{className:"note",onClick:function(e){e.stopPropagation(),m||(d(u),f&&f.current.select())},style:g},c.a.createElement("input",{type:"text",value:y||"",onKeyPress:function(e){var t=e.key.toLowerCase();("enter"===t||"tab"===t&&o.length<u)&&d(u+1)},onChange:function(e){var t="string"===typeof e.target.value?e.target.value.trim():e.target.value;j(t),"ja"===p&&(t?1===t.length?b(t[0],u):M()(t)&&b(t,u):b(" ",u)),"en"===p&&(t?1===t.length?b(t[0],u):Object(T.isRomaji)(t)&&b(t,u):b(" ",u))},className:"note-input",maxLength:"ja"===p?2:3,ref:f,id:"note-".concat(u)}),!O&&c.a.createElement(S.a,{target:"note-".concat(u),placement:"bottom",delay:{show:200}},y," ",c.a.createElement("span",{className:"text-muted"},t.name)))},R=function(e){var t=e.midi,a=e.trackIndex,r=void 0===a?0:a,l=e.transpose,i=void 0===l?0:l,o=e.lyric,u=e.setLyric,m=e.xScale,d=e.yScale,p=e.locale,b=Object(_.a)(Array(128).keys()).reduce((function(e,t,a){return a%12===0?[].concat(Object(_.a)(e),[[t]]):[].concat(Object(_.a)(e.slice(0,-1)),[[].concat(Object(_.a)(e[e.length-1]),[t])])}),[]).map((function(e,t){return e.map((function(e,a){return{midi:e,pitch:a,octave:9-t,color:[0,2,4,5,7,9,11].indexOf(a)>-1?"white":"black"}})).reverse()})).reverse(),f=t&&t.toJSON(),h=f.header,E=f&&h.timeSignatures&&h.timeSignatures.length>0?h.timeSignatures[0].timeSignature:[4,4],y=f&&f.tracks[r].notes,j=y&&y.length?y.slice(-1)[0].ticks+y.slice(-1)[0].durationTicks:7680,g=(f?h.ppq:480)*E[1]*(E[0]/E[1]),O=Math.ceil(j/g),k=g*O,v=function(e,t){var a=o.map((function(a,n){return n===t?e:a}));u(a)},x=Object(n.useState)(!1),N=Object(s.a)(x,2),w=N[0],S=N[1];return c.a.createElement("div",{className:"sequence"},c.a.createElement("div",{className:"sequence-scales"},b.map((function(e,t,a){return c.a.createElement(C,{keys:e,octave:9-t,key:t})}))),c.a.createElement("div",{className:"sequence-body"},c.a.createElement("div",{className:"sequence-grid-y",style:{width:"".concat(k*m,"px")},onClick:function(){return S(!1)}},b.map((function(e,t,a){return c.a.createElement("div",{className:"sequence-grid-octave",key:t},e.map((function(e,t){return c.a.createElement("div",{key:t,className:"sequence-grid-pitch sequence-grid-pitch-".concat(e.color)})})))}))),c.a.createElement("div",{className:"sequence-grid-x"},Object(_.a)(Array(O).keys()).map((function(e,t){return c.a.createElement("div",{className:"sequence-grid-measure",key:t,style:{left:"".concat(g*m*(t+1),"px")}})}))),t&&f.tracks[r].notes.map((function(e,t){return c.a.createElement(L,{note:e,xScale:m,yScale:d,transpose:i,key:t,phoneme:o[t],edit:w,setEdit:S,index:t,lyric:o,locale:p,onChange:v})}))))},F=a(54),I=a.n(F),A=a(7),D=function(e){var t=e.lyric,a=e.setLyric,r=e.expand,l=e.setExpand,i=e.limit,o=e.locale,u=e.disabled,m=Object(n.useState)(""),d=Object(s.a)(m,2),p=d[0],f=d[1],h=function(e){var t=e.replace(/\s/g,"").trim(),n=[];"ja"===o&&t.split("").forEach((function(e,t,a){var c=a[t+1]||!1;I()(e)&&(M()(e)||(c&&M()(c)?n.push(e+c):n.push(e)))})),"en"===o&&Object(T.toKana)(t).split("").forEach((function(e,t,a){var c=a[t+1]||!1;I()(e)&&(M()(e)||(c&&M()(c)?n.push(Object(T.toRomaji)(e+c)):n.push(Object(T.toRomaji)(e))))})),a(n.slice(0,i))};return Object(n.useEffect)((function(){f(t.join(""))}),[t]),c.a.createElement(b.a,{type:"textarea",className:"lyric-text mr-3 ".concat(r?"lyric-text-expand":""),value:p,placeholder:Object(A.t)("inputLyrics"),onClick:function(){return l(!0)},onChange:function(e){f(e.target.value)},onBlur:function(e){h(e.target.value)},onCompositionEnd:function(e){h(e.target.value)},id:"lyricEditInput",disabled:u})},B=a(181),P=a(167),U=a(168),J=a(171),G=function(e){var t=e.handleClose,a=e.show;return c.a.createElement(B.a,{isOpen:a,size:"lg"},c.a.createElement(P.a,null,Object(A.t)("title")),c.a.createElement(U.a,null,c.a.createElement(g.a,null,c.a.createElement(O.a,{lg:"10",className:"mx-auto text-sm"},c.a.createElement("h2",{className:"h6 font-weight-bold"},Object(A.t)("helpModal.about")),c.a.createElement("ul",null,c.a.createElement("li",null,Object(A.t)("helpModal.about1")),c.a.createElement("li",null,Object(A.t)("helpModal.about2")),c.a.createElement("li",null,Object(A.t)("helpModal.about3"))),c.a.createElement("h2",{className:"h6 font-weight-bold"},Object(A.t)("helpModal.note")),c.a.createElement("ul",null,c.a.createElement("li",null,Object(A.t)("helpModal.note1")),c.a.createElement("li",null,Object(A.t)("helpModal.note2"))),c.a.createElement("h2",{className:"h6 font-weight-bold"},Object(A.t)("helpModal.misc")),c.a.createElement("ul",null,c.a.createElement("li",null,Object(A.t)("helpModal.misc1",{link:c.a.createElement("a",{href:"https://twitter.com/romotco",key:"contact",target:"_blank",rel:"noopener noreferrer"},"@romotco")})),c.a.createElement("li",null,Object(A.t)("helpModal.misc2",{link:c.a.createElement("a",{href:"https://twitter.com/tnantoka",key:"specialThanks",target:"_blank",rel:"noopener noreferrer"},"@tnantoka")})," ",c.a.createElement("a",{href:"https://neutrino.tnantoka.com/",target:"_blank",rel:"noopener noreferrer"},"NEUTRINO BLOG")),c.a.createElement("li",null,Object(A.t)("helpModal.misc3",{link:c.a.createElement("a",{href:"https://www.nicovideo.jp/watch/sm36446234",key:"mySong",target:"_blank",rel:"noopener noreferrer"},"AI Kiritan - Neu Breath (NEUTRINO Original)")}))),c.a.createElement("h2",{className:"h6 font-weight-bold"},"MusicXML"),c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("a",{href:"http://usermanuals.musicxml.com/MusicXML/MusicXML.htm#license.htm%3FTocPath%3D_____7",rel:"noopener noreferrer"},"MusicXML3.0 Public License")))))),c.a.createElement(J.a,null,c.a.createElement(d.a,{color:"primary",onClick:t},Object(A.t)("close"))))},K=a(88),V=a(57),X=a(89),z=a.n(X),W=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=["C","C","D","D","E","F","F","G","G","A","A","B"],n=[0,1,0,1,0,0,1,0,1,0,1,0],c=Math.floor(e/12)-1,r=a[e%12],l=n[e%12]+t;return{step:{_text:r},alter:{_text:l>0?"+".concat(l.toString()):l.toString()},octave:{_text:c.toString()}}},H=function(e){var t=Object(n.useState)(!1),r=Object(s.a)(t,2),l=r[0],i=r[1],o=Object(n.useState)("ja"===window.navigator.language||"ja-JP"===window.navigator.language?"ja":"en"),C=Object(s.a)(o,2),q=C[0],M=C[1],L=Object(n.useRef)(null),F=Object(n.useRef)(null),I=Object(n.useState)(!1),B=Object(s.a)(I,2),P=B[0],U=B[1],J=Object(n.useState)(0),X=Object(s.a)(J,2),H=X[0],$=X[1],Q=Object(n.useState)(120),Y=Object(s.a)(Q,2),Z=Y[0],ee=Y[1],te=Object(n.useState)(0),ae=Object(s.a)(te,2),ne=ae[0],ce=ae[1],re=Object(n.useState)(!1),le=Object(s.a)(re,2),ie=le[0],oe=le[1],se=Object(n.useState)(24),ue=Object(s.a)(se,2),me=ue[0],de=ue[1],pe=Object(n.useState)(.25),be=Object(s.a)(pe,2),fe=be[0],he=be[1],Ee=Object(n.useState)([""]),ye=Object(s.a)(Ee,2),je=ye[0],ge=ye[1],Oe=Object(n.useState)("lyrics"),ke=Object(s.a)(Oe,2),ve=ke[0],xe=ke[1],Ne=Object(n.useState)(!1),we=Object(s.a)(Ne,2),Se=we[0],_e=we[1],Ce=Object(n.useState)(!1),qe=Object(s.a)(Ce,2),Me=qe[0],Te=qe[1],Le=Object(n.useState)(!1),Re=Object(s.a)(Le,2),Fe=Re[0],Ie=Re[1],Ae=function(e){A.lisan.setLocaleName(e),a(158)("./".concat(e,"/main")).then((function(t){A.lisan.add(t),i(!0),M(e),ge("ja"===e?je.map((function(e){return Object(T.toKana)(e)})):je.map((function(e){return Object(T.toRomaji)(e)})))}))};Object(n.useEffect)((function(){q&&Ae(q)}),[q]),Object(n.useEffect)((function(){if(l){var e=document.querySelector("#sequence-key-72");null!==e&&e.scrollIntoView(),Se||(_e(!0),Te(!0))}}),[l,Se]);return P&&console.log(P.toJSON().tracks[H]),l?c.a.createElement(c.a.Fragment,null,c.a.createElement(u.Helmet,null,c.a.createElement("title",null,Object(A.t)("title")),c.a.createElement("body",null)),c.a.createElement(m.a,{color:"light",light:!0,className:"fixed-top"},c.a.createElement("div",{className:"d-flex align-items-center mr-auto"},c.a.createElement(d.a,{type:"button",color:P?"secondary":"primary",className:"btn-circle mr-3",onClick:function(){Te(!1),L.current.click()},id:"upload",ref:F},c.a.createElement("i",{className:"icon ri-folder-open-line"})),Se&&c.a.createElement(p.a,{target:"upload",isOpen:Me,delay:4e3,fade:!0},Object(A.t)("startHere")),c.a.createElement("input",{ref:L,type:"file",id:"midi-file-input",className:"d-none",accept:"audio/midi, audio/x-midi",onChange:function(e){var t=e.target.files[0],a=new FileReader;a.readAsArrayBuffer(t),a.onload=function(e){var t=e.target.result;if(t)if(t.tracks<1)window.alert(Object(A.t)("message.noTracks"));else{var a=new K.Midi(t),n=a.header.tempos.length?a.header.tempos.slice(-1)[0].bpm:120;$(a.tracks.findIndex((function(e){return e.notes.length>0}))),ee(n),U(a),ge(a.tracks[H].notes.map((function(){return"ja"===q?"\u3089":"ra"}))),de(24),document.querySelector("#sequence-key-72").scrollIntoView(),oe(!0),document.querySelector("#lyricEditInput").focus()}},a.onerror=function(e){window.alert(Object(A.t)("message.failedToLoadFile"))}}}),c.a.createElement("span",{className:"navbar-text mr-2"},Object(A.t)("track")),c.a.createElement(b.a,{type:"select",color:"light",size:"sm",onChange:function(e){$(e.target.value)},style:{width:"120px"},className:"mr-3",disabled:!P},P&&P.toJSON().tracks.map((function(e,t){return c.a.createElement("option",{key:t,value:t},t+1,": ",e.name)}))),c.a.createElement("span",{className:"navbar-text mr-2"},Object(A.t)("bpm")),c.a.createElement(b.a,{type:"number",color:"light",size:"sm",value:Z,onChange:function(e){ee(e.target.value)},style:{width:"70px"},className:"mr-3",disabled:!P}),c.a.createElement("span",{className:"navbar-text mr-2"},Object(A.t)("transpose")),c.a.createElement(b.a,{type:"number",min:"-24",max:"24",size:"sm",value:ne,style:{width:"70px"},onChange:function(e){ce(e.target.value)},disabled:!P})),c.a.createElement(f.a,null,c.a.createElement(h.a,{color:"primary"},Object(A.t)("download"),c.a.createElement("i",{className:"ml-2 icon ri-download-2-line"})),c.a.createElement(E.a,null,c.a.createElement(y.a,{onClick:function(){var e=function(e,t,a,n,c,r){var l=e.toJSON(),i=l.header,o=Array.isArray(i.timeSignatures)&&i.timeSignatures.length>0?i.timeSignatures[0].timeSignature:[4,4],s=l.tracks[n],u=s.notes.slice(-1)[0].durationTicks+s.notes.slice(-1)[0].ticks,m=i.ppq*o[1]*(o[0]/o[1]),d=Math.ceil(u/m),p=Object(_.a)(Array(d).keys()).map((function(e,n){var c=n*m,l=c+m,i=s.notes.map((function(e,n){return l>e.ticks&&(c<=e.ticks||c<e.ticks+e.durationTicks)?Object(V.a)(Object(V.a)({},e),{},{lyric:"ja"===a?t[n]||"":Object(T.toKana)(t[n])||""}):null})).filter((function(e){return null!==e})),o=[];return 0===i.length?o.push({rest:{},duration:{_text:m}}):i.forEach((function(e,t,a){var n=a[t-1]||!1,i=a[t+1]||!1,s=e.ticks+e.durationTicks,u=!!n&&n.ticks+n.durationTicks;!n&&e.ticks>c?o.push({rest:{},duration:{_text:e.ticks-c}}):!n&&e.ticks<c?o.push({_attributes:{dynamics:100*e.velocity},pitch:W(e.midi,r),duration:{_text:s-c},tie:{_attributes:{type:"stop"}}}):n&&u<e.ticks&&o.push({rest:{},duration:{_text:e.ticks-u}}),s>l?o.push({_attributes:{dynamics:100*e.velocity},pitch:W(e.midi,r),duration:{_text:l-e.ticks},lyric:{text:{_text:e.lyric}},tie:{_attributes:{type:"start"}}}):e.ticks>=c&&o.push({_attributes:{dynamics:100*e.velocity},pitch:W(e.midi,r),duration:{_text:e.durationTicks},lyric:{text:{_text:e.lyric}}}),!i&&l>s&&o.push({rest:{},duration:{_text:l-s}})})),{_attributes:{number:n+2},note:o}}));p.unshift({_attributes:{number:"1"},attributes:{divisions:{_text:i.ppq},key:{fifths:{_text:"0"}},time:{beats:{_text:o[0]},"beat-type":{_text:o[1]}},clef:{sign:{_text:"G"},line:{_text:"2"}}},sound:{_attributes:{tempo:c}},note:{rest:{},duration:{_text:m}}});var b={_declaration:{_attributes:{version:"1.0",encoding:"utf-8"}},_doctype:'score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd"',"score-partwise":{_attributes:{version:"3.1"},"part-list":{"score-part":{_attributes:{id:"p".concat(n)},"part-name":{_text:i.name||""}}},part:{_attributes:{id:"p".concat(n)},measure:p}}};return console.log(p),z.a.json2xml(b,{compact:!0,spaces:2})}(P,je,q,H,Z,ne),t=new Blob([e],{type:"text/plain;charset=utf-8"}),a=document.createElement("a");a.download="score.musicxml",a.href=URL.createObjectURL(t),a.click()}},Object(A.t)("musicXML")),c.a.createElement(y.a,{onClick:function(){var e=function(e,t,a,n,c,r){var l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{projectName:"(no title)",flags:"",outFile:"",voiceDir:"${DEFAULT}/",mode2:!0},i=e.toJSON(),o=i.header,s=Array.isArray(o.timeSignatures)&&o.timeSignatures.length>0?o.timeSignatures[0].timeSignature:[4,4],u=i.tracks[n];return"\n    [#VERSION]\n    UST Version2.0\n    Charset=UTF-8\n    [#SETTING]\n    TimeSignatures=(".concat(s[0],"/").concat(s[1],"/0),\n    Tempo=").concat(c,"\n    ProjectName=").concat(l.projectName,"\n    OutFile=").concat(l.outFile,"\n    VoiceDir=").concat(l.voiceDir,"\n    Flags=").concat(l.flags,"\n    Mode2=").concat(l.mode2?"True":"False","\n    ").concat(u.notes.map((function(e,n,c){return"\n        [#".concat(("0000"+n).slice(-4),"]\n        Delta=").concat(0===n?e.ticks:e.ticks-c[n-1].ticks,"\n        Duration=").concat(e.durationTicks,"\n        Length=").concat(c[n+1]?c[n+1].ticks-e.ticks:e.durationTicks,"\n        Lyric=").concat(t[n]?"ja"===a?t[n]:Object(T.toKana)(t[n]):"","\n        NoteNum=").concat(e.midi+Number(r),"\n        Velocity=").concat(1e4*Math.floor(e.velocity)/100,"\n        StartPoint=0.00\n        Intensity=100\n        Modulation=0\n        PBS=-40.0,0.0\n        PBW=80.0\n        Envelope=5.0,1.0,0.0,100.0,\n        100.0,100.0,100.0,7.0,80.0,1.0,100.0,0.0,1.0,100.0,1.0,100.0\n        VBR=0,0,0,0,0,0,0,0,0,0")})).join(""),"\n  [#TRACKEND]").replace(/^\s+/gm,"")}(P,je,q,H,Z,ne),t=new Blob([e],{type:"text/plain;charset=utf-8"}),a=document.createElement("a");a.download="score.ust",a.href=URL.createObjectURL(t),a.click()}},Object(A.t)("ust")))),c.a.createElement(f.a,null,c.a.createElement(h.a,{color:"light",className:"btn btn-circle"},c.a.createElement("i",{className:"icon ri-more-2-fill"})),c.a.createElement(E.a,null,c.a.createElement(y.a,{onClick:function(){return Ae("en")}},Object(A.t)("english")),c.a.createElement(y.a,{onClick:function(){return Ae("ja")}},Object(A.t)("japanese")),c.a.createElement(y.a,{divider:!0}),c.a.createElement(y.a,{onClick:function(){return Ie(!0)}},Object(A.t)("about"))))),c.a.createElement(j.a,{fluid:!0,className:"px-0",style:{marginTop:"53px"}},c.a.createElement(g.a,{className:"no-gutters",onClick:function(){return oe(!1)}},c.a.createElement(O.a,null,c.a.createElement(R,{midi:P,trackIndex:H,transpose:ne,lyric:je,setLyric:ge,xScale:fe,yScale:me,locale:q}))),c.a.createElement(g.a,null,c.a.createElement("div",{className:"sequence-controls"},c.a.createElement("div",{className:"d-flex align-items-start"},c.a.createElement("div",{className:"w-100 p-2"},c.a.createElement(k.a,{pills:!0,className:"mb-2"},c.a.createElement(v.a,null,c.a.createElement(x.a,{href:"#",onClick:function(){xe("lyrics")},active:"lyrics"===ve},Object(A.t)("lyrics"))),c.a.createElement(v.a,null,c.a.createElement(x.a,{href:"#",onClick:function(){xe("velocity")},active:"velocity"===ve,disabled:!0},Object(A.t)("velocity"))),c.a.createElement(v.a,null,c.a.createElement(x.a,{href:"#",onClick:function(){xe("pitch")},active:"pitch"===ve,disabled:!0},Object(A.t)("pitch")))),c.a.createElement(N.a,{activeTab:ve},c.a.createElement(w.a,{tabId:"lyrics"},c.a.createElement(D,{lyric:je,setLyric:ge,expand:ie,setExpand:oe,limit:P?P.tracks[H].notes.length:0,locale:q,disabled:!P}),Se&&c.a.createElement(S.a,{target:"lyricEditInput",fade:!0},Object(A.t)("inputLyrics"))))),c.a.createElement("div",{className:"px-3"},c.a.createElement(b.a,{type:"range",className:"sequence-scale-range",max:"0.5",min:"0.025",step:"0.025",value:fe,onChange:function(e){he(e.target.value)}})))))),c.a.createElement(G,{show:Fe,handleClose:function(){Ie(!1)}})):""},$=function(){return c.a.createElement(i.a,{basename:"/midi-musicxml-seq"},c.a.createElement(o.c,null,c.a.createElement(o.a,{exact:!0,path:"/",component:H}),c.a.createElement(o.a,{component:function(){return c.a.createElement("div",null,"404 Not found")}})))};var Q=function(){return c.a.createElement("div",{className:"app"},c.a.createElement("main",{className:"main"},c.a.createElement($,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(Q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},93:function(e,t,a){e.exports=a(161)},98:function(e,t,a){}},[[93,1,2]]]);
//# sourceMappingURL=main.cade171a.chunk.js.map