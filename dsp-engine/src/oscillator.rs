use std::f32::consts::PI;

#[derive(Debug)]
pub struct SineOscillator {
    phase: f32,
    frequency: f32,
    sample_rate: f32,
}

impl SineOscillator {
    pub fn new(sample_rate: f32, frequency: f32) -> Self {
        SineOscillator {
            phase: 0.0,
            frequency,
            sample_rate,
        }
    }

    pub fn next_sample(&mut self) -> f32 {
        let sample = (2.0 * PI * self.phase).sin();
        self.phase += self.frequency / self.sample_rate;
        if self.phase >= 1.0 {
            self.phase -= 1.0;
        }
        sample
    }

    pub fn set_frequency(&mut self, frequency: f32) {
        self.frequency = frequency;
    }    
}
