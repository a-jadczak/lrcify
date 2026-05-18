# 🎵 Lrcify 📝

<p align="center">
  <strong>An AI-powered desktop application for offline audio transcription and synchronized LRC lyric generation.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Whisper--powered-blueviolet?style=for-the-badge" alt="AI Powered">
  <img src="https://img.shields.io/badge/Platform-Desktop-blue?style=for-the-badge" alt="Platform Desktop">
  <img src="https://img.shields.io/badge/Privacy-Local--First-success?style=for-the-badge" alt="Local First">
</p>

---

## 🚀 Project Overview

**Lrcify** is a powerful step-by-step desktop application designed to automatically detect, transcribe, and extract lyrics from audio files using cutting-edge AI models, outputting them into `.lrc` format files.

Built with a **local-first architecture**, Lrcify allows users to easily browse and download various AI models directly within the app. Once a model is downloaded, all audio processing and AI inference are executed **entirely offline** on your local machine. Your data never leaves your computer.

---

## ✨ Key Features

- **🚶‍♂️ Intuitive Stepper Workflow:** A structured, step-by-step UI (Wizard-style interface) that seamlessly guides the user through model selection, hardware configuration, and audio processing.
- **🤖 Smart AI Transcription:** Powered by the state-of-the-art **Faster-Whisper** implementation, delivering lightning-fast and accurate speech-to-text conversion.
- **🖱️ Drag-and-Drop File Uploader:** Drop your audio files directly into the application window to start the process instantly.
- **📂 Flexible Output Management:** Fully customizable output paths for the generated `.lrc` files:
  - Save them together with the original source audio in selected directory.
  - Export them to a dedicated, custom-defined output folder.
- **📦 Integrated Model Manager:** Easily fetch and download models from the official [Systran Faster-Whisper Collection on Hugging Face](https://huggingface.co/collections/Systran/faster-whisper) with real-time progress tracking powered by **WebSockets**.
- **🔒 Local-First Inference:** After the initial model download, the core AI transcription works completely offline.
- **🎛️ Highly Customizable Inference:** Adjust the processing settings to perfectly match your hardware and needs:
  - **Hardware Acceleration:** Toggle seamlessly between `CPU` and `CUDA` (NVIDIA GPU support required) for lightning-fast performance.
  - **Beam Size:** Fine-tune the trade-off between transcription accuracy and processing speed.
  - **Language Selection:** Force a specific language or let the AI auto-detect it.
- **⚡ Real-Time Progress Stream:** Watch the transcription happen live! Powered by **WebSockets**, the app provides a real-time preview of the current transcription progress directly in the UI.

---

## 🛠️ Tech Stack

### Frontend (Desktop Shell & UI)

- **Electron**
- **React & TypeScript**
- **Material UI (MUI)**
- **Stepper (Wizard) workflow**

### Backend (AI Inference Engine)

- **Python:**
- **FastAPI:**
- **Faster-Whisper:**

### 🔌 Communication Protocols

To ensure seamless, real-time data flow between the Electron frontend and the Python backend, the app implements two communication layers:

1. **REST API:** Handles standard, request-response actions such as changing configuration settings, setting output paths, and initiating tasks.
2. **WebSockets:** Used to stream live updates directly to the UI without freezing the app.
   - **Model Downloads:** Real-time progress percentage when fetching models from Hugging Face.
   - **Audio Transcription:** Live text stream with timestamps as the AI processes the audio (e.g., `[00:23.42] Lyric...`).

---

## ⚙️ Installation & Setup

To run Lrcify locally for development, you need to set up both the Frontend (Electron/React) and the Backend (Python/FastAPI).

### 1. Clone the Repository

```bash
git clone https://github.com/a-jadczak/lrcify.git
cd lrcify
```

### 2. Backend Setup (Python + FastAPI)

```bash
cd python

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required Python packages
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app
```

### 3. Frontend Setup (Electron + React)

```bash
# Install Node.js dependencies
npm install

# Run the Electron application
npm run dev
```
