import{_ as d,c as e,a as r,t as s,f as i,F as h,r as u,o}from"./index-s3pTKRT7.js";const x={data(){return{story:[{id:0,type:"fullScreen",src:"https://placehold.co/600x400?text=1"},{id:1,type:"fullScreen",src:"https://placehold.co/600x400?text=2"},{id:2,type:"fullScreen",src:"https://placehold.co/600x400?text=3"},{id:3,type:"conversation",conversation:[{conversationID:0,character:"Name",said:"Hello",src:{background:"https://placehold.co/600x400?text=5",character:"https://placehold.co/600x400?text=4"}},{conversationID:1,character:"Name1",said:"Hello,{playerName}",src:{background:"https://placehold.co/600x400?text=6",character:"https://placehold.co/600x400?text=7"}},{conversationID:2,character:"Name",said:"Hey",option:[{option:"Option 1",goto:3},{option:"Option 2",goto:4}],src:{background:"https://placehold.co/600x400?text=8",character:"https://placehold.co/600x400?text=9"}},{conversationID:3,character:"Nameoption1",said:"Hello",src:{background:"https://placehold.co/600x400?text=10",character:"https://placehold.co/600x400?text=11"}},{conversationID:4,character:"Name1option2",said:"Hello,{playerName}",src:{background:"https://placehold.co/600x400?text=12",character:"https://placehold.co/600x400?text=13"}}]}],currentStoryIndex:0,currentConversationIndex:0,playerName:"Player"}},computed:{currentStory(){return this.story[this.currentStoryIndex]},currentConversation(){return this.currentStory.conversation[this.currentConversationIndex]}},methods:{nextStory(){this.currentStoryIndex+1<this.story.length&&(this.currentStoryIndex++,this.currentConversationIndex=0)},nextConversation(){this.currentConversationIndex+1<this.currentStory.conversation.length?this.currentConversationIndex++:this.nextStory()},gotoConversation(a){this.currentConversationIndex=this.currentStory.conversation.findIndex(n=>n.conversationID===a)},parseText(a){return a.replace("{playerName}",this.playerName)}}},p=["src"],v={key:1,class:"conversation-mode"},y=["src"],m={class:"character"},g=["src"],C={key:1,class:"dialogue"},_={class:"options"},S=["onClick"];function I(a,n,k,f,N,t){return o(),e("div",null,[t.currentStory.type==="fullScreen"?(o(),e("div",{key:0,class:"comic-mode",onClick:n[0]||(n[0]=(...c)=>t.nextStory&&t.nextStory(...c))},[r("img",{src:t.currentStory.src,alt:"Story Image"},null,8,p)])):t.currentStory.type==="conversation"?(o(),e("div",v,[r("img",{src:t.currentConversation.src.background,alt:"Background Image",class:"background"},null,8,y),r("div",m,[r("img",{src:t.currentConversation.src.character,alt:"Character Image"},null,8,g)]),t.currentConversation.option?i("",!0):(o(),e("div",{key:0,class:"dialogue",onClick:n[1]||(n[1]=(...c)=>t.nextConversation&&t.nextConversation(...c))},[r("p",null,s(t.parseText(t.currentConversation.said)),1)])),t.currentConversation.option?(o(),e("div",C,[r("p",null,s(t.parseText(t.currentConversation.said)),1),r("div",_,[(o(!0),e(h,null,u(t.currentConversation.option,(c,l)=>(o(),e("button",{key:l,onClick:b=>t.gotoConversation(c.goto)},s(c.option),9,S))),128))])])):i("",!0)])):i("",!0)])}const H=d(x,[["render",I],["__scopeId","data-v-e415e7ca"]]);export{H as default};
