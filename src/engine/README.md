# VideoMorph Engine — Architecture & Developer Documentation

## Overview

**VideoMorph Engine** is the unified, modular, open-source media processing core powering all current and future media tools across the VideoMorph platform.

Rather than implementing independent FFmpeg conversion routines inside individual UI tools, VideoMorph operates on a **Single Engine — Many Tools** paradigm. Every platform feature (Video Converter, Audio Converter, Video Compressor, Audio Compressor, Video Trimmer, Audio Trimmer, Merge Videos, Extract Audio, Video to GIF, GIF to Video, Resize Video, Rotate Video, Change Frame Rate) invokes the same core engine pipeline.

---

## Architecture Directory Structure

```text
src/engine/
├── index.ts                      # Central VideoMorphEngine facade & singleton
├── README.md                     # Technical architecture documentation
│
├── commandBuilder/
│   └── ffmpegCommandBuilder.ts   # Central FFmpeg CLI command generator
│
├── decisionEngine/
│   └── smartDecisionEngine.ts    # Analyzes media codecs & decides Stream Copy vs Re-encode
│
├── downloads/
│   └── downloadService.ts        # Blob URL management & browser file downloader
│
├── error/
│   └── engineError.ts            # Error taxonomy (InvalidFile, QualityValidation, WorkerExecution)
│
├── memory/
│   └── memoryManager.ts          # Automatic Blob URL & virtual file memory cleanup
│
├── metadata/
│   └── metadataService.ts       # Universal media stream probe & metadata extraction
│
├── operations/                   # Individual operation modules
│   ├── convert.operation.ts
│   ├── compress.operation.ts
│   ├── trim.operation.ts
│   ├── extractAudio.operation.ts
│   ├── gif.operation.ts
│   └── utility.operations.ts    # Merge, Resize, Rotate, Audio, FPS
│
├── profiles/
│   └── quality.profiles.ts       # Quality-preserving encoding profiles (H.264, H.265, VP9, GIF)
│
├── queue/
│   └── jobQueue.ts               # Job queue manager for batch/single processing & progress
│
├── types/
│   └── engine.types.ts           # Central TypeScript types & interfaces
│
├── validation/
│   └── validation.service.ts     # Input file validation & output quality verification
│
└── workers/
    └── workerManager.ts          # Dedicated Web Worker manager for client-side FFmpeg WASM
```

---

## Core Engine Modules

### 1. Smart Decision Engine (`decisionEngine/smartDecisionEngine.ts`)

Inspects input media metadata (container, video codec, audio codec, resolution, fps, bitrate) and target format.

- If input codecs are natively supported by the target container (e.g., MOV H.264+AAC → MP4), it selects **Stream Copy** (instant 100% loss-less remuxing with zero re-encoding).
- If transcoding is required, it selects **High Quality Re-Encode** with optimized quality profiles (e.g., CRF 19 for H.264, CRF 22 for VP9) to preserve visual & audio fidelity by default.

### 2. Central Command Builder (`commandBuilder/ffmpegCommandBuilder.ts`)

Generates exact, quality-preserving FFmpeg arguments for all operations. Prevents duplicated command creation across tools.

### 3. Validation Service (`validation/validation.service.ts`)

- Inspects input formats and checks for corrupt files or zero-byte payloads.
- Verifies output file integrity and checks header signatures (`ftyp`/`moov` for MP4, EBML `0x1A45DFA3` for WebM/MKV, `GIF8` for GIF).
- Rejects suspiciously small output sizes to prevent degraded or broken outputs.

### 4. Job Queue (`queue/jobQueue.ts`)

Provides job enqueueing, progress tracking, status state machine (`pending` → `analyzing` → `processing` → `verifying` → `completed`), job cancellation, pause/resume, and event listeners.

### 5. Memory Manager (`memory/memoryManager.ts`)

Tracks Blob URLs and virtual files in memory. Automatically revokes URLs and cleans up temporary buffers to guarantee zero memory leaks in the browser.

---

## How to Add a New Tool / Operation

Adding a new tool to VideoMorph Engine requires minimal code:

1. **Define Operation Options** in `types/engine.types.ts` (extend `BaseOperationOptions`).
2. **Add Command Flag Generator** in `commandBuilder/ffmpegCommandBuilder.ts`.
3. **Add Operation Handler** in `operations/` using the core engine pipeline (`metadata` → `decisionEngine` → `commandBuilder` → `workerManager` → `validation` → `downloadService`).
4. **Register Method** in `VideoMorphEngine` (`index.ts`).

---

## Performance & Quality Guidelines

- **Quality First**: Default conversions preserve original resolution, frame rate, audio sample rate, and visual quality.
- **No Unsolicited Compression**: Compression is never applied automatically during standard format conversion.
- **Speed via Stream Copy**: Stream copy is prioritized whenever container compatibility permits, offering near-instant conversion speeds with zero visual loss.
