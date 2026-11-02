import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Projection } from '@plural/client';
import { TopBar } from '../../Plural/web/src/components/TopBar';
import { Feed } from '../../Plural/web/src/components/feed/Feed';
import { Composer } from '../../Plural/web/src/components/Composer';
import { Canvas } from '../../Plural/web/src/components/Canvas';
import { componentPrompt } from '../../Plural/web/src/lib/quote';
import room from '../../Plural/web/src/screens/RoomScreen.module.css';
import '../../Plural/web/src/styles/tokens.css';
import '../../Plural/web/src/styles/base.css';
import './preview.css';

const noop = () => {};
const params = new URLSearchParams(location.search);
const who = params.get('name') || 'Alia';
const projection = new Projection();
projection.meId = 'vlad'; projection.ready = true;
projection.agent = params.get('agent') || 'anthropic · claude-sonnet';
projection.state.participants = Object.fromEntries([['vlad','Vlad','host'],['alia','Alia','participant'],['bek','Bek','participant']].map(([id,name,role]) => [id,{id,name,role,connected:true}]));
const doc = {id:'site',title:'src/pages/overview.tsx',kind:'site',lang:'tsx',text:'src/pages/overview.tsx',live:false,auto:true};
const items = [
  {kind:'user',id:'prompt',participantId:who.toLowerCase(),name:who,role:'participant',viaProposal:false,text:'Build the project overview page. Show our active projects, weekly activity and recent updates. Keep it clean and light.'},
  {kind:'assistant',id:'reply',text:'I’m building the overview and opening the page in the canvas so everyone can follow the changes.',streaming:false},
  {kind:'tool',id:'read',call:{id:'read',name:'read',risk:'read',subject:'src/components/Layout.tsx',args:{path:'src/components/Layout.tsx'}},status:'ok',output:'export function Layout({ children }) {\n  return <main>{children}</main>;\n}',diff:null,live:''},
  {kind:'tool',id:'write',call:{id:'write',name:'write',risk:'write',subject:'src/pages/overview.tsx',args:{path:'src/pages/overview.tsx'}},status:'ok',output:'Created project overview with responsive layout.',diff:null,live:''},
  {kind:'chat',id:'chat',authorId:'bek',name:'Bek',text:'Looks good. Put the active projects above the activity feed.',to:null,toName:null,mine:false,mentioned:false},
  {kind:'assistant',id:'done',text:'The overview is ready in the live preview. Active projects come first, followed by the latest team updates.',streaming:false},
];
const NOTE = 'Show progress for every project, not just the first one';
// What the composer sends after picking a component in the preview, as the real client builds it.
const picked = [
  {kind:'user',id:'pick',participantId:'bek',name:'Bek',role:'participant',viaProposal:false,text:componentPrompt('src/pages/overview.tsx',{selector:'section.projects',tag:'section',html:'<section class="projects"><header><h2>Active projects</h2>…'},NOTE)},
  {kind:'tool',id:'edit',call:{id:'edit',name:'edit',risk:'write',subject:'src/pages/overview.tsx',args:{path:'src/pages/overview.tsx'}},status:'ok',output:'',diff:'--- a/src/pages/overview.tsx\n+++ b/src/pages/overview.tsx\n@@ -24,3 +24,3 @@\n-  <Progress value={projects[0].done} />\n+  {projects.map((p) => <Progress key={p.id} value={p.done} />)}',live:''},
  {kind:'assistant',id:'fixed',text:'Done: every project in the list now shows its progress.',streaming:false},
];

function ExampleSite({stage, pick}) {
  return <div className="example-site">
    {pick.on ? <span className="example-pick-toggle">⌖ Pick</span> : null}
    <span className={`example-cursor${pick.cursor ? ' example-cursor-on' : ''}`}><svg width="14" height="14" viewBox="0 0 24 24"><path d="M3 2l7 19 2.6-7.4L20 11z" fill="#3a6bff" stroke="#fff" strokeWidth="1.5"/></svg><b>Bek</b></span>
    <nav><b><span className="example-symbol">◈</span> orbit</b><span>Workspace</span><i>AC</i></nav>
    <div className="example-body"><div className="example-heading"><small>Your workspace, at a glance</small><h1>Good morning, Alia <span>✳</span></h1><p>Here’s what your team is building this week.</p></div>
      <div className="example-stats"><div><span>Active projects</span><b>12 <small>+2 this week</small></b></div><div><span>Tasks completed</span><b>38 <small>↑ 18%</small></b></div><div><span>Team members</span><b>8 <small>All connected</small></b></div></div>
      <div className={`example-section ${stage>=1?'example-visible':''}${pick.outline?' example-picked':''}`}>{pick.outline?<span className="example-pick-label">section.projects</span>:null}{pick.note!==null?<div className="example-note"><span>{pick.note}<i/></span><b className={pick.sent?'example-sent':''}>Ask agent</b></div>:null}<header><h2>Active projects</h2><span>View all ↗</span></header><div className="example-project"><i>↗</i><div><b>Website refresh</b><span>Design & development</span></div><em>In progress</em></div><div className="example-progress"><span/></div><div className="example-project"><i>◉</i><div><b>Mobile onboarding</b><span>Product experience</span></div><em className="example-review">In review</em></div>{pick.fixed?<div className="example-progress example-fixed"><span style={{width:'34%'}}/></div>:null}</div>
      <div className={`example-section ${stage>=2?'example-visible':''}`}><header><h2>Recent activity</h2><span>This week</span></header><div className="example-update"><i>B</i><p><b>Bek</b> updated the API documentation<small>12 minutes ago · Website refresh</small></p><span>✓</span></div><div className="example-update"><i>C</i><p><b>Cleo</b> completed the design review<small>28 minutes ago · Mobile onboarding</small></p><span>✓</span></div></div>
      <footer><span className="example-status"/>All systems operational<span>Made together.</span></footer>
    </div>
  </div>;
}

// One loop, in ticks of TICK_MS: the page is built, then Bek picks a section in the preview and asks for a change.
const TICK_MS = 300;
const LOOP = 64;
function timeline(t) {
  const stage = t < 8 ? 0 : t < 16 ? 1 : 2;
  const feedCount = t < 8 ? 3 : t < 16 ? 4 : 6;
  const pick = {
    on: t >= 22 && t < 44,
    cursor: t >= 20 && t < 46,
    outline: t >= 26 && t < 44,
    note: t >= 29 && t < 44 ? NOTE.slice(0, Math.max(0, (t - 30) * 4)) : null,
    sent: t >= 41,
    fixed: t >= 50,
  };
  const extra = t >= 44 ? 1 : 0;
  const more = t >= 50 ? 3 : t >= 47 ? 2 : extra;
  const presence = t < 16 ? 'agent is building the page…' : t < 22 ? 'Bek and Alia are viewing the preview' : t < 44 ? 'Bek is picking a component…' : t < 50 ? 'agent is editing src/pages/overview.tsx…' : 'Bek and Alia are viewing the preview';
  return { stage, feed: [...items.slice(0, feedCount), ...picked.slice(0, more)], pick, presence };
}

function Preview(){
  const [t,setT] = useState(0), [paused,setPaused] = useState(false);
  useEffect(()=>{const receive=e=>{if(e.origin===location.origin && e.data?.type==='plural-preview-pause')setPaused(e.data.paused);};addEventListener('message',receive);return()=>removeEventListener('message',receive);},[]);
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setT(52);return;}if(paused)return;const timer=setInterval(()=>setT(n=>(n+1)%LOOP),TICK_MS);return()=>clearInterval(timer);},[paused]);
  const {stage,feed,pick,presence} = timeline(t);
  return <div className={`${room.room} ${room.withCanvas}`} inert>
    <TopBar room="r_01M5W7AC" projection={projection} connection="online" panelOpen={false} onCopyRoom={noop} onTogglePanel={noop} onLeave={noop}/>
    <main className={room.stage}><div className={room.scroller}><div className={room.content}><div className={room.welcome}>You joined room r_01M5W7AC as Vlad, host</div><Feed items={feed} meId="vlad"/></div></div><div className={room.dock}><div className={room.presence}>{presence}</div><Composer role="host" placeholder="Message the agent, / for commands" disabled={null} editing={null} onSubmit={noop} onCancelEdit={noop} onEscape={noop} onActivity={noop}/></div></main>
    <Canvas doc={doc} docs={[doc]} selectors={[]} full={false} onToggleFull={noop} onPick={noop} onClose={noop} site={()=> <ExampleSite stage={stage} pick={pick}/>}/>
  </div>;
}
createRoot(document.getElementById('root')).render(<Preview/>);
