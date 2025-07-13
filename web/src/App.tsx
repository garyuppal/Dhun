import { createSignal, onMount, onCleanup } from "solid-js";
import init, { SineOscillator } from "../public/pkg/dsp_engine";

function App() {
  const [frequency, setFrequency] = createSignal(440);
  let audioCtx: AudioContext;
  let processor: ScriptProcessorNode;
  let oscillator: SineOscillator;

  onMount(async () => {
    await init(); // initialize the wasm module

    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    oscillator = new SineOscillator(audioCtx.sampleRate, frequency());

    processor = audioCtx.createScriptProcessor(512, 0, 1); // buffer size: 512 samples
    processor.onaudioprocess = (event) => {
      const output = event.outputBuffer.getChannelData(0);
      for (let i = 0; i < output.length; i++) {
        output[i] = oscillator.next_sample();
      }
    };

    processor.connect(audioCtx.destination);
  });

  const updateFrequency = (e: Event) => {
    const freq = parseFloat((e.target as HTMLInputElement).value);
    setFrequency(freq);
    oscillator?.set_frequency(freq);
  };

  onCleanup(() => {
    processor?.disconnect();
    audioCtx?.close();
  });

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎵 Continuous Synth</h1>

      <label>
        Frequency: {frequency().toFixed(0)} Hz
        <br />
        <input
          type="range"
          min="100"
          max="1000"
          value={frequency()}
          onInput={updateFrequency}
        />
      </label>
    </div>
  );
}

export default App;

// import { createSignal, onMount, onCleanup } from "solid-js";
// import init, { SineOscillator } from "../public/pkg/dsp_engine";

// function App() {
//   const [frequency, setFrequency] = createSignal(440);
//   let oscillator: SineOscillator | null = null;
//   let audioCtx: AudioContext | null = null;
//   let processor: ScriptProcessorNode | null = null;

//   onMount(async () => {
//     await init();
//     audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
//     oscillator = new SineOscillator(audioCtx.sampleRate, frequency());

//     processor = audioCtx.createScriptProcessor(256, 0, 1);
//     processor.onaudioprocess = (e) => {
//       const output = e.outputBuffer.getChannelData(0);
//       for (let i = 0; i < output.length; i++) {
//         output[i] = oscillator!.next_sample();
//       }
//     };

//     processor.connect(audioCtx.destination);
//   });

//     const playNote = () => {
//     if (!oscillator) return;
//     oscillator.set_frequency(frequency());
//     const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const runtime = 3;
//     const buffer = audioCtx.createBuffer(1, runtime*44100, 44100);
//     const channelData = buffer.getChannelData(0);
//     for (let i = 0; i < runtime*44100; i++) {
//       channelData[i] = oscillator.next_sample();
//     }

//     const source = audioCtx.createBufferSource();
//     source.buffer = buffer;
//     source.connect(audioCtx.destination);
//     source.start();
//   };

//   const updateFrequency = (e: Event) => {
//     const freq = +((e.currentTarget as HTMLInputElement).value);
//     setFrequency(freq);
//     if (oscillator) oscillator.set_frequency(freq);
//   };

//   onCleanup(() => {
//     processor?.disconnect();
//     audioCtx?.close();
//   });

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h1>🎵 Continuous Synth</h1>
//       <label>
//         Frequency: {frequency().toFixed(0)} Hz
//         <br />
//         <input
//           type="range"
//           min="100"
//           max="1000"
//           value={frequency()}
//           onInput={updateFrequency}
//         />
//       </label>
//       <button onClick={playNote}>Play Note</button>

//     </div>
//   );
// }

// export default App;

// // import { createSignal, onMount } from "solid-js";
// // import init, { SineOscillator } from "../public/pkg/dsp_engine";


// // function App() {
// //   const [frequency, setFrequency] = createSignal(440); // default to A4
// //   let oscillator: SineOscillator | null = null;
  
// //   onMount(async () => {
// //     await init(); // load wasm
// //     oscillator = new SineOscillator(44100, frequency());
// //   });

// //   const playNote = () => {
// //     if (!oscillator) return;
// //     oscillator.set_frequency(frequency());
// //     const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
// //     const runtime = 3;
// //     const buffer = audioCtx.createBuffer(1, runtime*44100, 44100);
// //     const channelData = buffer.getChannelData(0);
// //     for (let i = 0; i < runtime*44100; i++) {
// //       channelData[i] = oscillator.next_sample();
// //     }

// //     const source = audioCtx.createBufferSource();
// //     source.buffer = buffer;
// //     source.connect(audioCtx.destination);
// //     source.start();
// //   };

// //   return (
// //     <div style={{ padding: "2rem", textAlign: "center" }}>
// //       <h1>🎵 Web Synth Test</h1>

// //       <label>
// //         Frequency: {frequency().toFixed(0)} Hz
// //         <br />
// //         <input
// //           type="range"
// //           min="100"
// //           max="1000"
// //           value={frequency()}
// //           onInput={(e) => setFrequency(+e.currentTarget.value)}
// //         />
// //       </label>

// //       <br /><br />

// //       <button onClick={playNote}>Play Note</button>
// //     </div>
// //   );
// // }

// // export default App;

// // // import { createSignal } from 'solid-js'
// // // import solidLogo from './assets/solid.svg'
// // // import viteLogo from '/vite.svg'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = createSignal(0)

// // //   return (
// // //     <>
// // //       <div>
// // //         <a href="https://vite.dev" target="_blank">
// // //           <img src={viteLogo} class="logo" alt="Vite logo" />
// // //         </a>
// // //         <a href="https://solidjs.com" target="_blank">
// // //           <img src={solidLogo} class="logo solid" alt="Solid logo" />
// // //         </a>
// // //       </div>
// // //       <h1>Vite + Solid</h1>
// // //       <div class="card">
// // //         <button onClick={() => setCount((count) => count + 1)}>
// // //           count is {count()}
// // //         </button>
// // //         <p>
// // //           Edit <code>src/App.tsx</code> and save to test HMR
// // //         </p>
// // //       </div>
// // //       <p class="read-the-docs">
// // //         Click on the Vite and Solid logos to learn more
// // //       </p>
// // //     </>
// // //   )
// // // }

// // // export default App
