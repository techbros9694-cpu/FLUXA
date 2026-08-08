import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as ShinyText, t as FluxaLogo } from "./FluxaLogo-CWJSwkgl.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { D as Moon, L as Github, f as Sun, ut as ArrowUp } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bh7OaxoB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-DvxvEqua.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var _jsxFileName$6 = "/app/applet/src/components/FloatingNavbar.tsx";
var NAV_ITEMS = [
	{
		id: "home",
		label: "Home",
		type: "page",
		path: "/"
	},
	{
		id: "convert",
		label: "Convert",
		type: "section",
		path: "/",
		hash: "convert"
	},
	{
		id: "features",
		label: "Features",
		type: "section",
		path: "/",
		hash: "features"
	},
	{
		id: "faq",
		label: "FAQ",
		type: "section",
		path: "/",
		hash: "faq"
	},
	{
		id: "about",
		label: "About",
		type: "page",
		path: "/about"
	}
];
function FloatingNavbar() {
	const ref = (0, import_react.useRef)(null);
	const location = useLocation();
	const navigate = useNavigate();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [isDark, setIsDark] = (0, import_react.useState)(false);
	const [activeSection, setActiveSection] = (0, import_react.useState)("home");
	(0, import_react.useEffect)(() => {
		setMounted(true);
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("theme");
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			if (stored === "dark" || !stored && prefersDark) {
				setIsDark(true);
				document.documentElement.classList.add("dark");
			} else {
				setIsDark(false);
				document.documentElement.classList.remove("dark");
			}
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (location.pathname !== "/") {
			setActiveSection("about");
			return;
		}
		const handleScroll = () => {
			const scrollPos = window.scrollY + 200;
			const convertEl = document.getElementById("convert");
			const featuresEl = document.getElementById("features");
			const faqEl = document.getElementById("faq");
			if (faqEl && scrollPos >= faqEl.offsetTop) setActiveSection("faq");
			else if (featuresEl && scrollPos >= featuresEl.offsetTop) setActiveSection("features");
			else if (convertEl && scrollPos >= convertEl.offsetTop - 100) setActiveSection("convert");
			else setActiveSection("home");
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [location.pathname]);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		gsapWithCSS.fromTo(ref.current, {
			y: -80,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			duration: .8,
			ease: "elastic.out(1, 0.6)",
			delay: .1,
			clearProps: "transform,opacity"
		});
		const items = ref.current.querySelectorAll("[data-nav-item]");
		if (items.length > 0) gsapWithCSS.fromTo(items, {
			y: -10,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			stagger: .04,
			duration: .4,
			ease: "power2.out",
			delay: .2,
			clearProps: "all"
		});
	}, []);
	const toggleTheme = () => {
		setIsDark((prev) => {
			const next = !prev;
			if (next) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
			return next;
		});
	};
	const handleNavClick = (item) => {
		if (item.type === "page") if (location.pathname === item.path) window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		else navigate({ to: item.path });
		else if (item.type === "section" && item.hash) if (location.pathname === "/") {
			const el = document.getElementById(item.hash);
			if (el) el.scrollIntoView({ behavior: "smooth" });
		} else navigate({
			to: "/",
			hash: item.hash
		}).then(() => {
			setTimeout(() => {
				const el = document.getElementById(item.hash);
				if (el) el.scrollIntoView({ behavior: "smooth" });
			}, 100);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: "fixed left-1/2 top-2 sm:top-4 z-50 -translate-x-1/2 w-[calc(100vw-0.75rem)] sm:w-auto max-w-[96vw] sm:max-w-fit",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			className: "w-full flex items-center justify-between gap-0.5 sm:gap-1.5 rounded-full border border-black/15 bg-white/95 p-1 sm:p-1.5 backdrop-blur-md shadow-2xl dark:bg-neutral-900/95 dark:border-white/20 whitespace-nowrap overflow-x-auto no-scrollbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					"data-nav-item": true,
					onClick: (e) => {
						if (location.pathname === "/") {
							e.preventDefault();
							window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						}
					},
					className: "flex h-7 sm:h-9 items-center gap-1.5 sm:gap-2 rounded-full bg-ink px-2.5 sm:px-3.5 text-[11px] sm:text-sm font-black text-white hover:scale-105 transition-transform shrink-0 dark:bg-white dark:text-neutral-950 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FluxaLogo, { size: 20 }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 164,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShinyText, {
						text: "FLUEXA",
						color: "currentColor",
						shineColor: "#a3e635",
						speed: 2.5,
						className: "font-black text-[11px] sm:text-sm tracking-tight"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 165,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 153,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-0.5 sm:gap-1 shrink-0",
					children: NAV_ITEMS.map((item) => {
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							"data-nav-item": true,
							onClick: () => handleNavClick(item),
							className: `flex h-7 sm:h-9 items-center justify-center rounded-full px-1.5 sm:px-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${location.pathname === "/about" && item.id === "about" || location.pathname === "/" && activeSection === item.id ? "bg-lime text-neutral-950 font-black shadow-sm scale-105" : "text-ink/80 hover:bg-black/5 hover:text-ink dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"}`,
							children: item.label
						}, item.id, false, {
							fileName: _jsxFileName$6,
							lineNumber: 182,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 175,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					"data-nav-item": true,
					href: "https://github.com/ai-playground-arc-1",
					target: "_blank",
					rel: "noreferrer",
					className: "flex h-7 w-7 sm:h-9 sm:w-auto items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-lime/20 text-ink dark:text-white hover:bg-lime hover:text-neutral-950 px-0 sm:px-3 text-xs sm:text-sm font-bold transition-all shrink-0",
					title: "GitHub Repo",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 208,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "hidden sm:inline",
						children: "GitHub"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 209,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 200,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					"data-nav-item": true,
					onClick: toggleTheme,
					"aria-label": mounted && isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
					className: "flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full text-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10 transition-transform active:scale-95 shrink-0",
					title: mounted && isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
					children: mounted && isDark ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 text-sunny animate-pulse" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 222,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 text-ink dark:text-white" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 224,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 213,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 151,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 147,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/CursorGlow.tsx";
function CursorGlow() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		const xTo = gsapWithCSS.quickTo(ref.current, "x", {
			duration: .5,
			ease: "power3"
		});
		const yTo = gsapWithCSS.quickTo(ref.current, "y", {
			duration: .5,
			ease: "power3"
		});
		const onMove = (e) => {
			xTo(e.clientX - 180);
			yTo(e.clientY - 180);
		};
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		"aria-hidden": true,
		className: "pointer-events-none fixed left-0 top-0 z-0 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl",
		style: { background: "radial-gradient(circle, var(--lime) 0%, transparent 65%)" }
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/ScrollProgress.tsx";
function ScrollProgress() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			if (!ref.current) return;
			const h = document.documentElement;
			const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
			ref.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed left-0 top-0 z-[60] h-1 w-full bg-transparent",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref,
			className: "h-full origin-left",
			style: {
				background: "var(--gradient-lime)",
				transform: "scaleX(0)"
			}
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 18,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/Stickers.tsx";
var EMOJIS = [
	"✨",
	"🎬",
	"😂",
	"🍿",
	"💾",
	"🚀",
	"📹",
	"📼"
];
function Stickers() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let id = 0;
		const spawn = () => {
			const s = {
				id: id++,
				emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
				left: Math.random() * 100,
				duration: 8 + Math.random() * 6,
				size: 22 + Math.random() * 28
			};
			setItems((cur) => [...cur, s]);
			setTimeout(() => setItems((cur) => cur.filter((x) => x.id !== s.id)), s.duration * 1e3);
		};
		const t = setInterval(spawn, 2200);
		spawn();
		return () => clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "pointer-events-none fixed inset-0 z-10 overflow-hidden",
		children: [items.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "absolute select-none",
			style: {
				left: `${s.left}%`,
				bottom: "-60px",
				fontSize: `${s.size}px`,
				animation: `vm-sticker ${s.duration}s linear forwards`
			},
			children: s.emoji
		}, s.id, false, {
			fileName: _jsxFileName$3,
			lineNumber: 29,
			columnNumber: 9
		}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { children: `@keyframes vm-sticker { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; } }` }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 42,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/BackToTop.tsx";
function BackToTop() {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) setIsVisible(true);
			else setIsVisible(false);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	if (!isVisible) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: scrollToTop,
		"aria-label": "Back to top",
		title: "Back to top",
		className: "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-white text-ink shadow-float transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 dark:bg-surface dark:text-white dark:border-white/20 dark:shadow-2xl group",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUp, { className: "h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 text-ink dark:text-lime" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 37,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 30,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 5
	}, this);
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FLUEXA 🎬 | All-In-One Media Converter" },
			{
				name: "description",
				content: "Convert, compress, trim, and morph video & audio instantly in your browser with FLUXA."
			},
			{
				name: "author",
				content: "FLUEXA"
			},
			{
				property: "og:title",
				content: "FLUEXA — All-In-One Format Converter & Intelligence Engine"
			},
			{
				property: "og:description",
				content: "Playful, fast, open-source video format converter."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 126,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 128,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CursorGlow, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 141,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollProgress, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 142,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FloatingNavbar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stickers, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 144,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 145,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackToTop, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, { position: "bottom-right" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 147,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 140,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$4 = () => import("./privacy-CMgqxI1f.mjs");
var Route$4 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Policy · FLUEXA — Your Media Stays Yours" },
		{
			name: "description",
			content: "FLUEXA processes media 100% inside your browser. No server uploads, no accounts, no tracking, total privacy."
		},
		{
			property: "og:title",
			content: "Privacy Policy — FLUEXA"
		},
		{
			property: "og:description",
			content: "Your videos stay on your device. Always."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./license-BQbdmOvd.mjs");
var Route$3 = createFileRoute("/license")({
	head: () => ({ meta: [
		{ title: "MIT License · FLUEXA — Open Source & Free" },
		{
			name: "description",
			content: "FLUEXA is 100% open source software released under the permissive MIT License. Use, modify, and share freely."
		},
		{
			property: "og:title",
			content: "MIT License — FLUEXA"
		},
		{
			property: "og:description",
			content: "Open Source. Open Ideas. Open for Everyone."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./changelog-Cl6CKuqs.mjs");
gsapWithCSS.registerPlugin(ScrollTrigger);
var Route$2 = createFileRoute("/changelog")({
	head: () => ({ meta: [
		{ title: "Changelog · FLUEXA — Improvements & Releases" },
		{
			name: "description",
			content: "See what's new in FLUEXA. Every improvement, every bug squashed, every tiny victory."
		},
		{
			property: "og:title",
			content: "Changelog — FLUEXA"
		},
		{
			property: "og:description",
			content: "Every improvement. Every bug squashed. Every tiny victory."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-w4_6InA_.mjs");
gsapWithCSS.registerPlugin(ScrollTrigger);
var Route$1 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About · FLUXA — Powered by coffee & sparks" },
		{
			name: "description",
			content: "Meet FLUXA — an open-source workspace built with caffeine, sparks, chaos and love."
		},
		{
			property: "og:title",
			content: "About FLUXA"
		},
		{
			property: "og:description",
			content: "Open-source, playful and made with too much coffee and sparks."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-B7VjIivH.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "FLUXA 🎬 — Privacy-First Browser-Based File Tools" },
		{
			name: "description",
			content: "FLUXA is a fast, beautiful, privacy-first, open-source file workspace running directly in your browser."
		},
		{
			property: "og:title",
			content: "FLUXA — Privacy-First File Tools"
		},
		{
			property: "og:description",
			content: "Fast, free, privacy-first browser-based file conversion and tools."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var PrivacyRoute = Route$4.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$5
});
var LicenseRoute = Route$3.update({
	id: "/license",
	path: "/license",
	getParentRoute: () => Route$5
});
var ChangelogRoute = Route$2.update({
	id: "/changelog",
	path: "/changelog",
	getParentRoute: () => Route$5
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AboutRoute,
	ChangelogRoute,
	LicenseRoute,
	PrivacyRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
