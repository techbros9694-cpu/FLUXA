import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom_etc.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as ShinyText } from "./FluxaLogo-CWJSwkgl.mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
import { $ as Code, B as FolderCheck, I as Globe, K as EyeOff, O as Lock, P as Heart, Y as Cpu, Z as Cookie, _ as Shield, a as UserX, m as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-BidIWRlN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-CMgqxI1f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/privacy.tsx?tsr-split=component";
var SECTIONS = [
	{
		icon: Cpu,
		emoji: "⚡",
		title: "Local Processing",
		desc: "Every single frame of your video is converted directly inside your browser using WebAssembly (FFmpeg.wasm). Your computer's CPU handles all processing locally."
	},
	{
		icon: Shield,
		emoji: "🛡",
		title: "No Uploads Ever",
		desc: "Your videos never leave your device. Zero bytes are uploaded to remote servers, external APIs, or cloud storage. What happens in your browser stays in your browser."
	},
	{
		icon: UserX,
		emoji: "🔒",
		title: "No Accounts Required",
		desc: "No passwords, no email registrations, and no login portals. You open FLUEXA, drop your video, convert, and download. That's all."
	},
	{
		icon: EyeOff,
		emoji: "📂",
		title: "No Content Tracking",
		desc: "We do not track, log, analyze, or fingerprint your video files, file names, metadata, or media contents. We literally have no idea what videos you convert."
	},
	{
		icon: Cookie,
		emoji: "💻",
		title: "Simple Cookies & Storage",
		desc: "We only use your browser's local storage for simple user preferences like remembering whether you prefer Light or Dark mode. No tracking cookies."
	},
	{
		icon: Code,
		emoji: "💚",
		title: "Open Source Transparency",
		desc: "Because FLUEXA is 100% open source under the MIT License, you don't have to trust our words — you can inspect every line of code on GitHub yourself."
	}
];
function PrivacyPage() {
	const heroRef = (0, import_react.useRef)(null);
	const cardsRef = (0, import_react.useRef)(null);
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
		if (cardsRef.current) {
			const children = cardsRef.current.querySelectorAll("[data-card]");
			gsapWithCSS.fromTo(children, {
				y: 30,
				opacity: 0
			}, {
				y: 0,
				opacity: 1,
				stagger: .1,
				duration: .7,
				ease: "power2.out",
				delay: .2
			});
		}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-background text-ink dark:text-white pt-24 sm:pt-28 pb-16 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-3xl -z-10 dark:bg-lime/5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute top-[30rem] right-4 w-80 h-80 bg-sunny/10 rounded-full blur-3xl -z-10 dark:bg-sunny/5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 77,
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
								className: "absolute top-2 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-ink dark:text-lime border border-lime/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 84,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute top-10 right-10 grid h-12 w-12 place-items-center rounded-2xl bg-sunny/20 text-ink dark:text-sunny border border-sunny/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute bottom-2 left-14 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-lime dark:bg-surface dark:text-lime border border-lime/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderCheck, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 90,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute bottom-6 right-16 grid h-10 w-10 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-lime" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Zero Server Uploads" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-white",
						children: [
							"🔒",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
								text: "Your Videos Stay Yours.",
								color: "currentColor",
								shineColor: "#a3e635",
								speed: 2.5,
								className: "font-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-lg sm:text-xl font-bold text-ink/70 dark:text-white/80 max-w-2xl mx-auto leading-relaxed",
						children: "“We don't upload your videos. We don't spy on them. We don't even know what they are.”"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				ref: cardsRef,
				className: "mx-auto max-w-4xl px-4 sm:px-6 mt-14 sm:mt-16",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 sm:grid-cols-2",
					children: SECTIONS.map((sec) => {
						const Icon = sec.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							"data-card": true,
							className: "group relative rounded-3xl border border-ink/10 bg-white dark:bg-surface p-6 sm:p-8 shadow-float transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-white/10 flex flex-col justify-between",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-neutral-950 dark:bg-lime dark:text-neutral-950 font-black shadow-sm group-hover:scale-110 transition-transform",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-6 w-6" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 122,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 121,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-2xl",
										children: sec.emoji
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 124,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 120,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-xl font-black text-ink dark:text-white mb-2",
									children: sec.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium text-ink/70 dark:text-white/70 leading-relaxed",
									children: sec.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 17
							}, this)
						}, sec.title, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-3xl px-4 sm:px-6 mt-16 sm:mt-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[2.5rem] border-2 border-lime bg-ink text-white p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden dark:bg-surface-2 dark:border-lime",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 bg-lime/20 rounded-full blur-2xl" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-lime text-neutral-950 font-black mb-4",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "h-6 w-6 fill-neutral-950" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl sm:text-3xl font-black text-white mb-3",
							children: "Privacy Promise 💚"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-base sm:text-lg font-bold text-white/90 max-w-lg mx-auto leading-relaxed",
							children: "“We built FLUEXA because your media belongs to you—not to us.”"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-xs font-semibold text-lime/80 uppercase tracking-widest",
							children: "Privacy-first • Open Source • Pure Browser Execution"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 140,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 139,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 160,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 159,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 74,
		columnNumber: 10
	}, this);
}
//#endregion
export { PrivacyPage as component };
