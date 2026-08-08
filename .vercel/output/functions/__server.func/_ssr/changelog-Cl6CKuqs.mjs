import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as ShinyText } from "./FluxaLogo-CWJSwkgl.mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
import { $ as Code, R as GitCommitHorizontal, T as PartyPopper, d as Tag, dt as ArrowRight, m as Sparkles, n as Wrench, rt as CircleCheck, x as Rocket } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-BidIWRlN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/changelog-Cl6CKuqs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/changelog.tsx?tsr-split=component";
var VERSIONS = [
	{
		version: "1.2.0",
		badge: "🚀 Major Engine Update",
		badgeColor: "bg-lime text-neutral-950",
		title: "⚙️ FLUEXA Core Intelligence Engine Architecture",
		date: "August 2026",
		tagline: "Single core processing engine powering all media operations, smart decision pipeline, and high quality presets.",
		changes: [
			{
				category: "feature",
				text: "Architected the unified FLUEXA Engine: modular processing backend powering Video Converter, Compressor, Trimmer, Audio Extractor, GIF tools, and utilities."
			},
			{
				category: "perf",
				text: "Smart Decision Engine: automatic 100% loss-less Stream Copy (remuxing) when codecs match target container for instant conversion."
			},
			{
				category: "feature",
				text: "High-Fidelity Quality Profiles: default CRF 19 (H.264) and CRF 21 (H.265) presets ensuring pristine video & audio quality without unintended compression."
			},
			{
				category: "fix",
				text: "VP9/WebM Encoding Engine: upgraded to libopus audio, yuv420p pixel format, tile-columns, and row-mt for fast, compliant WebM output."
			},
			{
				category: "feature",
				text: "Robust Output Quality Verification: automated EBML, MP4 container header checks, and payload size validation before user download."
			},
			{
				category: "perf",
				text: "Dedicated Web Worker & Memory Manager: off-thread WASM execution with automatic Blob URL revocation to prevent memory leaks."
			},
			{
				category: "feature",
				text: "Reusable Job Queue & Error System: background queue tracking, stage progress callbacks, and structured error handling."
			}
		]
	},
	{
		version: "1.1.0",
		badge: "✨ Feature Release",
		badgeColor: "bg-sunny text-neutral-950",
		title: "✨ Quality of Life",
		date: "July 2026",
		tagline: "Smarter error handling, better mobile touch controls, and accessibility wins.",
		changes: [
			{
				category: "feature",
				text: "Better error messages & automatic recovery hints"
			},
			{
				category: "ui",
				text: "Improved video format compatibility & media container detection"
			},
			{
				category: "ui",
				text: "Accessibility improvements & full keyboard navigation support"
			},
			{
				category: "perf",
				text: "Mobile touch control refinements & responsive navbar layout"
			},
			{
				category: "ui",
				text: "Added dedicated MIT License, Privacy Policy, and Changelog pages"
			}
		]
	},
	{
		version: "1.0.1",
		badge: "⚡ Patch Release",
		badgeColor: "bg-sunny text-neutral-950",
		title: "⚡ Performance Improvements",
		date: "June 2026",
		tagline: "Faster WebAssembly load times, memory leak cleanups, and smoother downloads.",
		changes: [
			{
				category: "perf",
				text: "Faster FFmpeg.wasm multi-thread initialization"
			},
			{
				category: "perf",
				text: "In-browser memory optimization & automatic Blob URL cleanup"
			},
			{
				category: "fix",
				text: "Better high-bitrate video download handling & filename sanitization"
			},
			{
				category: "ui",
				text: "UI polish, theme switching enhancements, and smoother GSAP animations"
			},
			{
				category: "fix",
				text: "Fixed edge-case conversion hangs on unusual container aspect ratios"
			}
		]
	},
	{
		version: "1.0.0",
		badge: "🎉 Initial Launch",
		badgeColor: "bg-ink text-white dark:bg-white dark:text-neutral-950",
		title: "🎉 Initial Release",
		date: "May 2026",
		tagline: "The birth of FLUEXA: private, browser-based media conversion with intelligence.",
		changes: [
			{
				category: "feature",
				text: "Browser-based video conversion powered by FFmpeg.wasm"
			},
			{
				category: "feature",
				text: "Interactive Drag & Drop file upload with instant format detection"
			},
			{
				category: "feature",
				text: "Multiple output formats: MP4, WEBM, GIF, MP3, AVI, MOV, MKV"
			},
			{
				category: "ui",
				text: "Playful design system with GSAP animations, magnetic buttons, and theme toggle"
			},
			{
				category: "perf",
				text: "Fully responsive layout across Desktop, Tablet, and Mobile devices"
			},
			{
				category: "feature",
				text: "100% privacy-first local processing with zero server uploads"
			},
			{
				category: "feature",
				text: "Open-source codebase under the MIT License"
			}
		]
	}
];
function ChangelogPage() {
	const heroRef = (0, import_react.useRef)(null);
	const timelineRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
		if (!heroRef.current) return;
		heroRef.current.querySelectorAll("[data-float]").forEach((el, index) => {
			gsapWithCSS.to(el, {
				y: gsapWithCSS.utils.random(-15, 15),
				x: gsapWithCSS.utils.random(-10, 10),
				rotation: gsapWithCSS.utils.random(-10, 10),
				duration: gsapWithCSS.utils.random(3, 5),
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
				delay: index * .2
			});
		});
		if (timelineRef.current) timelineRef.current.querySelectorAll("[data-timeline-item]").forEach((item) => {
			gsapWithCSS.fromTo(item, {
				opacity: 0,
				y: 40
			}, {
				opacity: 1,
				y: 0,
				duration: .8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: item,
					start: "top 85%",
					toggleActions: "play none none reverse"
				}
			});
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-background text-ink dark:text-white pt-24 sm:pt-28 pb-16 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-lime/10 rounded-full blur-3xl -z-10 dark:bg-lime/5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute top-[40rem] left-10 w-80 h-80 bg-sunny/10 rounded-full blur-3xl -z-10 dark:bg-sunny/5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				ref: heroRef,
				className: "relative mx-auto max-w-4xl px-4 sm:px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "pointer-events-none absolute inset-0 -z-5 hidden sm:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute top-0 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-neutral-950 dark:text-lime border border-lime/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Rocket, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute top-8 right-8 grid h-12 w-12 place-items-center rounded-2xl bg-sunny/20 text-neutral-950 dark:text-sunny border border-sunny/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PartyPopper, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute bottom-2 left-12 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-lime dark:bg-surface dark:text-lime border border-lime/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute bottom-6 right-16 grid h-10 w-10 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Code, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-lime" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Release Notes & Progress" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-white",
						children: [
							"🚀",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
								text: "Changelog",
								color: "currentColor",
								shineColor: "#a3e635",
								speed: 2.5,
								className: "font-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 196,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-lg sm:text-xl font-bold text-ink/70 dark:text-white/80 max-w-2xl mx-auto leading-relaxed",
						children: "“Every improvement. Every bug squashed. Every tiny victory.”"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 172,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				ref: timelineRef,
				className: "mx-auto max-w-3xl px-4 sm:px-6 mt-14 sm:mt-16",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative border-l-2 border-ink/10 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12",
					children: VERSIONS.map((ver) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						"data-timeline-item": true,
						className: "relative group",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white dark:bg-surface border-2 border-lime text-neutral-950 shadow-md group-hover:scale-125 transition-transform",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCommitHorizontal, { className: "h-4 w-4 text-lime-bright stroke-[3]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-[2rem] border border-ink/10 bg-white dark:bg-surface p-6 sm:p-8 shadow-float transition-all duration-300 hover:shadow-2xl dark:border-white/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ink/10 dark:border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-2xl sm:text-3xl font-black text-ink dark:text-white",
											children: ["v", ver.version]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 217,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black shadow-sm ${ver.badgeColor}`,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 222,
												columnNumber: 23
											}, this), ver.badge]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 221,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs sm:text-sm font-bold text-ink/50 dark:text-white/50",
										children: ver.date
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-lg sm:text-xl font-black text-ink dark:text-white",
										children: ver.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 233,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs sm:text-sm font-medium text-ink/60 dark:text-white/70",
										children: ver.tagline
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "mt-6 space-y-2.5",
									children: ver.changes.map((ch, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink/80 dark:text-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-lime shrink-0 mt-0.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 243,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ch.text }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 244,
											columnNumber: 23
										}, this)]
									}, idx, true, {
										fileName: _jsxFileName,
										lineNumber: 242,
										columnNumber: 49
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 241,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 15
						}, this)]
					}, ver.version, true, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 32
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-3xl px-4 sm:px-6 mt-16 sm:mt-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-ink/10 bg-surface/80 dark:bg-surface-2/80 p-6 sm:p-8 text-center backdrop-blur-md shadow-sm dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-left",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-black text-lg text-ink dark:text-white",
							children: "Want to see real-time commits & releases?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs sm:text-sm text-ink/60 dark:text-white/70",
							children: "Check out our complete git history on GitHub!"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 259,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "https://github.com/ai-playground-arc-1",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-lime hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-lime transition-all shrink-0 cursor-pointer shadow-md active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View GitHub Releases" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 266,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 254,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 253,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 272,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 271,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 166,
		columnNumber: 10
	}, this);
}
//#endregion
export { ChangelogPage as component };
