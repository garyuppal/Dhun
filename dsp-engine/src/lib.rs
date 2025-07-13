use wasm_bindgen::prelude::*;
use std::f32::consts::PI;

#[wasm_bindgen]
pub struct SineOscillator {
    phase: f32,
    frequency: f32,
    sample_rate: f32,
}

#[wasm_bindgen]
impl SineOscillator {
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32, frequency: f32) -> SineOscillator {
        SineOscillator {
            phase: 0.0,
            frequency,
            sample_rate,
        }
    }

    #[wasm_bindgen]
    pub fn next_sample(&mut self) -> f32 {
        let sample = (2.0 * PI * self.phase).sin();
        self.phase += self.frequency / self.sample_rate;
        if self.phase >= 1.0 {
            self.phase -= 1.0;
        }
        sample
    }
}
