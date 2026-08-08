import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
import { S as Popcorn, V as Film, ct as Camera, m as Sparkles, nt as Clapperboard, r as Video, w as Play } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FloatingIcons-Lvl3Ouau.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/FloatingIcons.tsx";
var icons = [
	{
		Icon: Camera,
		top: "10%",
		left: "6%",
		color: "bg-lime"
	},
	{
		Icon: Film,
		top: "22%",
		left: "88%",
		color: "bg-sunny"
	},
	{
		Icon: Play,
		top: "60%",
		left: "4%",
		color: "bg-lime-bright"
	},
	{
		Icon: Video,
		top: "72%",
		left: "90%",
		color: "bg-ink text-lime"
	},
	{
		Icon: Clapperboard,
		top: "40%",
		left: "92%",
		color: "bg-lime"
	},
	{
		Icon: Popcorn,
		top: "82%",
		left: "18%",
		color: "bg-sunny"
	},
	{
		Icon: Sparkles,
		top: "8%",
		left: "70%",
		color: "bg-lime-bright"
	}
];
function FloatingIcons() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		ref.current.querySelectorAll("[data-float]").forEach((el) => {
			gsapWithCSS.to(el, {
				y: gsapWithCSS.utils.random(-30, 30),
				x: gsapWithCSS.utils.random(-20, 20),
				rotation: gsapWithCSS.utils.random(-15, 15),
				duration: gsapWithCSS.utils.random(3, 6),
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1
			});
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: icons.map(({ Icon, top, left, color }, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			"data-float": true,
			className: `absolute grid h-14 w-14 place-items-center rounded-2xl ${color} text-ink shadow-float`,
			style: {
				top,
				left
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-6 w-6" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 11
			}, this)
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 5
	}, this);
}
//#endregion
export { FloatingIcons as t };
