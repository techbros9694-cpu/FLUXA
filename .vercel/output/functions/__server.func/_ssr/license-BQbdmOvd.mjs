import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as ShinyText } from "./FluxaLogo-CWJSwkgl.mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
import { G as FileCheck, H as FileSpreadsheet, L as Github, W as FileCode, X as Copy, et as CodeXml, k as LockOpen, l as TriangleAlert, lt as Building2, m as Sparkles, o as UserCheck, q as Download, st as Check, v as ShieldCheck, y as Share2 } from "../_libs/lucide-react.mjs";
import { t as Footer } from "./Footer-BidIWRlN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/license-BQbdmOvd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/license.tsx?tsr-split=component";
var MIT_TEXT = `MIT License

Copyright (c) 2026 FLUXA Open Source Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
var PERMISSIONS = [
	{
		icon: Building2,
		title: "Commercial Use",
		allowed: true,
		desc: "Use FLUEXA or its code in commercial products and paid services without restrictions."
	},
	{
		icon: FileSpreadsheet,
		title: "Modification",
		allowed: true,
		desc: "Tweak, rewrite, or extend the codebase to fit your exact requirements."
	},
	{
		icon: Share2,
		title: "Distribution",
		allowed: true,
		desc: "Share, bundle, or re-publish copies of the software with anyone."
	},
	{
		icon: UserCheck,
		title: "Private Use",
		allowed: true,
		desc: "Run and modify it privately on your machine or internal company servers."
	},
	{
		icon: TriangleAlert,
		title: "No Warranty",
		allowed: false,
		desc: "Provided 'as is' with lots of love, but without express legal warranties."
	}
];
function LicensePage() {
	const heroRef = (0, import_react.useRef)(null);
	const cardRef = (0, import_react.useRef)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
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
		if (cardRef.current) gsapWithCSS.fromTo(cardRef.current, {
			y: 30,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			duration: .8,
			ease: "power2.out",
			delay: .2
		});
	}, []);
	const handleCopy = () => {
		navigator.clipboard.writeText(MIT_TEXT);
		setCopied(true);
		toast.success("License text copied to clipboard!");
		setTimeout(() => setCopied(false), 2500);
	};
	const handleDownload = () => {
		const blob = new Blob([MIT_TEXT], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "LICENSE.txt";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
		toast.success("LICENSE.txt downloaded!");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-background text-ink dark:text-white pt-24 sm:pt-28 pb-16 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-lime/10 rounded-full blur-3xl -z-10 dark:bg-lime/5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute top-96 right-10 w-72 h-72 bg-sunny/10 rounded-full blur-3xl -z-10 dark:bg-sunny/5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
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
								className: "absolute top-0 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-ink dark:text-lime border border-lime/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LockOpen, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 120,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute top-8 right-8 grid h-12 w-12 place-items-center rounded-2xl bg-sunny/20 text-ink dark:text-sunny border border-sunny/30 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CodeXml, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 123,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute bottom-4 left-12 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white dark:bg-white dark:text-neutral-950 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"data-float": true,
								className: "absolute bottom-10 right-16 grid h-10 w-10 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-lime" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Open Source Freedom" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-white",
						children: [
							"📜",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
								text: "MIT License",
								color: "currentColor",
								shineColor: "#a3e635",
								speed: 2.5,
								className: "font-black"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-lg sm:text-xl font-bold text-ink/70 dark:text-white/80 max-w-2xl mx-auto",
						children: "Open Source. Open Ideas. Open for Everyone."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-3xl px-4 sm:px-6 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl sm:rounded-3xl border border-lime/40 bg-lime/10 p-5 sm:p-6 backdrop-blur-md shadow-sm dark:bg-lime/10 dark:border-lime/30 flex items-start sm:items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-neutral-950 font-black",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm sm:text-base font-bold text-ink/90 dark:text-white/90 leading-relaxed",
						children: "Good news! You can use, modify, and share FLUEXA. Just remember to keep the copyright notice. That's the MIT way."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				ref: cardRef,
				className: "mx-auto max-w-3xl px-4 sm:px-6 mt-8",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-[2rem] sm:rounded-[2.5rem] border border-ink/10 bg-white dark:bg-surface p-6 sm:p-8 shadow-2xl dark:border-white/10 relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-ink/10 dark:border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheck, { className: "h-5 w-5 text-lime" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-black text-sm uppercase tracking-wider text-ink/70 dark:text-white/70",
								children: "Official License Text"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: handleCopy,
								className: "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface/50 dark:bg-surface-2 px-3.5 py-1.5 text-xs font-bold text-ink dark:text-white hover:bg-lime hover:text-neutral-950 transition-all cursor-pointer active:scale-95 shadow-sm",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5 text-green-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 27
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 78
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: copied ? "Copied!" : "Copy License" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 175,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: handleDownload,
								className: "inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white hover:bg-ink/90 dark:bg-white dark:text-neutral-950 dark:hover:bg-lime transition-all cursor-pointer active:scale-95 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Download .txt" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
						className: "mt-6 p-4 sm:p-6 rounded-2xl bg-surface/60 dark:bg-surface-2/60 border border-ink/5 dark:border-white/5 font-mono text-xs sm:text-sm text-ink/80 dark:text-white/80 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all",
						children: MIT_TEXT
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-3xl px-4 sm:px-6 mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl sm:text-3xl font-black text-ink dark:text-white",
						children: "What does the MIT License mean for you?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-ink/60 dark:text-white/70",
						children: "No legal jargon needed — here is the quick breakdown of your rights."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 193,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: PERMISSIONS.map((perm) => {
						const Icon = perm.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-3xl border border-ink/10 bg-white dark:bg-surface p-5 sm:p-6 shadow-float transition-all hover:-translate-y-1 dark:border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `grid h-9 w-9 place-items-center rounded-xl font-bold ${perm.allowed ? "bg-lime/30 text-neutral-950 dark:bg-lime dark:text-neutral-950" : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"}`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-black text-base text-ink dark:text-white flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: perm.allowed ? "✅" : "❗" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 23
									}, this), perm.title]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 21
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs sm:text-sm font-medium text-ink/60 dark:text-white/70 leading-relaxed",
								children: perm.desc
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 17
							}, this)]
						}, perm.title, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 192,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 226,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 225,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 110,
		columnNumber: 10
	}, this);
}
//#endregion
export { LicensePage as component };
