import{A as c}from"./Asserts-nKOoGj66.js";import{_ as g,c as l,a as t,t as o,F as p,r as u,f as k,o as d}from"./index-Dyiu27v4.js";const b=[{name:"Verdant Angel",src:"ssr_wood.png",properties:{grade:"SSR",attribute:"wood",hp:1500,skillTurn:3,attack:500,attackMode:"multi",defend:400,skills:"Nature's Embrace"}},{name:"Flame Sprite",src:"sr_fire.png",properties:{grade:"SR",attribute:"fire",hp:1e3,skillTurn:4,attack:350,attackMode:"single",defend:300,skills:"Fire Dance"}},{name:"Azure Angel",src:"sr_water.png",properties:{grade:"SR",attribute:"water",hp:950,skillTurn:4,attack:330,attackMode:"single",defend:320,skills:"Water's Blessing"}},{name:"Luminous Guardian",src:"r_light1.png",properties:{grade:"R",attribute:"light",hp:700,skillTurn:4,attack:250,attackMode:"single",defend:200,skills:"Radiant Shield"}},{name:"Mystic Guardian",src:"r_dark1.png",properties:{grade:"R",attribute:"dark",hp:750,skillTurn:5,attack:270,attackMode:"single",defend:210,skills:"Shadow Strike"}},{name:"Woodling Warrior",src:"r_wood1.png",properties:{grade:"R",attribute:"wood",hp:720,skillTurn:5,attack:240,attackMode:"single",defend:220,skills:"Rooted Strike"}},{name:"Fire Blossom",src:"r_fire1.png",properties:{grade:"R",attribute:"fire",hp:750,skillTurn:4,attack:260,attackMode:"multi",defend:210,skills:"Flame Bloom"}},{name:"Water Sprite",src:"r_water1.png",properties:{grade:"R",attribute:"water",hp:730,skillTurn:4,attack:220,attackMode:"single",defend:250,skills:"Bubble Shield"}},{name:"Cute Green Slime",src:"n_slime1.png",properties:{grade:"N",attribute:"wood",hp:300,skillTurn:5,attack:100,attackMode:"single",defend:100,skills:"Slime Splash"}},{name:"Cheerful Blue Slime",src:"n_slime2.png",properties:{grade:"N",attribute:"water",hp:320,skillTurn:5,attack:120,attackMode:"single",defend:90,skills:"Water Slime"}},{name:"Fluffy Red Slime",src:"n_slime3.png",properties:{grade:"N",attribute:"fire",hp:290,skillTurn:5,attack:110,attackMode:"single",defend:95,skills:"Fire Burst"}},{name:"Radiant Yellow Slime",src:"n_slime4.png",properties:{grade:"N",attribute:"light",hp:310,skillTurn:5,attack:115,attackMode:"single",defend:100,skills:"Light Bubbles"}},{name:"Dark Sticky Slime",src:"n_slime5.png",properties:{grade:"N",attribute:"dark",hp:280,skillTurn:5,attack:90,attackMode:"single",defend:110,skills:"Shadow Goo"}}],_={data(){return{gems:0,drawnCharacters:[],drawProbabilities:{SSR:.01,SR:.1,R:.3,N:.59}}},created(){this.loadStoredCharacters()},mounted(){this.gems=c.getGem()},methods:{loadStoredCharacters(){const r=JSON.parse(localStorage.getItem("collectedCharacters"))||[];this.drawnCharacters=r},draw(r){if(r===1&&this.gems<20||r===10&&this.gems<180)return;const e=r===1?20:180;c.decreaseGem("gem",e),this.gems=c.getGem();const s=[];for(let n=0;n<r;n++){const a=this.drawCharacter();s.push(a)}this.drawnCharacters.push(...s),this.saveCharactersToLocalStorage()},drawCharacter(){const r=Math.random();let e=0;for(let s in this.drawProbabilities)if(e+=this.drawProbabilities[s],r<e)return this.getCharacterByGrade(s);return this.getCharacterByGrade("N")},getCharacterByGrade(r){const e=b.filter(n=>n.properties.grade===r),s=Math.floor(Math.random()*e.length);return e[s]},saveCharactersToLocalStorage(){localStorage.setItem("collectedCharacters",JSON.stringify(this.drawnCharacters))}}},f={class:"container mt-4"},w={class:"row"},S={class:"col"},C={class:"card"},v={class:"row mt-3"},y={class:"col-md-6"},M=["disabled"],T={class:"col-md-6"},G=["disabled"],R={key:0,class:"mt-4"},B={class:"row"},N={class:"card"},F=["src"],I={class:"card-body"},W={class:"card-title"},x={class:"card-text"};function A(r,e,s,n,a,m){return d(),l(p,null,[t("button",{type:"button",class:"btn btn-primary",onClick:e[0]||(e[0]=i=>this.$router.push("/home"))},"◀"),t("div",f,[t("div",w,[t("div",S,[e[3]||(e[3]=t("h3",null,"Welcome, to the Tavern, meet some new friends",-1)),t("div",C,"💎 Gems: "+o(a.gems),1),e[4]||(e[4]=t("p",null,"Yocan can invite one new friend to you team for 20 Gems, or 10 for 180 Gems",-1))])]),t("div",v,[t("div",y,[t("button",{class:"btn btn-primary",disabled:a.gems<20,onClick:e[1]||(e[1]=i=>m.draw(1))}," Invite 1 (20 Gems) ",8,M)]),t("div",T,[t("button",{class:"btn btn-primary",disabled:a.gems<180,onClick:e[2]||(e[2]=i=>m.draw(10))}," Invite 10 (180 Gems) ",8,G)])]),a.drawnCharacters.length?(d(),l("div",R,[e[5]||(e[5]=t("h4",null,"Drawn Characters",-1)),t("div",B,[(d(!0),l(p,null,u(a.drawnCharacters,(i,h)=>(d(),l("div",{key:h,class:"col-md-2 mb-4"},[t("div",N,[t("img",{src:i.src,class:"card-img-top",alt:"Character Image"},null,8,F),t("div",I,[t("h5",W,o(i.name),1),t("p",x,o(i.properties.grade)+" - "+o(i.properties.attribute),1)])])]))),128))])])):k("",!0)])],64)}const V=g(_,[["render",A],["__scopeId","data-v-e3b96878"]]);export{V as default};