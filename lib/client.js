window.__ModuleLoader__.load({
	id: "dsh-plugin-liang-calibrator",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}

		const liang_menu_css = ".dsh-lm-root{min-width:0;position:relative}.dsh-lm-trigger{min-width:0;max-width:220px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:24px;outline:none;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;font-weight:500;line-height:20px;display:flex}.dsh-lm-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-lm-trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-lm-triggerLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.dsh-lm-triggerEffort{color:var(--dsw-alias-label-caption);flex:none}.dsh-lm-chevron{color:var(--dsw-alias-label-caption);flex:none;transition:transform .12s}.dsh-lm-chevronOpen{transform:rotate(180deg)}.dsh-lm-menu{z-index:20;border:1px solid var(--dsw-alias-border-inverted);background:var(--dsw-menu-surface-fill,var(--dsw-specific-menu));backdrop-filter:var(--dsw-menu-backdrop-filter,blur(40px) saturate(150%));-webkit-backdrop-filter:var(--dsw-menu-backdrop-filter,blur(40px) saturate(150%));width:min(240px,100vw - 32px);max-height:min(360px,100vh - 96px);box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border-radius:12px;flex-direction:column;padding:4px;display:flex;position:absolute;bottom:calc(100% + 8px);right:0;overflow:hidden}.dsh-lm-status,.dsh-lm-empty{color:var(--dsw-alias-label-tertiary);padding:10px;font-size:13px;line-height:20px}.dsh-lm-error,.dsh-lm-warning{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);border-radius:8px;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px;padding:7px 8px;font-size:12px;line-height:18px;display:flex}.dsh-lm-warning{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-state-warn-label)}.dsh-lm-retry{color:inherit;font:inherit;cursor:pointer;background:0 0;border:none;flex:none;padding:0;font-weight:600}.dsh-lm-groups{min-height:0;overflow-y:auto}.dsh-lm-group+.dsh-lm-group{margin-top:4px}.dsh-lm-groupTitle{z-index:1;background:var(--dsw-specific-menu);color:var(--dsw-alias-label-tertiary);padding:5px 8px 3px;font-size:12px;font-weight:500;line-height:18px;position:sticky;top:0}.dsh-lm-option{width:100%;min-height:38px;color:inherit;text-align:left;cursor:pointer;background:0 0;border:none;border-radius:10px;outline:none;align-items:center;gap:8px;padding:6px 8px;display:flex}.dsh-lm-option:hover:not(:disabled),.dsh-lm-option:focus-visible{background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-selected{background:0 0}.dsh-lm-option:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-lm-optionCopy{flex-direction:column;flex:1;min-width:0;display:flex}.dsh-lm-modelName{color:inherit;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}.dsh-lm-description{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:18px;overflow:hidden}.dsh-lm-check{color:var(--dsw-alias-label-primary);flex:0 0 18px;place-items:center;display:grid}.dsh-lm-cell{width:100%;height:40px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:10px;align-items:center;gap:8px;padding:0 10px;font-size:14px;line-height:22px;display:flex}.dsh-lm-cell:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-cellLabel{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.dsh-lm-cellValue{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-tertiary);flex:0 auto;overflow:hidden}.dsh-lm-cellChevron{color:var(--dsw-alias-label-tertiary);flex:none} .dsh-lm-menu{max-height:min(420px,100vh - 96px)}";
		if (typeof document !== "undefined") {
			for (const stale of document.querySelectorAll("style[data-plugin-css=\"dsh-plugin-liang-calibrator/menu\"]")) stale.remove();
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-plugin-liang-calibrator";
			tag.dataset.pluginCss = "dsh-plugin-liang-calibrator/menu";
			tag.textContent = liang_menu_css;
			document.head.appendChild(tag);
		}
		const liang_css = {
			"root": "dsh-lm-root",
			"trigger": "dsh-lm-trigger",
			"triggerLabel": "dsh-lm-triggerLabel",
			"triggerEffort": "dsh-lm-triggerEffort",
			"chevron": "dsh-lm-chevron",
			"chevronOpen": "dsh-lm-chevronOpen",
			"menu": "dsh-lm-menu",
			"status": "dsh-lm-status",
			"empty": "dsh-lm-empty",
			"error": "dsh-lm-error",
			"warning": "dsh-lm-warning",
			"retry": "dsh-lm-retry",
			"groups": "dsh-lm-groups",
			"group": "dsh-lm-group",
			"groupTitle": "dsh-lm-groupTitle",
			"option": "dsh-lm-option",
			"optionCopy": "dsh-lm-optionCopy",
			"modelName": "dsh-lm-modelName",
			"description": "dsh-lm-description",
			"check": "dsh-lm-check",
			"selected": "dsh-lm-selected",
			"cell": "dsh-lm-cell",
			"cellLabel": "dsh-lm-cellLabel",
			"cellValue": "dsh-lm-cellValue",
			"cellChevron": "dsh-lm-cellChevron",
		};		//#region lib/liang/effort-slider.js
		/**
		* Liang intensity calibrator (滑动变祖器): the model + thinking-effort
		* slider. The 0..30 range spans every provider/model/reasoning-effort
		* combination the directory offers, so DeepSeek-V4-Flash + DeepSeek-V4-Pro
		* with off/high/max each map 1:1 onto the six stages — 小难梁, 牢梁,
		* 梁子, 梁圣, 梁神, 梁祖. The portrait is drawn from the per-level
		* keyframes (frame-00..frame-30) rather than a scrubbed video: the dsh
		* static server answers without HTTP Range support, so media-element
		* seeking silently fails. Dragging commits the mapped selection without
		* closing the popup.
		*/
		const LIANG_MAX_LEVEL = 30;
		const LIANG_STAGE_SPAN = 5;
		const LIANG_STAGES = ["小难梁", "牢梁", "梁子", "梁圣", "梁神", "梁祖"];
		const LIANG_FRAME_BASE = "/liang-assets/frames/";
		const liangFrameUrl = (level) => `${LIANG_FRAME_BASE}frame-${String(Math.max(0, Math.min(LIANG_MAX_LEVEL, level))).padStart(2, "0")}.webp`;
		/** Combo index owned by a slider position (proportional split of 0..30). */
		const liangComboIndexForPos = (position, count) => Math.max(0, Math.min(count - 1, Math.floor(position * count / (LIANG_MAX_LEVEL + 1))));
		/** Canonical slider position for a combo: first at 0, last at 30, middles even. */
		const liangPosForCombo = (index, count) => index <= 0 ? 0 : index >= count - 1 ? LIANG_MAX_LEVEL : Math.round(index * LIANG_MAX_LEVEL / (count - 1));
		/** Stage index for a slider position (six stages of five levels). */
		const liangStageForPos = (position) => Math.min(LIANG_STAGES.length - 1, Math.floor(position / LIANG_STAGE_SPAN));
		/** Stage index for a combo — for six combos this is the combo index itself. */
		const liangStageForCombo = (index, count) => liangStageForPos(liangPosForCombo(index, count));
		let liangStylesInjected = false;
		const ensureLiangStyles = () => {
			if (liangStylesInjected) return;
			liangStylesInjected = true;
			if (typeof document === "undefined") return;
			for (const stale of document.querySelectorAll("style[data-liang-effort]")) stale.remove();
			const css = ".dsh-liang{display:flex;flex-direction:column;gap:7px;padding:6px 6px 8px;width:100%;box-sizing:border-box;color:var(--dsw-alias-label-primary)}.dsh-liang-canvasWrap{position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--dsw-alias-border-inverted);background:#1d1918}.dsh-liang-canvas{width:100%;aspect-ratio:1/1;display:block}.dsh-liang-canvasWrap::after{content:\"\";position:absolute;inset:0;pointer-events:none;background-image:repeating-linear-gradient(0deg,rgb(255 255 255/2.5%) 0 1px,transparent 1px 4px),radial-gradient(circle at 22% 18%,rgb(255 255 255/8%) 0 1px,transparent 1.5px);background-size:auto,7px 7px;mix-blend-mode:soft-light;opacity:.35}.dsh-liang-load{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#b8b4a9;font-size:12px;line-height:18px}.dsh-liang-readout{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:0 2px}.dsh-liang-id{display:flex;flex-direction:column;align-items:flex-start;min-width:0}.dsh-liang-stage{font-family:\"Songti SC\",STSong,\"SimSun\",serif;font-size:22px;font-weight:700;line-height:28px}.dsh-liang-combo{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.dsh-liang-level{color:var(--dsw-alias-label-tertiary);font-family:\"SFMono-Regular\",Consolas,monospace;font-size:12px;line-height:18px}.dsh-liang-markers{display:flex;justify-content:space-between;gap:4px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;padding:0 2px}.dsh-liang-marker{white-space:nowrap}.dsh-liang-marker.is-current{color:#4d6bfe;font-weight:700}.dsh-liang-slider{--dsh-liang-fill:calc(9px + var(--dsh-liang-p,0) * (100% - 18px));position:relative;display:flex;align-items:center;height:26px;cursor:pointer;touch-action:none}.dsh-liang-track{position:absolute;left:0;right:0;height:8px;border-radius:999px;background:linear-gradient(90deg,#1b1d2b,#2a2440 55%,#3a2a55);box-shadow:inset 0 1px 0 rgb(255 255 255/6%),inset 0 0 0 1px rgb(255 255 255/5%);overflow:hidden}.dsh-liang-track::before{content:\"\";position:absolute;inset:0 auto 0 0;width:var(--dsh-liang-fill);border-radius:inherit;background:linear-gradient(90deg,#3b6fe0,#6f7bff 60%,#a86bff)}.dsh-liang-glow{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;mix-blend-mode:screen;image-rendering:pixelated}.dsh-liang-flare{position:absolute;top:50%;left:var(--dsh-liang-fill);width:56px;height:26px;transform:translate(-50%,-50%);pointer-events:none;background:radial-gradient(ellipse at 50% 50%,rgb(255 255 255/85%) 0 4%,rgb(150 175 255/45%) 22%,transparent 68%);filter:blur(1px)}.dsh-liang-flare::before{content:\"\";position:absolute;top:50%;left:50%;width:56px;height:2px;transform:translate(-50%,-50%);background:linear-gradient(90deg,transparent,rgb(180 200 255/60%),#fff,rgb(180 200 255/45%),transparent)}.dsh-liang-flare::after{content:\"\";position:absolute;top:50%;left:50%;width:2px;height:26px;transform:translate(-50%,-50%);background:linear-gradient(180deg,transparent,rgb(200 215 255/85%),transparent)}.dsh-liang-knob{position:absolute;top:50%;left:var(--dsh-liang-fill);width:18px;height:18px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#c9d2f5 55%,#8f9dd6);border:2px solid rgb(255 255 255/85%);box-shadow:0 0 0 2px rgb(120 140 255/20%),0 0 12px rgb(110 130 255/45%);pointer-events:none}.dsh-liang-input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;pointer-events:none}.dsh-liang-slider[data-disabled=true]{cursor:default}.dsh-liang-slider[data-dragging=true] .dsh-liang-glow{filter:saturate(1.45) brightness(1.28)}.dsh-liang-slider[data-top=true] .dsh-liang-track{animation:dsh-liang-breathe 2.6s ease-in-out infinite}.dsh-liang-slider[data-top=true] .dsh-liang-knob{animation:dsh-liang-pulse 1.9s ease-in-out infinite}.dsh-liang-slider[data-top=true] .dsh-liang-flare{animation:dsh-liang-flare-pulse 1.9s ease-in-out infinite}@keyframes dsh-liang-breathe{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}@keyframes dsh-liang-pulse{0%,100%{box-shadow:0 0 0 2px rgb(120 140 255/20%),0 0 12px rgb(110 130 255/45%)}50%{box-shadow:0 0 0 4px rgb(150 120 255/22%),0 0 22px rgb(150 120 255/65%)}}@keyframes dsh-liang-flare-pulse{0%,100%{opacity:.85}50%{opacity:1}}body:not([data-ds-dark-theme]) .dsh-liang-track{background:linear-gradient(90deg,#e8eefb,#dbe6fb)}body:not([data-ds-dark-theme]) .dsh-liang-track::before{background:linear-gradient(90deg,#fff,#cfe0fb 40%,#7aa8ef)}body:not([data-ds-dark-theme]) .dsh-liang-glow{mix-blend-mode:multiply;opacity:.78}body:not([data-ds-dark-theme]) .dsh-liang-flare{background:radial-gradient(ellipse at 50% 50%,rgb(255 255 255/98%) 0 5%,rgb(204 231 255/88%) 13%,rgb(91 162 241/48%) 31%,transparent 75%)}@media (prefers-reduced-motion:reduce){.dsh-liang-slider[data-top=true] .dsh-liang-track,.dsh-liang-slider[data-top=true] .dsh-liang-knob,.dsh-liang-slider[data-top=true] .dsh-liang-flare{animation:none}}";
			const tag = document.createElement("style");
			tag.dataset.liangEffort = "";
			tag.textContent = css;
			document.head.appendChild(tag);
		};
		/** Knob diameter in CSS pixels; the glow origin and the fill mapping both use it. */
		const LIANG_KNOB = 18;
		/**
		* Pixel-radiation pass behind the slider: multi-frequency sine waves give
		* per-column energy, a radial halo gives the hot core, and short particle
		* streaks trail leftward — all clipped left of the knob so nothing crosses
		* it. Adapted from the codex effort slider's visual baseline.
		* @param context - the glow canvas' 2D context, already scaled to CSS pixels.
		* @param width - track width in CSS pixels.
		* @param height - track height in CSS pixels.
		* @param time - animation clock in milliseconds.
		* @param state - current preview ratio and drag flag.
		* @param isDark - whether the document wears the dark theme.
		*/
		function drawLiangRadiation(context, width, height, time, state, isDark) {
			const origin = LIANG_KNOB / 2 + state.ratio * Math.max(0, width - LIANG_KNOB);
			const cell = 4;
			const speed = state.dragging ? 2.8 : 1;
			context.clearRect(0, 0, width, height);
			if (origin <= 0) return;
			context.save();
			context.beginPath();
			context.rect(0, 0, origin, height);
			context.clip();
			for (let x = 0; x < origin; x += cell) {
				const delta = x + cell * 0.5 - origin;
				const distance = Math.abs(delta);
				const phaseA = distance / 10 - time * 0.0074 * speed;
				const phaseB = distance / 23 - time * 0.0041 * speed + 1.7;
				const phaseC = distance / 40 - time * 0.0022 * speed + 3.4;
				const sinA = Math.max(0, Math.sin(phaseA));
				const sinB = Math.max(0, Math.sin(phaseB));
				const sinC = Math.max(0, Math.sin(phaseC));
				const waveA = Math.pow(sinA, 2.6);
				const waveB = Math.pow(sinB, 3.2);
				const waveC = Math.pow(sinC, 4);
				const crest = Math.pow(sinA, 15) + Math.pow(sinB, 18) * 0.78;
				const wave = Math.min(1, waveA * 0.76 + waveB * 0.58 + waveC * 0.32);
				const trail = 0.38 + 0.62 * Math.exp(-distance / Math.max(55, width * 0.72));
				const pillar = Math.pow(Math.max(0, Math.sin(x / 20 + time * 0.0016)), 3) * 0.27;
				const columnEnergy = trail * (wave * 1.04 + pillar + crest * 0.32);
				if (columnEnergy > 0.012) {
					const nearness = Math.max(0, 1 - distance / Math.max(1, width * 0.78));
					const red = isDark ? Math.round(42 + 124 * nearness + 75 * wave) : Math.round(28 + 58 * nearness + 15 * wave);
					const green = isDark ? Math.round(56 + 58 * nearness + 44 * crest) : Math.round(88 + 72 * nearness + 30 * crest);
					const blue = isDark ? Math.round(175 + 72 * nearness + 8 * wave) : Math.round(182 + 62 * nearness);
					const alpha = isDark ? Math.min(0.88, columnEnergy * 0.72) : Math.min(0.62, columnEnergy * 0.54);
					context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
					context.fillRect(x, 0, cell - 1, height);
				}
				for (let y = 0; y < height; y += cell) {
					const deltaY = y + cell * 0.5 - height * 0.5;
					const radial = Math.hypot(delta / 38, deltaY / 11);
					const halo = Math.exp(-radial * 0.96) * 1.08;
					const verticalShape = 0.58 + 0.42 * Math.cos(deltaY / height * Math.PI);
					const grain = 0.72 + 0.28 * Math.sin(x * 0.73 + y * 1.31 + time * 0.006);
					const alpha = Math.min(0.96, (columnEnergy * 0.88 + halo + crest * 0.19) * verticalShape * grain);
					if (alpha < 0.035) continue;
					const hot = Math.max(0, 1 - radial / 2.4);
					const red = isDark ? Math.round(54 + 148 * hot + 42 * wave + 35 * crest) : Math.round(25 + 72 * hot + 12 * wave);
					const green = isDark ? Math.round(68 + 78 * hot + 46 * crest) : Math.round(98 + 72 * hot + 24 * crest);
					const blue = isDark ? Math.round(186 + 64 * hot) : Math.round(194 + 56 * hot);
					context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${isDark ? alpha : alpha * 0.72})`;
					context.fillRect(x, y, cell - 1, cell - 1);
				}
			}
			for (let i = 0; i < 14; i += 1) {
				const travel = (time * (state.dragging ? 0.16 : 0.065) * (0.78 + (i % 5) * 0.09) + i * 23) % Math.max(30, origin + 64);
				const particleX = origin - travel;
				if (particleX < -24 || particleX > width + 16) continue;
				const particleY = 3 + (i * 13 + Math.sin(time * 0.003 + i) * 5) % Math.max(7, height - 6);
				const length = 4 + (i % 4) * 4 + (state.dragging ? 6 : 0);
				const alpha = 0.28 + (i % 5) * 0.1;
				const streak = context.createLinearGradient(particleX, 0, particleX + length, 0);
				streak.addColorStop(0, isDark ? "rgba(72,118,255,0)" : "rgba(24,94,184,0)");
				streak.addColorStop(0.68, isDark ? `rgba(112,135,255,${alpha})` : `rgba(36,108,202,${alpha * 0.72})`);
				streak.addColorStop(1, isDark ? `rgba(236,222,255,${Math.min(1, alpha + 0.26)})` : `rgba(103,175,248,${Math.min(0.82, alpha + 0.18)})`);
				context.fillStyle = streak;
				context.fillRect(particleX, particleY, length, i % 3 === 0 ? 2 : 1);
			}
			const glow = context.createRadialGradient(origin, height / 2, 0, origin, height / 2, 24);
			glow.addColorStop(0, isDark ? "rgba(255,255,255,.82)" : "rgba(255,255,255,.86)");
			glow.addColorStop(0.14, isDark ? "rgba(183,190,255,.54)" : "rgba(162,210,255,.48)");
			glow.addColorStop(0.44, isDark ? "rgba(103,74,255,.28)" : "rgba(37,112,207,.22)");
			glow.addColorStop(1, isDark ? "rgba(86,31,210,0)" : "rgba(25,91,181,0)");
			context.fillStyle = glow;
			context.fillRect(origin - 26, 0, 52, height);
			context.restore();
		}
		/**
		* The calibrator's slider surface: gradient track, pixel-radiation canvas,
		* cross flare, and glowing knob. Dragging follows the pointer continuously
		* and previews only; releasing snaps to the nearest combo and commits it.
		* The visually hidden native range carries combo positions, so keyboard and
		* assistive access step whole levels without a hand-rolled key map.
		* @param props - preview ratio, drag flag, top-of-range flag, disabled and
		* label, the combo index/count the native range addresses, and the verbs.
		*/
		function LiangSlider({ ratio, dragging, top, disabled, label, index, count, onPreview, onCommitRatio, onCommitIndex, onDragChange }) {
			const rootRef = (0, react.useRef)(null);
			const glowRef = (0, react.useRef)(null);
			const inputRef = (0, react.useRef)(null);
			const live = (0, react.useRef)({ ratio, dragging });
			live.current = { ratio, dragging };
			const redrawRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const canvas = glowRef.current;
				if (canvas === null) return;
				const context = canvas.getContext("2d");
				if (context === null) return;
				let width = 1;
				let height = 1;
				const draw = (time) => {
					drawLiangRadiation(context, width, height, time, live.current, document.body.hasAttribute("data-ds-dark-theme"));
				};
				redrawRef.current = () => {
					draw(window.performance.now());
				};
				const resize = () => {
					const bounds = canvas.getBoundingClientRect();
					width = Math.max(1, Math.round(bounds.width));
					height = Math.max(1, Math.round(bounds.height));
					const scale = Math.min(window.devicePixelRatio || 1, 2);
					canvas.width = Math.round(width * scale);
					canvas.height = Math.round(height * scale);
					context.setTransform(scale, 0, 0, scale, 0, 0);
					draw(window.performance.now());
				};
				resize();
				const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
				let frame;
				const loop = (time) => {
					draw(time);
					frame = window.requestAnimationFrame(loop);
				};
				const start = () => {
					if (frame === void 0) frame = window.requestAnimationFrame(loop);
				};
				const stop = () => {
					if (frame !== void 0) {
						window.cancelAnimationFrame(frame);
						frame = void 0;
					}
				};
				const onMotion = () => {
					if (reduced.matches) {
						stop();
						draw(window.performance.now());
					} else start();
				};
				const observer = new ResizeObserver(resize);
				observer.observe(canvas);
				const theme = new MutationObserver(() => {
					draw(window.performance.now());
				});
				theme.observe(document.body, {
					attributes: true,
					attributeFilter: ["data-ds-dark-theme"]
				});
				reduced.addEventListener("change", onMotion);
				onMotion();
				return () => {
					stop();
					redrawRef.current = null;
					observer.disconnect();
					theme.disconnect();
					reduced.removeEventListener("change", onMotion);
				};
			}, []);
			(0, react.useEffect)(() => {
				if (redrawRef.current !== null) redrawRef.current();
			}, [ratio, dragging]);
			const ratioAt = (clientX) => {
				const root = rootRef.current;
				if (root === null) return 0;
				const bounds = root.getBoundingClientRect();
				const usable = Math.max(1, bounds.width - LIANG_KNOB);
				return Math.max(0, Math.min(1, (clientX - bounds.left - LIANG_KNOB / 2) / usable));
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: "dsh-liang-slider",
				style: {
					"--dsh-liang-p": String(ratio)
				},
				"data-dragging": dragging ? "true" : "false",
				"data-top": top ? "true" : "false",
				"data-disabled": disabled ? "true" : "false",
				onPointerDown: (event) => {
					if (disabled) return;
					event.preventDefault();
					event.currentTarget.setPointerCapture(event.pointerId);
					inputRef.current?.focus();
					onDragChange(true);
					onPreview(ratioAt(event.clientX));
				},
				onPointerMove: (event) => {
					if (disabled || !dragging) return;
					onPreview(ratioAt(event.clientX));
				},
				onPointerUp: (event) => {
					if (disabled || !dragging) return;
					if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
					onDragChange(false);
					onCommitRatio(ratioAt(event.clientX));
				},
				onPointerCancel: () => {
					if (!disabled && dragging) onDragChange(false);
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", { className: "dsh-liang-track" }),
					(0, react_jsx_runtime.jsx)("canvas", { ref: glowRef, className: "dsh-liang-glow" }),
					(0, react_jsx_runtime.jsx)("div", { className: "dsh-liang-flare" }),
					(0, react_jsx_runtime.jsx)("div", { className: "dsh-liang-knob" }),
					(0, react_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "range",
						min: 0,
						max: Math.max(0, count - 1),
						step: 1,
						value: Math.max(0, Math.min(count - 1, index)),
						disabled,
						className: "dsh-liang-input",
						"aria-label": label,
						onChange: (event) => {
							onCommitIndex(Number(event.target.value));
						}
					})
				]
			});
		}
		/**
		* The calibrator surface: it IS the model-select root pane, so opening the
		* composer's model seat lands straight on the slider. A small Model row
		* beneath it still drills into the plain list.
		* @param props - model/effort combos, current combo index, busy flag, commit verb.
		*/
		function LiangEffortSlider({ combos, currentIndex, busy, onChoose }) {
			ensureLiangStyles();
			const levelFromIndex = (index) => index <= -1 ? 0 : liangPosForCombo(index, combos.length);
			const canvasRef = (0, react.useRef)(null);
			const imagesRef = (0, react.useRef)(new Map());
			const lastCommitted = (0, react.useRef)(currentIndex);
			const [level, setLevel] = (0, react.useState)(() => levelFromIndex(currentIndex));
			const [ready, setReady] = (0, react.useState)(false);
			const [dragging, setDragging] = (0, react.useState)(false);
			const drawFrame = (image) => {
				const canvas = canvasRef.current;
				if (canvas === null) return;
				const ratio = Math.min(window.devicePixelRatio || 1, 2);
				const size = Math.max(1, Math.round((canvas.clientWidth || 200) * ratio));
				if (canvas.width !== size || canvas.height !== size) {
					canvas.width = size;
					canvas.height = size;
				}
				const context = canvas.getContext("2d");
				if (context === null) return;
				context.clearRect(0, 0, size, size);
				context.drawImage(image, 0, 0, size, size);
			};
			(0, react.useEffect)(() => {
				lastCommitted.current = currentIndex;
				if (currentIndex !== -1 && currentIndex !== liangComboIndexForPos(level, combos.length)) setLevel(levelFromIndex(currentIndex));
			}, [currentIndex]);
			(0, react.useEffect)(() => {
				const frame = Math.max(0, Math.min(LIANG_MAX_LEVEL, Math.round(level)));
				const cache = imagesRef.current;
				const url = liangFrameUrl(frame);
				let image = cache.get(url);
				if (image === void 0) {
					image = new Image();
					cache.set(url, image);
					image.onload = () => {
						setReady(true);
						drawFrame(image);
					};
					image.src = url;
				} else if (image.complete) drawFrame(image);
				for (const near of [frame - 1, frame + 1]) {
					if (near < 0 || near > LIANG_MAX_LEVEL) continue;
					const nearUrl = liangFrameUrl(near);
					if (cache.has(nearUrl)) continue;
					const nearImage = new Image();
					cache.set(nearUrl, nearImage);
					nearImage.src = nearUrl;
				}
			}, [level]);
			const comboIndex = combos.length === 0 ? -1 : liangComboIndexForPos(level, combos.length);
			const combo = comboIndex === -1 ? void 0 : combos[comboIndex];
			const stageIndex = comboIndex === -1 ? liangStageForPos(level) : liangStageForCombo(comboIndex, combos.length);
			const stage = LIANG_STAGES[stageIndex];
			const comboLabel = combo === void 0 ? void 0 : combo.effortName === void 0 ? combo.modelName : `${combo.modelName} · ${combo.effortName}`;
			/**
			* Settle on one combo: park the knob on its canonical position and hand the
			* index up once, so a pointer drag across several combos and a keyboard
			* step onto the same one both commit exactly once.
			*/
			const commitIndex = (index) => {
				const bounded = Math.max(0, Math.min(combos.length - 1, index));
				setLevel(liangPosForCombo(bounded, combos.length));
				if (lastCommitted.current === bounded) return;
				lastCommitted.current = bounded;
				onChoose(bounded);
			};
			const commitRatio = (ratio) => {
				commitIndex(liangComboIndexForPos(Math.round(ratio * LIANG_MAX_LEVEL), combos.length));
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "dsh-liang",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-liang-canvasWrap",
						children: [
							(0, react_jsx_runtime.jsx)("canvas", {
								ref: canvasRef,
								className: "dsh-liang-canvas",
								role: "img",
								"aria-label": `梁系强度：${stage}`
							}),
							!ready && (0, react_jsx_runtime.jsx)("span", {
								className: "dsh-liang-load",
								children: "载入连续祖力…"
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-liang-readout",
						children: [
							(0, react_jsx_runtime.jsxs)("span", {
								className: "dsh-liang-id",
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: "dsh-liang-stage",
										children: stage
									}),
									comboLabel !== void 0 && (0, react_jsx_runtime.jsx)("span", {
										className: "dsh-liang-combo",
										children: comboLabel
									})
								]
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: "dsh-liang-level",
								children: `${String(Math.round(level)).padStart(2, "0")} / ${LIANG_MAX_LEVEL}`
							})
						]
					}),
					(0, react_jsx_runtime.jsx)(LiangSlider, {
						ratio: level / LIANG_MAX_LEVEL,
						dragging,
						top: Math.round(level) >= LIANG_MAX_LEVEL,
						disabled: busy && !dragging,
						label: "梁系强度",
						index: comboIndex,
						count: combos.length,
						onPreview: (ratio) => {
							// Keep the level continuous while dragging: the knob, flare, and
							// radiation follow the pointer, while the portrait and the readout
							// quantize to the 31 keyframes.
							setLevel(ratio * LIANG_MAX_LEVEL);
						},
						onCommitRatio: commitRatio,
						onCommitIndex: commitIndex,
						onDragChange: (next) => {
							setDragging(next);
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-markers",
						children: LIANG_STAGES.map((name, index) => {
							const markerCombo = combos.length === 6 ? combos[index] : void 0;
							return (0, react_jsx_runtime.jsx)("span", {
								className: `dsh-liang-marker${index === stageIndex ? " is-current" : ""}`,
								title: markerCombo === void 0 ? void 0 : markerCombo.effortName === void 0 ? markerCombo.modelName : `${markerCombo.modelName} · ${markerCombo.effortName}`,
								children: name
							}, index);
						})
					})
				]
			});
		}


		/** Stage-effort trio for one backend: off|lowest, high, max|highest — keeps the six stages 1:1 per provider. */
		const liangStageEffortIds = (ids) => {
			if (ids.length === 0) return [];
			const first = ids.includes("off") ? "off" : ids[0];
			const high = ids.includes("high") ? "high" : ids[Math.min(ids.length - 1, Math.max(0, Math.floor((ids.length - 1) / 2)))];
			const last = ids.includes("max") ? "max" : ids[ids.length - 1];
			return [...new Set([first, high, last])];
		};
		/** Index of the combo best matching (provider, model, effort): exact match, else nearest effort rank. */
		const liangNearestComboIndex = (combos, current, effort) => {
			const same = combos.filter((combo) => combo.provider === current.provider && combo.model === current.model);
			if (same.length === 0) return -1;
			const exact = same.find((combo) => combo.effort === effort);
			if (exact !== void 0) return combos.indexOf(exact);
			const target = same[0].ranks.indexOf(effort);
			if (target === -1) return combos.indexOf(same[0]);
			let best = same[0];
			for (const combo of same) if (Math.abs(combo.rank - target) < Math.abs(best.rank - target)) best = combo;
			return combos.indexOf(best);
		};
		const liang_backends_css = ".dsh-lm-backends{display:flex;gap:4px;padding:2px 2px 6px;border-bottom:1px solid var(--dsw-alias-border-inverted)}.dsh-lm-backend{flex:1;min-width:0;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid transparent;border-radius:8px;padding:4px 6px;font-size:12px;font-weight:500;line-height:16px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.dsh-lm-backend:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-backend:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3);outline:none}.dsh-lm-backendCurrent{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l3);font-weight:600}";
		if (typeof document !== "undefined") {
			for (const stale of document.querySelectorAll("style[data-liang-backends]")) stale.remove();
			const tag = document.createElement("style");
			tag.dataset.liangBackends = "";
			tag.textContent = liang_backends_css;
			document.head.appendChild(tag);
		}
		const liang_settings_css = ".dsh-liang-cfg{display:flex;flex-direction:column;gap:10px;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}.dsh-liang-cfg-rows{display:flex;flex-direction:column;gap:6px}.dsh-liang-cfg-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;align-items:center;gap:6px}.dsh-liang-cfg-input{box-sizing:border-box;width:100%;min-width:0;height:30px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit}.dsh-liang-cfg-input:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-liang-cfg-input:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-liang-cfg-btn{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:0 0;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;padding:4px 10px}.dsh-liang-cfg-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-liang-cfg-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-liang-cfg-btn:disabled{border-color:transparent;color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-liang-cfg-btnPrimary{border-color:transparent;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-inverted);font-weight:600}.dsh-liang-cfg-btnPrimary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}.dsh-liang-cfg-actions{display:flex;align-items:center;gap:8px}.dsh-liang-cfg-status{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.dsh-liang-cfg-hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}";
		if (typeof document !== "undefined") {
			for (const stale of document.querySelectorAll("style[data-liang-settings]")) stale.remove();
			const tag = document.createElement("style");
			tag.dataset.liangSettings = "";
			tag.textContent = liang_settings_css;
			document.head.appendChild(tag);
		}

		/** Provider id -> short label for the cramped backend toggle row (title keeps the full name). */
		const LIANG_BACKEND_SHORT = {
			"deepseek-official": "DS",
			"opencode-go": "OCG",
			"opencode": "OC"
		};
		/** Alias rows the calibrator falls back to before the settings form answers. */
		const LIANG_DEFAULT_ALIAS_ROWS = Object.entries(LIANG_BACKEND_SHORT).map(([provider, alias]) => ({
			provider,
			alias
		}));
		/**
		* Short label for the cramped backend toggle row: the configured alias when
		* the settings form carries one, otherwise the provider's catalog name.
		* @param id - provider id of the backend.
		* @param fallback - the catalog display name.
		* @param rows - configured alias rows, newest form value first.
		* @returns the label the toggle row prints.
		*/
		const liangBackendShortLabel = (id, fallback, rows) => {
			const hit = rows.find((row) => row.provider === id);
			return hit === void 0 || hit.alias === "" ? fallback : hit.alias;
		};
		/**
		* Normalize a configured alias map into ordered rows. A malformed entry is
		* dropped rather than rendered as a broken row.
		* @param value - the settings form's `backendAliases` value.
		* @returns the rows the editor and the toggle row both read.
		*/
		const liangAliasRows = (value) => {
			if (value === null || typeof value !== "object" || Array.isArray(value)) return LIANG_DEFAULT_ALIAS_ROWS;
			const rows = Object.entries(value).flatMap(([provider, alias]) => typeof alias === "string" ? [{
				provider,
				alias
			}] : []);
			return rows.length === 0 ? LIANG_DEFAULT_ALIAS_ROWS : rows;
		};


		/**
		* ModelSelect: the composer's named model seat (`conversation.input.model`).
		* Two-level selection per figma 496:26454's MenuDropdown: the root menu is
		* the Model / Effort row pair (label + current value + a right chevron),
		* each drilling into its own list — the provider-grouped model list over
		* the shared directory, and the effort levels. The trigger (313:14108's
		* ToggleButton) shows both: model name + effort in the caption tone.
		* Data and submission ride the SAME per-session ModelDirectory as the
		* /model popup; exact-model reasoning metadata and the selected effort come
		* from the Host rather than a client-owned vocabulary. A rejected selection
		* announces through the shared transient Toast anchored to the composer
		* card; the in-menu strip with Retry remains the catalog-load surface.
		*/
		/**
		* Render the composer model seat.
		* @param props - owner share (locked) + injected face (shared directory
		* store/verbs) + the standard locale seat.
		* @returns the trigger and, while open, the two-level menu.
		*/
		function LiangModelSelect({ locked, available, directory, aliases, load, select, t }) {
			const state = (0, react.useSyncExternalStore)((fn) => directory.subscribe(fn), () => directory.getSnapshot());
			const aliasRows = (0, react.useSyncExternalStore)((fn) => aliases.subscribe(fn), () => aliases.getSnapshot()).rows;
			const [open, setOpen] = (0, react.useState)(false);
			const [pane, setPane] = (0, react.useState)("root");
			const lastActionRef = (0, react.useRef)("load");
			const [toast, setToast] = (0, react.useState)(null);
			const toastSeq = (0, react.useRef)(0);
			const rootRef = (0, react.useRef)(null);
			const triggerRef = (0, react.useRef)(null);
			const itemRefs = (0, react.useRef)([]);
			const id = (0, react.useId)();
			const choices = (0, react.useMemo)(() => state.groups.flatMap((group) => group.models.map((model) => ({
				group,
				model,
				selection: {
					provider: group.id,
					model: model.id,
					...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
				}
			}))), [state.groups]);
			const currentChoice = choices[state.current === null ? -1 : choices.findIndex((c) => c.selection.provider === state.current?.provider && c.selection.model === state.current.model)];
			const reasoning = currentChoice?.model.reasoning;
			const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
			const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? t("effort.providerDefault") : reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;
			const providers = (0, react.useMemo)(() => state.groups.map((group) => {
				const combos = group.models.flatMap((model) => {
					if (model.reasoning === void 0 || model.reasoning.efforts.length === 0) return [{
						provider: group.id,
						model: model.id,
						modelName: model.name,
						effort: void 0,
						effortName: void 0,
						rank: -1,
						ranks: []
					}];
					const efforts = model.reasoning.efforts;
					const ids = efforts.map((effort) => effort.id);
					const trio = liangStageEffortIds(ids);
					return trio.map((id) => {
						const effort = efforts.find((level) => level.id === id);
						return {
							provider: group.id,
							model: model.id,
							modelName: model.name,
							effort: id,
							effortName: effort.name,
							rank: ids.indexOf(id),
							ranks: ids
						};
					});
				});
				return { id: group.id, name: group.name, combos };
			}), [state.groups]);
			const activeProviderId = state.current !== null && state.groups.some((group) => group.id === state.current.provider) ? state.current.provider : providers[0]?.id;
			const activeProvider = providers.find((provider) => provider.id === activeProviderId) ?? providers[0] ?? null;
			const combos = activeProvider === null ? [] : activeProvider.combos;
			const currentComboIndex = state.current === null ? -1 : liangNearestComboIndex(combos, state.current, effectiveEffort);
			const liangLabel = currentComboIndex === -1 ? void 0 : LIANG_STAGES[liangStageForCombo(currentComboIndex, combos.length)];
			const shownEffortLabel = liangLabel ?? effortLabel;
			const busy = state.status === "selecting";
			const reload = () => {
				lastActionRef.current = "load";
				load();
			};
			(0, react.useEffect)(() => {
				if (available) {
					lastActionRef.current = "load";
					load();
				}
			}, [available, load]);
			(0, react.useEffect)(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (!rootRef.current?.contains(event.target)) setOpen(false);
				};
				document.addEventListener("mousedown", closeOutside);
				return () => {
					document.removeEventListener("mousedown", closeOutside);
				};
			}, [open]);
			(0, react.useEffect)(() => {
				if (!open) return;
				if (pane === "model" || document.activeElement === document.body) rootRef.current?.focus();
			}, [pane, open]);
			if (!available) return null;
			const show = () => {
				setPane("root");
				setOpen(true);
				reload();
			};
			const close = (restoreFocus = false) => {
				setOpen(false);
				setPane("root");
				if (restoreFocus) queueMicrotask(() => {
					triggerRef.current?.focus();
				});
			};
			const moveFocus = (offset) => {
				const items = itemRefs.current.filter((item) => item !== null);
				if (items.length === 0) return;
				const active = items.findIndex((item) => item === document.activeElement);
				items[(Math.max(active, 0) + offset + items.length) % items.length]?.focus();
			};
			const onRootKeyDown = (event) => {
				if (event.key === "Escape" && open) {
					event.preventDefault();
					if (pane !== "root") setPane("root");
					else close(true);
					return;
				}
				if (!open) return;
				if (event.target instanceof HTMLElement && event.target.closest(".dsh-liang") !== null) return;
				if (event.key === "ArrowDown" || event.key === "ArrowUp") {
					event.preventDefault();
					moveFocus(event.key === "ArrowDown" ? 1 : -1);
				}
			};
			const onBlur = (event) => {
				if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return;
				close();
			};
			const settleSelection = (accepted) => {
				if (accepted) {
					if (rootRef.current !== null) close(true);
					return;
				}
				const message = directory.getSnapshot().error;
				if (message !== null) {
					toastSeq.current += 1;
					setToast({
						seq: toastSeq.current,
						text: t("error.action", { message })
					});
				}
			};
			const choose = (selection) => {
				if (state.current?.provider === selection.provider && state.current.model === selection.model) {
					close(true);
					return;
				}
				lastActionRef.current = "select";
				select(selection).then(settleSelection);
			};
			const chooseCombo = (combo, keepOpen) => {
				if (state.current === null) return;
				const selection = {
					provider: combo.provider,
					model: combo.model,
					...combo.effort === void 0 ? {} : { reasoningEffort: combo.effort }
				};
				if (state.current.provider === selection.provider && state.current.model === selection.model && effectiveEffort === (selection.reasoningEffort ?? void 0)) {
					if (keepOpen !== true) close(true);
					return;
				}
				lastActionRef.current = "select";
				select(selection).then((accepted) => {
					if (accepted && keepOpen === true) return;
					settleSelection(accepted);
				});
			};
			const switchBackend = (provider) => {
				if (provider.id === activeProviderId || provider.combos.length === 0) return;
				const stageIndex = currentComboIndex === -1 ? 0 : liangStageForCombo(currentComboIndex, combos.length);
				const target = provider.combos[stageIndex] ?? provider.combos[0];
				const selection = {
					provider: target.provider,
					model: target.model,
					...target.effort === void 0 ? {} : { reasoningEffort: target.effort }
				};
				lastActionRef.current = "select";
				select(selection).then((accepted) => {
					if (accepted === true) return;
					settleSelection(accepted);
				});
			};
			const modelLabel = currentChoice?.model.name ?? t("trigger.fallback");
			const triggerLabel = shownEffortLabel === void 0 ? modelLabel : `${modelLabel} · ${shownEffortLabel}`;
			const triggerAria = currentChoice === void 0 ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", {
				model: modelLabel,
				effort: effortLabel
			});
			const triggerTitle = activeProvider === null || providers.length <= 1 ? triggerLabel : `${activeProvider.name} · ${triggerLabel}`;
			itemRefs.current = [];
			let itemIndex = 0;
			const itemRef = () => {
				const at = itemIndex++;
				return (node) => {
					itemRefs.current[at] = node;
				};
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: liang_css.root,
				tabIndex: -1,
				onKeyDown: onRootKeyDown,
				onBlur,
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						ref: triggerRef,
						type: "button",
						className: liang_css.trigger,
						"aria-label": triggerAria,
						"aria-haspopup": "menu",
						"aria-expanded": open,
						"aria-controls": open ? `${id}-menu` : void 0,
						title: triggerTitle,
						disabled: locked,
						onClick: () => {
							if (open) close();
							else show();
						},
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: liang_css.triggerLabel,
								children: modelLabel
							}),
							shownEffortLabel !== void 0 && (0, react_jsx_runtime.jsx)("span", {
								className: liang_css.triggerEffort,
								title: effortLabel,
								children: shownEffortLabel
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 14, className: clsx(liang_css.chevron, open && liang_css.chevronOpen) })
						]
					}),
					open && (0, react_jsx_runtime.jsxs)("div", {
						id: `${id}-menu`,
						className: liang_css.menu,
						role: "menu",
						"aria-label": t("menu.aria"),
						"aria-busy": state.status === "loading" || busy,
						children: [
							pane === "root" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [state.error !== null && lastActionRef.current === "load" && (0, react_jsx_runtime.jsxs)("div", {
								className: liang_css.error,
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: liang_css.retry,
									onClick: reload,
									children: t("retry")
								})]
							}), combos.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
								className: liang_css.empty,
								children: t("empty.models")
							}) : (0, react_jsx_runtime.jsx)(LiangEffortSlider, {
								combos,
								currentIndex: currentComboIndex,
								busy,
								onChoose: (index) => {
									const combo = combos[index];
									if (combo === void 0) return;
									chooseCombo(combo, true);
								}
							}), providers.length > 1 && (0, react_jsx_runtime.jsx)("div", {
								className: "dsh-lm-backends",
								children: providers.map((provider) => (0, react_jsx_runtime.jsx)("button", {
									ref: itemRef(),
									type: "button",
									role: "menuitemradio",
									"aria-checked": provider.id === activeProviderId,
									className: clsx("dsh-lm-backend", provider.id === activeProviderId && "dsh-lm-backendCurrent"),
									title: provider.id === activeProviderId ? t("backend.current", { name: provider.name }) : t("backend.switchTo", { name: provider.name }),
									disabled: busy,
									onClick: () => {
										switchBackend(provider);
									},
									children: liangBackendShortLabel(provider.id, provider.name, aliasRows)
								}, provider.id))
							}), (0, react_jsx_runtime.jsxs)("button", {
								ref: itemRef(),
								type: "button",
								role: "menuitem",
								className: liang_css.cell,
								onClick: () => {
									setPane("model");
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: liang_css.cellLabel,
										children: t("menu.model")
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: liang_css.cellValue,
										children: modelLabel
									}),
									(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronRightOutlineRegular, { size: 14, className: liang_css.cellChevron })
								]
							})] }),
							pane === "model" && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								state.status === "loading" && (0, react_jsx_runtime.jsx)("div", {
									className: liang_css.status,
									children: t("status.loading")
								}),
								state.error !== null && lastActionRef.current === "load" && (0, react_jsx_runtime.jsxs)("div", {
									className: liang_css.error,
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: liang_css.retry,
										onClick: reload,
										children: t("retry")
									})]
								}),
								state.failures.map((failure) => (0, react_jsx_runtime.jsxs)("div", {
									className: liang_css.warning,
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("warning.groupLoad", {
										name: failure.name,
										message: failure.message
									}) }), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: liang_css.retry,
										onClick: reload,
										children: t("retry")
									})]
								}, failure.id)),
								(0, react_jsx_runtime.jsx)("div", {
									className: clsx(liang_css.groups, "scrollable"),
									children: state.groups.map((group) => {
										const headingId = `${id}-${group.id}`;
										return (0, react_jsx_runtime.jsxs)("section", {
											role: "group",
											"aria-labelledby": headingId,
											className: liang_css.group,
											children: [(0, react_jsx_runtime.jsx)("div", {
												className: liang_css.groupTitle,
												id: headingId,
												children: group.name
											}), group.models.map((model) => {
												const selected = state.current?.provider === group.id && state.current.model === model.id;
												return (0, react_jsx_runtime.jsxs)("button", {
													ref: itemRef(),
													type: "button",
													role: "menuitemradio",
													"aria-checked": selected,
													className: clsx(liang_css.option, selected && liang_css.selected),
													title: model.name,
													disabled: busy,
													onClick: () => {
														choose({
															provider: group.id,
															model: model.id
														});
													},
													children: [(0, react_jsx_runtime.jsxs)("span", {
														className: liang_css.optionCopy,
														children: [(0, react_jsx_runtime.jsx)("span", {
															className: liang_css.modelName,
															children: model.name
														}), model.description !== void 0 && (0, react_jsx_runtime.jsx)("span", {
															className: liang_css.description,
															children: model.description
														})]
													}), (0, react_jsx_runtime.jsx)("span", {
														className: liang_css.check,
														children: selected ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutlineRegular, { size: 16 }) : null
													})]
												}, model.id);
											})]
										}, group.id);
									})
								}),
								state.status === "ready" && choices.length === 0 && (0, react_jsx_runtime.jsx)("div", {
									className: liang_css.empty,
									children: t("empty.models")
								})
							] }),
						]
					}),
					toast !== null && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
						text: toast.text,
						icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconWarningOutlineRegular, { size: 16 }),
						anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
						onDone: () => {
							setToast(null);
						}
					}, toast.seq)
				]
			});
		}
		//#endregion

		/**
		* The calibrator's configuration page inside the Plugins section: the
		* provider-id -> short-label map its backend toggle row prints. Values and
		* writes ride the settings configuration form (`ctx.configForms`), so the
		* page edits the same volatile field the profile patch persists. The draft
		* is component-local; only Save crosses the wire.
		* @param props - the view the page asks for, the form face, and the locale seat.
		* @returns the one-liner, or the editor.
		*/
		function LiangSettingsCard(props) {
			const { t, view } = props;
			const state = props.useLiangSettings((snapshot) => snapshot);
			const [draft, setDraft] = (0, react.useState)(null);
			if (view === "summary") return t("settings.description");
			const rows = draft ?? state.rows;
			const disabled = !state.writable;
			const edit = (at, key, value) => {
				const next = rows.map((row, index) => index === at ? {
					...row,
					[key]: value
				} : row);
				setDraft(next);
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "dsh-liang-cfg",
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-cfg-hint",
						children: t("settings.hint")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-cfg-rows",
						children: rows.map((row, at) => (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-liang-cfg-row",
							children: [
								(0, react_jsx_runtime.jsx)("input", {
									className: "dsh-liang-cfg-input",
									value: row.provider,
									disabled,
									"aria-label": t("settings.provider"),
									placeholder: t("settings.provider"),
									onChange: (event) => {
										edit(at, "provider", event.target.value);
									}
								}),
								(0, react_jsx_runtime.jsx)("input", {
									className: "dsh-liang-cfg-input",
									value: row.alias,
									disabled,
									"aria-label": t("settings.alias"),
									placeholder: t("settings.alias"),
									onChange: (event) => {
										edit(at, "alias", event.target.value);
									}
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dsh-liang-cfg-btn",
									disabled,
									title: t("settings.remove"),
									onClick: () => {
										setDraft(rows.filter((_row, index) => index !== at));
									},
									children: "✕"
								})
							]
						}, at))
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-liang-cfg-actions",
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsh-liang-cfg-btn",
								disabled,
								onClick: () => {
									setDraft([...rows, {
										provider: "",
										alias: ""
									}]);
								},
								children: t("settings.add")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsh-liang-cfg-btn",
								disabled,
								onClick: () => {
									setDraft(null);
								},
								children: t("settings.discard")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsh-liang-cfg-btn dsh-liang-cfg-btnPrimary",
								disabled: disabled || draft === null,
								onClick: () => {
									void props.save(rows).then((accepted) => {
										if (accepted) setDraft(null);
									});
								},
								children: t("settings.save")
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: "dsh-liang-cfg-status",
								children: disabled ? t("settings.readonly") : draft === null ? t("settings.saved") : t("settings.dirty")
							})
						]
					})
				]
			});
		}
		//#endregion
		
const zh = {
			"command.description": "选择本会话使用的模型",
			"option.loadError": "目录加载失败：{message}",
			"trigger.fallback": "选择模型",
			"trigger.selectAria": "选择模型",
			"trigger.aria": "选择模型，当前 {model}",
			"trigger.ariaEffort": "选择模型，当前 {model}，推理等级 {effort}",
			"menu.aria": "模型与梁系校准",
			"menu.model": "模型",
			"menu.effort": "梁系校准",
			"backend.current": "当前后端：{name}",
			"backend.switchTo": "切换到 {name}",
			"effort.providerDefault": "Default",
			"status.loading": "正在刷新模型列表…",
			"error.action": "模型操作失败：{message}",
			"action.reload": "重新加载",
			"warning.groupLoad": "{name} 加载失败：{message}",
			"empty.models": "没有可用的模型。",
			"blocked.composer": "当前模型不可用，请先选择模型",
			"empty.efforts": "当前模型未提供推理等级。",
			"settings.title": "滑动变祖器",
			"settings.description": "配置 composer 模型座位上的梁系校准器。",
			"settings.hint": "渠道别名：左边填 provider id，右边填切换行上显示的简称。留空则回退到目录里的渠道名。",
			"settings.provider": "Provider id",
			"settings.alias": "别名",
			"settings.add": "新增一行",
			"settings.remove": "删除这一行",
			"settings.save": "保存",
			"settings.discard": "放弃修改",
			"settings.saved": "已保存",
			"settings.dirty": "有未保存的修改",
			"settings.readonly": "当前部署不接受配置写入"
		};
const en = {
			"command.description": "Select the model for this conversation",
			"option.loadError": "Catalog failed to load: {message}",
			"trigger.fallback": "Select model",
			"trigger.selectAria": "Select model",
			"trigger.aria": "Select model, current {model}",
			"trigger.ariaEffort": "Select model, current {model}, reasoning effort {effort}",
			"menu.aria": "Model and Liang calibration",
			"menu.model": "Model",
			"menu.effort": "Liang Calibration",
			"backend.current": "Current backend: {name}",
			"backend.switchTo": "Switch to {name}",
			"effort.providerDefault": "Default",
			"status.loading": "Refreshing model list…",
			"error.action": "Model operation failed: {message}",
			"action.reload": "Reload",
			"warning.groupLoad": "{name} failed to load: {message}",
			"empty.models": "No models available.",
			"blocked.composer": "This model is unavailable — select one to continue",
			"empty.efforts": "This model provides no reasoning effort levels.",
			"settings.title": "Liang Calibrator",
			"settings.description": "Configure the liang calibrator on the composer model seat.",
			"settings.hint": "Channel aliases: the left field is a provider id, the right one the short label its toggle button prints. An empty label falls back to the catalog's channel name.",
			"settings.provider": "Provider id",
			"settings.alias": "Alias",
			"settings.add": "Add row",
			"settings.remove": "Remove this row",
			"settings.save": "Save",
			"settings.discard": "Discard changes",
			"settings.saved": "Saved",
			"settings.dirty": "Unsaved changes",
			"settings.readonly": "This deployment refuses configuration writes"
		};

		/** Dictionary namespace owned by this plugin. */
		const NS = "liang";
		/** Required services: locale, the slot registry, sessions, and the shared model directory.
		* `remote` / `remote.session` are read by ModelDirectoryResolver.directoryFor behind the
		* caller-ctx tracker (0.1.2 moved the session Remote behind `remote.session`), so every
		* caller fiber must inject them too — otherwise the seat entry crashes with
		* `cannot get property "remote.session" without inject`, abdicates, and the stock
		* selector silently renders instead. Mirrors the stock ui-model-selection inject set. */
		const inject = ["locale", "slots", "sessions", "modelDirectories", "remote", "remote.session"];
		/** Profile entry id of this plugin: the settings namespace its own page edits. */
		const SETTINGS_NS = "liang-calibrator";
		/**
		* Client plugin body: register the dictionaries, publish the channel-alias
		* configuration, then shadow the built-in `conversation.input.model` seat
		* with the liang calibrator. The shadow wins by priority: the slot renders
		* the LOWEST priority registration, and the built-in registers at the
		* default 0, so -1 replaces it while the original registration stays
		* intact (dispose my plugin to restore the stock selector).
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "liang-calibrator: dictionaries");
			const t = ctx.locale.bind(NS);
			// One alias source feeds both surfaces: the backend toggle row reads it,
			// and the configuration page writes through it. Seeded with the built-in
			// aliases so the calibrator works on a deployment without the settings
			// service, then replaced by whatever the configuration form answers.
			const aliases = _deepseek_ai_dsh_client_store.createSnapshotStore({
				status: "unavailable",
				writable: false,
				rows: LIANG_DEFAULT_ALIAS_ROWS
			});
			// Both services are optional: a deployment without them keeps the built-in
			// aliases and shows no configuration page, while the seat still renders.
			ctx.inject(["configForms", "slots"], (scope) => {
				const form = scope.configForms.get(SETTINGS_NS);
				const sync = () => {
					const snapshot = form.getSnapshot();
					const value = snapshot.value;
					aliases.set({
						status: snapshot.status,
						writable: snapshot.writable,
						rows: liangAliasRows(value === void 0 ? void 0 : value.backendAliases)
					});
				};
				scope.effect(() => form.subscribe(sync), "liang-calibrator: alias form subscription");
				sync();
				// The page exists only while the Host serves this plugin's namespace, so a
				// deployment that never composed Settings shows no trace of it.
				scope.effect(() => scope.configForms.whileServed([SETTINGS_NS], () => scope.slots.inject("plugins.item", () => scope.slots.register({
					name: "plugins.item",
					id: SETTINGS_NS,
					order: 30,
					label: () => t("settings.title"),
					locale: NS,
					inject: () => ({
						hooks: {
							liangSettings: aliases
						},
						save: (rows) => form.mutate([{
							op: "set",
							path: ["backendAliases"],
							value: Object.fromEntries(rows.flatMap((row) => row.provider === "" ? [] : [[row.provider, row.alias]]))
						}])
					})
				}, LiangSettingsCard))), "liang-calibrator: settings page");
			});
			// The seat inject thunk calls models.directoryFor(sessionId), which the resolver
			// executes behind the caller-ctx tracker: this scope must inject everything that
			// call chain reads (sessions + remote.session), not just what this file reads
			// directly — see the `inject` note above.
			ctx.inject(["slots", "sessions", "modelDirectories", "remote", "remote.session"], (scope) => {
				const models = scope.modelDirectories;
				const sessions = scope.sessions;
				scope.slots.inject("conversation.input.model", () => scope.slots.register({
					name: "conversation.input.model",
					locale: NS,
					priority: -1,
					registrant: "liang-calibrator",
					inject: (sessionId) => {
						const directory = models.directoryFor(sessionId);
						const available = sessions.subagentAddress(sessionId) === void 0;
						return {
							available,
							directory: directory.store,
							aliases,
							load: () => {
								if (available) directory.load().catch(() => {});
							},
							select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
						};
					}
				}, LiangModelSelect));
			});
		}
		exports.name = "liang-calibrator";
		exports.inject = inject;
		exports.apply = apply;
		exports.LiangModelSelect = LiangModelSelect;
		exports.LiangEffortSlider = LiangEffortSlider;
		exports.LiangSettingsCard = LiangSettingsCard;
		return module.exports;
	}
});
