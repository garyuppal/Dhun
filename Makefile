# --- CONFIGURABLE VARIABLES ---
RUST_DIR := dsp-engine
FRONTEND_DIR := web
WASM_OUTPUT_DIR := $(FRONTEND_DIR)/public/pkg

# --- TARGETS ---

.PHONY: wasm dev build clean start

# Build Rust → WebAssembly using wasm-pack
wasm:
	cd $(RUST_DIR) && \
	wasm-pack build --target web --out-dir ../$(WASM_OUTPUT_DIR)
	@echo "✅ WebAssembly build complete."

# Run frontend dev server
dev:
	cd $(FRONTEND_DIR) && \
	npm run dev

start: wasm dev

# Build frontend production bundle (optional)
build:
	cd $(FRONTEND_DIR) && \
	npm run build

# Clean Rust + frontend outputs (optional)
clean:
	cd $(RUST_DIR) && cargo clean
	rm -rf $(WASM_OUTPUT_DIR)
	cd $(FRONTEND_DIR) && rm -rf dist
	@echo "🧹 Cleaned build outputs."
