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

		const liang_menu_css = ".dsh-lm-root{min-width:0;position:relative}.dsh-lm-trigger{min-width:0;max-width:220px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:24px;outline:none;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;font-weight:500;line-height:20px;display:flex}.dsh-lm-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-lm-trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-lm-triggerLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.dsh-lm-triggerEffort{color:var(--dsw-alias-label-caption);flex:none}.dsh-lm-chevron{color:var(--dsw-alias-label-caption);flex:none;transition:transform .12s}.dsh-lm-chevronOpen{transform:rotate(180deg)}.dsh-lm-menu{z-index:20;border:1px solid var(--dsw-alias-border-inverted);background:var(--dsw-menu-surface-fill,var(--dsw-specific-menu));backdrop-filter:var(--dsw-menu-backdrop-filter,blur(40px) saturate(150%));-webkit-backdrop-filter:var(--dsw-menu-backdrop-filter,blur(40px) saturate(150%));width:min(240px,100vw - 32px);max-height:min(420px,100vh - 96px);box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border-radius:12px;flex-direction:column;padding:4px;display:flex;position:absolute;bottom:calc(100% + 8px);right:0;overflow:hidden}.dsh-lm-status,.dsh-lm-empty{color:var(--dsw-alias-label-tertiary);padding:10px;font-size:13px;line-height:20px}.dsh-lm-error,.dsh-lm-warning{border-radius:8px;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px;padding:7px 8px;font-size:12px;line-height:18px;display:flex}.dsh-lm-error{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}.dsh-lm-warning{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-state-warn-label)}.dsh-lm-retry{color:inherit;font:inherit;cursor:pointer;background:0 0;border:none;flex:none;padding:0;font-weight:600}.dsh-lm-groups{min-height:0;overflow-y:auto}.dsh-lm-group+.dsh-lm-group{margin-top:4px}.dsh-lm-groupTitle{z-index:1;background:var(--dsw-alias-menu-group-header-fill,var(--dsw-specific-menu));color:var(--dsw-alias-label-tertiary);padding:5px 8px 3px;font-size:12px;font-weight:500;line-height:18px;position:sticky;top:0;border-radius:8px}.dsh-lm-option{width:100%;min-height:38px;color:inherit;text-align:left;cursor:pointer;background:0 0;border:none;border-radius:10px;outline:none;align-items:center;gap:8px;padding:6px 8px;display:flex}.dsh-lm-option:hover:not([aria-disabled=true]),.dsh-lm-option:focus-visible{background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-option[aria-disabled=true]{color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-lm-optionCopy{flex-direction:column;flex:1;min-width:0;display:flex}.dsh-lm-modelName{color:inherit;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}.dsh-lm-description{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:18px;overflow:hidden}.dsh-lm-check{color:var(--dsw-alias-label-primary);flex:0 0 18px;place-items:center;display:grid}.dsh-lm-cell{width:100%;height:40px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:10px;align-items:center;gap:8px;padding:0 10px;font-size:14px;line-height:22px;display:flex}.dsh-lm-cell:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-cellLabel{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.dsh-lm-cellValue{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-tertiary);flex:0 auto;overflow:hidden}.dsh-lm-cellChevron{color:var(--dsw-alias-label-tertiary);flex:none}";
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
			"cell": "dsh-lm-cell",
			"cellLabel": "dsh-lm-cellLabel",
			"cellValue": "dsh-lm-cellValue",
			"cellChevron": "dsh-lm-cellChevron",
		};
		/**
		* Liang intensity calibrator (滑动变祖器): the model + thinking-effort
		* slider. The 0..30 range spans every provider/model/reasoning-effort
		* combination the directory offers, so the six stages — 小难梁, 牢梁,
		* 梁子, 梁圣, 梁神, 梁祖 — split evenly across whatever the catalog holds,
		* per provider. The portrait is drawn from the per-level
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
		/**
		* Combo index owned by a slider position: the combo whose canonical position
		* is nearest, so releasing the bar snaps to the closest stage.
		*
		* This MUST invert `liangPosForCombo` for every reachable position. The
		* component parks the knob on a combo's canonical position after a commit and
		* then re-derives the shown combo from that position, so any position that
		* does not map back to its own combo makes the portrait and readout disagree
		* with the selection. A bucket split of 0..30 does not invert it (a 10-combo
		* catalog put combo 1 at position 3, which the bucket read back as combo 0);
		* nearest-anchor does, for every count the 31 positions can address.
		* @param position - slider level, 0..30.
		* @param count - number of combos the directory offers.
		* @returns the combo index at that position.
		*/
		const liangComboIndexForPos = (position, count) => Math.max(0, Math.min(count - 1, Math.round(position * (count - 1) / LIANG_MAX_LEVEL)));
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
			const css = ".dsh-liang{display:flex;flex-direction:column;gap:7px;padding:6px 6px 8px;width:100%;box-sizing:border-box;color:var(--dsw-alias-label-primary)}.dsh-liang-canvasWrap{position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--dsw-alias-border-inverted);background:#1d1918}.dsh-liang-canvas{width:100%;aspect-ratio:1/1;display:block}.dsh-liang-canvasWrap::after{content:\"\";position:absolute;inset:0;pointer-events:none;background-image:repeating-linear-gradient(0deg,rgb(255 255 255/2.5%) 0 1px,transparent 1px 4px),radial-gradient(circle at 22% 18%,rgb(255 255 255/8%) 0 1px,transparent 1.5px);background-size:auto,7px 7px;mix-blend-mode:soft-light;opacity:.35}.dsh-liang-load{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#b8b4a9;font-size:12px;line-height:18px}.dsh-liang-readout{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:0 2px}.dsh-liang-id{display:flex;flex-direction:column;align-items:flex-start;min-width:0}.dsh-liang-stage{font-family:\"Songti SC\",STSong,\"SimSun\",serif;font-size:22px;font-weight:700;line-height:28px}.dsh-liang-combo{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.dsh-liang-level{color:var(--dsw-alias-label-tertiary);font-family:\"SFMono-Regular\",Consolas,monospace;font-size:12px;line-height:18px}.dsh-liang-markers{display:flex;justify-content:space-between;gap:4px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;padding:0 2px}.dsh-liang-marker{white-space:nowrap}.dsh-liang-marker.is-current{color:#4d6bfe;font-weight:700}.dsh-liang-slider{position:relative;box-sizing:border-box;height:var(--dsh-liang-tube);border-radius:999px;background:var(--dsw-alias-border-l1,rgba(15,17,21,.08));cursor:pointer;touch-action:none;user-select:none}.dsh-liang-slider[data-energy=true]{box-shadow:0 0 calc(var(--dsh-liang-energy,0) * 16px) rgba(168,85,247,.5)}.dsh-liang-slider[data-disabled=true]{cursor:default}.dsh-liang-slider:has(.dsh-liang-input:focus-visible){box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-liang-fill{position:absolute;top:0;bottom:0;left:0;border-radius:999px;pointer-events:none}.dsh-liang-energy{position:absolute;top:0;bottom:0;left:0;border-radius:999px;overflow:hidden;pointer-events:none;opacity:var(--dsh-liang-energy,0);transition:opacity .2s ease;background:linear-gradient(90deg,#3b1178 0%,#6d28d9 30%,#9333ea 62%,#c084fc 100%)}.dsh-liang-sweep{position:absolute;inset:0;background:linear-gradient(100deg,transparent 18%,rgba(255,255,255,.30) 50%,transparent 82%);transform:translateX(100%);animation:dsh-liang-sweep 2.4s linear infinite}.dsh-liang-stars{position:absolute;top:0;bottom:0;left:0;border-radius:999px;overflow:hidden;pointer-events:none;transition:opacity .2s ease}.dsh-liang-star{position:absolute;left:0;right:0;height:3px;margin-top:-1.5px;pointer-events:none;animation-name:dsh-liang-star;animation-timing-function:linear;animation-iteration-count:infinite}.dsh-liang-dot{position:absolute;left:100%;top:0;width:3px;height:3px;margin-left:-1.5px;border-radius:50%;background:#fff;box-shadow:0 0 4px rgba(255,255,255,.85);opacity:var(--dsh-liang-b,1);transform:scale(var(--dsh-liang-b,1))}.dsh-liang-tick{position:absolute;top:50%;width:3px;height:3px;margin:-1.5px 0 0 -1.5px;border-radius:50%;background:color-mix(in srgb,var(--dsw-alias-label-primary,#0f1115) 26%,transparent);pointer-events:none}.dsh-liang-tick[data-on=true]{background:rgba(255,255,255,.5)}.dsh-liang-knob{position:absolute;top:50%;width:var(--dsh-liang-knob);height:var(--dsh-liang-knob);margin:calc(var(--dsh-liang-knob) / -2) 0 0 calc(var(--dsh-liang-knob) / -2);border-radius:50%;background:#fff;box-shadow:inset 0 0 0 1px rgba(15,17,21,.16);pointer-events:none}.dsh-liang-input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;pointer-events:none}body[data-ds-dark-theme] .dsh-liang-dot{background:#f5f3ff;box-shadow:0 0 5px rgba(216,180,254,.95)}@keyframes dsh-liang-star{0%{transform:translate3d(0,0,0);opacity:0}6%{opacity:1}94%{opacity:1}100%{transform:translate3d(-100%,0,0);opacity:0}}@keyframes dsh-liang-sweep{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}@media (prefers-reduced-motion:reduce){.dsh-liang-energy{transition:none}.dsh-liang-sweep{display:none}}";
			const tag = document.createElement("style");
			const geometry = `.dsh-liang-slider{--dsh-liang-tube:${LIANG_TUBE_HEIGHT}px;--dsh-liang-knob:${LIANG_KNOB_SIZE}px}`;
			tag.dataset.liangEffort = "";
			tag.textContent = css + geometry;
			document.head.appendChild(tag);
		};
		/* ── 滑条视觉：对齐 dsh-codex-effort-slider（Microqian2th）的规格 ──────────
		   三个模块：背景管道（管径 28、两端半径 R=14 的半圆）、彩条、圆圈滑杆（直径 24）。
		   滑杆圆心在两端各内缩 R，正好落在两端半圆的圆心；彩条左端半圆圆心钉在管道内起点、
		   右端半圆圆心跟着滑杆走，所以位置 0 时彩条是一个正圆，全程都把滑杆裹在里面。
		   配色取自参考实现：左端恒蓝，右端随位置变紫变深；能量层与星尘粒子按位置渐入。 */
		/** 管道管径（px）：两端半圆的直径，也是滑杆行程的内缩量基准。 */
		const LIANG_TUBE_HEIGHT = 28;
		/** 半圆半径 R：滑杆圆心在两端各内缩 R，正好落在两端半圆的圆心。 */
		const LIANG_TUBE_RADIUS = LIANG_TUBE_HEIGHT / 2;
		/**
		* 滑杆直径：略小于管径，所以彩条能把它裹在里面。几何计算不用它 —— 滑杆的
		* 绘制尺寸在样式表里；这个常量是那份样式的声明值，渲染测试会拿它核对，
		* 免得两边各改一半。
		*/
		const LIANG_KNOB_SIZE = 24;
		/** 能量段起点：这段以前保持干净的蓝。 */
		const LIANG_ENERGY_START = 1 / 3;
		/** 颜色锚点：紫出现在这里。 */
		const LIANG_ENERGY_END = 2 / 3;
		/** 蓝 → 紫 → 深紫。 */
		const LIANG_COLOR_BLUE = [77, 147, 248];
		const LIANG_COLOR_VIOLET = [147, 51, 234];
		const LIANG_COLOR_DEEP = [76, 29, 149];
		/** 数值文字用的亮紫终点：深紫当文字在深色底上几乎看不见。 */
		const LIANG_COLOR_TEXT_VIOLET = [139, 92, 246];
		/** 星空：粒子数、亮度下限、基准横穿时长与浮动、相位铺开用的黄金比。 */
		const LIANG_STAR_COUNT = 22;
		const LIANG_STAR_MIN = 0.5;
		const LIANG_STAR_DURATION_MEAN = 1.5;
		const LIANG_STAR_DURATION_SPREAD = 0.08;
		const LIANG_MAX_SPEED_FACTOR = 2;
		/** 相邻相位的两颗星，高度至少差这么多"槽"（1 槽 = 4% 轨道高），防止并成一坨。 */
		const LIANG_MIN_HEIGHT_SLOTS = 3;
		/** 系统开启「减少动态效果」时，星星时长乘这个倍数（放缓而不是冻住）。 */
		const LIANG_REDUCED_MOTION_SLOWDOWN = 2.6;
		/**
		* 恒定动画时长（秒）。速度绝不写进 animation-duration：CSS 动画改时长会保留
		* local time 而重算已完成比例，于是降速时粒子会向后跳（参考实现同样如此）。
		* 时长固定、速度改用 playbackRate 表达，变速就完全连续。
		*/
		const LIANG_STAR_BASE_DURATION = LIANG_STAR_DURATION_MEAN;
		const LIANG_GOLDEN_RATIO = 0.6180339887498949;
		const liangClamp01 = (value) => Math.max(0, Math.min(1, value));
		/**
		* Blend two RGB triples.
		* @param from - left colour.
		* @param to - right colour.
		* @param t - 0 returns `from`, 1 returns `to`.
		* @returns the blended triple.
		*/
		const liangMixColor = (from, to, t) => {
			const k = liangClamp01(t);
			return [Math.round(from[0] + (to[0] - from[0]) * k), Math.round(from[1] + (to[1] - from[1]) * k), Math.round(from[2] + (to[2] - from[2]) * k)];
		};
		const liangRgbOf = (color) => `rgb(${color[0]},${color[1]},${color[2]})`;
		/** Position -> the colour at that point, i.e. the gradient's right end. */
		const liangFillColorFor = (pct) => {
			const t = liangClamp01(pct);
			if (t <= LIANG_ENERGY_START) return liangRgbOf(LIANG_COLOR_BLUE);
			if (t <= LIANG_ENERGY_END) return liangRgbOf(liangMixColor(LIANG_COLOR_BLUE, LIANG_COLOR_VIOLET, (t - LIANG_ENERGY_START) / (LIANG_ENERGY_END - LIANG_ENERGY_START)));
			return liangRgbOf(liangMixColor(LIANG_COLOR_VIOLET, LIANG_COLOR_DEEP, (t - LIANG_ENERGY_END) / (1 - LIANG_ENERGY_END)));
		};
		/** Fill background: the left end stays blue, so the bar reads "blue on the left, purple at the knob". */
		const liangFillBackgroundFor = (pct) => `linear-gradient(90deg, ${liangRgbOf(LIANG_COLOR_BLUE)}, ${liangFillColorFor(pct)})`;
		/** Position -> nebula and particle strength, 0..1. Pure position, independent of combo count. */
		const liangEnergyFor = (pct) => liangClamp01((liangClamp01(pct) - LIANG_ENERGY_START) / (1 - LIANG_ENERGY_START));
		/** Position -> particle speed multiplier; the right end runs fastest. */
		const liangSpeedFor = (pct) => Math.min(LIANG_MAX_SPEED_FACTOR, Math.max(0.35, 3 * liangClamp01(pct) - 1));
		/**
		* Colour for the readout's value text, mirroring the official row's tint.
		* @param pct - slider position.
		* @param combo - the combo in use; its `off` effort keeps the untouched caption tone.
		* @returns a CSS colour, or the empty string to leave the inherited colour alone.
		*/
		const liangValueColorFor = (pct, combo) => combo !== void 0 && combo.effort === "off" ? "" : liangRgbOf(liangMixColor(LIANG_COLOR_BLUE, LIANG_COLOR_TEXT_VIOLET, liangEnergyFor(pct)));
		/** Deterministic pseudo-random in [0, 1): assertable offline and stable across re-renders. */
		const liangStarHash01 = (index, salt) => {
			const value = (index + 1) * salt * 2654435761 % 4294967296;
			return (value >>> 8) % 1000 / 1000;
		};
		/** Brightness and size factor for one particle, inside [LIANG_STAR_MIN, 1]. */
		const liangStarBrightnessFor = (index) => LIANG_STAR_MIN + (1 - LIANG_STAR_MIN) * liangStarHash01(index, 61);
		/**
		* Seconds for one particle to cross the whole track.
		* @param index - particle index.
		* @param speedFactor - the position's speed multiplier.
		* @returns the animation duration in seconds.
		*/
		const liangStarDurationFor = (index, speedFactor) => {
			const speed = Math.min(LIANG_MAX_SPEED_FACTOR, Math.max(0.35, typeof speedFactor === "number" ? speedFactor : LIANG_MAX_SPEED_FACTOR));
			const spread = 1 - LIANG_STAR_DURATION_SPREAD + 2 * LIANG_STAR_DURATION_SPREAD * liangStarHash01(index, 29);
			return LIANG_STAR_DURATION_MEAN * LIANG_MAX_SPEED_FACTOR / speed * spread;
		};
		/** Particle field: heights and phases spread by a golden-ratio low-discrepancy sequence. */
		const LIANG_PARTICLES = (() => {
			const out = [];
			let i;
			for (i = 0; i < LIANG_STAR_COUNT; i += 1) out.push({ y: 0, phase: (i + 1) * LIANG_GOLDEN_RATIO % 1 });
			const byPhase = [];
			for (i = 0; i < LIANG_STAR_COUNT; i += 1) byPhase.push(i);
			byPhase.sort((a, b) => out[a].phase - out[b].phase);
			let slots = null;
			for (let salt = 71; salt < 4000 && slots === null; salt += 1) {
				const candidate = [];
				for (i = 0; i < LIANG_STAR_COUNT; i += 1) candidate.push(i);
				candidate.sort((a, b) => {
					const ha = liangStarHash01(a, salt);
					const hb = liangStarHash01(b, salt);
					return ha === hb ? a - b : ha - hb;
				});
				let ok = true;
				for (let k = 1; k < LIANG_STAR_COUNT && ok; k += 1) if (Math.abs(candidate[k] - candidate[k - 1]) < LIANG_MIN_HEIGHT_SLOTS) ok = false;
				if (ok) slots = candidate;
			}
			if (slots === null) {
				slots = [];
				for (i = 0; i < LIANG_STAR_COUNT; i += 1) slots.push(i * 5 % LIANG_STAR_COUNT);
			}
			for (let rank = 0; rank < LIANG_STAR_COUNT; rank += 1) out[byPhase[rank]].y = 8 + slots[rank] / (LIANG_STAR_COUNT - 1) * 84;
			return out;
		})();
		/**
		* Playback rate that makes a star keep the period its duration used to encode.
		* The effective period is `LIANG_STAR_BASE_DURATION / rate`, so passing this to
		* `updatePlaybackRate` reproduces the reference's speed curve exactly while the
		* animation duration stays constant.
		* @param index - particle index.
		* @param speedFactor - the position's speed multiplier.
		* @param slow - whether reduced motion multiplies the period.
		* @returns the playback rate for that star.
		*/
		const liangStarRateFor = (index, speedFactor, slow) => LIANG_STAR_BASE_DURATION / (liangStarDurationFor(index, speedFactor) * (slow === true ? LIANG_REDUCED_MOTION_SLOWDOWN : 1));
		const liangStarDelayFor = (index, duration) => {
			const particle = LIANG_PARTICLES[index];
			const phase = particle !== void 0 && typeof particle.phase === "number" ? particle.phase : 0;
			return -((phase + liangStarHash01(index, 53) * 0.03) % 1) * duration;
		};
		/** Position -> how many particles are visible; the field thickens as energy rises. */
		const liangStarCountFor = (pct) => Math.round(liangEnergyFor(pct) * LIANG_STAR_COUNT);
		/** Position -> opacity of the separate particle layer, kept off the nebula's own fade. */
		const liangStarLayerOpacityFor = (pct) => 0.6 + 0.4 * liangEnergyFor(pct);
		/** Knob centre, fill end, and tick position: `radius + pct × (100% − diameter)`. */
		const liangKnobOffsetOf = (pct) => `calc(${LIANG_TUBE_RADIUS}px + ${Math.round(liangClamp01(pct) * 10000) / 10000} * (100% - ${LIANG_TUBE_RADIUS * 2}px))`;
		/**
		* 彩条宽度：左端半圆圆心钉在管道内起点（x = R），右端半圆圆心 = 滑杆圆心。
		* 于是位置 0 时宽度正好 2R —— 一个正圆；位置 1 时等于管道全宽。
		* @param pct - 滑杆位置 0..1。
		* @returns 可直接用作 width 的 CSS calc 表达式。
		*/
		const liangFillWidthOf = (pct) => `calc(${LIANG_TUBE_RADIUS * 2}px + ${Math.round(liangClamp01(pct) * 10000) / 10000} * (100% - ${LIANG_TUBE_RADIUS * 2}px))`;
		/**
		* The calibrator's slider surface: a full-height rounded track whose fill runs
		* blue to violet, a nebula layer with a sweep and stardust particles that fade
		* in with position, one tick per reachable combo, and a white knob. Dragging
		* follows the pointer continuously and previews only; releasing snaps to the
		* nearest combo and commits it. The visually hidden native range carries combo
		* positions, so keyboard and assistive access step whole levels.
		* @param props - preview ratio, disabled and label, the combo index and tick
		* positions the native range addresses, and the verbs.
		*/
		function LiangSlider({ ratio, disabled, label, index, tickPcts, onPreview, onCommitRatio, onCommitIndex, onDragChange }) {
			const rootRef = (0, react.useRef)(null);
			/** Stars whose playback rate carries the speed; see the effect below. */
			const starsRef = (0, react.useRef)(null);
			const inputRef = (0, react.useRef)(null);
			const [reduced, setReduced] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				const query = window.matchMedia("(prefers-reduced-motion: reduce)");
				const sync = () => {
					setReduced(query.matches);
				};
				sync();
				query.addEventListener("change", sync);
				return () => {
					query.removeEventListener("change", sync);
				};
			}, []);
			const pct = liangClamp01(ratio);
			const energy = liangEnergyFor(pct);
			const knobOffset = liangKnobOffsetOf(pct);
			const fillWidth = liangFillWidthOf(pct);
			const speed = liangSpeedFor(pct);
			const starCount = liangStarCountFor(pct);
			const stars = [];
			for (let at = 0; at < starCount; at += 1) {
				const brightness = liangStarBrightnessFor(at);
				stars.push((0, react_jsx_runtime.jsx)("span", {
					className: "dsh-liang-star",
					style: {
						top: `${LIANG_PARTICLES[at].y}%`,
						animationDuration: `${LIANG_STAR_BASE_DURATION}s`,
						animationDelay: `${liangStarDelayFor(at, LIANG_STAR_BASE_DURATION).toFixed(3)}s`
					},
					children: (0, react_jsx_runtime.jsx)("span", {
						className: "dsh-liang-dot",
						style: {
							"--dsh-liang-b": brightness.toFixed(3)
						}
					})
				}, at));
			}
			(0, react.useEffect)(() => {
				const host = starsRef.current;
				if (host === null) return;
				const nodes = host.children;
				for (let at = 0; at < nodes.length; at += 1) {
					const rate = liangStarRateFor(at, speed, reduced);
					for (const animation of nodes[at].getAnimations()) {
						// updatePlaybackRate keeps the current time, so changing speed never
						// rewinds the sweep. Assigning playbackRate would move startTime and
						// jump the star, which is the defect this replaced.
						if (typeof animation.updatePlaybackRate === "function") animation.updatePlaybackRate(rate);
						else animation.playbackRate = rate;
					}
				}
			}, [speed, reduced, starCount]);
			const ratioAt = (clientX) => {
				const root = rootRef.current;
				if (root === null) return 0;
				const bounds = root.getBoundingClientRect();
				const usable = Math.max(1, bounds.width - LIANG_TUBE_RADIUS * 2);
				return liangClamp01((clientX - bounds.left - LIANG_TUBE_RADIUS) / usable);
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: "dsh-liang-slider",
				style: {
					"--dsh-liang-energy": String(energy)
				},
				"data-energy": energy > 0 ? "true" : "false",
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
					if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
					onPreview(ratioAt(event.clientX));
				},
				onPointerUp: (event) => {
					if (disabled) return;
					if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
					event.currentTarget.releasePointerCapture(event.pointerId);
					onDragChange(false);
					onCommitRatio(ratioAt(event.clientX));
				},
				onPointerCancel: (event) => {
					if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
					onDragChange(false);
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-fill",
						style: {
							width: fillWidth,
							background: liangFillBackgroundFor(pct)
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-energy",
						style: {
							width: fillWidth
						},
						children: (0, react_jsx_runtime.jsx)("div", { className: "dsh-liang-sweep" })
					}),
					(0, react_jsx_runtime.jsx)("div", {
						ref: starsRef,
						className: "dsh-liang-stars",
						style: {
							width: fillWidth,
							opacity: liangStarLayerOpacityFor(pct).toFixed(3)
						},
						children: stars
					}),
					tickPcts.map((tickPct, at) => (0, react_jsx_runtime.jsx)("span", {
						className: "dsh-liang-tick",
						"data-on": at <= index ? "true" : "false",
						style: {
							left: liangKnobOffsetOf(tickPct)
						}
					}, at)),
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-knob",
						style: {
							left: knobOffset
						}
					}),
					(0, react_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "range",
						min: 0,
						max: Math.max(0, tickPcts.length - 1),
						step: 1,
						value: Math.max(0, index),
						// `aria-disabled`, never `disabled`: this control holds focus while the
						// person scrubs, and disabling it mid-selection would move focus to the
						// document and blur the card closed. The change handler is the guard.
						"aria-disabled": disabled ? "true" : "false",
						className: "dsh-liang-input",
						"aria-label": label,
						onChange: (event) => {
							if (disabled) return;
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
		function LiangEffortSlider({ combos, currentIndex, resetSeq, busy, onChoose }) {
			ensureLiangStyles();
			const levelFromIndex = (index) => index <= -1 ? 0 : liangPosForCombo(index, combos.length);
			const canvasRef = (0, react.useRef)(null);
			const imagesRef = (0, react.useRef)(new Map());
			/** Frame the bar is actually on, so a late image only paints when it is current. */
			const currentFrameRef = (0, react.useRef)(-1);
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
				// Re-sync whenever the host's own choice changes, and whenever a selection
				// is refused: a refusal leaves the host state untouched, so this is the only
				// thing that clears the optimistic commit and unblocks a retry.
				lastCommitted.current = currentIndex;
				if (currentIndex !== -1 && currentIndex !== liangComboIndexForPos(level, combos.length)) setLevel(levelFromIndex(currentIndex));
			}, [currentIndex, resetSeq]);
			/**
			* Paint a frame, but only while it is still the one on screen. A late image must
			* not overwrite a newer one.
			* @param frame - the frame index the image belongs to.
			* @param image - the decoded image.
			*/
			const drawIfCurrent = (frame, image) => {
				if (currentFrameRef.current !== frame) return;
				setReady(true);
				drawFrame(image);
			};
			/**
			* Load one frame into the cache. Every image carries the same guarded handler,
			* prefetched or not: a prefetch that is still in flight when the bar lands on it
			* has no other way to reach the canvas, and the effect does not re-run for a level
			* it already rendered.
			* @param frame - the frame index to load, or to reuse from the cache.
			*/
			const loadFrame = (frame) => {
				const cache = imagesRef.current;
				const url = liangFrameUrl(frame);
				let image = cache.get(url);
				if (image === void 0) {
					image = new Image();
					cache.set(url, image);
					image.onload = () => {
						drawIfCurrent(frame, image);
					};
					image.src = url;
				} else if (image.complete) drawIfCurrent(frame, image);
			};
			(0, react.useEffect)(() => {
				const frame = Math.max(0, Math.min(LIANG_MAX_LEVEL, Math.round(level)));
				currentFrameRef.current = frame;
				loadFrame(frame);
				for (const near of [frame - 1, frame + 1]) {
					if (near < 0 || near > LIANG_MAX_LEVEL) continue;
					const nearUrl = liangFrameUrl(near);
					if (imagesRef.current.has(nearUrl)) continue;
					const nearImage = new Image();
					imagesRef.current.set(nearUrl, nearImage);
					nearImage.onload = () => {
						drawIfCurrent(near, nearImage);
					};
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
										style: {
											color: liangValueColorFor(level / LIANG_MAX_LEVEL, combo)
										},
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
						disabled: busy && !dragging,
						label: "梁系强度",
						index: comboIndex,
						tickPcts: combos.map((_combo, at) => liangPosForCombo(at, combos.length) / LIANG_MAX_LEVEL),
						onPreview: (ratio) => {
							// Keep the level continuous while dragging: the knob, fill, and
							// particles follow the pointer, while the portrait and the readout
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
		const liang_backends_css = ".dsh-lm-backends{display:flex;gap:4px;padding:2px 2px 6px;border-bottom:1px solid var(--dsw-alias-border-inverted)}.dsh-lm-backend{flex:1;min-width:0;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid transparent;border-radius:8px;padding:4px 6px;font-size:12px;font-weight:500;line-height:16px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.dsh-lm-backend:hover:not([aria-disabled=true]){background:var(--dsw-alias-interactive-bg-hover)}.dsh-lm-backend:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3);outline:none}.dsh-lm-backend[aria-disabled=true]{cursor:default}.dsh-lm-backendCurrent{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l3);font-weight:600}";
		if (typeof document !== "undefined") {
			for (const stale of document.querySelectorAll("style[data-liang-backends]")) stale.remove();
			const tag = document.createElement("style");
			tag.dataset.liangBackends = "";
			tag.textContent = liang_backends_css;
			document.head.appendChild(tag);
		}
		const liang_settings_css = ".dsh-liang-cfg{display:flex;flex-direction:column;gap:10px;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}.dsh-liang-cfg-rows{display:flex;flex-direction:column;gap:6px}.dsh-liang-cfg-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;align-items:center;gap:6px}.dsh-liang-cfg-input{box-sizing:border-box;width:100%;min-width:0;height:30px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit}.dsh-liang-cfg-input:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-liang-cfg-input:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-liang-cfg-btn{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:0 0;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;padding:4px 10px}.dsh-liang-cfg-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsh-liang-cfg-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.dsh-liang-cfg-btn:disabled{border-color:transparent;color:var(--dsw-alias-label-dimmed);cursor:default}.dsh-liang-cfg-btnPrimary{border-color:transparent;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-inverted);font-weight:600}.dsh-liang-cfg-btnPrimary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}.dsh-liang-cfg-actions{display:flex;align-items:center;gap:8px}.dsh-liang-cfg-status,.dsh-liang-cfg-hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.dsh-liang-cfg-title{font-size:14px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary)}.dsh-liang-cfg-field{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.dsh-liang-cfg-label{color:var(--dsw-alias-label-secondary);font-size:13px;white-space:nowrap}.dsh-liang-cfg-number{width:96px;flex:none}select.dsh-liang-cfg-input{appearance:none;cursor:pointer;padding-right:22px;background-image:linear-gradient(45deg,transparent 50%,var(--dsw-alias-label-tertiary) 50%),linear-gradient(135deg,var(--dsw-alias-label-tertiary) 50%,transparent 50%);background-position:calc(100% - 13px) center,calc(100% - 9px) center;background-size:4px 4px,4px 4px;background-repeat:no-repeat}select.dsh-liang-cfg-input:disabled{cursor:default}";
		if (typeof document !== "undefined") {
			for (const stale of document.querySelectorAll("style[data-liang-settings]")) stale.remove();
			const tag = document.createElement("style");
			tag.dataset.liangSettings = "";
			tag.textContent = liang_settings_css;
			document.head.appendChild(tag);
		}

		/**
		* Short label for the cramped backend toggle row: the configured alias when
		* the settings form carries one, otherwise the provider's catalog name.
		* There are no built-in aliases — every label is the user's own.
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
		* Normalize a configured alias map into ordered rows. The map starts empty
		* and stays empty until the user adds a row, so a missing or malformed value
		* yields no rows rather than a made-up label. A malformed entry is dropped
		* rather than rendered as a broken row.
		* @param value - the settings form's `backendAliases` value.
		* @returns the rows the editor and the toggle row both read.
		*/
		const liangAliasRows = (value) => {
			if (value === null || typeof value !== "object" || Array.isArray(value)) return [];
			return Object.entries(value).flatMap(([provider, alias]) => typeof alias === "string" ? [{
				provider,
				alias
			}] : []);
		};
		/** How long the menu lingers after a selection settles when nothing sets it. */
		const LIANG_DEFAULT_DISMISS_MS = 3000;
		/**
		* Read the configured linger, refusing values the Host would also refuse so a
		* malformed section cannot pin the menu open forever.
		* @param value - the settings form's `dismissDelayMs` value.
		* @returns whole milliseconds inside the accepted range.
		*/
		const liangDismissMs = (value) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(60000, Math.round(value))) : LIANG_DEFAULT_DISMISS_MS;


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
			/** Bumped on a refused selection so the slider drops its optimistic commit. */
			const [resetSeq, setResetSeq] = (0, react.useState)(0);
			const [pane, setPane] = (0, react.useState)("root");
			const lastActionRef = (0, react.useRef)("load");
			const [toast, setToast] = (0, react.useState)(null);
			const toastSeq = (0, react.useRef)(0);
			/** Pending scrub-then-linger close; null when nothing is scheduled. */
			const dismissRef = (0, react.useRef)(null);
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
			/**
			* Scrub-then-linger: a slider commit leaves the menu open so the next stage
			* is one drag away, and the configured delay closes it once the person has
			* stopped. Any interaction inside the card cancels the pending close.
			*/
			const cancelDismiss = () => {
				if (dismissRef.current !== null) {
					window.clearTimeout(dismissRef.current);
					dismissRef.current = null;
				}
			};
			const scheduleDismiss = () => {
				cancelDismiss();
				const delay = aliases.getSnapshot().dismissMs;
				if (delay <= 0) {
					close(true);
					return;
				}
				dismissRef.current = window.setTimeout(() => {
					dismissRef.current = null;
					close(true);
				}, delay);
			};
			(0, react.useEffect)(() => cancelDismiss, []);
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
				// A selection in flight settles under the card's own control: it either
				// closes on acceptance or reports the failure and stays. A blur that
				// arrives while one is pending is a side effect of the in-flight state,
				// not the person leaving, so it must not close the menu.
				if (busy) return;
				if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return;
				close();
			};
			/**
			* Settle one selection attempt. The directory resolves a refusal rather than
			* rejecting, so the result carries the verdict and must be inspected here.
			* A refusal bumps `resetSeq`, which makes the slider drop its optimistic
			* commit and re-derive its position from the host's own state — without that
			* the bar keeps showing a combo the host never accepted, and its dedupe
			* blocks a second attempt at the same combo.
			* @param result - the directory's selection result.
			*/
			const settleSelection = (result) => {
				if (result !== void 0 && result !== null && result.ok === true) {
					if (rootRef.current !== null) close(true);
					return;
				}
				setResetSeq((seq) => seq + 1);
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
				select(selection).then((result) => {
					if (result !== void 0 && result !== null && result.ok === true && keepOpen === true) {
						scheduleDismiss();
						return;
					}
					settleSelection(result);
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
				select(selection).then((result) => {
					if (result !== void 0 && result !== null && result.ok === true) return;
					settleSelection(result);
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
				onPointerDown: cancelDismiss,
				onKeyDown: (event) => {
					cancelDismiss();
					onRootKeyDown(event);
				},
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
								resetSeq,
								busy,
								onChoose: (index) => {
									chooseCombo(combos[index], true);
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
									// See the slider's range input: disabling a focused control blurs the
									// card closed, so the in-flight state rides aria-disabled instead.
									"aria-disabled": busy ? "true" : "false",
									onClick: () => {
										if (busy) return;
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
													className: liang_css.option,
													title: model.name,
													"aria-disabled": busy ? "true" : "false",
													onClick: () => {
														if (busy) return;
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

		/**
		* The calibrator's card inside Settings → General: the channel aliases its
		* backend toggle row prints, and how long the menu lingers after a selection.
		* Provider ids come from the live model catalog (`state.providers`) rather
		* than from typing, so a renamed or added route needs no code change; a row
		* whose provider left the catalog keeps its own option instead of vanishing.
		* Values and writes ride the settings configuration form (`ctx.configForms`),
		* so the card edits the same volatile fields the profile patch persists. The
		* draft is component-local; only Save crosses the wire.
		* @param props - the injected card face and the locale seat.
		* @returns the one-liner, or the editor.
		*/
		function LiangSettingsCard(props) {
			const { t, view } = props;
			const state = props.useLiangSettings((snapshot) => snapshot);
			const [draft, setDraft] = (0, react.useState)(null);
			if (view === "summary") return t("settings.description");
			const rows = draft === null ? state.rows : draft.rows;
			const dismissMs = draft === null ? state.dismissMs : draft.dismissMs;
			const disabled = !state.writable;
			const editRow = (at, key, value) => {
				const next = rows.map((row, index) => index === at ? {
					...row,
					[key]: value
				} : row);
				setDraft({
					rows: next,
					dismissMs
				});
			};
			const setRows = (next) => {
				setDraft({
					rows: next,
					dismissMs
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "dsh-liang-cfg",
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-cfg-title",
						children: t("settings.title")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-cfg-hint",
						children: t("settings.hint")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-cfg-rows",
						children: rows.map((row, at) => {
							const known = state.providers.some((provider) => provider.id === row.provider);
							const options = known || row.provider === "" ? state.providers : [...state.providers, {
								id: row.provider,
								name: t("settings.unknownProvider", {
									id: row.provider
								})
							}];
							return (0, react_jsx_runtime.jsxs)("div", {
								className: "dsh-liang-cfg-row",
								children: [
									(0, react_jsx_runtime.jsx)("select", {
										className: "dsh-liang-cfg-input",
										value: row.provider,
										disabled,
										"aria-label": t("settings.provider"),
										onChange: (event) => {
											editRow(at, "provider", event.target.value);
										},
										children: [
											(0, react_jsx_runtime.jsx)("option", {
												value: "",
												children: t("settings.providerPlaceholder")
											}),
											...options.map((provider) => (0, react_jsx_runtime.jsx)("option", {
												value: provider.id,
												title: provider.id,
												children: provider.name
											}, provider.id))
										]
									}),
									(0, react_jsx_runtime.jsx)("input", {
										className: "dsh-liang-cfg-input",
										value: row.alias,
										disabled,
										"aria-label": t("settings.alias"),
										placeholder: t("settings.alias"),
										onChange: (event) => {
											editRow(at, "alias", event.target.value);
										}
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "dsh-liang-cfg-btn",
										disabled,
										title: t("settings.remove"),
										onClick: () => {
											setRows(rows.filter((_row, index) => index !== at));
										},
										children: "✕"
									})
								]
							}, at);
						})
					}),
					rows.length === 0 && (0, react_jsx_runtime.jsx)("div", {
						className: "dsh-liang-cfg-hint",
						children: t("settings.noAliases")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-liang-cfg-field",
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								className: "dsh-liang-cfg-label",
								htmlFor: "liang-dismiss-delay",
								children: t("settings.dismiss")
							}),
							(0, react_jsx_runtime.jsx)("input", {
								id: "liang-dismiss-delay",
								type: "number",
								min: 0,
								max: 60000,
								step: 500,
								className: "dsh-liang-cfg-input dsh-liang-cfg-number",
								value: dismissMs,
								disabled,
								onChange: (event) => {
									setDraft({
										rows,
										dismissMs: liangDismissMs(Number(event.target.value))
									});
								}
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: "dsh-liang-cfg-hint",
								children: t("settings.dismissHint")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-liang-cfg-actions",
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsh-liang-cfg-btn",
								disabled,
								onClick: () => {
									const used = new Set(rows.map((row) => row.provider));
									const free = state.providers.find((provider) => !used.has(provider.id));
									setRows([...rows, {
										provider: free === void 0 ? "" : free.id,
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
									void props.save(rows, dismissMs).then((accepted) => {
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
		
const zh = {
			"trigger.fallback": "选择模型",
			"trigger.selectAria": "选择模型",
			"trigger.aria": "选择模型，当前 {model}",
			"trigger.ariaEffort": "选择模型，当前 {model}，推理等级 {effort}",
			"menu.aria": "模型与梁系校准",
			"menu.model": "模型",
			"backend.current": "当前后端：{name}",
			"backend.switchTo": "切换到 {name}",
			"effort.providerDefault": "Default",
			"status.loading": "正在刷新模型列表…",
			"error.action": "模型操作失败：{message}",
			"warning.groupLoad": "{name} 加载失败：{message}",
			"empty.models": "没有可用的模型。",
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
			"settings.readonly": "当前部署不接受配置写入",
			"settings.providerPlaceholder": "选择渠道…",
			"settings.unknownProvider": "{id}（已不在目录中）",
			"settings.dismiss": "选完后停留",
			"settings.dismissHint": "毫秒；0 = 立即关闭",
			"settings.noAliases": "还没有别名。点「新增一行」选渠道，再填简称；切换行会用目录里的原名。"
		};
const en = {
			"trigger.fallback": "Select model",
			"trigger.selectAria": "Select model",
			"trigger.aria": "Select model, current {model}",
			"trigger.ariaEffort": "Select model, current {model}, reasoning effort {effort}",
			"menu.aria": "Model and Liang calibration",
			"menu.model": "Model",
			"backend.current": "Current backend: {name}",
			"backend.switchTo": "Switch to {name}",
			"effort.providerDefault": "Default",
			"status.loading": "Refreshing model list…",
			"error.action": "Model operation failed: {message}",
			"warning.groupLoad": "{name} failed to load: {message}",
			"empty.models": "No models available.",
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
			"settings.readonly": "This deployment refuses configuration writes",
			"settings.providerPlaceholder": "Pick a channel…",
			"settings.unknownProvider": "{id} (no longer in the catalog)",
			"settings.dismiss": "Linger after selecting",
			"settings.dismissHint": "milliseconds; 0 closes at once",
			"settings.noAliases": "No aliases yet. Add a row, pick a channel, then set the short label. The toggle row prints catalog names until you do."
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
			// and the configuration card writes through it. Seeded with the built-in
			// aliases so the calibrator works on a deployment without the settings
			// service, then replaced by whatever the configuration form answers.
			// `providers` comes from the model catalog, so the card offers the real
			// provider list instead of asking for ids by hand.
			const aliases = _deepseek_ai_dsh_client_store.createSnapshotStore({
				writable: false,
				rows: [],
				providers: [],
				dismissMs: LIANG_DEFAULT_DISMISS_MS
			});
			/** Latest form value, kept beside the store so both publishers merge onto it. */
			let formValue;
			// The catalog is Host-generation state, not session state: read it once and
			// again whenever an adapter or settings document changes the provider set.
			ctx.inject(["remote", "remote.session"], (scope) => {
				const load = () => {
					scope.remote.session.modelCatalog().then((response) => {
						if (!response.ok) return;
						aliases.set({
							...aliases.getSnapshot(),
							providers: response.value.groups.map((group) => ({
								id: group.id,
								name: group.name
							}))
						});
					}, () => {});
				};
				load();
				scope.effect(() => scope.remote.$on("llm/adapters-updated", load), "liang-calibrator: provider catalog");
			});
			// Both services are optional: a deployment without them keeps the built-in
			// aliases and shows no configuration card, while the seat still renders.
			ctx.inject(["configForms", "slots"], (scope) => {
				const form = scope.configForms.get(SETTINGS_NS);
				const sync = () => {
					const snapshot = form.getSnapshot();
					formValue = snapshot.value;
					aliases.set({
						writable: snapshot.writable,
						rows: liangAliasRows(formValue === void 0 ? void 0 : formValue.backendAliases),
						providers: aliases.getSnapshot().providers,
						dismissMs: liangDismissMs(formValue === void 0 ? void 0 : formValue.dismissDelayMs)
					});
				};
				scope.effect(() => form.subscribe(sync), "liang-calibrator: alias form subscription");
				sync();
				// The card exists only while the Host serves this plugin's namespace, so a
				// deployment that never composed Settings shows no trace of it.
				scope.effect(() => scope.configForms.whileServed([SETTINGS_NS], () => scope.slots.inject("settings.general.item", () => scope.slots.register({
					name: "settings.general.item",
					id: SETTINGS_NS,
					order: 40,
					locale: NS,
					inject: () => ({
						hooks: {
							liangSettings: aliases
						},
						save: (rows, dismissMs) => form.mutate([{
							op: "set",
							path: ["backendAliases"],
							value: Object.fromEntries(rows.flatMap((row) => row.provider === "" ? [] : [[row.provider, row.alias]]))
						}, {
							op: "set",
							path: ["dismissDelayMs"],
							value: dismissMs
						}])
					})
				}, LiangSettingsCard))), "liang-calibrator: settings card");
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
							select: (selection) => available ? directory.select(selection) : Promise.resolve({ ok: false })
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
		/** Pure helpers the alignment test compares against the reference implementation. */
		exports.__test = {
			comboIndexForPos: liangComboIndexForPos,
			TUBE_HEIGHT: LIANG_TUBE_HEIGHT,
			KNOB_SIZE: LIANG_KNOB_SIZE,
			posForCombo: liangPosForCombo,
			fillColorFor: liangFillColorFor,
			fillBackgroundFor: liangFillBackgroundFor,
			energyFor: liangEnergyFor,
			speedFor: liangSpeedFor,
			valueColorFor: liangValueColorFor,
			starHash01: liangStarHash01,
			starBrightnessFor: liangStarBrightnessFor,
			starDurationFor: liangStarDurationFor,
			starRateFor: liangStarRateFor,
			STAR_BASE_DURATION: LIANG_STAR_BASE_DURATION,
			starDelayFor: liangStarDelayFor,
			starCountFor: liangStarCountFor,
			starLayerOpacityFor: liangStarLayerOpacityFor,
			PARTICLES: LIANG_PARTICLES
		};
		return module.exports;
	}
});
