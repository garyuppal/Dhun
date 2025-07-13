// import { createSignal } from "solid-js";
import init, { SineOscillator } from "../public/pkg/dsp_engine";


function App() {
  // const playMiddleC = () => {
  //   const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  //   const oscillator = audioCtx.createOscillator();
  //   oscillator.type = "sine";
  //   oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime); // Middle C
  //   oscillator.connect(audioCtx.destination);
  //   oscillator.start();
  //   oscillator.stop(audioCtx.currentTime + 1); // 1 second
  // };
  
  const playMiddleC = async () => {
    await init(); // Load the Wasm module

    const audioCtx = new AudioContext();
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    const osc = new SineOscillator(audioCtx.sampleRate, 261.63);

    for (let i = 0; i < data.length; i++) {
      data[i] = osc.next_sample();
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
  };

  const playAboveC = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // one above middle C
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1); // 1 second
  };

  // also works as:
  // function playNote(){
  //     const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  //     const oscillator = audioCtx.createOscillator();
  //     oscillator.type = "sine";
  //     oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime); // Middle C
  //     oscillator.connect(audioCtx.destination);
  //     oscillator.start();
  //     oscillator.stop(audioCtx.currentTime + 3); // 1 second
  // };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎵 Web Synth Test</h1>
      <button onClick={playMiddleC}>Play Middle C Note</button>
      <button onClick={playAboveC}>Play Above C Note</button>
    </div>
  );
}

export default App;

// import { createSignal } from 'solid-js'
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = createSignal(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} class="logo" alt="Vite logo" />
//         </a>
//         <a href="https://solidjs.com" target="_blank">
//           <img src={solidLogo} class="logo solid" alt="Solid logo" />
//         </a>
//       </div>
//       <h1>Vite + Solid</h1>
//       <div class="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count()}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p class="read-the-docs">
//         Click on the Vite and Solid logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
