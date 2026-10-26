import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {DragDropProvider, useDraggable, useDroppable} from '@dnd-kit/react';
import {Feedback, PointerActivationConstraints, PointerSensor} from '@dnd-kit/dom';
import './style.css';

const crateCuts = [
  ['Feeling Good','Nina Simone','Jazz'],['Money Trees','Kendrick Lamar','Hip-Hop'],['505','Arctic Monkeys','Indie'],['One More Time','Daft Punk','Electronic'],['Superstition','Stevie Wonder','Funk'],['The Less I Know the Better','Tame Impala','Soul'],['Dream On','Aerosmith','Rock'],['Blinding Lights','The Weeknd','Pop'],['No Scrubs','TLC','R&B'],['Three Little Birds','Bob Marley & The Wailers','Reggae'],['Oye Como Va','Santana','Latin'],['Clair de Lune','Claude Debussy','Classical'],['An Ending (Ascent)','Brian Eno','Ambient'],
  ['Take Five','The Dave Brubeck Quartet','Jazz'],['Juicy','The Notorious B.I.G.','Hip-Hop'],['Do I Wanna Know?','Arctic Monkeys','Indie'],['Midnight City','M83','Electronic'],['Get Up (I Feel Like Being a) Sex Machine','James Brown','Funk'],['Ain’t No Mountain High Enough','Marvin Gaye & Tammi Terrell','Soul'],['Bohemian Rhapsody','Queen','Rock'],['Toxic','Britney Spears','Pop'],['Crazy','Gnarls Barkley','R&B'],['Is This Love','Bob Marley & The Wailers','Reggae'],['Bailando','Enrique Iglesias','Latin'],['Moonlight Sonata','Ludwig van Beethoven','Classical'],['Weightless','Marconi Union','Ambient'],
  ['So What','Miles Davis','Jazz'],['Ms. Jackson','Outkast','Hip-Hop'],['Dreams','The Cranberries','Indie'],['Windowlicker','Aphex Twin','Electronic'],['Give Up the Funk','Parliament','Funk'],['Back to Black','Amy Winehouse','Soul'],['Everlong','Foo Fighters','Rock'],['Levitating','Dua Lipa','Pop'],['Redbone','Childish Gambino','R&B'],['Could You Be Loved','Bob Marley & The Wailers','Reggae'],['Despacito','Luis Fonsi','Latin'],['The Four Seasons: Spring','Antonio Vivaldi','Classical'],['Open Eye Signal','Jon Hopkins','Ambient'],
  ['The Thrill Is Gone','B.B. King','Blues'],['I’d Rather Go Blind','Etta James','Blues'],['Pride and Joy','Stevie Ray Vaughan','Blues'],['Cross Road Blues','Robert Johnson','Blues'],['Boom Boom','John Lee Hooker','Blues'],
  ['Jolene','Dolly Parton','Country'],['Ring of Fire','Johnny Cash','Country'],['Take Me Home, Country Roads','John Denver','Country'],['Before He Cheats','Carrie Underwood','Country'],['Tennessee Whiskey','Chris Stapleton','Country'],
  ['Stayin’ Alive','Bee Gees','Disco'],['Le Freak','CHIC','Disco'],['I Will Survive','Gloria Gaynor','Disco'],['September','Earth, Wind & Fire','Disco'],['Don’t Leave Me This Way','Thelma Houston','Disco'],
  ['Show Me Love','Robin S','House'],['Finally','CeCe Peniston','House'],['Your Love','Frankie Knuckles','House'],['Music Sounds Better with You','Stardust','House'],['Lady (Hear Me Tonight)','Modjo','House'],
  ['Strings of Life','Derrick May','Techno'],['The Bells','Jeff Mills','Techno'],['Spastik','Plastikman','Techno'],['Born Slippy (Nuxx)','Underworld','Techno'],['Energy Flash','Joey Beltram','Techno'],
  ['Enter Sandman','Metallica','Metal'],['Paranoid','Black Sabbath','Metal'],['Chop Suey!','System Of A Down','Metal'],['The Trooper','Iron Maiden','Metal'],['Master of Puppets','Metallica','Metal'],
  ['Blitzkrieg Bop','Ramones','Punk'],['London Calling','The Clash','Punk'],['Basket Case','Green Day','Punk'],['Anarchy in the U.K.','Sex Pistols','Punk'],['Holiday','Green Day','Punk'],
  ['Creep','Radiohead','Alternative'],['Seven Nation Army','The White Stripes','Alternative'],['Maps','Yeah Yeah Yeahs','Alternative'],['Float On','Modest Mouse','Alternative'],['Take Me Out','Franz Ferdinand','Alternative'],
  ['Dynamite','BTS','K-Pop'],['How You Like That','BLACKPINK','K-Pop'],['Super Shy','NewJeans','K-Pop'],['Gangnam Style','PSY','K-Pop'],['The Feels','TWICE','K-Pop'],
  ['Essence','Wizkid feat. Tems','Afrobeats'],['Ye','Burna Boy','Afrobeats'],['Calm Down','Rema','Afrobeats'],['Last Last','Burna Boy','Afrobeats'],['Fall','Davido','Afrobeats'],
  ['Gasolina','Daddy Yankee','Reggaeton'],['Tití Me Preguntó','Bad Bunny','Reggaeton'],['DÁKITI','Bad Bunny & Jhay Cortez','Reggaeton'],['Con Altura','ROSALÍA & J Balvin','Reggaeton'],['Pepas','Farruko','Reggaeton'],
  ['Fast Car','Tracy Chapman','Folk'],['Big Yellow Taxi','Joni Mitchell','Folk'],['The Times They Are a-Changin’','Bob Dylan','Folk'],['Homeward Bound','Simon & Garfunkel','Folk'],['If I Had a Boat','Lyle Lovett','Folk'],
  ['When the Sun Hits','Slowdive','Shoegaze'],['Only Shallow','My Bloody Valentine','Shoegaze'],['Alison','Slowdive','Shoegaze'],['Sometimes','My Bloody Valentine','Shoegaze'],['Vapour Trail','Ride','Shoegaze'],
  ['Inner City Life','Goldie','Drum & Bass'],['Brown Paper Bag','Roni Size','Drum & Bass'],['Original Nuttah','UK Apache & Shy FX','Drum & Bass'],['Circles','Adam F','Drum & Bass'],['The Nine','Bad Company UK','Drum & Bass'],
  ['Oh Happy Day','The Edwin Hawkins Singers','Gospel'],['Take My Hand, Precious Lord','Mahalia Jackson','Gospel'],['Amazing Grace','Aretha Franklin','Gospel'],['Soon and Very Soon','Andraé Crouch','Gospel'],['Shackles (Praise You)','Mary Mary','Gospel'],
  ['Glory Box','Portishead','Trip-Hop'],['Teardrop','Massive Attack','Trip-Hop'],['Inertia Creeps','Massive Attack','Trip-Hop'],['Rabbit in Your Headlights','UNKLE feat. Thom Yorke','Trip-Hop'],['Hell Is Round the Corner','Tricky','Trip-Hop'],
  ['Smells Like Teen Spirit','Nirvana','Grunge'],['Black','Pearl Jam','Grunge'],['Man in the Box','Alice In Chains','Grunge'],['Plush','Stone Temple Pilots','Grunge'],['Come as You Are','Nirvana','Grunge'],
  ['Hedwig’s Theme','John Williams','Soundtrack'],['My Heart Will Go On','Céline Dion','Soundtrack'],['Lose Yourself','Eminem','Soundtrack'],['Shallow','Lady Gaga & Bradley Cooper','Soundtrack'],['Time','Hans Zimmer','Soundtrack'],
  ['Pata Pata','Miriam Makeba','World'],['Mas Que Nada','Sérgio Mendes','World'],['Jerusalema','Master KG feat. Nomcebo Zikode','World'],['Bamboléo','Gipsy Kings','World'],['Chan Chan','Buena Vista Social Club','World'],
  ['Landslide','Fleetwood Mac','Singer-Songwriter'],['Both Sides, Now','Joni Mitchell','Singer-Songwriter'],['Vincent','Don McLean','Singer-Songwriter'],['Hallelujah','Jeff Buckley','Singer-Songwriter'],['The A Team','Ed Sheeran','Singer-Songwriter'],
];
const sleeveColors = ['#ff5bcb','#8db7ff','#f3d44d','#c8a1ff','#ff865c','#c9edb4'];
const records = crateCuts.map(([title,artist,genre],index)=>({
  id:title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
  title,artist,genre,glyph:title.toUpperCase(),color:sleeveColors[index%sleeveColors.length],
}));
const genres = ['All','Jazz','Hip-Hop','Indie','Electronic','Funk','Soul','Rock','Pop','R&B','Reggae','Latin','Classical','Ambient','Blues','Country','Disco','House','Techno','Metal','Punk','Alternative','K-Pop','Afrobeats','Reggaeton','Folk','Shoegaze','Drum & Bass','Gospel','Trip-Hop','Grunge','Soundtrack','World','Singer-Songwriter'];
const recordsPerPage = 6;

function DraggableDisc({record}) {
  const {ref,isDragging} = useDraggable({
    id:record.id,
    type:'record',
    plugins:[Feedback.configure({feedback:'clone'})],
  });
  return <span ref={ref} className={`vinyl-disc ${isDragging?'disc-dragging':''}`} style={{'--cover':record.color}} role="button" tabIndex={0} aria-label={`Drag ${record.title} to the turntable`} />;
}

function RecordSleeve({record,index,selected,onSelect,artwork}) {
  return <div className={`record ${selected?'selected':''}`} style={{'--cover':record.color,zIndex:index+1}}>
    <DraggableDisc record={record}/>
    <button type="button" className={`cover-art ${artwork?'has-art':''}`} style={artwork?{backgroundImage:`url("${artwork}")`,backgroundSize:'cover',backgroundPosition:'center'}:undefined} aria-label={`Pull ${record.title} by ${record.artist}, ${record.genre} out of its sleeve`} onClick={onSelect}>
      {!artwork&&<span className="cover-glyph">{record.glyph}</span>}
      <span className="cover-footer"><strong>{record.title}</strong><small>{record.genre} / {record.artist}</small></span>
    </button>
  </div>;
}

function Player({state,actions}) {
  const {ref,isDropTarget} = useDroppable({id:'turntable',accept:'record'});
  return <div className={`player ${state.playing?'live':''}`} aria-label="Record player">
    <div className="player-top"><span>Side B / turntable 01</span><span className="power"><i/><span>{state.deckStatus}</span></span></div>
    <div ref={ref} className={`turntable ${isDropTarget?'drop-ready':''}`} aria-label="Drop a record here to play its preview">
      <div className="plinth"><div className="vinyl" style={{'--disc':state.selected?.color||'#ff5bcb'}}/><div className="tonearm"/></div>
      {isDropTarget&&<span className="drop-callout">drop to play</span>}
    </div>
    <div className="player-info"><div className="track-copy"><span className="genre">{state.selected?.genre||'NO GENRE YET'}</span><h3>{state.trackTitle}</h3><p>{state.artistName}</p></div><div className="controls"><button className="control" onClick={actions.stop} aria-label="Stop and return record" title="Stop / eject">■</button><button className="control primary" onClick={actions.toggle} aria-label={state.playing?'Pause preview':'Play 30 second preview'} title="Play preview" disabled={!state.track}> {state.playing?'Ⅱ':'▶'} </button></div></div>
    <div className="progress-line" aria-label="Preview progress"><span style={{width:`${state.progress}%`}}/></div><div className="time-row"><span>{state.elapsed}</span><span>0:30</span></div>
    <p className="apple-credit">Song previews and album art are provided courtesy of iTunes when available. <a href={state.storeLink} target="_blank" rel="noopener">Explore music on Apple Music ↗</a></p>
  </div>;
}

function App() {
  const audioRef = useRef(null);
  const requestRef = useRef(0);
  const jazzContextRef = useRef(null);
  const jazzTimerRef = useRef(null);
  const [filter,setFilter] = useState('All');
  const [page,setPage] = useState(0);
  const [pageDirection,setPageDirection] = useState('next');
  const [selected,setSelected] = useState(null);
  const [sleeveSelection,setSleeveSelection] = useState(null);
  const [artworkById,setArtworkById] = useState({});
  const artworkRequestedRef = useRef(new Set());
  const [track,setTrack] = useState(null);
  const [deckStatus,setDeckStatus] = useState('waiting for a record');
  const [note,setNote] = useState('Click a sleeve to pull out its record. Drag the record to the turntable to load a preview.');
  const [playing,setPlaying] = useState(false);
  const [progress,setProgress] = useState(0);
  const [elapsed,setElapsed] = useState('0:00');
  const [toast,setToast] = useState('');
  const [storeLink,setStoreLink] = useState('https://www.apple.com/apple-music/');
  const [jazzOn,setJazzOn] = useState(false);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=>setToast(''),2600);
  };

  const pullSleeve = (record) => {
    const next=sleeveSelection?.id===record.id?null:record;
    setSleeveSelection(next);
    setNote(next?`Pulled ${record.title} from its sleeve. Drag the record to the turntable to load it.`:'Record tucked back into its sleeve.');
  };

  const moveCrate = (direction) => {
    setPageDirection(direction);
    setPage(current=>Math.max(0,Math.min(pageCount-1,current+(direction==='next'?1:-1))));
  };

  const toggleJazz = async () => {
    if (jazzOn) {
      clearInterval(jazzTimerRef.current);
      jazzTimerRef.current=null;
      jazzContextRef.current?.close();
      jazzContextRef.current=null;
      setJazzOn(false);
      return;
    }
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if (!AudioContextClass) {showToast('Ambient audio is not available in this browser');return;}
    const context=new AudioContextClass();
    await context.resume();
    const master=context.createGain();
    master.gain.value=.42;
    master.connect(context.destination);
    jazzContextRef.current=context;
    const progression=[
      {bass:65.41,chord:[261.63,329.63,392,493.88,587.33]},
      {bass:55,chord:[220,261.63,329.63,392,493.88]},
      {bass:73.42,chord:[293.66,349.23,440,523.25,659.25]},
      {bass:49,chord:[246.94,293.66,369.99,440,587.33]},
    ];
    let bar=0;
    const note=(frequency,start,duration,volume,wave='sine')=>{
      const oscillator=context.createOscillator();
      const envelope=context.createGain();
      oscillator.type=wave;
      oscillator.frequency.setValueAtTime(frequency,start);
      envelope.gain.setValueAtTime(.0001,start);
      envelope.gain.exponentialRampToValueAtTime(volume,start+.34);
      envelope.gain.setValueAtTime(volume*.66,start+duration*.58);
      envelope.gain.exponentialRampToValueAtTime(.0001,start+duration);
      oscillator.connect(envelope);envelope.connect(master);
      oscillator.start(start);oscillator.stop(start+duration+.04);
    };
    const playBar=()=>{
      const phrase=progression[bar%progression.length];
      const start=context.currentTime+.06;
      note(phrase.bass,start,3.55,.038,'triangle');
      phrase.chord.forEach((frequency,index)=>note(frequency,start+index*.075,3.5,.013));
      note(phrase.chord[3]*2,start+1.72,.78,.004);
      note(phrase.chord[2]*2,start+2.92,.64,.003);
      bar++;
    };
    playBar();
    jazzTimerRef.current=window.setInterval(playBar,3900);
    setJazzOn(true);
  };

  const loadRecord = async (record,{autoplay=true}={}) => {
    const request = ++requestRef.current;
    setSelected(record); setTrack(null); setPlaying(false); setProgress(0); setElapsed('0:00');
    setDeckStatus('finding the groove…');
    setNote(`Loading ${record.title} by ${record.artist} from the music catalog…`);
    const audio = audioRef.current;
    audio.pause(); audio.removeAttribute('src'); audio.load();
    try {
      const term = encodeURIComponent(`${record.title} ${record.artist}`);
      const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=10&country=IN`);
      if (!response.ok) throw new Error('catalog request failed');
      const data = await response.json();
      const match = (data.results||[]).find(item=>item.previewUrl&&item.trackName.toLowerCase().includes(record.title.toLowerCase().slice(0,Math.min(6,record.title.length)))) || (data.results||[]).find(item=>item.previewUrl);
      if (request!==requestRef.current) return;
      if (!match) throw new Error('no preview found');
      if (match.artworkUrl100) setArtworkById(current=>({...current,[record.id]:match.artworkUrl100.replace('100x100bb','300x300bb')}));
      setTrack(match); setStoreLink(match.trackViewUrl||match.collectionViewUrl||'https://www.apple.com/apple-music/');
      audio.src = match.previewUrl; audio.load();
      setDeckStatus('record on deck');
      setNote(autoplay?'Record loaded. Use the controls to play or pause the 30-second preview. The track links to Apple Music.':'Record loaded. Press play on the turntable when you’re ready to hear the 30-second preview.');
      showToast(autoplay?'Record on the deck — enjoy the spin':'Record loaded — press play when ready');
      if (autoplay) audio.play().then(()=>setPlaying(true)).catch(()=>setNote('Record loaded. Your browser blocked autoplay, so press play to start the 30-second preview.'));
    } catch {
      if (request!==requestRef.current) return;
      setDeckStatus('no preview found');
      setNote('That preview could not load right now. Try another sleeve, or open Apple Music.');
      showToast('Couldn’t find a preview for this record');
    }
  };

  const stop = () => {
    requestRef.current++;
    const audio = audioRef.current;
    audio.pause(); audio.currentTime=0; audio.removeAttribute('src'); audio.load();
    setSelected(null); setTrack(null); setPlaying(false); setProgress(0); setElapsed('0:00');
    setSleeveSelection(null);
    setDeckStatus('waiting for a record');
    setNote('Click a sleeve to pull out its record. Drag the record to the turntable to load a preview.');
    setStoreLink('https://www.apple.com/apple-music/');
    showToast('Record returned to the crate');
  };

  const toggle = () => {
    const audio=audioRef.current;
    if (!track) return;
    if (audio.paused) {
      if (audio.currentTime>=30) audio.currentTime=0;
      audio.play().then(()=>setPlaying(true)).catch(()=>setNote('Your browser blocked playback. Press play again to start the preview.'));
    } else {audio.pause();setPlaying(false);setDeckStatus('paused');}
  };

  useEffect(()=>{
    const audio=audioRef.current;
    const tick=()=>{
      const seconds=Math.min(audio.currentTime,30);
      setProgress(seconds/30*100); setElapsed(`0:${String(Math.floor(seconds)).padStart(2,'0')}`);
      if (seconds>=30) {audio.pause();audio.currentTime=30;setPlaying(false);setDeckStatus('preview finished');}
    };
    const ended=()=>{setPlaying(false);setDeckStatus('preview finished');};
    const failed=()=>{if(track){setPlaying(false);setDeckStatus('preview unavailable');setNote('The preview link is unavailable. Try another record.');}};
    audio.addEventListener('timeupdate',tick);audio.addEventListener('ended',ended);audio.addEventListener('error',failed);
    return ()=>{audio.removeEventListener('timeupdate',tick);audio.removeEventListener('ended',ended);audio.removeEventListener('error',failed);clearTimeout(toastTimer.current);};
  },[track]);

  useEffect(()=>{
    let cancelled=false;
    const pageCuts=records.filter(record=>filter==='All'||record.genre===filter).slice(page*recordsPerPage,(page+1)*recordsPerPage);
    const pending=pageCuts.filter(record=>!artworkById[record.id]&&!artworkRequestedRef.current.has(record.id));
    pending.forEach(record=>artworkRequestedRef.current.add(record.id));
    Promise.all(pending.map(async record=>{
      try {
        const term=encodeURIComponent(`${record.title} ${record.artist}`);
        const response=await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=10&country=IN`);
        if (!response.ok) return null;
        const data=await response.json();
        const match=(data.results||[]).find(item=>item.trackName?.toLowerCase().includes(record.title.toLowerCase().slice(0,Math.min(6,record.title.length)))) || (data.results||[])[0];
        return match?.artworkUrl100?[record.id,match.artworkUrl100.replace('100x100bb','300x300bb')]:null;
      } catch {return null;}
    })).then(entries=>{
      const found=entries.filter(Boolean);
      if (!cancelled&&found.length) setArtworkById(current=>({...current,...Object.fromEntries(found)}));
    });
    return ()=>{cancelled=true;};
  },[filter,page,artworkById]);

  useEffect(()=>()=>{
    clearInterval(jazzTimerRef.current);
    jazzContextRef.current?.close();
  },[]);

  const onDragStart = ({operation}) => {
    const record=records.find(item=>item.id===operation.source.id);
    if (record) {setSleeveSelection(record);setNote(`Record lifted: ${record.title}. Drop it on the turntable to load its preview.`);}
  };
  const onDragEnd = ({operation}) => {
    const record=records.find(item=>item.id===operation.source.id);
    if (operation.target?.id==='turntable' && record) loadRecord(record);
  };
  const filteredRecords=records.filter(record=>filter==='All'||record.genre===filter);
  const pageCount=Math.max(1,Math.ceil(filteredRecords.length/recordsPerPage));
  const visibleRecords=filteredRecords.slice(page*recordsPerPage,(page+1)*recordsPerPage);
  const rangeStart=filteredRecords.length?page*recordsPerPage+1:0;
  const rangeEnd=Math.min((page+1)*recordsPerPage,filteredRecords.length);

  return <DragDropProvider sensors={defaults=>[
    ...defaults.filter(sensor=>sensor!==PointerSensor),
    PointerSensor.configure({activationConstraints:event=>event.pointerType==='touch'
      ? [new PointerActivationConstraints.Delay({value:250,tolerance:5})]
      : [new PointerActivationConstraints.Distance({value:5})]}),
  ]} onDragStart={onDragStart} onDragEnd={onDragEnd}>
    <header className="topbar"><a className="brand" href="#top" aria-label="Side B home">SIDE<span>B</span></a><div className="top-right"><span className="status"><i className="dot"/> crate open / 24-7</span><button type="button" className={`ambient-toggle ${jazzOn?'is-on':''}`} onClick={toggleJazz} aria-pressed={jazzOn}>♫ {jazzOn?'ambient jazz on':'play soft jazz'}</button><a href="#dig">start digging ↘</a><span>vol. 001</span></div></header>
    <main id="top">
      <section className="hero" aria-labelledby="title"><div className="hero-kicker">a little less scrolling, a little more listening</div><h1 id="title">Find your<br/><span className="outline">side B.</span></h1><div className="hero-bottom"><p>Good music is hiding everywhere. <strong>Dig through the crate</strong>, pull a record, and give something new a spin.</p><span className="scribble">NO SKIP BUTTON<br/>FOR GOOD TASTE ↗</span></div></section>
      <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>Dig deep <b>✳</b> Follow the groove <b>✳</b> Find your side B <b>✳</b> One more spin <b>✳</b> Dig deep <b>✳</b> Follow the groove <b>✳</b> Find your side B <b>✳</b> One more spin <b>✳</b></span><span>Dig deep <b>✳</b> Follow the groove <b>✳</b> Find your side B <b>✳</b> One more spin <b>✳</b> Dig deep <b>✳</b> Follow the groove <b>✳</b> Find your side B <b>✳</b> One more spin <b>✳</b></span></div></div>
      <section className="studio" id="dig" aria-label="Record crate and turntable">
        <div className="crate-column"><div className="section-head"><h2>01 / Pick a record</h2><small>{filteredRecords.length} cuts · {genres.length-1} genres</small></div>
          <div className="filters" aria-label="Filter by genre">{genres.map(genre=><button key={genre} className={`filter ${filter===genre?'active':''}`} onClick={()=>{setFilter(genre);setPage(0);}}>{genre==='All'?'All sounds':genre}</button>)}</div>
          <div className="crate-wrap"><div className="crate" aria-label="A crate of records. Click a sleeve to pull out its record, then drag it to the turntable."><span className="crate-label">Pull box / {String(page+1).padStart(2,'0')}</span><div key={page} className={`records ${pageDirection==='next'?'box-slide-next':'box-slide-previous'}`}>{visibleRecords.map((record,index)=><RecordSleeve key={record.id} record={record} index={index} artwork={artworkById[record.id]} selected={sleeveSelection?.id===record.id} onSelect={()=>pullSleeve(record)}/>)}</div><span className="crate-hint">click a sleeve to pull / drag its record to the deck</span></div></div>
          {pageCount>1&&<div className="crate-pager" aria-label="Browse crate boxes"><button type="button" onClick={()=>moveCrate('previous')} disabled={page===0}>← previous box</button><span aria-live="polite">BOX {String(page+1).padStart(2,'0')} / {String(pageCount).padStart(2,'0')}<small>{rangeStart}–{rangeEnd} of {filteredRecords.length}</small></span><button type="button" onClick={()=>moveCrate('next')} disabled={page>=pageCount-1}>next box →</button></div>}
          <div className="crate-caption"><span>Record store rules apply</span><span>Handle with care ☺</span></div>
        </div>
        <div className="right-col"><div className="section-head"><h2>02 / Give it a spin</h2><small>30 sec preview</small></div><Player state={{selected,track,playing,progress,elapsed,deckStatus,storeLink,trackTitle:track?.trackName||selected?.title||'The deck is yours.',artistName:track?.artistName||selected?.artist||'Pick a sleeve from the crate'}} actions={{stop,toggle}}/><p className="note" aria-live="polite">{note}</p></div>
      </section>
    </main>
    <footer className="bottom"><strong>SIDE B™</strong><span>For the love of the deep cut.<br/>Built for curious ears.</span><a href="#top">Back to the top ↑</a></footer>
    <div className={`toast ${toast?'show':''}`} role="status" aria-live="polite">{toast}</div>
    <audio ref={audioRef} preload="none"/>
  </DragDropProvider>;
}

createRoot(document.getElementById('root')).render(<App/>);
