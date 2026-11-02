import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Projection } from '@plural/client';
import { TopBar } from '../../Plural/web/src/components/TopBar';
import { Feed } from '../../Plural/web/src/components/feed/Feed';
import { Composer } from '../../Plural/web/src/components/Composer';
import { Canvas } from '../../Plural/web/src/components/Canvas';
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

function ExampleSite({stage}) {
  return <div className="example-site">
    <nav><b><span className="example-symbol">◈</span> orbit</b><span>Workspace</span><i>AC</i></nav>
    <div className="example-body"><div className="example-heading"><small>Your workspace, at a glance</small><h1>Good morning, Alia <span>✳</span></h1><p>Here’s what your team is building this week.</p></div>
      <div className="example-stats"><div><span>Active projects</span><b>12 <small>+2 this week</small></b></div><div><span>Tasks completed</span><b>38 <small>↑ 18%</small></b></div><div><span>Team members</span><b>8 <small>All connected</small></b></div></div>
      <div className={`example-section ${stage>=1?'example-visible':''}`}><header><h2>Active projects</h2><span>View all ↗</span></header><div className="example-project"><i>↗</i><div><b>Website refresh</b><span>Design & development</span></div><em>In progress</em></div><div className="example-progress"><span/></div><div className="example-project"><i>◉</i><div><b>Mobile onboarding</b><span>Product experience</span></div><em className="example-review">In review</em></div></div>
      <div className={`example-section ${stage>=2?'example-visible':''}`}><header><h2>Recent activity</h2><span>This week</span></header><div className="example-update"><i>B</i><p><b>Bek</b> updated the API documentation<small>12 minutes ago · Website refresh</small></p><span>✓</span></div><div className="example-update"><i>C</i><p><b>Cleo</b> completed the design review<small>28 minutes ago · Mobile onboarding</small></p><span>✓</span></div></div>
      <footer><span className="example-status"/>All systems operational<span>Made together.</span></footer>
    </div>
  </div>;
}

function Preview(){
  const [step,setStep] = useState(0), [paused,setPaused] = useState(false);
  useEffect(()=>{const receive=e=>{if(e.origin===location.origin && e.data?.type==='plural-preview-pause')setPaused(e.data.paused);};addEventListener('message',receive);return()=>removeEventListener('message',receive);},[]);
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setStep(2);return;}if(paused)return;const timer=setInterval(()=>setStep(n=>(n+1)%4),3200);return()=>clearInterval(timer);},[paused]);
  const visibleItems=items.slice(0,step===0?3:step===1?4:6);
  return <div className={`${room.room} ${room.withCanvas}`} inert>
    <TopBar room="r_01M5W7AC" projection={projection} connection="online" panelOpen={false} onCopyRoom={noop} onTogglePanel={noop} onLeave={noop}/>
    <main className={room.stage}><div className={room.scroller}><div className={room.content}><div className={room.welcome}>You joined room r_01M5W7AC as Vlad, host</div><Feed items={visibleItems} meId="vlad"/></div></div><div className={room.dock}><div className={room.presence}>{step<2?'agent is building the page…':'Bek and Alia are viewing the preview'}</div><Composer role="host" placeholder="Message the agent, / for commands" disabled={null} editing={null} onSubmit={noop} onCancelEdit={noop} onEscape={noop} onActivity={noop}/></div></main>
    <Canvas doc={doc} docs={[doc]} selectors={[]} full={false} onToggleFull={noop} onPick={noop} onClose={noop} site={()=> <ExampleSite stage={step}/>}/>
  </div>;
}
createRoot(document.getElementById('root')).render(<Preview/>);
