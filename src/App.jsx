import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Play, Pause, Heart, Sparkles } from 'lucide-react';

const memories = [
  {
    chapter: 'Chapter 01', title: 'The Day Everything Began',
    date: '24 July 2024', place: 'Porawagala, Bandarawela',
    image: '/images/photo1.jpg',
    story: 'Every beautiful love story has a beginning, and ours started on a quiet day in Porawagala. We had only just met, but talking to you felt so natural. That day, for the very first time, I held your hand. It was a small moment, yet it became one of the biggest memories of my life.',
    quote: 'The first photo, the first hand I held, the first page of our forever.'
  },
  {
    chapter: 'Chapter 02', title: 'The First Photo from My First Phone',
    date: '31 December 2024', place: 'Porawagala, Bandarawela',
    image: '/images/photo2.png',
    story: 'As the year was ending, life gave me another unforgettable memory. This was the very first picture we took together using my first phone. The best memories are never about expensive things; they are about having the right person beside you.',
    quote: 'My first phone captured our smile, but my heart captured you forever.'
  },
  {
    chapter: 'Chapter 03', title: 'Before a New Journey',
    date: '25 April 2025', place: 'Narangala View Point',
    image: '/images/photo3.png',
    story: "Before your university journey began, we shared one more beautiful adventure. We visited your friend's home near Narangala and found a breathtaking viewpoint. The view was lovely, but standing beside you made the moment unforgettable.",
    quote: 'Beautiful places become unforgettable when I am there with you.'
  },
  {
    chapter: 'Chapter 04', title: 'Holding On, No Matter What',
    date: '25 September 2025', place: 'Bomburu Ella',
    image: '/images/photo4.png',
    story: 'The water was rising, the path was slippery, and every step had to be taken carefully. It was frightening, but we looked after each other and found our way back safely. That day reminded me that difficult roads feel possible when we face them together.',
    quote: 'Life is not about avoiding the storms; it is about walking through them together.'
  },
  {
    chapter: 'Chapter 05', title: 'The Beauty We Almost Missed',
    date: '02 November 2025', place: 'Pattipola',
    image: '/images/photo5.png',
    story: 'We travelled a long way searching for a viewpoint and thought we had missed it. The road, the weather, and the time together were already beautiful. On the way back, near Pattipola Railway Station, we discovered the view had been beside us all along. The journey itself became the real memory.',
    quote: 'The view was beautiful, but you were always the best part of the journey.'
  },
  {
    chapter: 'Chapter 06', title: 'The Future We Dreamed Of',
    date: 'A day we dreamed together', place: 'Our Favourite View',
    image: '/images/photo6.png',
    story: 'We stood together looking beyond the mountains and spoke about the future. You shared your Management degree dreams, and I shared my Software Engineering goals. We talked about careers, the business we hope to build, and the life we want to create side by side.',
    quote: 'Every future I imagine has you in it.'
  },
  {
    chapter: 'Chapter 07', title: 'The Journey I Will Never Forget',
    date: '23 April 2026', place: 'Sri Pada',
    image: '/images/photo7.png',
    story: 'This was our first two-day trip together. Heavy rain, thunder, freezing cold, and a difficult climb tested us, but we kept moving and cared for each other every step of the way. Reaching the top showed me that together, we can face anything.',
    quote: 'The mountain was high, the rain was heavy, but nothing was stronger than us.'
  },
  {
    chapter: 'Chapter 08', title: 'One Last Trip Before Campus Life',
    date: '27 June 2026', place: 'Idalgashinna',
    image: '/images/photo8.png',
    story: 'Before campus life became busy again, we took one last trip together. Every earlier adventure had been on the bike, but this time we travelled by train. Watching the hills, laughing over little things, and enjoying the journey gave us a completely new and beautiful experience.',
    quote: 'Every journey with you becomes a memory I will treasure forever.'
  }
];

const lastLines = [
  'If I had another life...',
  'I would still look for you...',
  'I would still choose you...',
  'Again...',
  'And again...',
  'Happy Birthday, My Forever Person. ❤️'
];

function Stars() {
  const stars = useMemo(() => Array.from({ length: 45 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    delay: `${(i % 9) * 0.45}s`,
    size: `${2 + (i % 3)}px`,
  })), []);
  return <div className="stars">{stars.map((s, i) => <span key={i} style={{left:s.left,top:s.top,animationDelay:s.delay,width:s.size,height:s.size}} />)}</div>;
}

function Petals() {
  return <div className="petals">{Array.from({length:18}).map((_,i)=><span key={i} style={{
    left:`${(i*17)%100}%`, animationDelay:`${(i%8)*.9}s`, animationDuration:`${8+(i%6)}s`
  }}>{i%2?'🌸':'💗'}</span>)}</div>;
}

function Intro({ onStart }) {
  return (
    <motion.div className="intro" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:1.1}}>
      <Stars />
      <div className="intro-shade" />
      <motion.div className="intro-content" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}}>
        <span className="eyebrow">A Birthday Story Made With Love</span>
        <motion.h1 initial={{letterSpacing:'0.2em',opacity:0}} animate={{letterSpacing:'0em',opacity:1}} transition={{delay:.25,duration:1.2}}>
          For My<br/>Sudu Nona
        </motion.h1>
        <p>Every love story is beautiful, but ours will always be my favourite.</p>
        <button className="primary-btn" onClick={onStart}><Sparkles size={18}/> Begin Our Journey</button>
      </motion.div>
    </motion.div>
  );
}

function MemoryCard({ memory, index, onOpen }) {
  return (
    <motion.article
      className={`memory-card ${index%2?'reverse':''}`}
      initial={{opacity:0,y:80}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.18}}
      transition={{duration:.85,ease:'easeOut'}}
    >
      <motion.button className="photo-button" onClick={()=>onOpen(memory)} whileHover={{scale:1.02,rotate:index%2?.5:-.5}}>
        <img src={memory.image} alt={memory.title} />
        <span className="photo-vignette"/>
        <span className="tap-hint">Tap to open</span>
      </motion.button>
      <div className="memory-copy">
        <span className="chapter">{memory.chapter}</span>
        <h2>{memory.title}</h2>
        <p className="meta">{memory.date} • {memory.place}</p>
        <p className="story">{memory.story}</p>
        <blockquote>“{memory.quote}”</blockquote>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [started,setStarted]=useState(false);
  const [playing,setPlaying]=useState(false);
  const [muted,setMuted]=useState(false);
  const [volume,setVolume]=useState(.75);
  const [activePhoto,setActivePhoto]=useState(null);
  const [openHeart,setOpenHeart]=useState(false);
  const [lineIndex,setLineIndex]=useState(0);
  const audioRef=useRef(null);
  const {scrollYProgress}=useScroll();
  const progressWidth=useTransform(scrollYProgress,[0,1],['0%','100%']);

  useEffect(()=>{
    if(!started || !audioRef.current) return;
    audioRef.current.volume=volume;
    audioRef.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));
  },[started]);

  useEffect(()=>{ if(audioRef.current) audioRef.current.volume=volume; },[volume]);
  useEffect(()=>{ if(audioRef.current) audioRef.current.muted=muted; },[muted]);

  useEffect(()=>{
    if(!openHeart) return;
    if(lineIndex>=lastLines.length-1) return;
    const t=setTimeout(()=>setLineIndex(v=>v+1),2200);
    return ()=>clearTimeout(t);
  },[openHeart,lineIndex]);

  const start=()=>setStarted(true);
  const togglePlay=async()=>{
    const a=audioRef.current; if(!a) return;
    if(a.paused){ await a.play().catch(()=>{}); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  };
  const showHeart=()=>{
    setOpenHeart(true); setLineIndex(0);
    confetti({particleCount:180,spread:110,origin:{y:.65}});
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/birthday-message.mp3" loop preload="auto" />
      <motion.div className="scroll-progress" style={{width:progressWidth}} />
      <AnimatePresence>{!started && <Intro onStart={start}/>}</AnimatePresence>
      {started && <Petals/>}

      <div className="music-panel">
        <button onClick={togglePlay}>{playing?<Pause size={18}/>:<Play size={18}/>}</button>
        <button onClick={()=>setMuted(v=>!v)}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e=>setVolume(Number(e.target.value))}/>
      </div>

      <main>
        <section className="hero">
          <Stars/>
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:started?1:0,y:started?0:40}} transition={{delay:.45,duration:1}}>
            <span className="eyebrow">02 August • Semini Nisansala</span>
            <h1>Happy Birthday,<br/>My Love</h1>
            <p>Today is the birthday of the girl who turned simple moments into my most precious memories.</p>
            <a href="#story" className="scroll-link">Scroll through our story ↓</a>
          </motion.div>
        </section>

        <section id="story" className="timeline-wrap">
          <aside className="story-rail">
            {memories.map((m,i)=><a href={`#memory-${i}`} key={m.title}>{String(i+1).padStart(2,'0')}</a>)}
          </aside>
          <div className="timeline">
            {memories.map((m,i)=><div id={`memory-${i}`} key={m.title}><MemoryCard memory={m} index={i} onOpen={setActivePhoto}/></div>)}
          </div>
        </section>

        <section className="dreams">
          <motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="dream-card">
            <span className="eyebrow">Our Dreams</span>
            <h2>Different paths. One destination.</h2>
            <div className="dream-grid">
              <div><h3>Her Dream</h3><p>Complete her Management degree and achieve everything she dreams of.</p></div>
              <div><h3>My Dream</h3><p>Build a strong career in Software Engineering and create meaningful things.</p></div>
              <div><h3>Our Dream</h3><p>Build a beautiful life, a successful business, and a future full of love and laughter.</p></div>
            </div>
          </motion.div>
        </section>

        <section className="final-section">
          <div className="final-overlay"/>
          <motion.div className="letter-card" initial={{opacity:0,y:70}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}}>
            <span className="eyebrow">The Final Chapter</span>
            <h2>Happy Birthday,<br/>Sudu Nona ❤️</h2>
            <h3>A Letter to My Love</h3>
            <div className="letter-copy">
              <p>My Dearest Sudu Nona,</p>
              <p>Happy Birthday to the most beautiful person who has ever walked into my life. Today is not just another day. It is the day the person who changed my world was born.</p>
              <p>Looking back at every chapter of our story, I realise that none of those memories became special only because of the places we visited. They became unforgettable because you were there.</p>
              <p>From the first day I held your hand, to our first photo, the mountains we climbed, the rain we faced, the journeys we shared, and the future we dreamed about—every moment has become a part of me.</p>
              <p>Thank you for believing in me, standing beside me, and making ordinary days feel extraordinary. Life may not always be easy, but today I want to make you one promise: no matter what happens, I will never stop choosing you.</p>
              <p>I want to celebrate your smiles, support your dreams, comfort you on difficult days, and remind you how deeply you are loved. Every tomorrow I dream about has you in it.</p>
            </div>
            <p className="signature">Forever and Always,<br/><strong>Yours, Nipuna ❤️</strong></p>
            <button className="primary-btn" onClick={showHeart}><Heart size={18}/> Open My Heart</button>
          </motion.div>
        </section>
      </main>

      <footer>Made with all my love for Semini Nisansala — My Sudu Nona ❤️</footer>

      <AnimatePresence>
        {activePhoto && (
          <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActivePhoto(null)}>
            <motion.img src={activePhoto.image} alt={activePhoto.title} initial={{scale:.9}} animate={{scale:1}} exit={{scale:.9}} />
            <div className="lightbox-caption"><h3>{activePhoto.title}</h3><p>{activePhoto.date} • {activePhoto.place}</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openHeart && (
          <motion.div className="heart-scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <Stars/>
            <motion.img src="/images/photo9.png" alt="Our final memory" initial={{scale:1.15,opacity:.2}} animate={{scale:1,opacity:.5}} transition={{duration:4}}/>
            <div className="heart-shade"/>
            <AnimatePresence mode="wait">
              <motion.h2 key={lineIndex} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.8}}>
                {lastLines[lineIndex]}
              </motion.h2>
            </AnimatePresence>
            <button className="close-heart" onClick={()=>setOpenHeart(false)}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
