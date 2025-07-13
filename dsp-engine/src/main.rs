mod oscillator;
use oscillator::SineOscillator;

fn main() {
    let sample_rate = 44100.0;
    let frequency = 440.0; // A4
    let mut osc = SineOscillator::new(sample_rate, frequency);

    println!("First 100 samples of a 440Hz sine wave:");
    for i in 0..100 {
        let sample = osc.next_sample();
        println!("{:3}: {:.5}", i, sample);
    }
}
