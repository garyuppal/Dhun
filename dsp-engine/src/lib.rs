use wasm_bindgen::prelude::*;
mod oscillator;
use oscillator::SineOscillator as InternalOsc;

#[wasm_bindgen]
pub struct SineOscillator {
    inner: InternalOsc,
}

#[wasm_bindgen]
impl SineOscillator {
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32, frequency: f32) -> SineOscillator {
        SineOscillator {
            inner: InternalOsc::new(sample_rate, frequency),
        }
    }

    #[wasm_bindgen]
    pub fn next_sample(&mut self) -> f32 {
        self.inner.next_sample()
    }
}
