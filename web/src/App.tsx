import { createSignal } from "solid-js";

function App() {
  const playMiddleC = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime); // Middle C
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1); // 1 second
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
