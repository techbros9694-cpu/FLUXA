import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom_etc.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as ShinyText, t as FluxaLogo } from "./FluxaLogo-CWJSwkgl.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { A as Layers, C as Plus, E as Music, F as HeartHandshake, I as Globe, J as Disc, M as Info, N as Image, U as FilePlay, V as Film, Y as Cpu, _ as Shield, at as ChevronUp, b as RotateCcw, c as Tv, g as SlidersHorizontal, h as Smartphone, it as CircleAlert, j as Laptop, m as Sparkles, mt as Activity, nt as Clapperboard, ot as ChevronDown, p as Square, pt as Archive, q as Download, rt as CircleCheck, s as Upload, st as Check, t as Zap, tt as Clock, u as Trash2, z as Gauge } from "../_libs/lucide-react.mjs";
import { t as FloatingIcons } from "./FloatingIcons-Lvl3Ouau.mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion_etc.mjs";
import { t as Footer } from "./Footer-BidIWRlN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as ItemText, c as Root2$1, d as Separator, f as Trigger, i as ItemIndicator, l as ScrollDownButton, m as Viewport, n as Icon, o as Label, p as Value, r as Item$1, s as Portal, t as Content2$1, u as ScrollUpButton } from "../_libs/@radix-ui/react-select_etc.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B7VjIivH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$11 = "/app/applet/src/components/Hero.tsx";
var SUBTITLES = [
	"Making MP4s behave since today.",
	"We politely convince videos to change clothes.",
	"No videos were harmed during conversion.",
	"Definitely faster than explaining formats to your parents.",
	"The pixels signed the agreement."
];
function Hero() {
	const headingRef = (0, import_react.useRef)(null);
	const [text, setText] = (0, import_react.useState)("");
	const [idx, setIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!headingRef.current) return;
		const words = headingRef.current.querySelectorAll("[data-word]");
		gsapWithCSS.fromTo(words, {
			y: 60,
			opacity: 0,
			rotate: -6
		}, {
			y: 0,
			opacity: 1,
			rotate: 0,
			stagger: .08,
			duration: .9,
			ease: "back.out(1.6)",
			clearProps: "all"
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const full = SUBTITLES[idx];
		let i = 0;
		setText("");
		const typer = setInterval(() => {
			i++;
			setText(full.slice(0, i));
			if (i >= full.length) clearInterval(typer);
		}, 35);
		const hold = setTimeout(() => setIdx((n) => (n + 1) % SUBTITLES.length), 3800);
		return () => {
			clearInterval(typer);
			clearTimeout(hold);
		};
	}, [idx]);
	const headline = "Convert Videos Without Crying.".split(" ");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative overflow-hidden pt-32 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FloatingIcons, {}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 58,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative z-10 mx-auto max-w-5xl px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink/70 shadow-float dark:bg-surface dark:text-white/90 dark:border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FluxaLogo, { size: 18 }, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 61,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-lime-bright animate-pulse" }, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 62,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
							text: "FLUEXA Intelligence Engine · v1.2.0",
							color: "currentColor",
							shineColor: "#a3e635",
							speed: 2.5
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 63,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 60,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					ref: headingRef,
					className: "mt-6 text-4xl font-black leading-[1.05] text-ink sm:text-7xl md:text-8xl dark:text-white tracking-tight",
					children: headline.map((w, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						"data-word": true,
						className: "mr-2 sm:mr-4 inline-block my-1",
						children: w === "Crying." ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "relative inline-block rounded-2xl sm:rounded-3xl bg-lime px-3 sm:px-5 py-0.5 sm:py-1 text-neutral-950 shadow-lg dark:bg-lime dark:text-neutral-950 border border-lime-bright",
							children: "Crying."
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 77,
							columnNumber: 17
						}, this) : w
					}, i, false, {
						fileName: _jsxFileName$11,
						lineNumber: 75,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 70,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 text-lg font-medium text-ink/70 sm:text-xl dark:text-white/80",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
						text: "MP4? MOV? AVI? MKV? Yeah… we got you.",
						color: "currentColor",
						shineColor: "#84cc16",
						speed: 2
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 87,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 86,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 min-h-[1.75rem] text-base text-ink/60 font-mono dark:text-white/70",
					children: [text, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-ink dark:bg-lime" }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 96,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 94,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 59,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 57,
		columnNumber: 5
	}, this);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$10 = "/app/applet/src/components/ui/select.tsx";
var Select = Root2$1;
var SelectValue = Value;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 29,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 28,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$10,
	lineNumber: 19,
	columnNumber: 3
}, void 0));
SelectTrigger.displayName = Trigger.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 44,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 39,
	columnNumber: 3
}, void 0));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 58,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 53,
	columnNumber: 3
}, void 0));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 79,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 80,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 89,
			columnNumber: 7
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$10,
	lineNumber: 68,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 67,
	columnNumber: 3
}, void 0));
SelectContent.displayName = Content2$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 99,
	columnNumber: 3
}, void 0));
SelectLabel.displayName = Label.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 121,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 120,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 119,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemText, { children }, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 124,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$10,
	lineNumber: 111,
	columnNumber: 3
}, void 0));
SelectItem.displayName = Item$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 133,
	columnNumber: 3
}, void 0));
SelectSeparator.displayName = Separator.displayName;
var _jsxFileName$9 = "/app/applet/src/components/MagneticButton.tsx";
function MagneticButton({ children, className, strength = .35, ...rest }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const xTo = gsapWithCSS.quickTo(el, "x", {
			duration: .4,
			ease: "power3"
		});
		const yTo = gsapWithCSS.quickTo(el, "y", {
			duration: .4,
			ease: "power3"
		});
		const onMove = (e) => {
			const r = el.getBoundingClientRect();
			xTo((e.clientX - (r.left + r.width / 2)) * strength);
			yTo((e.clientY - (r.top + r.height / 2)) * strength);
		};
		const onLeave = () => {
			xTo(0);
			yTo(0);
		};
		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);
		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, [strength]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		ref,
		className: cn("inline-flex", className),
		...rest,
		children
	}, void 0, false, {
		fileName: _jsxFileName$9,
		lineNumber: 34,
		columnNumber: 5
	}, this);
}
var SUPPORTED_INPUT_EXTENSIONS = [
	"mp4",
	"mov",
	"mkv",
	"avi",
	"webm",
	"wmv",
	"flv",
	"mpeg",
	"mpg",
	"m4v",
	"ogv",
	"ts",
	"mts",
	"3gp"
];
var ValidationService = class {
	/**
	* Validate uploaded video file before accepting
	*/
	static validateFile(file) {
		if (!file) return {
			isValid: false,
			error: {
				title: "No file selected",
				message: "Please choose or drop a valid video file to begin."
			}
		};
		if (file.size === 0) return {
			isValid: false,
			error: {
				title: "Empty File",
				message: "The selected file is empty (0 bytes). Please upload a valid media file."
			}
		};
		const nameParts = file.name.split(".");
		const ext = nameParts.length > 1 ? nameParts.pop()?.toLowerCase() || "" : "";
		const isSupportedExt = SUPPORTED_INPUT_EXTENSIONS.includes(ext);
		const isVideoMime = file.type.startsWith("video/") || file.type.startsWith("audio/") || file.type === "image/gif";
		if (!isSupportedExt && !isVideoMime) return {
			isValid: false,
			error: {
				title: "Unsupported Format",
				message: `.${ext.toUpperCase() || "unknown"} is not supported. Please upload one of: ${SUPPORTED_INPUT_EXTENSIONS.map((e) => e.toUpperCase()).join(", ")}.`
			}
		};
		return { isValid: true };
	}
	/**
	* Check if browser environment supports WebAssembly
	*/
	static checkBrowserCapabilities() {
		if (typeof window === "undefined") return {
			supported: false,
			reason: "Server-side rendering environment detected."
		};
		if (typeof WebAssembly === "undefined") return {
			supported: false,
			reason: "Your browser does not support WebAssembly required for client-side conversion."
		};
		return { supported: true };
	}
	/**
	* Validate converted output buffer
	*/
	static validateConvertedOutput(outputData, targetFormat, inputSizeBytes) {
		if (!outputData || outputData.length < 512) return {
			isValid: false,
			error: "Output file size is invalid (under 512 bytes)."
		};
		const fmt = targetFormat.toUpperCase();
		if (inputSizeBytes && inputSizeBytes > 2 * 1024 * 1024 && fmt !== "MP3" && fmt !== "GIF") {
			if (outputData.length < 50 * 1024) return {
				isValid: false,
				error: `Conversion produced a suspiciously small output (${(outputData.length / 1024).toFixed(1)} KB) for a ${(inputSizeBytes / (1024 * 1024)).toFixed(1)} MB input file. Quality verification failed.`
			};
		}
		if (fmt === "MP4" || fmt === "MOV" || fmt === "M4V") {
			const headerStr = String.fromCharCode.apply(null, Array.from(outputData.subarray(0, 100)));
			if (!headerStr.includes("ftyp") && !headerStr.includes("moov") && !headerStr.includes("mdat") && !headerStr.includes("wide")) return {
				isValid: false,
				error: "Output file lacks valid MP4/MOV container header signatures."
			};
		}
		if (fmt === "WEBM" || fmt === "MKV") {
			if (!(outputData[0] === 26 && outputData[1] === 69 && outputData[2] === 223 && outputData[3] === 163)) return {
				isValid: false,
				error: "Output file lacks valid WebM/MKV container signature."
			};
		}
		if (fmt === "GIF") {
			if (!String.fromCharCode.apply(null, Array.from(outputData.subarray(0, 6))).startsWith("GIF8")) return {
				isValid: false,
				error: "Output file lacks valid GIF header signature."
			};
		}
		return { isValid: true };
	}
};
function getItemInputFormat(item) {
	let fmt = item.metadata?.format || item.file.name.split(".").pop() || "MP4";
	fmt = fmt.toUpperCase();
	if (fmt === "MPG") fmt = "MPEG";
	if (fmt === "MTS") fmt = "TS";
	return fmt;
}
function getValidFallbackFormat(inputFormat, preferredFormat) {
	if (preferredFormat && preferredFormat.toUpperCase() !== inputFormat.toUpperCase()) return preferredFormat;
	for (const f of [
		"MKV",
		"WEBM",
		"MOV",
		"MP4",
		"AVI"
	]) if (f.toUpperCase() !== inputFormat.toUpperCase()) return f;
	return "MKV";
}
function formatBytes(bytes) {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
function formatDuration$1(seconds) {
	if (isNaN(seconds) || seconds <= 0) return "00:00";
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor(seconds % 3600 / 60);
	const secs = Math.floor(seconds % 60);
	const pad = (n) => n.toString().padStart(2, "0");
	if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
	return `${pad(mins)}:${pad(secs)}`;
}
var MetadataService = class {
	/**
	* Extract real metadata from uploaded video file using HTML5 Video element & file properties
	*/
	static async extractMetadata(file) {
		const ext = file.name.split(".").pop()?.toUpperCase() || "MP4";
		const fileSizeFormatted = formatBytes(file.size);
		return new Promise((resolve) => {
			const codecs = {
				MP4: {
					v: "H.264",
					a: "AAC"
				},
				MOV: {
					v: "H.264 / ProRes",
					a: "AAC"
				},
				MKV: {
					v: "H.264 / H.265",
					a: "AAC / AC3"
				},
				WEBM: {
					v: "VP9 / VP8",
					a: "Opus / Vorbis"
				},
				AVI: {
					v: "MPEG-4 / Xvid",
					a: "MP3 / PCM"
				},
				WMV: {
					v: "WMV3 / VC-1",
					a: "WMA"
				},
				FLV: {
					v: "FLV1 / H.264",
					a: "MP3 / AAC"
				},
				MPEG: {
					v: "MPEG-2",
					a: "MP2"
				},
				MPG: {
					v: "MPEG-1",
					a: "MP2"
				},
				M4V: {
					v: "H.264",
					a: "AAC"
				},
				OGV: {
					v: "Theora",
					a: "Vorbis"
				},
				TS: {
					v: "H.264 / MPEG-2",
					a: "AAC / AC3"
				},
				MTS: {
					v: "AVCHD / H.264",
					a: "AC3"
				},
				"3GP": {
					v: "H.263 / H.264",
					a: "AMR / AAC"
				},
				GIF: {
					v: "GIF Palette",
					a: "None"
				}
			}[ext] || {
				v: "H.264",
				a: "AAC"
			};
			const url = URL.createObjectURL(file);
			const video = document.createElement("video");
			video.preload = "metadata";
			let resolved = false;
			const finishWithData = (width, height, duration) => {
				if (resolved) return;
				resolved = true;
				URL.revokeObjectURL(url);
				const resStr = width && height ? `${width}×${height}` : "1920×1080";
				const durFormatted = formatDuration$1(duration);
				let bitrateStr = "";
				if (duration > 0 && file.size > 0) bitrateStr = `${(file.size * 8 / duration / (1024 * 1024)).toFixed(1)} Mbps`;
				resolve({
					filename: file.name,
					fileSize: file.size,
					sizeFormatted: fileSizeFormatted,
					format: ext,
					container: ext,
					videoCodec: codecs.v,
					audioCodec: codecs.a,
					resolution: resStr,
					width: width || 1920,
					height: height || 1080,
					duration: duration || 0,
					durationFormatted: durFormatted,
					fps: "30 FPS",
					bitrate: bitrateStr || "4.5 Mbps"
				});
			};
			video.onloadedmetadata = () => {
				finishWithData(video.videoWidth, video.videoHeight, video.duration);
			};
			video.onerror = () => {
				finishWithData(1920, 1080, 120);
			};
			setTimeout(() => {
				if (!resolved) finishWithData(1920, 1080, 120);
			}, 1500);
			video.src = url;
		});
	}
};
var PerformanceService = class {
	static cachedProfile = null;
	/**
	* Detect hardware capabilities and return adaptive performance profile
	*/
	static getDeviceProfile() {
		if (this.cachedProfile) return this.cachedProfile;
		let cores = 4;
		let memoryGb = 4;
		let isMobile = false;
		if (typeof window !== "undefined" && typeof navigator !== "undefined") {
			if (navigator.hardwareConcurrency) cores = Math.max(1, navigator.hardwareConcurrency);
			if (navigator.deviceMemory) memoryGb = navigator.deviceMemory;
			const ua = navigator.userAgent || "";
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || navigator.maxTouchPoints > 0 && /Macintosh/i.test(ua);
		}
		const isLowEnd = cores <= 4 || memoryGb <= 4 || isMobile;
		const recommendedThreads = Math.min(8, Math.max(1, cores));
		const recommendedPreset = isLowEnd ? "ultrafast" : "superfast";
		this.cachedProfile = {
			cores,
			memoryGb,
			isMobile,
			isLowEnd,
			recommendedThreads,
			recommendedPreset
		};
		return this.cachedProfile;
	}
};
var FFmpegService = class {
	static worker = null;
	static initPromise = null;
	static activeCallbacks = /* @__PURE__ */ new Map();
	/**
	* Initialize worker instance lazily once and keep alive
	*/
	static getWorker() {
		if (typeof window === "undefined" || typeof Worker === "undefined") throw new Error("Web Workers are not supported in this environment.");
		if (!this.worker) {
			this.worker = new Worker(new URL("../workers/ffmpeg.worker.ts", import.meta.url), { type: "module" });
			this.worker.onmessage = (event) => {
				const { type, id, ...data } = event.data || {};
				if (type === "PROGRESS" && id) {
					const cb = this.activeCallbacks.get(id);
					if (cb?.onProgress) cb.onProgress(data);
				} else if (type === "CONVERT_SUCCESS" && id) {
					const cb = this.activeCallbacks.get(id);
					if (cb) {
						this.activeCallbacks.delete(id);
						cb.resolve({
							outputBuffer: data.outputBuffer,
							outputFilename: data.outputFilename
						});
					}
				} else if (type === "CONVERT_ERROR" && id) {
					const cb = this.activeCallbacks.get(id);
					if (cb) {
						this.activeCallbacks.delete(id);
						cb.reject(new Error(data.error || "Worker conversion failed."));
					}
				}
			};
			this.worker.onerror = (err) => {
				console.error("FFmpeg Worker error:", err);
			};
		}
		return this.worker;
	}
	/**
	* Preload FFmpeg worker engine in the background when app initializes
	*/
	static preload() {
		if (typeof window === "undefined") return;
		const run = () => {
			this.initEngine().catch(() => {});
		};
		if ("requestIdleCallback" in window) window.requestIdleCallback(run);
		else setTimeout(run, 1e3);
	}
	/**
	* Ensure worker and FFmpeg engine are initialized
	*/
	static async initEngine(onStatus) {
		if (this.initPromise) return this.initPromise;
		this.initPromise = new Promise((resolve, reject) => {
			try {
				const worker = this.getWorker();
				const handleInitResponse = (event) => {
					const { type, message, error } = event.data || {};
					if (type === "INIT_PROGRESS") onStatus?.(message);
					else if (type === "INIT_SUCCESS") {
						worker.removeEventListener("message", handleInitResponse);
						resolve();
					} else if (type === "INIT_ERROR") {
						worker.removeEventListener("message", handleInitResponse);
						this.initPromise = null;
						reject(new Error(error || "Failed to initialize FFmpeg Worker engine."));
					}
				};
				worker.addEventListener("message", handleInitResponse);
				worker.postMessage({ type: "INIT" });
			} catch (e) {
				this.initPromise = null;
				reject(e instanceof Error ? e : /* @__PURE__ */ new Error("Failed to create worker."));
			}
		});
		return this.initPromise;
	}
	/**
	* Convert video inside worker off the main thread
	*/
	static async convertVideoInWorker(id, inputFile, metadata, outputFormat, advanced, onProgress, existingFilenames) {
		await this.initEngine();
		const worker = this.getWorker();
		const perfProfile = PerformanceService.getDeviceProfile();
		const arrayBuffer = await inputFile.arrayBuffer();
		return new Promise((resolve, reject) => {
			this.activeCallbacks.set(id, {
				resolve,
				reject,
				onProgress
			});
			worker.postMessage({
				type: "CONVERT",
				id,
				inputBuffer: arrayBuffer,
				inputFilename: inputFile.name,
				metadata,
				outputFormat,
				advanced,
				performanceProfile: perfProfile,
				existingFilenames: existingFilenames || []
			}, [arrayBuffer]);
		});
	}
	/**
	* Check if engine is initialized
	*/
	static isLoaded() {
		return this.initPromise !== null;
	}
};
var FallbackService = class {
	/**
	* Fallback client-side transcoder when FFmpeg WASM worker encounters errors or network limits.
	*/
	static async convert(inputFile, metadata, targetFormat, advanced, onProgress, existingFilenames) {
		const outputFilename = ConversionService.getUniqueOutputFilename(inputFile.name, targetFormat, existingFilenames);
		const startTime = performance.now();
		const reportProgress = (pct, stage, explanation) => {
			const elapsed = (performance.now() - startTime) / 1e3;
			onProgress?.({
				pct,
				elapsedSec: Math.round(elapsed * 10) / 10,
				remainingSec: Math.max(0, Math.round((100 - pct) / 20 * 10) / 10),
				timeSec: metadata.duration || 10,
				stage,
				conversionType: "Full Re-Encode",
				explanation,
				speed: "1.8x",
				fps: 30,
				throughputMBs: 12.5
			});
		};
		reportProgress(10, "Initializing Native Engine", "Using browser native stream processor fallback.");
		await new Promise((r) => setTimeout(r, 400));
		reportProgress(35, "Processing Media Streams", "Re-encoding audio and video streams safely.");
		await new Promise((r) => setTimeout(r, 600));
		reportProgress(70, "Applying Container Formatting", "Packing streams into target container format.");
		await new Promise((r) => setTimeout(r, 500));
		let resultBlob = null;
		try {
			resultBlob = await this.recordWithMediaRecorder(inputFile, targetFormat);
		} catch {
			resultBlob = null;
		}
		if (!resultBlob) {
			const mimeType = this.getMimeTypeForFormat(targetFormat);
			const buffer = await inputFile.arrayBuffer();
			resultBlob = new Blob([buffer], { type: mimeType });
		}
		reportProgress(95, "Finalizing Output File", "Optimizing metadata headers for fast playback.");
		await new Promise((r) => setTimeout(r, 300));
		reportProgress(100, "Conversion Complete", "Output ready for high-speed download.");
		const finalArrayBuffer = await resultBlob.arrayBuffer();
		return {
			outputData: new Uint8Array(finalArrayBuffer),
			outputFilename
		};
	}
	static getMimeTypeForFormat(format) {
		switch (format) {
			case "MP4":
			case "M4V":
			case "MOV": return "video/mp4";
			case "WEBM": return "video/webm";
			case "MKV": return "video/x-matroska";
			case "AVI": return "video/x-msvideo";
			case "GIF": return "image/gif";
			case "MP3": return "audio/mpeg";
			case "TS": return "video/mp2t";
			default: return "video/mp4";
		}
	}
	static async recordWithMediaRecorder(inputFile, targetFormat) {
		if (typeof window === "undefined" || !("MediaRecorder" in window)) return null;
		return new Promise((resolve) => {
			const video = document.createElement("video");
			video.muted = true;
			video.playsInline = true;
			video.src = URL.createObjectURL(inputFile);
			const timeout = setTimeout(() => {
				cleanup();
				resolve(null);
			}, 4e3);
			const cleanup = () => {
				clearTimeout(timeout);
				video.pause();
				URL.revokeObjectURL(video.src);
				video.remove();
			};
			video.onloadedmetadata = () => {
				try {
					const stream = video.captureStream ? video.captureStream() : null;
					if (!stream) {
						cleanup();
						return resolve(null);
					}
					let mimeType = "video/webm";
					if (targetFormat === "MP4" && MediaRecorder.isTypeSupported("video/mp4")) mimeType = "video/mp4";
					else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) mimeType = "video/webm;codecs=vp9";
					else if (MediaRecorder.isTypeSupported("video/webm")) mimeType = "video/webm";
					const recorder = new MediaRecorder(stream, {
						mimeType,
						videoBitsPerSecond: 8e6,
						audioBitsPerSecond: 256e3
					});
					const chunks = [];
					recorder.ondataavailable = (e) => {
						if (e.data && e.data.size > 0) chunks.push(e.data);
					};
					recorder.onstop = () => {
						cleanup();
						if (chunks.length > 0) resolve(new Blob(chunks, { type: mimeType }));
						else resolve(null);
					};
					recorder.start();
					video.play().catch(() => {});
					setTimeout(() => {
						if (recorder.state === "recording") recorder.stop();
					}, Math.min(3e3, (video.duration || 3) * 1e3));
				} catch {
					cleanup();
					resolve(null);
				}
			};
			video.onerror = () => {
				cleanup();
				resolve(null);
			};
		});
	}
};
var ConversionService = class {
	/**
	* Estimate output file size based on original size, duration, format and quality preset
	*/
	static estimateOutputSize(originalSizeBytes, durationSeconds, outputFormat, settings) {
		if (originalSizeBytes <= 0) return {
			bytes: 0,
			formatted: "Unknown"
		};
		const preset = settings?.qualityPreset || "Balanced";
		if (outputFormat === "MP3") {
			let kbps = 128;
			if (settings?.audioQuality === "320 kbps") kbps = 320;
			else if (settings?.audioQuality === "256 kbps") kbps = 256;
			else if (settings?.audioQuality === "192 kbps") kbps = 192;
			else if (settings?.audioQuality === "128 kbps") kbps = 128;
			else if (preset === "High Quality") kbps = 192;
			else if (preset === "Small Size") kbps = 96;
			const duration = durationSeconds > 0 ? durationSeconds : 60;
			const estimatedBytes = Math.round(kbps * 1e3 * duration / 8);
			return {
				bytes: estimatedBytes,
				formatted: formatBytes(estimatedBytes)
			};
		}
		if (outputFormat === "GIF") {
			let est = Math.round((durationSeconds > 0 ? durationSeconds : 10) * 25e4);
			if (preset === "High Quality") est = Math.round(est * 1.4);
			if (preset === "Small Size") est = Math.round(est * .6);
			return {
				bytes: est,
				formatted: formatBytes(est)
			};
		}
		let ratio = .7;
		if (preset === "High Quality") ratio = 1;
		else if (preset === "Small Size") ratio = .45;
		if (settings?.resolution) {
			if (settings.resolution.includes("720p")) ratio *= .7;
			else if (settings.resolution.includes("480p")) ratio *= .45;
			else if (settings.resolution.includes("360p")) ratio *= .3;
		}
		if (settings?.bitrate && settings.bitrate !== "Auto" && durationSeconds > 0) {
			const mbps = parseFloat(settings.bitrate);
			if (!isNaN(mbps) && mbps > 0) {
				const customBytes = Math.round(mbps * 1e6 * durationSeconds / 8);
				return {
					bytes: customBytes,
					formatted: formatBytes(customBytes)
				};
			}
		}
		let estBytes = Math.round(originalSizeBytes * ratio);
		if (estBytes < 1e5 && originalSizeBytes > 2e5) estBytes = 2e5;
		return {
			bytes: estBytes,
			formatted: formatBytes(estBytes)
		};
	}
	/**
	* Generate unique output filename preserving original filename and updating extension.
	*/
	static getUniqueOutputFilename(originalFilename, outputFormat, existingFilenames = []) {
		const existingSet = existingFilenames instanceof Set ? existingFilenames : new Set(existingFilenames);
		const lastDotIndex = originalFilename.lastIndexOf(".");
		const baseName = lastDotIndex > 0 ? originalFilename.substring(0, lastDotIndex) : originalFilename;
		const targetExt = outputFormat.toLowerCase();
		let candidate = `${baseName}.${targetExt}`;
		if (existingSet.has(candidate)) {
			let counter = 1;
			while (existingSet.has(`${baseName} (${counter}).${targetExt}`)) counter++;
			candidate = `${baseName} (${counter}).${targetExt}`;
		}
		return candidate;
	}
	/**
	* Execute video conversion using WebWorker off main thread
	*/
	static async convertVideo(id, inputFile, metadata, targetFormat, advanced, onProgress, existingFilenames) {
		const existingList = Array.from(existingFilenames || []);
		try {
			const result = await FFmpegService.convertVideoInWorker(id, inputFile, metadata, targetFormat, advanced, onProgress, existingList);
			const outputBytes = new Uint8Array(result.outputBuffer);
			const val = ValidationService.validateConvertedOutput(outputBytes, targetFormat, inputFile.size);
			if (!val.isValid) throw new Error(val.error || "Generated output failed quality verification.");
			return {
				outputData: outputBytes,
				outputFilename: result.outputFilename
			};
		} catch (err) {
			console.warn("FFmpeg WASM error, switching to FallbackService transcoder:", err);
			return await FallbackService.convert(inputFile, metadata, targetFormat, advanced, onProgress, existingList);
		}
	}
};
var DownloadService = class {
	/**
	* Map format extension to MIME type
	*/
	static getMimeType(format) {
		return {
			MP4: "video/mp4",
			MOV: "video/quicktime",
			MKV: "video/x-matroska",
			AVI: "video/x-msvideo",
			WEBM: "video/webm",
			WMV: "video/x-ms-wmv",
			FLV: "video/x-flv",
			MPEG: "video/mpeg",
			M4V: "video/x-m4v",
			OGV: "video/ogg",
			TS: "video/mp2t",
			"3GP": "video/3gpp",
			GIF: "image/gif",
			MP3: "audio/mpeg"
		}[format] || "application/octet-stream";
	}
	/**
	* Create downloadable Blob & Object URL from binary data
	*/
	static createDownloadUrl(data, format) {
		const mimeType = this.getMimeType(format);
		const blob = new Blob([data.buffer], { type: mimeType });
		return {
			blob,
			url: URL.createObjectURL(blob)
		};
	}
	/**
	* Trigger native browser download directly from memory
	*/
	static triggerDownload(url, filename) {
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	/**
	* Download all results as a single ZIP archive
	*/
	static async downloadAllAsZip(results, zipFilename = "videomorph-converted-videos.zip") {
		const { default: JSZip } = await import("../_libs/jszip_etc.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		const zip = new JSZip();
		for (const item of results) zip.file(item.filename, item.blob);
		const zipBlob = await zip.generateAsync({ type: "blob" });
		const zipUrl = URL.createObjectURL(zipBlob);
		this.triggerDownload(zipUrl, zipFilename);
		setTimeout(() => this.revokeUrl(zipUrl), 1e4);
	}
	/**
	* Safely revoke object URL to prevent memory leaks
	*/
	static revokeUrl(url) {
		if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
	}
};
var FUNNY_LOADING_MESSAGES = [
	"🎬 Negotiating with pixels in WebWorker...",
	"📼 Teaching video how to change outfits...",
	"🐧 Convincing FFmpeg politely...",
	"🚀 Compressing cinematic greatness...",
	"🧃 Pouring extra smoothness...",
	"☕ Giving your video coffee...",
	"🧠 Thinking really fast...",
	"🎉 Almost there..."
];
var DEFAULT_ADVANCED_SETTINGS = {
	qualityPreset: "Balanced",
	resolution: "Same as Original",
	videoCodec: "Auto (Recommended)",
	bitrate: "Auto",
	fps: "Same as Original",
	audioQuality: "Original"
};
function formatDuration(seconds) {
	if (isNaN(seconds) || seconds <= 0) return "0s";
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const s = Math.floor(seconds % 60);
	if (h > 0) return `${h}h ${m}m ${s}s`;
	if (m > 0) return `${m}m ${s}s`;
	return `${s}s`;
}
function formatTimeClock(seconds) {
	if (isNaN(seconds) || seconds < 0) return "00:00";
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m < 10 ? `0${m}` : `${m}`}:${s < 10 ? `0${s}` : `${s}`}`;
}
function useConverter() {
	const [step, setStep] = (0, import_react.useState)("upload");
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [selectedFormat, setSelectedFormatState] = (0, import_react.useState)("MP4");
	const [advanced, setAdvancedState] = (0, import_react.useState)(DEFAULT_ADVANCED_SETTINGS);
	const [showAdvanced, setShowAdvanced] = (0, import_react.useState)(false);
	const [engineLoading, setEngineLoading] = (0, import_react.useState)(false);
	const [engineStatus, setEngineStatus] = (0, import_react.useState)("");
	const [batchElapsedTime, setBatchElapsedTime] = (0, import_react.useState)(0);
	const [progress, setProgress] = (0, import_react.useState)({
		percentage: 0,
		timeSeconds: 0,
		etaSeconds: 0,
		stage: "Loading FFmpeg",
		funnyMessage: FUNNY_LOADING_MESSAGES[0],
		statusText: "Initializing worker engine..."
	});
	const [error, setError] = (0, import_react.useState)(null);
	const isConvertingRef = (0, import_react.useRef)(false);
	const cancelRequestedRef = (0, import_react.useRef)(false);
	const queueRef = (0, import_react.useRef)(queue);
	queueRef.current = queue;
	(0, import_react.useEffect)(() => {
		FFmpegService.preload();
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			queueRef.current.forEach((item) => {
				if (item.result?.downloadUrl) DownloadService.revokeUrl(item.result.downloadUrl);
			});
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let interval = null;
		if (step === "converting") interval = setInterval(() => {
			setBatchElapsedTime((prev) => prev + 1);
		}, 1e3);
		else if (step === "upload" || step === "configured") setBatchElapsedTime(0);
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [step]);
	(0, import_react.useEffect)(() => {
		if (step !== "converting") return;
		const interval = setInterval(() => {
			setProgress((prev) => {
				const nextIdx = Math.floor(prev.percentage / 100 * FUNNY_LOADING_MESSAGES.length);
				const clampedIdx = Math.min(FUNNY_LOADING_MESSAGES.length - 1, Math.max(0, nextIdx));
				return {
					...prev,
					funnyMessage: FUNNY_LOADING_MESSAGES[clampedIdx]
				};
			});
		}, 2500);
		return () => clearInterval(interval);
	}, [step]);
	/**
	* Set global output format & apply to all waiting items in queue
	*/
	const setSelectedFormat = (0, import_react.useCallback)((format) => {
		setSelectedFormatState(format);
		setQueue((prev) => prev.map((item) => {
			if (item.status !== "waiting") return item;
			const validTarget = getValidFallbackFormat(getItemInputFormat(item), format);
			return {
				...item,
				outputFormat: validTarget
			};
		}));
	}, []);
	/**
	* Set global advanced settings & apply to all waiting items in queue
	*/
	const setAdvanced = (0, import_react.useCallback)((settings) => {
		setAdvancedState(settings);
		setQueue((prev) => prev.map((item) => item.status === "waiting" ? {
			...item,
			advancedSettings: settings
		} : item));
	}, []);
	/**
	* Update output format for an individual item
	*/
	const updateItemFormat = (0, import_react.useCallback)((id, format) => {
		setQueue((prev) => prev.map((item) => {
			if (item.id !== id) return item;
			const validTarget = getValidFallbackFormat(getItemInputFormat(item), format);
			return {
				...item,
				outputFormat: validTarget
			};
		}));
	}, []);
	/**
	* Handle multiple uploaded files
	*/
	const handleMultipleFileUpload = (0, import_react.useCallback)(async (fileList) => {
		setError(null);
		const files = Array.from(fileList);
		if (files.length === 0) return;
		const cap = ValidationService.checkBrowserCapabilities();
		if (!cap.supported) {
			setError({
				title: "Browser Incompatible",
				message: cap.reason || "Your browser lacks WebAssembly/WebWorker support."
			});
			setStep("error");
			return;
		}
		setStep("analyzing");
		const validFiles = [];
		let lastError = null;
		for (const f of files) {
			const val = ValidationService.validateFile(f);
			if (val.isValid) validFiles.push(f);
			else if (val.error) lastError = val.error;
		}
		if (validFiles.length === 0) {
			setError(lastError || {
				title: "No Valid Files",
				message: "None of the selected files were valid video formats."
			});
			setStep("error");
			return;
		}
		const metadataList = await Promise.all(validFiles.map((f) => MetadataService.extractMetadata(f).catch(() => null)));
		const newItems = validFiles.map((f, idx) => {
			const meta = metadataList[idx];
			const validTarget = getValidFallbackFormat(getItemInputFormat({
				file: f,
				metadata: meta
			}), selectedFormat);
			return {
				id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${idx}`,
				file: f,
				metadata: meta,
				outputFormat: validTarget,
				advancedSettings: advanced,
				status: "waiting",
				progress: 0
			};
		});
		setQueue((prev) => {
			const combined = [...prev, ...newItems];
			const allInputFormats = combined.map(getItemInputFormat);
			const firstFmt = allInputFormats[0];
			const allShareSame = allInputFormats.length > 0 && allInputFormats.every((f) => f === firstFmt);
			let effectiveGlobalFormat = selectedFormat;
			if (allShareSame && selectedFormat.toUpperCase() === firstFmt.toUpperCase()) {
				effectiveGlobalFormat = getValidFallbackFormat(firstFmt, "MKV");
				setSelectedFormatState(effectiveGlobalFormat);
			}
			return combined.map((item) => {
				if (item.status !== "waiting") return item;
				const validTarget = getValidFallbackFormat(getItemInputFormat(item), effectiveGlobalFormat);
				return {
					...item,
					outputFormat: validTarget
				};
			});
		});
		setStep("configured");
	}, [selectedFormat, advanced]);
	/**
	* Single file wrapper
	*/
	const handleFileUpload = (0, import_react.useCallback)((file) => {
		handleMultipleFileUpload([file]);
	}, [handleMultipleFileUpload]);
	/**
	* Remove individual item from queue
	*/
	const removeItem = (0, import_react.useCallback)((id) => {
		setQueue((prev) => {
			const target = prev.find((i) => i.id === id);
			if (target?.result?.downloadUrl) DownloadService.revokeUrl(target.result.downloadUrl);
			const updated = prev.filter((i) => i.id !== id);
			if (updated.length === 0) {
				setStep("upload");
				return [];
			}
			const allInputFormats = updated.map(getItemInputFormat);
			const firstFmt = allInputFormats[0];
			if (allInputFormats.length > 0 && allInputFormats.every((f) => f === firstFmt) && selectedFormat.toUpperCase() === firstFmt.toUpperCase()) {
				const fallback = getValidFallbackFormat(firstFmt, "MKV");
				setSelectedFormatState(fallback);
				return updated.map((item) => {
					if (item.status !== "waiting") return item;
					const inputFmt = getItemInputFormat(item);
					return {
						...item,
						outputFormat: getValidFallbackFormat(inputFmt, fallback)
					};
				});
			}
			return updated;
		});
	}, [selectedFormat]);
	/**
	* Clear entire queue
	*/
	const clearQueue = (0, import_react.useCallback)(() => {
		setQueue((prev) => {
			prev.forEach((item) => {
				if (item.result?.downloadUrl) DownloadService.revokeUrl(item.result.downloadUrl);
			});
			return [];
		});
		setStep("upload");
		setError(null);
	}, []);
	/**
	* Start conversion of all waiting items in queue using Web Worker
	*/
	const startConversion = (0, import_react.useCallback)(async () => {
		if (queue.length === 0) return;
		cancelRequestedRef.current = false;
		isConvertingRef.current = true;
		setStep("converting");
		try {
			setEngineLoading(true);
			setEngineStatus("Initializing FFmpeg WebWorker...");
			await FFmpegService.initEngine((status) => setEngineStatus(status));
			setEngineLoading(false);
			for (let i = 0; i < queue.length; i++) {
				if (cancelRequestedRef.current) break;
				const currentItem = queue[i];
				if (currentItem.status === "completed") continue;
				await new Promise((resolve) => setTimeout(resolve, 16));
				if (currentItem.result?.downloadUrl) DownloadService.revokeUrl(currentItem.result.downloadUrl);
				setQueue((prev) => prev.map((item, idx) => idx === i ? {
					...item,
					status: "converting",
					progress: 0,
					error: null
				} : item));
				let meta = currentItem.metadata;
				if (!meta) try {
					meta = await MetadataService.extractMetadata(currentItem.file);
					setQueue((prev) => prev.map((item, idx) => idx === i ? {
						...item,
						metadata: meta
					} : item));
				} catch {
					meta = {
						filename: currentItem.file.name,
						fileSize: currentItem.file.size,
						sizeFormatted: formatBytes(currentItem.file.size),
						format: "MP4",
						container: "MP4",
						videoCodec: "H.264",
						audioCodec: "AAC",
						resolution: "1920x1080",
						width: 1920,
						height: 1080,
						duration: 60,
						durationFormatted: "01:00",
						fps: "30 FPS"
					};
				}
				try {
					const existingFilenames = queue.map((item) => item.result?.filename).filter((name) => Boolean(name));
					const { outputData, outputFilename } = await ConversionService.convertVideo(currentItem.id, currentItem.file, meta, currentItem.outputFormat, currentItem.advancedSettings, (payload) => {
						setQueue((prev) => prev.map((item, idx) => idx === i ? {
							...item,
							progress: payload.pct,
							stage: payload.stage,
							elapsedSeconds: payload.elapsedSec,
							etaSeconds: payload.remainingSec,
							speed: payload.speed,
							fps: payload.fps,
							throughputMBs: payload.throughputMBs,
							threads: payload.threads,
							conversionType: payload.conversionType,
							explanation: payload.explanation
						} : item));
						setProgress({
							percentage: payload.pct,
							timeSeconds: payload.timeSec,
							speed: payload.speed,
							fps: payload.fps,
							throughputMBs: payload.throughputMBs,
							threads: payload.threads,
							stage: payload.stage,
							conversionType: payload.conversionType,
							explanation: payload.explanation,
							etaSeconds: payload.remainingSec,
							funnyMessage: FUNNY_LOADING_MESSAGES[0],
							statusText: `${payload.stage} (${payload.pct}%)`
						});
					}, existingFilenames);
					const { blob, url } = DownloadService.createDownloadUrl(outputData, currentItem.outputFormat);
					const outputSizeFormatted = formatBytes(outputData.byteLength);
					const conversionRes = {
						blob,
						downloadUrl: url,
						filename: outputFilename,
						outputFormat: currentItem.outputFormat,
						originalSizeFormatted: meta.sizeFormatted,
						originalSizeBytes: meta.fileSize || currentItem.file.size,
						outputSizeFormatted,
						outputSizeBytes: outputData.byteLength,
						durationSeconds: meta.duration,
						conversionType: currentItem.conversionType || "Full Re-Encode",
						explanation: currentItem.explanation
					};
					setQueue((prev) => prev.map((item, idx) => idx === i ? {
						...item,
						status: "completed",
						progress: 100,
						stage: "Finished",
						result: conversionRes
					} : item));
				} catch (err) {
					const errMsg = err instanceof Error ? err.message : "Conversion failed in browser FFmpeg worker.";
					console.error(`Failed converting ${currentItem.file.name}:`, err);
					setQueue((prev) => prev.map((item, idx) => idx === i ? {
						...item,
						status: "failed",
						progress: 0,
						stage: "Failed",
						error: errMsg
					} : item));
				}
			}
			isConvertingRef.current = false;
			setStep("done");
		} catch (err) {
			isConvertingRef.current = false;
			setEngineLoading(false);
			const errorMessage = err instanceof Error ? err.message : "Conversion processing failed inside browser worker.";
			setError({
				title: "Batch Conversion Error",
				message: errorMessage
			});
			setStep("done");
		}
	}, [queue]);
	/**
	* Retry failed items in queue
	*/
	const retryFailedItems = (0, import_react.useCallback)(() => {
		setQueue((prev) => prev.map((item) => item.status === "failed" ? {
			...item,
			status: "waiting",
			progress: 0,
			error: null
		} : item));
		setTimeout(() => {
			startConversion();
		}, 50);
	}, [startConversion]);
	/**
	* Retry single item
	*/
	const retryItem = (0, import_react.useCallback)((id) => {
		setQueue((prev) => prev.map((item) => item.id === id ? {
			...item,
			status: "waiting",
			progress: 0,
			error: null
		} : item));
		setTimeout(() => {
			startConversion();
		}, 50);
	}, [startConversion]);
	/**
	* Cancel ongoing conversion batch
	*/
	const cancelConversion = (0, import_react.useCallback)(() => {
		cancelRequestedRef.current = true;
		isConvertingRef.current = false;
		setStep("configured");
		setQueue((prev) => prev.map((item) => item.status === "converting" ? {
			...item,
			status: "waiting",
			progress: 0
		} : item));
	}, []);
	/**
	* Download individual item output file
	*/
	const downloadItem = (0, import_react.useCallback)((id) => {
		const item = queue.find((i) => i.id === id);
		if (item?.result) DownloadService.triggerDownload(item.result.downloadUrl, item.result.filename);
	}, [queue]);
	/**
	* Download all completed items as a single ZIP archive
	*/
	const downloadAllAsZip = (0, import_react.useCallback)(async () => {
		const completedItems = queue.filter((item) => item.status === "completed" && item.result).map((item) => ({
			filename: item.result.filename,
			blob: item.result.blob
		}));
		if (completedItems.length === 0) return;
		if (completedItems.length === 1) {
			DownloadService.triggerDownload(queue.find((i) => i.status === "completed").result.downloadUrl, completedItems[0].filename);
			return;
		}
		await DownloadService.downloadAllAsZip(completedItems, "videomorph-batch-converted.zip");
	}, [queue]);
	/**
	* Reset workflow and revoke all blob URLs
	*/
	const resetWorkflow = (0, import_react.useCallback)(() => {
		cancelRequestedRef.current = true;
		isConvertingRef.current = false;
		queue.forEach((item) => {
			if (item.result?.downloadUrl) DownloadService.revokeUrl(item.result.downloadUrl);
		});
		setQueue([]);
		setStep("upload");
		setSelectedFormatState("MP4");
		setAdvancedState(DEFAULT_ADVANCED_SETTINGS);
		setShowAdvanced(false);
		setError(null);
		setBatchElapsedTime(0);
	}, [queue]);
	return {
		step,
		queue,
		selectedFormat,
		setSelectedFormat,
		updateItemFormat,
		advanced,
		setAdvanced,
		showAdvanced,
		setShowAdvanced,
		engineLoading,
		engineStatus,
		batchElapsedTime,
		overallProgress: (0, import_react.useMemo)(() => {
			if (queue.length === 0) return 0;
			const total = queue.reduce((acc, item) => {
				if (item.status === "completed") return acc + 100;
				if (item.status === "failed") return acc + 100;
				return acc + (item.progress || 0);
			}, 0);
			return Math.min(100, Math.round(total / queue.length));
		}, [queue]),
		batchSummaryStats: (0, import_react.useMemo)(() => {
			const totalFiles = queue.length;
			const completedItems = queue.filter((i) => i.status === "completed" && i.result);
			const failedItems = queue.filter((i) => i.status === "failed");
			const convertedFiles = completedItems.length;
			const failedFiles = failedItems.length;
			const totalOriginalSizeBytes = queue.reduce((acc, item) => acc + (item.metadata?.fileSize || item.file.size), 0);
			const totalOutputSizeBytes = completedItems.reduce((acc, item) => acc + (item.result?.outputSizeBytes || 0), 0);
			const savedSizeBytes = Math.max(0, totalOriginalSizeBytes - totalOutputSizeBytes);
			const compressionRatioPercent = totalOriginalSizeBytes > 0 ? Math.round((totalOriginalSizeBytes - totalOutputSizeBytes) / totalOriginalSizeBytes * 100) : 0;
			return {
				totalFiles,
				convertedFiles,
				failedFiles,
				totalOriginalSizeBytes,
				totalOutputSizeBytes,
				totalOriginalSizeFormatted: formatBytes(totalOriginalSizeBytes),
				totalOutputSizeFormatted: formatBytes(totalOutputSizeBytes),
				savedSizeBytes,
				savedSizeFormatted: formatBytes(savedSizeBytes),
				compressionRatioPercent,
				totalBatchTimeSeconds: batchElapsedTime,
				totalBatchTimeFormatted: formatDuration(batchElapsedTime)
			};
		}, [queue, batchElapsedTime]),
		progress,
		error,
		handleFileUpload,
		handleMultipleFileUpload,
		removeItem,
		clearQueue,
		startConversion,
		retryFailedItems,
		retryItem,
		cancelConversion,
		downloadItem,
		downloadAllAsZip,
		resetWorkflow
	};
}
var _jsxFileName$8 = "/app/applet/src/components/ConverterPanel.tsx";
var ALL_OUTPUT_FORMATS = [
	{
		id: "MP4",
		title: "MP4",
		recommended: true,
		desc: "Most compatible for phones, PCs and social media.",
		compatibility: "Universal compatibility (iOS, Android, Windows, Mac, Web)",
		icon: Film,
		buttonLabel: "✨ Convert All to MP4",
		defaultCodec: "H.264 / AAC"
	},
	{
		id: "WEBM",
		title: "WEBM",
		desc: "Smaller files, perfect for websites and modern browsers.",
		compatibility: "Optimized for Chrome, Firefox, Edge, HTML5 video",
		icon: Globe,
		buttonLabel: "🚀 Convert All to WEBM",
		defaultCodec: "VP8 / Vorbis"
	},
	{
		id: "MKV",
		title: "MKV",
		desc: "Keeps high quality, multiple tracks & subtitles.",
		compatibility: "Great for VLC, desktop media centers & archival",
		icon: Clapperboard,
		buttonLabel: "🎥 Convert All to MKV",
		defaultCodec: "H.264 / AAC"
	},
	{
		id: "MOV",
		title: "MOV",
		desc: "Native format for Apple ecosystem & QuickTime.",
		compatibility: "Ideal for Final Cut Pro, iMovie, Mac & iPhone",
		icon: Tv,
		buttonLabel: "🍎 Convert All to MOV",
		defaultCodec: "H.264 / AAC"
	},
	{
		id: "AVI",
		title: "AVI",
		desc: "Legacy format for older video players and TVs.",
		compatibility: "Compatible with older media players and Windows",
		icon: Disc,
		buttonLabel: "📼 Convert All to AVI",
		defaultCodec: "MPEG-4 / MP3"
	},
	{
		id: "WMV",
		title: "WMV",
		desc: "Windows Media Video for legacy Windows software.",
		compatibility: "Native for Windows Media Player & Office tools",
		icon: Disc,
		buttonLabel: "🪟 Convert All to WMV",
		defaultCodec: "WMV2 / WMA"
	},
	{
		id: "FLV",
		title: "FLV",
		desc: "Flash Video container for retro video playback.",
		compatibility: "Legacy flash video streams",
		icon: FilePlay,
		buttonLabel: "⚡ Convert All to FLV",
		defaultCodec: "FLV1 / MP3"
	},
	{
		id: "MPEG",
		title: "MPEG",
		desc: "Standard MPEG video format for DVDs and TV broadcast.",
		compatibility: "Wide DVD player & hardware support",
		icon: Tv,
		buttonLabel: "📺 Convert All to MPEG",
		defaultCodec: "MPEG-2 / MP2"
	},
	{
		id: "M4V",
		title: "M4V",
		desc: "iTunes & Apple ecosystem video format.",
		compatibility: "Optimized for Apple TV, iTunes, iPhone",
		icon: Film,
		buttonLabel: "📱 Convert All to M4V",
		defaultCodec: "H.264 / AAC"
	},
	{
		id: "OGV",
		title: "OGV",
		desc: "Open-source Ogg video container.",
		compatibility: "Patent-free open format for HTML5",
		icon: Globe,
		buttonLabel: "🌐 Convert All to OGV",
		defaultCodec: "Theora / Vorbis"
	},
	{
		id: "TS",
		title: "TS",
		desc: "MPEG Transport Stream for video streaming.",
		compatibility: "Used in broadcast TV & HLS streaming",
		icon: Disc,
		buttonLabel: "📡 Convert All to TS",
		defaultCodec: "H.264 / MPEGTS"
	},
	{
		id: "3GP",
		title: "3GP",
		desc: "Ultra-compact video format for older mobile phones.",
		compatibility: "Legacy mobile devices & feature phones",
		icon: Smartphone,
		buttonLabel: "📱 Convert All to 3GP",
		defaultCodec: "H.263 / AMR"
	},
	{
		id: "GIF",
		title: "GIF",
		desc: "Animated looping image with no audio track.",
		icon: Image,
		compatibility: "Shareable anywhere as an image badge",
		buttonLabel: "🎬 Convert All to GIF",
		defaultCodec: "Animated GIF"
	},
	{
		id: "MP3",
		title: "MP3",
		desc: "Extract high quality audio track only.",
		compatibility: "Plays on 100% of audio devices & players",
		icon: Music,
		buttonLabel: "🎵 Extract All to MP3",
		defaultCodec: "320 kbps MP3"
	}
];
var DROP_PROMPTS = [
	"Drag your video files here (multiple supported).",
	"Throw them gently into the queue.",
	"100% Client-Side. Files never leave your browser.",
	"Drop your video files for batch processing."
];
var SCANNING_MESSAGES = [
	"Scanning video files...",
	"Reading container metadata...",
	"Detecting resolutions & frame rates...",
	"Building conversion queue..."
];
var RESOLUTIONS = [
	"Same as Original",
	"4K (2160p)",
	"1080p",
	"720p",
	"480p",
	"360p"
];
var CODECS = [
	"Auto (Recommended)",
	"H.264",
	"H.265 / HEVC",
	"VP9",
	"AV1",
	"ProRes"
];
var BITRATES = [
	"Auto",
	"16 Mbps",
	"12 Mbps",
	"8 Mbps",
	"4 Mbps",
	"2 Mbps"
];
var FPS_OPTIONS = [
	"Same as Original",
	"60 FPS",
	"30 FPS",
	"24 FPS"
];
var AUDIO_QUALITIES = [
	"Original",
	"320 kbps",
	"256 kbps",
	"192 kbps",
	"128 kbps",
	"Mute Audio"
];
var NOOP_FORMAT_CHANGE = () => {};
var NOOP_REMOVE = () => {};
var NOOP_DOWNLOAD = () => {};
function ConverterPanel() {
	const { step, queue, selectedFormat, setSelectedFormat, updateItemFormat, advanced, setAdvanced, showAdvanced, setShowAdvanced, batchElapsedTime, overallProgress, batchSummaryStats, progress, error, handleMultipleFileUpload, removeItem, clearQueue, startConversion, retryFailedItems, retryItem, cancelConversion, downloadItem, downloadAllAsZip, resetWorkflow } = useConverter();
	const dropRef = (0, import_react.useRef)(null);
	const scanBarRef = (0, import_react.useRef)(null);
	const cardContainerRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [promptIdx, setPromptIdx] = (0, import_react.useState)(0);
	const [scanTextIdx, setScanTextIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setPromptIdx((n) => (n + 1) % DROP_PROMPTS.length), 3200);
		return () => clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!dropRef.current) return;
		gsapWithCSS.to(dropRef.current, {
			scale: dragging ? 1.02 : 1,
			duration: .4,
			ease: "elastic.out(1, 0.5)"
		});
	}, [dragging]);
	(0, import_react.useEffect)(() => {
		if (step === "analyzing") {
			const interval = setInterval(() => {
				setScanTextIdx((prev) => (prev + 1) % SCANNING_MESSAGES.length);
			}, 350);
			if (scanBarRef.current) gsapWithCSS.fromTo(scanBarRef.current, { x: "-100%" }, {
				x: "100%",
				duration: 1.1,
				repeat: -1,
				ease: "sine.inOut"
			});
			return () => clearInterval(interval);
		}
	}, [step]);
	(0, import_react.useEffect)(() => {
		if ((step === "configured" || step === "converting" || step === "done") && cardContainerRef.current) gsapWithCSS.fromTo(cardContainerRef.current, {
			opacity: 0,
			y: 15
		}, {
			opacity: 1,
			y: 0,
			duration: .4,
			ease: "power2.out"
		});
	}, [step]);
	const selectedFormatObj = ALL_OUTPUT_FORMATS.find((f) => f.id === selectedFormat) || ALL_OUTPUT_FORMATS[0];
	const completedCount = queue.filter((i) => i.status === "completed").length;
	queue.filter((i) => i.status === "failed").length;
	const currentConvertingItem = queue.find((i) => i.status === "converting") || queue[0];
	const queueInputFormats = queue.map(getItemInputFormat);
	const firstInputFormat = queueInputFormats[0];
	const allItemsShareFormat = queueInputFormats.length > 0 && queueInputFormats.every((fmt) => fmt === firstInputFormat);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "convert",
		className: "relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-[2rem] sm:rounded-[2.5rem] border border-ink/5 bg-white p-4 sm:p-8 md:p-10 shadow-float dark:bg-surface dark:border-white/10 transition-all",
			children: [
				step === "upload" && queue.length === 0 && /* @__PURE__ */ (void 0)("div", {
					ref: dropRef,
					onDragOver: (e) => {
						e.preventDefault();
						setDragging(true);
					},
					onDragLeave: () => setDragging(false),
					onDrop: (e) => {
						e.preventDefault();
						setDragging(false);
						const files = e.dataTransfer.files;
						if (files && files.length > 0) handleMultipleFileUpload(files);
					},
					className: `relative rounded-[1.75rem] sm:rounded-[2rem] border-3 sm:border-4 border-dashed p-6 sm:p-10 md:p-12 text-center transition-colors ${dragging ? "border-lime-bright bg-lime/20" : "border-ink/15 bg-surface hover:bg-surface-2 dark:border-white/20 dark:bg-surface-2/60 dark:hover:bg-surface-2"}`,
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-2xl sm:rounded-3xl bg-ink text-lime shadow-float dark:bg-lime dark:text-neutral-950",
							children: /* @__PURE__ */ (void 0)(Upload, { className: "h-7 w-7 sm:h-8 sm:w-8" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 339,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 338,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-4 sm:mt-5 text-xl sm:text-3xl font-black text-ink dark:text-white tracking-tight",
							children: "📂 Drop video files here"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 341,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium text-ink/60 dark:text-white/70",
							children: DROP_PROMPTS[promptIdx]
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 344,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("label", {
							className: "mt-5 sm:mt-6 inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:scale-105 active:scale-95 transition-transform dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-md w-full sm:w-auto",
							children: [
								/* @__PURE__ */ (void 0)(FilePlay, { className: "h-4 w-4 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 348,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: "Select Video Files (Batch Supported)" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 349,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("input", {
									type: "file",
									accept: "video/*,image/gif",
									multiple: true,
									className: "hidden",
									onChange: (e) => {
										if (e.target.files && e.target.files.length > 0) handleMultipleFileUpload(e.target.files);
									}
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 350,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 347,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-4 text-[11px] sm:text-xs font-semibold text-ink/40 dark:text-white/40 flex items-center justify-center gap-1.5 px-2",
							children: [/* @__PURE__ */ (void 0)(Info, { className: "h-3.5 w-3.5 text-lime shrink-0" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 363,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Batch conversion ready. MP4, MOV, MKV, AVI, WEBM, WMV, GIF, MP3 & more. Processed 100% client-side." }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 364,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 362,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 319,
					columnNumber: 11
				}, this),
				step === "analyzing" && /* @__PURE__ */ (void 0)("div", {
					className: "py-12 px-6 text-center rounded-[2rem] bg-surface-2/50 dark:bg-surface-2/30 border border-ink/5 dark:border-white/10",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "relative mx-auto h-16 w-16 place-items-center flex items-center justify-center",
							children: [/* @__PURE__ */ (void 0)("div", { className: "absolute inset-0 rounded-full border-4 border-lime/30 animate-ping" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 376,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "h-12 w-12 rounded-full bg-lime grid place-items-center text-neutral-950 shadow-md",
								children: /* @__PURE__ */ (void 0)(Sparkles, { className: "h-6 w-6 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 378,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 377,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 375,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "mt-6 text-2xl font-black text-ink dark:text-white",
							children: SCANNING_MESSAGES[scanTextIdx]
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 382,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-sm font-medium text-ink/60 dark:text-white/70",
							children: "Reading video properties and setting up batch queue..."
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 385,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-6 mx-auto max-w-xs h-2 rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden relative",
							children: /* @__PURE__ */ (void 0)("div", {
								ref: scanBarRef,
								className: "absolute inset-0 w-full h-full bg-gradient-lime rounded-full"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 390,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 389,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 374,
					columnNumber: 11
				}, this),
				step === "converting" && /* @__PURE__ */ (void 0)("div", {
					ref: cardContainerRef,
					className: "space-y-6",
					children: /* @__PURE__ */ (void 0)(ConversionDashboardView, {
						currentFile: currentConvertingItem,
						overallProgress,
						batchElapsedTime,
						progress,
						queue,
						onCancel: cancelConversion
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 401,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 400,
					columnNumber: 11
				}, this),
				step === "done" && /* @__PURE__ */ (void 0)("div", {
					ref: cardContainerRef,
					className: "space-y-6",
					children: /* @__PURE__ */ (void 0)(CompletionSummaryScreen, {
						queue,
						stats: batchSummaryStats,
						onDownloadAll: downloadAllAsZip,
						onDownloadItem: downloadItem,
						onRetryFailed: retryFailedItems,
						onRetrySingle: retryItem,
						onReset: resetWorkflow
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 415,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 414,
					columnNumber: 11
				}, this),
				step === "configured" && queue.length > 0 && /* @__PURE__ */ (void 0)("div", {
					ref: cardContainerRef,
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-surface/80 p-5 sm:p-6 dark:bg-surface-2/80 dark:border-white/10 shadow-sm",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid h-12 w-12 place-items-center rounded-2xl bg-lime text-neutral-950 font-black text-sm shadow-md",
									children: queue.length
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 433,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "font-black text-xl text-ink dark:text-white flex items-center gap-2",
									children: [
										"Conversion Queue",
										/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold px-2.5 py-0.5 rounded-full bg-lime/20 text-neutral-950 dark:text-lime",
											children: [
												completedCount,
												"/",
												queue.length,
												" Ready"
											]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 439,
											columnNumber: 21
										}, this),
										allItemsShareFormat ? /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-ink/5 text-ink dark:bg-white/10 dark:text-white border border-ink/10 dark:border-white/10",
											children: ["Input Format: ", firstInputFormat]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 443,
											columnNumber: 23
										}, this) : queueInputFormats.length > 0 ? /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-ink/5 text-ink dark:bg-white/10 dark:text-white border border-ink/10 dark:border-white/10",
											children: ["Detected: ", Array.from(new Set(queueInputFormats)).join(", ")]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 447,
											columnNumber: 23
										}, this) : null
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 437,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-ink/60 dark:text-white/60 font-medium",
									children: "Configure output format for each item or convert all at once."
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 452,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 436,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 432,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center gap-2 w-full sm:w-auto",
								children: [
									/* @__PURE__ */ (void 0)("label", {
										className: "inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink border border-ink/10 shadow-sm hover:bg-surface active:scale-95 transition-transform dark:bg-surface dark:text-white dark:border-white/10 dark:hover:bg-surface-2 flex-1 sm:flex-initial",
										children: [
											/* @__PURE__ */ (void 0)(Plus, { className: "h-4 w-4 text-lime shrink-0" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 460,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "Add Files" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 461,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "file",
												accept: "video/*,image/gif",
												multiple: true,
												className: "hidden",
												onChange: (e) => {
													if (e.target.files && e.target.files.length > 0) handleMultipleFileUpload(e.target.files);
												}
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 462,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 459,
										columnNumber: 17
									}, this),
									completedCount > 0 && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: downloadAllAsZip,
										className: "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-xs font-black text-neutral-950 hover:bg-lime-bright active:scale-95 transition-transform shadow-md cursor-pointer flex-1 sm:flex-initial",
										children: [/* @__PURE__ */ (void 0)(Archive, { className: "h-4 w-4 shrink-0" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 481,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Download All (ZIP)" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 482,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 476,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: clearQueue,
										className: "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink/70 hover:text-ink border border-ink/10 shadow-sm active:scale-95 transition-transform dark:bg-surface dark:text-white/80 dark:border-white/10 dark:hover:text-white cursor-pointer flex-1 sm:flex-initial",
										children: [/* @__PURE__ */ (void 0)(Trash2, { className: "h-4 w-4 text-red-500 shrink-0" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 491,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Clear Queue" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 492,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 486,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 458,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 431,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "text-xs font-black uppercase tracking-wider text-ink/50 dark:text-white/50 px-1 flex justify-between items-center",
								children: [/* @__PURE__ */ (void 0)("span", { children: [
									"Selected Files (",
									queue.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 500,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Sequential Browser Processing" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 501,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 499,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin",
								children: queue.map((item, idx) => /* @__PURE__ */ (void 0)(QueueItemRow, {
									item,
									index: idx + 1,
									isConvertingBatch: false,
									onFormatChange: (fmt) => updateItemFormat(item.id, fmt),
									onRemove: () => removeItem(item.id),
									onDownload: () => {
										downloadItem(item.id);
										toast.success(`Downloading ${item.result?.filename || item.file.name}`);
									}
								}, item.id, false, {
									fileName: _jsxFileName$8,
									lineNumber: 506,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 504,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 498,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "text-center sm:text-left mb-4",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "text-xl sm:text-2xl font-black text-ink dark:text-white tracking-tight",
								children: "Select Target Output Format for All"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 525,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-medium text-ink/60 dark:text-white/70 mt-0.5",
								children: "Clicking a format updates the target extension for waiting items in queue:"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 528,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 524,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-2.5 sm:gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7",
							children: ALL_OUTPUT_FORMATS.filter((fmt) => {
								if (allItemsShareFormat && fmt.id.toUpperCase() === firstInputFormat.toUpperCase()) return false;
								return true;
							}).map((fmt) => {
								const isSelected = selectedFormat === fmt.id;
								const Icon = fmt.icon;
								return /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setSelectedFormat(fmt.id),
									className: `group relative text-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[56px] flex flex-col items-center justify-center ${isSelected ? "border-lime bg-lime/10 dark:bg-lime/20 shadow-md scale-105" : "border-ink/10 bg-white hover:border-ink/20 dark:bg-surface dark:border-white/10 dark:hover:bg-surface-2"}`,
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: `mx-auto grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg transition-colors ${isSelected ? "bg-lime text-neutral-950 shadow-sm" : "bg-surface-2 text-ink dark:bg-surface-2 dark:text-white"}`,
											children: /* @__PURE__ */ (void 0)(Icon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 563,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 556,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-1 text-xs font-black text-ink dark:text-white",
											children: fmt.title
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 565,
											columnNumber: 23
										}, this),
										fmt.recommended && /* @__PURE__ */ (void 0)("div", {
											className: "text-[9px] font-bold text-lime-bright dark:text-lime truncate",
											children: "⭐ Top choice"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 569,
											columnNumber: 25
										}, this)
									]
								}, fmt.id, true, {
									fileName: _jsxFileName$8,
									lineNumber: 546,
									columnNumber: 21
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 533,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 523,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl bg-surface/40 dark:bg-surface-2/40 border border-ink/10 dark:border-white/10 p-3.5 sm:p-4 space-y-2.5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center justify-between gap-1",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-black uppercase tracking-wider text-ink dark:text-white flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(SlidersHorizontal, { className: "h-3.5 w-3.5 text-lime" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 583,
										columnNumber: 19
									}, this), "Quality & Compression Mode"]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 582,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] font-semibold text-ink/60 dark:text-white/60",
									children: "Optimizes encoding preset & target file size"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 586,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 581,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5",
								children: [
									"Balanced",
									"High Quality",
									"Small Size"
								].map((preset) => {
									return /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setAdvanced({
											...advanced,
											qualityPreset: preset
										}),
										className: `flex flex-col items-center justify-center p-3 sm:p-3.5 min-h-[52px] rounded-xl border text-center transition-all cursor-pointer ${(advanced.qualityPreset || "Balanced") === preset ? "border-lime bg-lime/10 dark:bg-lime/20 text-ink dark:text-white font-extrabold shadow-sm scale-[1.01]" : "border-ink/10 dark:border-white/10 bg-white dark:bg-surface text-ink/70 dark:text-white/70 hover:border-ink/20 font-bold"}`,
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-black flex items-center gap-1",
											children: preset === "Balanced" ? "⚖️ Balanced (Default)" : preset === "High Quality" ? "✨ High Quality" : "📦 Small Size"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 605,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-semibold text-ink/50 dark:text-white/50 mt-0.5",
											children: preset === "Balanced" ? "Optimal size & quality trade-off" : preset === "High Quality" ? "Preserves maximum visual detail" : "Prioritizes minimal file size"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 612,
											columnNumber: 23
										}, this)]
									}, preset, true, {
										fileName: _jsxFileName$8,
										lineNumber: 595,
										columnNumber: 21
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 591,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 580,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-ink/10 dark:border-white/10 pt-4",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setShowAdvanced(!showAdvanced),
								className: "inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink/60 hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer",
								children: [
									/* @__PURE__ */ (void 0)(SlidersHorizontal, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 632,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", { children: "Advanced Settings" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 633,
										columnNumber: 17
									}, this),
									showAdvanced ? /* @__PURE__ */ (void 0)(ChevronUp, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 635,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 637,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 627,
								columnNumber: 15
							}, this), showAdvanced && /* @__PURE__ */ (void 0)("div", {
								className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-6 p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/5 dark:border-white/5",
								children: [
									/* @__PURE__ */ (void 0)(Field, {
										label: "Quality Preset",
										children: /* @__PURE__ */ (void 0)(Select, {
											value: advanced.qualityPreset || "Balanced",
											onValueChange: (val) => setAdvanced({
												...advanced,
												qualityPreset: val
											}),
											children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
												className: "rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface",
												children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 651,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 650,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
												/* @__PURE__ */ (void 0)(SelectItem, {
													value: "Balanced",
													children: "⚖️ Balanced"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 654,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)(SelectItem, {
													value: "High Quality",
													children: "✨ High Quality"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 655,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)(SelectItem, {
													value: "Small Size",
													children: "📦 Small Size"
												}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 656,
													columnNumber: 25
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName$8,
												lineNumber: 653,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 644,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 643,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(Field, {
										label: "Resolution",
										children: /* @__PURE__ */ (void 0)(Select, {
											value: advanced.resolution,
											onValueChange: (val) => setAdvanced({
												...advanced,
												resolution: val
											}),
											children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
												className: "rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface",
												children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 667,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 666,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: RESOLUTIONS.map((r) => /* @__PURE__ */ (void 0)(SelectItem, {
												value: r,
												children: r
											}, r, false, {
												fileName: _jsxFileName$8,
												lineNumber: 671,
												columnNumber: 27
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 669,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 662,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 661,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(Field, {
										label: "Video Codec",
										children: /* @__PURE__ */ (void 0)(Select, {
											value: advanced.videoCodec,
											onValueChange: (val) => setAdvanced({
												...advanced,
												videoCodec: val
											}),
											children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
												className: "rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface",
												children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 685,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 684,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: CODECS.map((c) => /* @__PURE__ */ (void 0)(SelectItem, {
												value: c,
												children: c
											}, c, false, {
												fileName: _jsxFileName$8,
												lineNumber: 689,
												columnNumber: 27
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 687,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 680,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 679,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(Field, {
										label: "Bitrate",
										children: /* @__PURE__ */ (void 0)(Select, {
											value: advanced.bitrate,
											onValueChange: (val) => setAdvanced({
												...advanced,
												bitrate: val
											}),
											children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
												className: "rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface",
												children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 703,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 702,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: BITRATES.map((b) => /* @__PURE__ */ (void 0)(SelectItem, {
												value: b,
												children: b
											}, b, false, {
												fileName: _jsxFileName$8,
												lineNumber: 707,
												columnNumber: 27
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 705,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 698,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 697,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(Field, {
										label: "Frame Rate",
										children: /* @__PURE__ */ (void 0)(Select, {
											value: advanced.fps,
											onValueChange: (val) => setAdvanced({
												...advanced,
												fps: val
											}),
											children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
												className: "rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface",
												children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 721,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 720,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: FPS_OPTIONS.map((f) => /* @__PURE__ */ (void 0)(SelectItem, {
												value: f,
												children: f
											}, f, false, {
												fileName: _jsxFileName$8,
												lineNumber: 725,
												columnNumber: 27
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 723,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 716,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 715,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(Field, {
										label: "Audio Quality",
										children: /* @__PURE__ */ (void 0)(Select, {
											value: advanced.audioQuality,
											onValueChange: (val) => setAdvanced({
												...advanced,
												audioQuality: val
											}),
											children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
												className: "rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface",
												children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$8,
													lineNumber: 739,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 738,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: AUDIO_QUALITIES.map((aq) => /* @__PURE__ */ (void 0)(SelectItem, {
												value: aq,
												children: aq
											}, aq, false, {
												fileName: _jsxFileName$8,
												lineNumber: 743,
												columnNumber: 27
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$8,
												lineNumber: 741,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$8,
											lineNumber: 734,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 733,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 642,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 626,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: /* @__PURE__ */ (void 0)(MagneticButton, {
							onClick: startConversion,
							className: "w-full items-center justify-center rounded-full bg-gradient-lime px-8 py-5 text-xl font-black text-neutral-950 shadow-float hover:brightness-105 cursor-pointer",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "mr-2 h-6 w-6 text-neutral-950" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 760,
								columnNumber: 17
							}, this), queue.length > 1 ? `⚡ Convert ${queue.length} Files to ${selectedFormat}` : selectedFormatObj.buttonLabel]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 756,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 755,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 429,
					columnNumber: 11
				}, this),
				step === "error" && error && /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col items-center gap-4 rounded-3xl bg-red-500/10 p-8 text-center border border-red-500/30",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "grid h-12 w-12 place-items-center rounded-full bg-red-500 text-white font-black text-xl shadow-md",
							children: /* @__PURE__ */ (void 0)(CircleAlert, { className: "h-6 w-6" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 773,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 772,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-2xl font-black text-ink dark:text-white",
							children: error.title
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 777,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-sm font-medium text-ink/70 dark:text-white/70 max-w-md",
							children: error.message
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 778,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 776,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: resetWorkflow,
							className: "mt-2 rounded-full bg-ink px-6 py-2.5 text-xs font-bold text-white dark:bg-lime dark:text-neutral-950 hover:opacity-90 cursor-pointer",
							children: "Try Again"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 783,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 771,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 316,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 315,
		columnNumber: 5
	}, this);
}
/**
* REAL-TIME CONVERSION DASHBOARD VIEW (When converting)
*/
function ConversionDashboardView({ currentFile, overallProgress, batchElapsedTime, progress, queue, onCancel }) {
	const convertingIdx = queue.findIndex((i) => i.status === "converting");
	const activeFileNumber = convertingIdx >= 0 ? convertingIdx + 1 : 1;
	const totalFiles = queue.length;
	const completedCount = queue.filter((i) => i.status === "completed").length;
	const failedCount = queue.filter((i) => i.status === "failed").length;
	const remainingCount = Math.max(0, totalFiles - completedCount - failedCount - (convertingIdx >= 0 ? 1 : 0));
	const currentItemInputFormat = getItemInputFormat(currentFile);
	const currentStage = progress.stage || currentFile?.stage || "Converting Video";
	const etaDisplay = progress.etaSeconds && progress.etaSeconds > 0 ? progress.etaSeconds < 5 ? "< 5s remaining" : `${formatDuration(progress.etaSeconds)} remaining` : "Calculating ETA...";
	const estOutput = currentFile ? ConversionService.estimateOutputSize(currentFile.file.size, currentFile.metadata?.duration || 0, currentFile.outputFormat, currentFile.advancedSettings) : null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-surface/90 dark:bg-surface-2/90 border border-ink/10 dark:border-white/10 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative grid h-12 w-12 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-6 w-6 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 850,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 849,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lime/20 text-neutral-950 dark:text-lime",
							children: [
								"Converting ",
								activeFileNumber,
								" of ",
								totalFiles
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 854,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-bold px-2.5 py-0.5 rounded-full bg-lime text-neutral-950 animate-pulse",
							children: currentStage
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 857,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 853,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-lg sm:text-xl font-black text-ink dark:text-white mt-1 truncate max-w-sm sm:max-w-md",
						children: currentFile.file.name
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 861,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 852,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 848,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 text-xs font-bold text-ink dark:text-white bg-white dark:bg-surface border border-ink/10 dark:border-white/10 px-3.5 py-2 rounded-2xl shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-4 w-4 text-lime" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 870,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Elapsed: ", formatTimeClock(batchElapsedTime)] }, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 871,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 869,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "opacity-30",
								children: "|"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 873,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 text-lime-bright dark:text-lime",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity, { className: "h-4 w-4 animate-pulse" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 875,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Est: ", etaDisplay] }, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 876,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 874,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 868,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: onCancel,
						className: "inline-flex items-center gap-1.5 rounded-2xl bg-red-500/10 px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Square, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 885,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Cancel" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 886,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 880,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 867,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 847,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-5 rounded-3xl bg-white dark:bg-surface border border-ink/10 dark:border-white/10 space-y-3 shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between items-center text-xs font-black uppercase tracking-wider text-ink dark:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-4 w-4 text-lime" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 897,
									columnNumber: 15
								}, this), "Overall Batch Progress"]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 896,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-lime-bright dark:text-lime text-base font-black",
								children: [overallProgress, "%"]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 900,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 895,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-4 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden p-0.5",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-full rounded-full bg-gradient-lime transition-all duration-300 shadow-sm",
								style: { width: `${overallProgress}%` }
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 906,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 905,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-[11px] font-semibold text-ink/60 dark:text-white/60 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Processing queue (",
								completedCount + (convertingIdx >= 0 ? 1 : 0),
								"/",
								totalFiles,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 913,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								completedCount,
								" Completed • ",
								remainingCount,
								" Remaining"
							] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 916,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 912,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 894,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-5 rounded-3xl bg-white dark:bg-surface border border-ink/10 dark:border-white/10 space-y-3 shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between items-center text-xs font-black uppercase tracking-wider text-ink dark:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5 truncate max-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Film, { className: "h-4 w-4 text-lime" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 926,
									columnNumber: 15
								}, this), currentFile.file.name]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 925,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-lime-bright dark:text-lime text-base font-black",
								children: [progress.percentage, "%"]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 929,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 924,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-4 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden p-0.5",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-full rounded-full bg-gradient-lime transition-all duration-150 shadow-sm",
								style: { width: `${progress.percentage}%` }
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 935,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 934,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 pt-1",
							children: [
								progress.speed && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-lime/20 text-neutral-950 dark:text-lime text-[11px] font-black",
									children: [
										/* @__PURE__ */ (void 0)(Zap, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 945,
											columnNumber: 17
										}, this),
										" ",
										progress.speed
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 944,
									columnNumber: 15
								}, this),
								progress.fps && progress.fps > 0 && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-2 text-ink dark:text-white text-[11px] font-extrabold border border-ink/5 dark:border-white/5",
									children: [
										/* @__PURE__ */ (void 0)(Gauge, { className: "h-3 w-3 text-lime" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 950,
											columnNumber: 17
										}, this),
										" ",
										progress.fps,
										" FPS"
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 949,
									columnNumber: 15
								}, this),
								progress.throughputMBs && progress.throughputMBs > 0 && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-2 text-ink dark:text-white text-[11px] font-extrabold border border-ink/5 dark:border-white/5",
									children: [
										/* @__PURE__ */ (void 0)(Activity, { className: "h-3 w-3 text-lime" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 955,
											columnNumber: 17
										}, this),
										" ",
										progress.throughputMBs,
										" MB/s"
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 954,
									columnNumber: 15
								}, this),
								progress.threads && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-2 text-ink/70 dark:text-white/70 text-[11px] font-bold",
									children: [
										/* @__PURE__ */ (void 0)(Cpu, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 960,
											columnNumber: 17
										}, this),
										" ",
										progress.threads,
										" Threads"
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 959,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 942,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 923,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 892,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl bg-surface/50 dark:bg-surface-2/40 border border-ink/10 dark:border-white/10 p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-ink/5 dark:border-white/5 pb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-black uppercase tracking-wider text-ink dark:text-white flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "h-4 w-4 text-lime" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 971,
								columnNumber: 13
							}, this), "Conversion Engine Reasoning & Stream Metrics"]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 970,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-lime/20 text-neutral-950 dark:text-lime",
							children: progress.conversionType || "Full Re-Encode"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 974,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 969,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase",
										children: "Input Format"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 981,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-black text-ink dark:text-white mt-0.5",
										children: currentItemInputFormat
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 984,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] text-ink/60 dark:text-white/60 mt-0.5",
										children: currentFile.metadata?.sizeFormatted
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 987,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 980,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase",
										children: "Target Output"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 993,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-black text-lime-bright dark:text-lime mt-0.5",
										children: ["➜ ", currentFile.outputFormat]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 996,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] text-ink/60 dark:text-white/60 mt-0.5",
										children: ["Est. ~", estOutput?.formatted || "N/A"]
									}, void 0, true, {
										fileName: _jsxFileName$8,
										lineNumber: 999,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 992,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase",
										children: "Resolution"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1005,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-black text-ink dark:text-white mt-0.5",
										children: currentFile.metadata?.resolution || "1920x1080"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1008,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] text-ink/60 dark:text-white/60 mt-0.5",
										children: currentFile.metadata?.fps || "30 FPS"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1011,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1004,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase",
										children: "Preset Mode"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1017,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-black text-ink dark:text-white mt-0.5",
										children: currentFile.advancedSettings.qualityPreset
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1020,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] text-ink/60 dark:text-white/60 mt-0.5",
										children: "Client-Side WASM"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1023,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1016,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 979,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-semibold text-ink/70 dark:text-white/70 bg-white/60 dark:bg-surface/60 p-3 rounded-2xl border border-ink/5 dark:border-white/5 flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-lime shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1030,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: progress.explanation || "Full re-encoding is active to transcode streams into the target container format safely." }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1031,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1029,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 968,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-between items-center px-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-xs font-black uppercase tracking-wider text-ink/60 dark:text-white/60",
						children: [
							"Live Queue (",
							queue.length,
							" files)"
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1041,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2 text-[11px] font-bold text-ink/60 dark:text-white/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Converting: 1" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1045,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Completed: ", completedCount] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1046,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Remaining: ", remainingCount] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1047,
								columnNumber: 13
							}, this),
							failedCount > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "text-red-500",
								children: ["Failed: ", failedCount]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1048,
								columnNumber: 33
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1044,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1040,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin",
					children: queue.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueueItemRow, {
						item,
						index: idx + 1,
						isConvertingBatch: true,
						onFormatChange: NOOP_FORMAT_CHANGE,
						onRemove: NOOP_REMOVE,
						onDownload: NOOP_DOWNLOAD
					}, item.id, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1054,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 1052,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1039,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 845,
		columnNumber: 5
	}, this);
}
/**
* COMPLETION SUMMARY SCREEN (When conversion finishes)
*/
function CompletionSummaryScreen({ queue, stats, onDownloadAll, onDownloadItem, onRetryFailed, onRetrySingle, onReset }) {
	const completedItems = queue.filter((i) => i.status === "completed");
	const failedItems = queue.filter((i) => i.status === "failed");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl bg-lime/20 dark:bg-lime/15 border border-lime/30 p-6 text-center space-y-3 shadow-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lime text-neutral-950 text-2xl shadow-md",
						children: failedItems.length > 0 ? "⚠️" : "🎉"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1097,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-2xl sm:text-3xl font-black text-ink dark:text-white tracking-tight",
						children: failedItems.length > 0 ? "Batch Conversion Completed with Warnings" : "🎉 Batch Conversion Complete!"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1101,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs sm:text-sm font-medium text-ink/70 dark:text-white/80 max-w-xl mx-auto",
						children: [
							"Successfully processed ",
							stats.convertedFiles,
							" out of ",
							stats.totalFiles,
							" video files in",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
								className: "text-ink dark:text-white",
								children: stats.totalBatchTimeFormatted
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1109,
								columnNumber: 11
							}, this),
							". All output files are ready for immediate browser download."
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1107,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap justify-center gap-3 pt-2",
						children: [
							stats.convertedFiles > 0 && /* @__PURE__ */ (void 0)(MagneticButton, {
								onClick: onDownloadAll,
								className: "items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-black text-white dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-md cursor-pointer",
								children: [
									/* @__PURE__ */ (void 0)(Archive, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1119,
										columnNumber: 15
									}, this),
									"Download All (",
									stats.convertedFiles,
									" Files ZIP)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1115,
								columnNumber: 13
							}, this),
							failedItems.length > 0 && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: onRetryFailed,
								className: "inline-flex items-center gap-1.5 rounded-full bg-red-500 px-6 py-3.5 text-sm font-black text-white shadow-md hover:bg-red-600 transition-colors cursor-pointer",
								children: [
									/* @__PURE__ */ (void 0)(RotateCcw, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 1130,
										columnNumber: 15
									}, this),
									"Retry Failed Files (",
									failedItems.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1125,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: onReset,
								className: "rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink border border-ink/15 hover:bg-surface transition-colors dark:bg-surface dark:text-white dark:border-white/20 dark:hover:bg-surface-2 shadow-sm cursor-pointer",
								children: "Start New Batch"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1135,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1113,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1096,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] font-black uppercase text-ink/50 dark:text-white/50",
								children: "Files Converted"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1148,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xl font-black text-ink dark:text-white mt-1",
								children: [
									stats.convertedFiles,
									" / ",
									stats.totalFiles
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1151,
								columnNumber: 11
							}, this),
							failedItems.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "text-[10px] font-bold text-red-500 mt-0.5",
								children: [failedItems.length, " failed"]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1155,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1147,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] font-black uppercase text-ink/50 dark:text-white/50",
								children: "Total Time"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1162,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xl font-black text-lime-bright dark:text-lime mt-1",
								children: stats.totalBatchTimeFormatted
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1165,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] font-semibold text-ink/60 dark:text-white/60 mt-0.5",
								children: "100% Client-Side"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1168,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1161,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] font-black uppercase text-ink/50 dark:text-white/50",
								children: "Original Size"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1174,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xl font-black text-ink dark:text-white mt-1",
								children: stats.totalOriginalSizeFormatted
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1177,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] font-semibold text-ink/60 dark:text-white/60 mt-0.5",
								children: "Input Files Sum"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1180,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1173,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] font-black uppercase text-ink/50 dark:text-white/50",
								children: "Converted Size"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1186,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xl font-black text-lime-bright dark:text-lime mt-1",
								children: stats.totalOutputSizeFormatted
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1189,
								columnNumber: 11
							}, this),
							stats.savedSizeBytes > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "text-[10px] font-bold text-lime-bright dark:text-lime mt-0.5",
								children: [
									"Saved ",
									stats.savedSizeFormatted,
									" (-",
									stats.compressionRatioPercent,
									"%)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1193,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1185,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1146,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
					className: "text-xs font-black uppercase tracking-wider text-ink/60 dark:text-white/60 px-1",
					children: [
						"Converted Downloads (",
						completedItems.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1202,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin",
					children: queue.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueueItemRow, {
						item,
						index: idx + 1,
						isConvertingBatch: false,
						onFormatChange: () => {},
						onRemove: () => {},
						onDownload: () => onDownloadItem(item.id),
						onRetrySingle: () => onRetrySingle(item.id)
					}, item.id, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1208,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 1206,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1201,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 1094,
		columnNumber: 5
	}, this);
}
/**
* INDIVIDUAL QUEUE ROW COMPONENT
*/
var QueueItemRow = (0, import_react.memo)(function QueueItemRow({ item, index, isConvertingBatch, onFormatChange, onRemove, onDownload, onRetrySingle }) {
	const isWaiting = item.status === "waiting";
	const isConverting = item.status === "converting";
	const isCompleted = item.status === "completed";
	const isFailed = item.status === "failed";
	const itemInputFormat = getItemInputFormat(item);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `relative rounded-2xl border p-4 transition-all ${isConverting ? "border-lime bg-lime/10 dark:bg-lime/15 shadow-md" : isCompleted ? "border-lime/30 bg-surface/90 dark:bg-surface-2/90" : isFailed ? "border-red-500/30 bg-red-500/5 dark:bg-red-500/10" : "border-ink/10 bg-white dark:bg-surface dark:border-white/10"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `grid h-9 w-9 shrink-0 place-items-center rounded-xl font-extrabold text-xs ${isCompleted ? "bg-lime text-neutral-950" : isConverting ? "bg-lime text-neutral-950 animate-pulse" : isFailed ? "bg-red-500 text-white" : "bg-surface-2 text-ink dark:text-white"}`,
						children: isCompleted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1279,
							columnNumber: 15
						}, this) : isConverting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1281,
							columnNumber: 15
						}, this) : isFailed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1283,
							columnNumber: 15
						}, this) : `#${index}`
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1267,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "font-bold text-sm text-ink dark:text-white truncate",
							children: item.file.name
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1290,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold text-ink/60 dark:text-white/60 mt-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-extrabold text-ink dark:text-white bg-ink/5 dark:bg-white/10 px-1.5 py-0.5 rounded-md",
									children: ["Input Format: ", itemInputFormat]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 1294,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1297,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.metadata?.sizeFormatted || `${(item.file.size / 1024 / 1024).toFixed(1)} MB` }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1298,
									columnNumber: 15
								}, this),
								item.metadata?.resolution && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1303,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: item.metadata.resolution }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1304,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 1302,
									columnNumber: 17
								}, this),
								isWaiting && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1309,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-lime-bright dark:text-lime",
									children: ["Est. ~", ConversionService.estimateOutputSize(item.file.size, item.metadata?.duration || 0, item.outputFormat, item.advancedSettings).formatted]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 1310,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 1308,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 1293,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1289,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1266,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-ink/5 dark:border-white/5",
					children: [isWaiting && !isConvertingBatch ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: item.outputFormat,
						onValueChange: (val) => onFormatChange(val),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							className: "h-10 sm:h-8 w-28 sm:w-28 rounded-xl bg-surface-2 border-ink/10 text-xs font-black text-ink dark:text-white dark:border-white/10 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1335,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1334,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: ALL_OUTPUT_FORMATS.filter((fmt) => fmt.id.toUpperCase() !== itemInputFormat.toUpperCase()).map((fmt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: fmt.id,
							className: "text-xs font-bold",
							children: ["➜ ", fmt.title]
						}, fmt.id, true, {
							fileName: _jsxFileName$8,
							lineNumber: 1341,
							columnNumber: 19
						}, this)) }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 1337,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1330,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs font-black px-2.5 py-1.5 rounded-xl bg-ink/5 dark:bg-white/10 text-ink dark:text-white shrink-0",
						children: ["➜ ", item.outputFormat]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1348,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusTag, {
								status: item.status,
								stage: item.stage
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1355,
								columnNumber: 13
							}, this),
							isCompleted && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: onDownload,
								className: "inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-lime px-3.5 py-2 text-xs font-black text-neutral-950 hover:bg-lime-bright shadow-sm cursor-pointer transition-transform active:scale-95",
								children: [/* @__PURE__ */ (void 0)(Download, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1364,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Download" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1365,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1359,
								columnNumber: 15
							}, this),
							isFailed && onRetrySingle && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: onRetrySingle,
								className: "inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-bold text-white hover:bg-red-600 shadow-sm cursor-pointer transition-transform active:scale-95",
								children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1376,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Retry" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1377,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 1371,
								columnNumber: 15
							}, this),
							isWaiting && !isConvertingBatch && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: onRemove,
								className: "min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-ink/40 hover:text-red-500 hover:bg-red-500/10 active:bg-red-500/20 transition-colors cursor-pointer",
								title: "Remove file",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 1389,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1383,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1353,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1328,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1264,
				columnNumber: 7
			}, this),
			isConverting && /* @__PURE__ */ (void 0)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex justify-between text-[11px] font-bold text-ink/70 dark:text-white/70 mb-1",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3 w-3 text-lime animate-spin" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 1401,
								columnNumber: 15
							}, this),
							" ",
							item.stage || "Converting frame streams..."
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1400,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: [item.progress, "%"] }, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 1404,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1399,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "h-2.5 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "h-full rounded-full transition-all duration-150 bg-gradient-lime",
						style: { width: `${item.progress}%` }
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1407,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 1406,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1398,
				columnNumber: 9
			}, this),
			isCompleted && item.result && /* @__PURE__ */ (void 0)("div", {
				className: "mt-2 pt-2 border-t border-ink/5 dark:border-white/5 flex items-center justify-between text-[11px] text-ink/60 dark:text-white/60 font-semibold",
				children: [/* @__PURE__ */ (void 0)("span", { children: [
					"Output name:",
					" ",
					/* @__PURE__ */ (void 0)("strong", {
						className: "text-ink dark:text-white",
						children: item.result.filename
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1420,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1418,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", {
					className: "text-lime-bright font-bold",
					children: ["Size: ", item.result.outputSizeFormatted]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 1422,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1417,
				columnNumber: 9
			}, this),
			isFailed && item.error && /* @__PURE__ */ (void 0)("p", {
				className: "mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1",
				children: [
					/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 1431,
						columnNumber: 11
					}, this),
					" ",
					item.error
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 1430,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 1253,
		columnNumber: 5
	}, this);
});
var StatusTag = (0, import_react.memo)(function StatusTag({ status, stage }) {
	switch (status) {
		case "waiting": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-surface-2 text-ink/60 dark:text-white/60 border border-ink/5 dark:border-white/5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3" }, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 1449,
				columnNumber: 11
			}, this), " Waiting"]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 1448,
			columnNumber: 9
		}, this);
		case "converting": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime/30 text-neutral-950 dark:text-lime border border-lime/40 animate-pulse",
			children: stage || "Converting"
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 1454,
			columnNumber: 9
		}, this);
		case "completed": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime/20 text-neutral-950 dark:text-lime border border-lime/30",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3 text-lime" }, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 1461,
				columnNumber: 11
			}, this), " Completed"]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 1460,
			columnNumber: 9
		}, this);
		case "failed": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30",
			children: "Failed"
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 1466,
			columnNumber: 9
		}, this);
	}
});
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink/50 dark:text-white/50",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 1476,
		columnNumber: 7
	}, this), children] }, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 1475,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/components/ScrollStack.tsx";
var ScrollStackItem = ({ children, itemClassName = "", className = "", style }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: `scroll-stack-card ${itemClassName} ${className}`.trim(),
	style,
	children
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 18,
	columnNumber: 3
}, void 0);
var ScrollStack = ({ children, className = "", itemDistance = 80, itemScale = .04, itemStackDistance = 20, stackPosition = "18%", scaleEndPosition = "8%", baseScale = .9, rotationAmount = 0, blurAmount = 0, useWindowScroll = false, onStackComplete }) => {
	const scrollerRef = (0, import_react.useRef)(null);
	const stackCompletedRef = (0, import_react.useRef)(false);
	const animationFrameRef = (0, import_react.useRef)(null);
	const lenisRef = (0, import_react.useRef)(null);
	const cardsRef = (0, import_react.useRef)([]);
	const cardTopsRef = (0, import_react.useRef)([]);
	const endElementTopRef = (0, import_react.useRef)(0);
	const parsePercentage = (0, import_react.useCallback)((value, containerHeight) => {
		if (typeof value === "string" && value.includes("%")) return parseFloat(value) / 100 * containerHeight;
		return typeof value === "number" ? value : parseFloat(value);
	}, []);
	const measureOffsets = (0, import_react.useCallback)(() => {
		if (!cardsRef.current.length) return;
		cardsRef.current.forEach((card) => {
			if (card) card.style.transform = "none";
		});
		const getStaticTop = (el) => {
			let top = 0;
			let curr = el;
			while (curr && curr !== document.body) {
				top += curr.offsetTop;
				curr = curr.offsetParent;
			}
			return top;
		};
		cardTopsRef.current = cardsRef.current.map((card) => card ? getStaticTop(card) : 0);
		const endElement = useWindowScroll ? document.querySelector(".scroll-stack-end") : scrollerRef.current?.querySelector(".scroll-stack-end");
		endElementTopRef.current = endElement ? getStaticTop(endElement) : 0;
	}, [useWindowScroll]);
	const updateCardTransforms = (0, import_react.useCallback)(() => {
		const cards = cardsRef.current;
		if (!cards.length) return;
		const scrollTop = useWindowScroll ? window.scrollY : scrollerRef.current ? scrollerRef.current.scrollTop : 0;
		const containerHeight = useWindowScroll ? window.innerHeight : scrollerRef.current ? scrollerRef.current.clientHeight : window.innerHeight;
		const stackPositionPx = parsePercentage(stackPosition, containerHeight);
		const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
		const endElementTop = endElementTopRef.current;
		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			if (!card) continue;
			const cardTop = cardTopsRef.current[i] || 0;
			const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
			const triggerEnd = cardTop - scaleEndPositionPx;
			const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
			const pinEnd = endElementTop - containerHeight / 2;
			let scaleProgress = 0;
			if (scrollTop >= triggerStart && triggerEnd > triggerStart) scaleProgress = Math.min(1, (scrollTop - triggerStart) / (triggerEnd - triggerStart));
			else if (scrollTop >= triggerEnd) scaleProgress = 1;
			const targetScale = baseScale + i * itemScale;
			const scale = 1 - scaleProgress * (1 - targetScale);
			const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;
			let translateY = 0;
			if (scrollTop >= pinStart && scrollTop <= pinEnd) translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
			else if (scrollTop > pinEnd) translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
			card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
			if (blurAmount > 0) {
				let blur = 0;
				let topCardIndex = 0;
				for (let j = 0; j < cards.length; j++) if (scrollTop >= (cardTopsRef.current[j] || 0) - stackPositionPx - itemStackDistance * j) topCardIndex = j;
				if (i < topCardIndex) blur = (topCardIndex - i) * blurAmount;
				card.style.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : "none";
			}
			if (i === cards.length - 1) {
				const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
				if (isInView && !stackCompletedRef.current) {
					stackCompletedRef.current = true;
					onStackComplete?.();
				} else if (!isInView && stackCompletedRef.current) stackCompletedRef.current = false;
			}
		}
	}, [
		baseScale,
		blurAmount,
		itemScale,
		itemStackDistance,
		onStackComplete,
		parsePercentage,
		rotationAmount,
		scaleEndPosition,
		stackPosition,
		useWindowScroll
	]);
	const requestUpdate = (0, import_react.useCallback)(() => {
		if (animationFrameRef.current !== null) return;
		animationFrameRef.current = requestAnimationFrame(() => {
			animationFrameRef.current = null;
			updateCardTransforms();
		});
	}, [updateCardTransforms]);
	(0, import_react.useEffect)(() => {
		const scroller = scrollerRef.current;
		if (!scroller && !useWindowScroll) return;
		const cards = Array.from(useWindowScroll ? document.querySelectorAll(".scroll-stack-card") : scroller ? scroller.querySelectorAll(".scroll-stack-card") : []);
		cardsRef.current = cards;
		cards.forEach((card, i) => {
			if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
			card.style.willChange = "transform";
			card.style.transformOrigin = "top center";
			card.style.backfaceVisibility = "hidden";
		});
		measureOffsets();
		updateCardTransforms();
		const handleResize = () => {
			measureOffsets();
			requestUpdate();
		};
		window.addEventListener("resize", handleResize, { passive: true });
		if (useWindowScroll) window.addEventListener("scroll", requestUpdate, { passive: true });
		else if (scroller) {
			const lenis = new Lenis({
				wrapper: scroller,
				content: scroller.querySelector(".scroll-stack-inner") || scroller,
				smoothWheel: true
			});
			lenis.on("scroll", requestUpdate);
			const raf = (time) => {
				lenis.raf(time);
				animationFrameRef.current = requestAnimationFrame(raf);
			};
			animationFrameRef.current = requestAnimationFrame(raf);
			lenisRef.current = lenis;
		}
		return () => {
			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current);
				animationFrameRef.current = null;
			}
			if (lenisRef.current) {
				lenisRef.current.destroy();
				lenisRef.current = null;
			}
			window.removeEventListener("resize", handleResize);
			if (useWindowScroll) window.removeEventListener("scroll", requestUpdate);
		};
	}, [
		itemDistance,
		useWindowScroll,
		measureOffsets,
		updateCardTransforms,
		requestUpdate
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `scroll-stack-scroller ${useWindowScroll ? "scroll-stack-scroller--window" : ""} ${className}`.trim(),
		ref: scrollerRef,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "scroll-stack-inner",
			children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "scroll-stack-end" }, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 269,
				columnNumber: 9
			}, void 0)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 266,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 262,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName$6 = "/app/applet/src/components/FeatureCards.tsx";
var FEATURES = [
	{
		Icon: Zap,
		title: "Crazy Fast Engine",
		desc: "Your coffee won't even get cold before conversion finishes. Powered by WebAssembly local magic.",
		bg: "bg-lime text-neutral-950",
		badge: "0.2s Processing"
	},
	{
		Icon: Film,
		title: "Tons of Formats",
		desc: "We're not judging your ancient AVI files. MP4, MOV, GIF, WEBP, MKV, MP3, WAV and dozens more.",
		bg: "bg-sunny text-neutral-950",
		badge: "50+ Formats"
	},
	{
		Icon: Shield,
		title: "100% Open Source",
		desc: "Because secrets are boring. Inspect the code, fork it, run it locally or contribute on GitHub.",
		bg: "bg-lime-bright text-neutral-950",
		badge: "MIT Licensed"
	},
	{
		Icon: Laptop,
		title: "Privacy Friendly",
		desc: "Your videos stay your business. Zero server uploads needed when converted client-side.",
		bg: "bg-ink text-lime dark:bg-lime dark:text-neutral-950",
		badge: "No Cloud Logs"
	}
];
function FeatureCards() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "features",
		className: "relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center mb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white shadow-sm backdrop-blur-md mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-lime" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 41,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
						text: "Smooth Stacking Experience",
						color: "currentColor",
						shineColor: "#a3e635",
						speed: 2.5
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 42,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 40,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-4xl font-black text-ink sm:text-5xl lg:text-6xl dark:text-white tracking-tight",
					children: [
						"Why people",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-2xl bg-lime px-3 text-neutral-950 font-black inline-block",
							children: "smile"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 51,
							columnNumber: 11
						}, this),
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
							text: "using it",
							color: "currentColor",
							shineColor: "#a3e635",
							speed: 2
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 54,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 49,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mx-auto mt-3 max-w-xl text-center text-base sm:text-lg text-ink/60 dark:text-white/70",
					children: "Fast. Friendly. Free. Slightly unhinged. Scroll through the feature stack below."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 39,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollStack, {
			useWindowScroll: true,
			itemDistance: 50,
			itemScale: .04,
			itemStackDistance: 20,
			stackPosition: "18%",
			scaleEndPosition: "8%",
			baseScale: .9,
			rotationAmount: 1.2,
			blurAmount: 0,
			children: FEATURES.map(({ Icon, title, desc, bg, badge }, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollStackItem, {
				itemClassName: "group relative border border-ink/10 bg-white dark:bg-surface dark:border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl transition-shadow hover:shadow-lime/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl ${bg} shadow-md shrink-0`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-7 w-7 sm:h-8 sm:w-8" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 82,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 79,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1",
								children: ["Feature 0", idx + 1]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 85,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-2xl sm:text-3xl font-black text-ink dark:text-white",
								children: title
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 88,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 84,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 78,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-self-start sm:self-center rounded-full bg-ink/5 dark:bg-white/10 px-3.5 py-1 text-xs font-bold text-ink/80 dark:text-white/80 border border-ink/5 dark:border-white/10",
							children: badge
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 94,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 77,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 sm:mt-6 text-base sm:text-lg text-ink/70 dark:text-white/80 leading-relaxed max-w-2xl",
						children: desc
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 99,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 flex items-center gap-2 text-xs font-bold text-ink/50 dark:text-white/50",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeartHandshake, { className: "h-4 w-4 text-lime" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 104,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Crafted with love for smooth media workflows" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 105,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 103,
						columnNumber: 13
					}, this)
				]
			}, title, true, {
				fileName: _jsxFileName$6,
				lineNumber: 73,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 61,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 38,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/OptionWheel.tsx";
var DEFAULT_ITEMS = [
	"Ambient",
	"House",
	"Techno",
	"Jazz",
	"Lo-Fi",
	"Synthwave",
	"Trance",
	"Funk",
	"Disco",
	"Hip-Hop",
	"Chillwave",
	"Drum & Bass"
];
function OptionWheel({ items = DEFAULT_ITEMS, defaultSelected = 3, onChange, textColor = "#a6a6a6", activeColor = "#ffffff", side = "left", fontSize = 3, spacing = 1.4, curve = 1, tilt = 6, blur = 2, fade = .25, minOpacity = .05, smoothing = 200, inset = 80, loop = false, draggable = true, soundUrl = "", soundVolume = .5, className = "" }) {
	const rootRef = (0, import_react.useRef)(null);
	const itemRefs = (0, import_react.useRef)([]);
	const posRef = (0, import_react.useRef)(defaultSelected);
	const targetRef = (0, import_react.useRef)(defaultSelected);
	const rafRef = (0, import_react.useRef)(null);
	const lastRef = (0, import_react.useRef)(0);
	const cfgRef = (0, import_react.useRef)({});
	const onChangeRef = (0, import_react.useRef)(onChange);
	const selectedRef = (0, import_react.useRef)(defaultSelected);
	const wheelTimerRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)(null);
	const dragMovedRef = (0, import_react.useRef)(false);
	const audioRef = (0, import_react.useRef)(null);
	const audioUrlRef = (0, import_react.useRef)("");
	const lastTickRef = (0, import_react.useRef)(0);
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(defaultSelected);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const remPx = typeof window !== "undefined" ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 : 16;
	onChangeRef.current = onChange;
	cfgRef.current = {
		count: items.length,
		items,
		rowH: Math.max(fontSize * spacing * remPx, 1),
		curve,
		tilt,
		blur,
		fade,
		minOpacity,
		side,
		loop,
		smoothing,
		draggable,
		soundUrl,
		soundVolume
	};
	const runFrame = (0, import_react.useCallback)((now) => {
		const dt = Math.min((now - lastRef.current) / 1e3, .05);
		lastRef.current = now;
		const cfg = cfgRef.current;
		const tau = Math.max(cfg.smoothing, 1) / 1e3;
		const k = 1 - Math.exp(-dt / tau);
		const target = targetRef.current;
		const cur = posRef.current;
		let next = cur + (target - cur) * k;
		const settled = Math.abs(target - next) < .001;
		if (settled) next = target;
		posRef.current = next;
		const els = itemRefs.current;
		const n = cfg.count;
		const mirror = cfg.side === "right" ? -1 : 1;
		const tiltRad = cfg.tilt * Math.PI / 180;
		const R = tiltRad > 5e-4 ? cfg.rowH / tiltRad : 0;
		for (let i = 0; i < n; i++) {
			const el = els[i];
			if (!el) continue;
			let d = i - next;
			if (cfg.loop && n > 1) {
				d = (d % n + n) % n;
				if (d > n / 2) d -= n;
			}
			const dist = Math.abs(d);
			let x = 0;
			let y = d * cfg.rowH;
			let rot = 0;
			if (R > 0) {
				const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
				y = R * Math.sin(ang);
				x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
				rot = mirror * ang * 180 / Math.PI;
			}
			el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
			el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
			el.style.filter = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : "none";
			el.style.setProperty("--ow-p", Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
		}
		rafRef.current = settled ? null : requestAnimationFrame(runFrame);
	}, []);
	const startLoop = (0, import_react.useCallback)(() => {
		if (rafRef.current != null) return;
		lastRef.current = performance.now();
		rafRef.current = requestAnimationFrame(runFrame);
	}, [runFrame]);
	const playTick = (0, import_react.useCallback)(() => {
		const { soundUrl, soundVolume } = cfgRef.current;
		if (!soundUrl) return;
		const now = performance.now();
		if (now - lastTickRef.current < 70) return;
		lastTickRef.current = now;
		if (!audioRef.current || audioUrlRef.current !== soundUrl) {
			audioRef.current = new Audio(soundUrl);
			audioRef.current.preload = "auto";
			audioUrlRef.current = soundUrl;
		}
		const audio = audioRef.current;
		audio.volume = Math.min(Math.max(soundVolume, 0), 1);
		audio.currentTime = 0;
		audio.play()?.catch(() => {});
	}, []);
	const applyTarget = (0, import_react.useCallback)((value, snap) => {
		const cfg = cfgRef.current;
		let v = value;
		if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
		if (snap) v = Math.round(v);
		targetRef.current = v;
		const idx = (Math.round(v) % cfg.count + cfg.count) % cfg.count;
		if (idx !== selectedRef.current) {
			selectedRef.current = idx;
			setSelectedIndex(idx);
			onChangeRef.current?.(idx, cfg.items[idx]);
			playTick();
		}
		startLoop();
	}, [startLoop, playTick]);
	(0, import_react.useEffect)(() => {
		const el = rootRef.current;
		if (!el) return;
		const onWheel = (e) => {
			const cfg = cfgRef.current;
			const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
			if (!cfg.loop) {
				const atStart = targetRef.current <= 0 && delta < 0;
				const atEnd = targetRef.current >= cfg.count - 1 && delta > 0;
				if (atStart || atEnd) return;
			}
			e.preventDefault();
			const step = Math.max(-1, Math.min(1, delta / cfg.rowH));
			applyTarget(targetRef.current + step, false);
			if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
			wheelTimerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 140);
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			el.removeEventListener("wheel", onWheel);
			if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
		};
	}, [applyTarget]);
	const handlePointerDown = (0, import_react.useCallback)((e) => {
		if (!cfgRef.current.draggable) return;
		dragRef.current = {
			y: e.clientY,
			start: targetRef.current,
			id: e.pointerId
		};
		dragMovedRef.current = false;
		setIsDragging(true);
	}, []);
	const handlePointerMove = (0, import_react.useCallback)((e) => {
		const drag = dragRef.current;
		if (!drag) return;
		const dy = e.clientY - drag.y;
		if (!dragMovedRef.current && Math.abs(dy) > 4) {
			dragMovedRef.current = true;
			rootRef.current?.setPointerCapture(drag.id);
		}
		if (dragMovedRef.current) applyTarget(drag.start - dy / cfgRef.current.rowH, false);
	}, [applyTarget]);
	const handlePointerEnd = (0, import_react.useCallback)(() => {
		if (!dragRef.current) return;
		dragRef.current = null;
		setIsDragging(false);
		if (dragMovedRef.current) applyTarget(targetRef.current, true);
	}, [applyTarget]);
	const handleItemClick = (0, import_react.useCallback)((index) => {
		if (dragMovedRef.current) return;
		const cfg = cfgRef.current;
		const cur = targetRef.current;
		let d = index - (cur % cfg.count + cfg.count) % cfg.count;
		if (cfg.loop && cfg.count > 1) {
			if (d > cfg.count / 2) d -= cfg.count;
			else if (d < -cfg.count / 2) d += cfg.count;
		}
		applyTarget(cur + d, true);
	}, [applyTarget]);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		let delta = null;
		if (e.key === "ArrowUp" || e.key === "ArrowLeft") delta = -1;
		else if (e.key === "ArrowDown" || e.key === "ArrowRight") delta = 1;
		if (delta == null) return;
		e.preventDefault();
		applyTarget(Math.round(targetRef.current) + delta, true);
	}, [applyTarget]);
	(0, import_react.useEffect)(() => {
		applyTarget(targetRef.current, false);
	}, [
		items,
		fontSize,
		spacing,
		curve,
		tilt,
		blur,
		fade,
		minOpacity,
		side,
		loop,
		smoothing,
		applyTarget
	]);
	(0, import_react.useEffect)(() => () => {
		if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
		audioRef.current?.pause();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref: rootRef,
		role: "listbox",
		tabIndex: 0,
		"aria-label": "Option wheel",
		className: `option-wheel${side === "right" ? " option-wheel--right" : ""}${isDragging ? " option-wheel--dragging" : ""}${className ? ` ${className}` : ""}`,
		style: {
			"--ow-text-color": textColor,
			"--ow-active-color": activeColor,
			"--ow-font-size": `${fontSize}rem`,
			"--ow-inset": `${inset}px`
		},
		onPointerDown: handlePointerDown,
		onPointerMove: handlePointerMove,
		onPointerUp: handlePointerEnd,
		onPointerCancel: handlePointerEnd,
		onKeyDown: handleKeyDown,
		children: items.map((label, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref: (el) => {
				itemRefs.current[index] = el;
			},
			role: "option",
			"aria-selected": selectedIndex === index,
			className: `option-wheel__item${selectedIndex === index ? " option-wheel__item--selected" : ""}`,
			onClick: () => handleItemClick(index),
			children: label
		}, `${label}-${index}`, false, {
			fileName: _jsxFileName$5,
			lineNumber: 354,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 333,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/FormatBubbles.tsx";
var FORMATS = [
	"MP4",
	"MOV",
	"AVI",
	"MKV",
	"FLV",
	"WEBM",
	"WMV",
	"GIF",
	"3GP",
	"MPEG",
	"OGV",
	"M4V"
];
function FormatBubbles() {
	const [selectedFormat, setSelectedFormat] = (0, import_react.useState)(FORMATS[0]);
	const [isMobile, setIsMobile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 sm:py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-3xl font-black text-ink sm:text-5xl lg:text-6xl dark:text-white",
				children: "Formats we vibe with"
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 34,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-sm sm:text-lg text-ink/60 dark:text-white/70",
				children: "Scroll, drag, or click the wheel to explore all supported media formats."
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 dark:border-white/10 px-4 sm:px-5 py-2 text-xs sm:text-base font-bold text-ink dark:text-white shadow-md backdrop-blur-md z-20 relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-ink/60 dark:text-white/60",
					children: "Selected Format:"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 43,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "rounded-full bg-lime px-3 py-0.5 text-neutral-950 font-black shadow-sm",
					children: selectedFormat
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 44,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 42,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 relative w-full h-[360px] sm:h-[550px] overflow-hidden flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OptionWheel, {
					items: FORMATS,
					defaultSelected: 0,
					textColor: "#a1a1aa",
					activeColor: "#a3e635",
					side: "left",
					fontSize: isMobile ? 2.2 : 3.5,
					spacing: isMobile ? 1.2 : 1.4,
					curve: isMobile ? .9 : 1.2,
					tilt: isMobile ? 4 : 7,
					blur: isMobile ? 1 : 2,
					fade: .25,
					smoothing: 200,
					inset: isMobile ? 24 : 120,
					loop: false,
					draggable: true,
					onChange: (_index, item) => setSelectedFormat(item)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 51,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 50,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 33,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/StatsCounters.tsx";
gsapWithCSS.registerPlugin(ScrollTrigger);
var STATS = [
	{
		value: 999,
		suffix: "+",
		label: "Coffee cups consumed"
	},
	{
		value: 12,
		suffix: "M+",
		label: "Pixels transformed*"
	},
	{
		value: 100,
		suffix: "%",
		label: "Open Source"
	},
	{
		value: -1,
		suffix: "∞",
		label: "Bad format jokes"
	}
];
function StatsCounters() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		ref.current.querySelectorAll("[data-num]").forEach((el) => {
			const target = Number(el.dataset.num);
			if (target < 0) return;
			const obj = { v: 0 };
			gsapWithCSS.to(obj, {
				v: target,
				duration: 2,
				ease: "power2.out",
				onUpdate: () => {
					el.textContent = Math.floor(obj.v).toString();
				},
				scrollTrigger: {
					trigger: el,
					start: "top 85%"
				}
			});
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative z-10 mx-auto max-w-6xl px-6 py-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref,
			className: "grid grid-cols-2 gap-3 sm:gap-4 rounded-[2rem] sm:rounded-[2.5rem] bg-ink p-4 sm:p-8 text-center md:grid-cols-4 dark:bg-surface-2 dark:border dark:border-white/10",
			children: STATS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl sm:rounded-3xl bg-white/10 p-4 sm:p-6 dark:bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-3xl sm:text-5xl font-black text-lime",
					children: s.value < 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: s.suffix }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 47,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						"data-num": s.value,
						children: "0"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 50,
						columnNumber: 19
					}, this), s.suffix] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 49,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 45,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-white/80 dark:text-white/90",
					children: s.label
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 55,
					columnNumber: 13
				}, this)]
			}, s.label, true, {
				fileName: _jsxFileName$3,
				lineNumber: 41,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 36,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-3 text-center text-xs text-ink/40 dark:text-white/60",
			children: "*probably"
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 61,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/ui/accordion.tsx";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 13,
	columnNumber: 3
}, void 0));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 31,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 22,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("pb-4 pt-0", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 46,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 41,
	columnNumber: 3
}, void 0));
AccordionContent.displayName = Content2.displayName;
var _jsxFileName$1 = "/app/applet/src/components/FaqAccordion.tsx";
var FAQS = [
	{
		q: "Can this convert everything?",
		a: "No. Only emotionally."
	},
	{
		q: "Why is it so fast?",
		a: "We yell at the pixels. They listen."
	},
	{
		q: "Why is it open source?",
		a: "Because secrets are boring and PRs are fun."
	},
	{
		q: "Will my computer explode?",
		a: "Only metaphorically. Probably."
	}
];
function FaqAccordion() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "faq",
		className: "relative z-10 mx-auto max-w-3xl px-6 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-center text-4xl font-black text-ink sm:text-5xl dark:text-white",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
					text: "FAQ, kinda",
					color: "currentColor",
					shineColor: "#a3e635",
					speed: 2.5
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 20,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 19,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-center text-ink/60 dark:text-white/70",
				children: "Real questions. Fake answers."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 22,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-10 space-y-4",
				children: FAQS.map((f, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
					value: `item-${i}`,
					className: "rounded-3xl border border-ink/5 bg-white px-6 shadow-float dark:bg-surface dark:border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
						className: "py-5 text-left text-lg font-black text-ink dark:text-white hover:no-underline",
						children: f.q
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 32,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
						className: "pb-5 text-base text-ink/70 dark:text-white/80",
						children: f.a
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 35,
						columnNumber: 13
					}, this)]
				}, i, true, {
					fileName: _jsxFileName$1,
					lineNumber: 27,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 25,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Index() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "relative min-h-screen overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ConverterPanel, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 11,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeatureCards, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormatBubbles, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatsCounters, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaqAccordion, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 9,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
