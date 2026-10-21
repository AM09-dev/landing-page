/* =========================================================
   Portfolio interactions
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Datos: frases Zen Cyber / Samurai Mindset ---------- */
  const QUOTES = [
    { es: "Cuántas veces caigas, cuántas veces te levantes.", jp: "七転び八起き", kanji: "起" },
    { es: "Antes del dominio, viene la disciplina.", jp: "未だ熟らず — La maestría aún no está lista.", kanji: "鍛" },
    { es: "El camino se hace al caminar.", jp: "道は歩く者に開く", kanji: "道" },
    { es: "Sé el jugador, no el personaje.", jp: "プレイヤーになれ、キャラクターではなく。", kanji: "遊" },
    { es: "El código limpio refleja una mente en calma.", jp: "静かな心が良いコードを書く。", kanji: "静" },
    { es: "Un bug hoy es una lección para siempre.", jp: "今日のバグは永遠の教訓。", kanji: "学" },
    { es: "La paciencia es la fuerza del samurái.", jp: "忍耐は武士の力。", kanji: "忍" },
    { es: "No cuentes los días; haz que los días cuenten.", jp: "日数を数えるな。日を意味あるものにせよ。", kanji: "日" },
    { es: "El gran maestro fue alguna vez un principiante.", jp: "達人も初学者なり。", kanji: "初" },
    { es: "Controla tu mente y controlarás el resultado.", jp: "心を制すれば結果を制す。", kanji: "心" },
    { es: "Ship it. El perfeccionismo es el enemigo del deploy.", jp: "出せ。完璧主義はデプロイの敵。", kanji: "出" },
    { es: "Cada línea de código es una espada pulida.", jp: "一行のコードも磨かれた刀。", kanji: "刀" },
    { es: "No se nace sabiendo: se nace dispuesto a aprender.", jp: "生まれながら知る者はなし。学ぶ心あり。", kanji: "学" },
    { es: "Elige un camino y camínalo con honra.", jp: "道を選び、誠実に歩め。", kanji: "誠" },
    { es: "El fallo es solo feedback con otro nombre.", jp: "失敗とは、別の名前のフィードバック。", kanji: "反" },
    { es: "Hoy gano yo de ayer, no de los demás.", jp: "昨日の自分を超えろ。", kanji: "超" },
    { es: "La velocidad sin dirección es ruido.", jp: "方向なき速さは雑音。", kanji: "向" },
    { es: "Levántate, sacude el polvo, sigue adelante.", jp: "起き上がれ、塵を払い、進め。", kanji: "進" },
    { es: "El flujo viene cuando la mente deja de luchar.", jp: "心が戦わぬとき、流れが来る。", kanji: "流" },
    { es: "Construye lo que te daría miedo mantener en producción.", jp: "本番環境で背負う怖さを持つものをつくれ。", kanji: "構" },
    { es: "La repetición es el altar del skill.", jp: "反復こそ技の祭壇。", kanji: "習" },
    { es: "No busques atajos: busca dominio.", jp: "近道を求めず、技術を求めよ。", kanji: "達" },
    { es: "Un hábito pequeño repetido mil veces vuelve invencible.", jp: "小さな習慣の千回繰り返しは無敵になる。", kanji: "強" },
    { es: "El que teme al error no progresa.", jp: "誤りを恐れる者は進まない。", kanji: "勇" },
    { es: "Diseña como artesano, entrega como guerrero.", jp: "職人のように設計し、武士のように納品せよ。", kanji: "匠" },
    { es: "Respeta al usuario: cada clic es confianza.", jp: "ユーザーを敬え。一つのクリックも信頼。", kanji: "礼" },
    { es: "Calma bajo presión, precisión en la acción.", jp: "静けさと、正確な一撃。", kanji: "鍔" },
    { es: "Agradece la lucha: te está forjando.", jp: "苦しみに感謝せよ。あなたを鍛えている。", kanji: "感謝" },
    { es: "El portafolio habla más alto que el currículum.", jp: "作品が履歴書より雄弁に語る。", kanji: "作" },
    { es: "Nunca dejes de aprender: la tecnología no espera.", jp: "学び続けよ。技術は待たない。", kanji: "学" },
    { es: "Empty mind, full commit.", jp: "心を空に、コードを満たせ。", kanji: "無" },
    { es: "Consistencia vence a intensidad.", jp: "継続は力なり。", kanji: "継" },
    { es: "Hazlo por quienes creen en ti, y por quien eres.", jp: "信じる者と、自分のために。", kanji: "信" },
    { es: "El verdadero rival de ayer es tu yo de hoy.", jp: "昨日の本当の敵は、今日の自分。", kanji: "己" },
    { es: "Commit con intención, refactorea con humildad.", jp: "意図を込めてコミット、謙虚にリファクタ。", kanji: "謙" },
    { es: "La belleza está en los detalles que nadie ve.", jp: "見えぬ細部に美しさあり。", kanji: "美" }
  ];

  /* ---------- Efecto decodificar (text scramble) ---------- */
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}=+*^?#......01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
      this.frame = 0;
      this.queue = [];
      this.frameRequest = null;
      this.resolve = null;
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.textContent;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => { this.resolve = resolve; });
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 30);
        const end = start + Math.floor(Math.random() * 30);
        this.queue.push({ from, to, start, end, char: "" });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = "";
      let complete = 0;
      for (let i = 0; i < this.queue.length; i++) {
        const item = this.queue[i];
        if (this.frame >= item.end) {
          complete++;
          output += item.to;
        } else if (this.frame >= item.start) {
          if (!item.char || Math.random() < 0.3) {
            item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
          }
          output += '<span class="scr">' + item.char + "</span>";
        } else {
          output += item.from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  const initScramble = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.querySelectorAll(".scramble-line").forEach((el, i) => {
      const finalText = el.textContent;
      el.textContent = "";
      setTimeout(() => {
        const fx = new TextScramble(el);
        fx.setText(finalText);
      }, 250 + i * 340);
    });

    if ("IntersectionObserver" in window) {
      const titleObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            titleObserver.unobserve(el);
            const finalText = el.textContent;
            el.textContent = "";
            setTimeout(() => {
              const fx = new TextScramble(el);
              fx.setText(finalText);
            }, 150);
          });
        },
        { threshold: 0.5 }
      );
      document.querySelectorAll(".section-title").forEach((el) => titleObserver.observe(el));
    }
  };

  initScramble();

  /* ---------- Header scrolled ---------- */
  const header = document.getElementById("header");
  const onScrollHeader = () => {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  const navIcon = navToggle.querySelector("i");

  navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  /* ---------- Smooth scroll + link activo ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const closeMenu = () => {
    navList.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navIcon.className = "fa-solid fa-bars";
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + 8);
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", id);
      closeMenu();
    });
  });

  const sections = Array.from(document.querySelectorAll("main section[id], .site-footer[id]"));
  const setActiveLink = () => {
    const pos = window.scrollY + header.offsetHeight + 140;
    let current = sections[0] ? sections[0].id : "inicio";
    sections.forEach((sec) => { if (sec.offsetTop <= pos) current = sec.id; });
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  };
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Frases: Nueva Frase ---------- */
  const quoteFrame = document.getElementById("quoteFrame");
  const quoteText = document.getElementById("quoteText");
  const quoteJp = document.getElementById("quoteJp");
  const quoteKanji = document.getElementById("quoteKanji");
  const newQuoteBtn = document.getElementById("newQuote");

  let quoteIndex = Math.floor(Math.random() * QUOTES.length);

  const renderQuote = () => {
    const q = QUOTES[quoteIndex];
    quoteText.textContent = '"' + q.es + '"';
    quoteJp.textContent = q.jp;
    quoteKanji.textContent = q.kanji;
  };

  const nextQuote = () => {
    let next = quoteIndex;
    while (next === quoteIndex && QUOTES.length > 1) {
      next = Math.floor(Math.random() * QUOTES.length);
    }
    quoteIndex = next;
    quoteFrame.classList.add("switching");
    setTimeout(() => {
      renderQuote();
      quoteFrame.classList.remove("switching");
    }, 260);
  };

  renderQuote();
  newQuoteBtn.addEventListener("click", nextQuote);

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".section-head, .badge, .quote-frame, .about-text"
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i % 8, 6) * 55 + "ms";
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Cursor glow global ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  }
})();
