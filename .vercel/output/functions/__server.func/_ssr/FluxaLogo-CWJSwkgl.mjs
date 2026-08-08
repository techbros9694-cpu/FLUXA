import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom_etc.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ShinyText.tsx";
function ShinyText({ text, disabled = false, speed = 2.5, className = "", color = "currentColor", shineColor = "#a3e635", spread = 120 }) {
	const gradientStyle = {
		backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
		backgroundSize: "200% auto",
		WebkitBackgroundClip: "text",
		backgroundClip: "text",
		WebkitTextFillColor: "transparent",
		animationDuration: `${speed}s`
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `shiny-text ${disabled ? "shiny-text-disabled" : ""} ${className}`.trim(),
		style: gradientStyle,
		children: text
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 37,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/FluxaLogo.tsx";
function FluxaLogo({ className = "", size = 32, showText = false, textClassName = "" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `inline-flex items-center gap-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			width: size,
			height: size,
			viewBox: "0 0 512 512",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className: "shrink-0 drop-shadow-sm transition-transform hover:scale-105",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
						id: "purpleRibbon",
						x1: "120",
						y1: "80",
						x2: "380",
						y2: "180",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "0%",
								stopColor: "#8B5CF6"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 35,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "50%",
								stopColor: "#A855F7"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 36,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "100%",
								stopColor: "#D946EF"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 37,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
						id: "blueRibbon",
						x1: "140",
						y1: "180",
						x2: "350",
						y2: "280",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "0%",
								stopColor: "#1E40AF"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "50%",
								stopColor: "#2563EB"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "100%",
								stopColor: "#3B82F6"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
						id: "cyanRibbon",
						x1: "130",
						y1: "260",
						x2: "280",
						y2: "380",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "0%",
								stopColor: "#0284C7"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 61,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "50%",
								stopColor: "#06B6D4"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "100%",
								stopColor: "#22D3EE"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M 175 220 C 160 140, 200 80, 360 80 C 375 80, 385 92, 375 105 C 350 135, 270 145, 220 150 C 250 150, 330 145, 350 145 C 365 145, 370 160, 355 170 C 310 200, 240 215, 175 220 Z",
					fill: "url(#purpleRibbon)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M 150 290 C 140 210, 180 160, 340 160 C 352 160, 358 172, 348 182 C 300 220, 240 225, 185 235 C 220 235, 300 228, 320 228 C 335 228, 340 242, 325 252 C 275 285, 200 290, 150 290 Z",
					fill: "url(#blueRibbon)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M 135 300 C 130 240, 155 180, 200 130 C 180 200, 140 280, 150 340 C 158 390, 200 405, 220 380 C 235 360, 230 330, 200 320 C 170 310, 140 320, 135 300 Z",
					fill: "url(#cyanRibbon)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this), showText && /* @__PURE__ */ (void 0)("span", {
			className: `font-black tracking-tight uppercase text-ink dark:text-white ${textClassName}`,
			children: "FLUEXA"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
//#endregion
export { ShinyText as n, FluxaLogo as t };
