const STORAGE_KEY = "memoryLaneData";

const placeholderGradients = [
  "linear-gradient(135deg, #d9efea 0%, #c8dfd7 100%)",
  "linear-gradient(135deg, #f7dccd 0%, #f3c7af 100%)",
  "linear-gradient(135deg, #ece2f6 0%, #d9cef0 100%)",
  "linear-gradient(135deg, #f7efba 0%, #f1de8f 100%)",
  "linear-gradient(135deg, #f5d6d7 0%, #efbcc3 100%)"
];

const mobileLayouts = [
  { x: "8%", y: "3%", rotation: "-6deg" },
  { x: "44%", y: "9%", rotation: "7deg" },
  { x: "12%", y: "34%", rotation: "4deg" },
  { x: "46%", y: "48%", rotation: "-7deg" },
  { x: "8%", y: "65%", rotation: "6deg" },
  { x: "44%", y: "78%", rotation: "-4deg" }
];

const desktopLayouts = [
  { x: "3%", y: "6%", rotation: "-7deg" },
  { x: "34%", y: "2%", rotation: "6deg" },
  { x: "11%", y: "40%", rotation: "4deg" },
  { x: "48%", y: "32%", rotation: "-8deg" },
  { x: "26%", y: "58%", rotation: "8deg" },
  { x: "60%", y: "12%", rotation: "-3deg" }
];

function createDefaultMemories() {
  return Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    title: `Kỷ niệm ${index + 1}`,
    description: "Viết một vài dòng ngắn về khoảnh khắc này trong trang admin để làm sống lại ký ức.",
    cards: Array.from({ length: 3 }, (__, cardIndex) => ({
      type: cardIndex === 1 ? "video" : "photo",
      src: "",
      caption: cardIndex === 0 ? "Khoảnh khắc này..." : cardIndex === 1 ? "Bật lại thước phim" : "Lưu trong tim"
    }))
  }));
}

function defaultData() {
  return {
    siteTitle: "Những Năm Tháng Cấp 3",
    schoolName: "",
    years: "",
    memories: createDefaultMemories()
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultData();
    }

    const parsed = JSON.parse(raw);
    const fallback = defaultData();

    return {
      ...fallback,
      ...parsed,
      memories: Array.isArray(parsed.memories) && parsed.memories.length
        ? parsed.memories.map((memory, index) => ({
            ...fallback.memories[index % fallback.memories.length],
            ...memory,
            cards: Array.isArray(memory.cards) && memory.cards.length
              ? memory.cards.map(card => ({
                  type: card.type === "video" ? "video" : "photo",
                  src: card.src || "",
                  caption: card.caption || ""
                }))
              : fallback.memories[index % fallback.memories.length].cards
          }))
        : fallback.memories
    };
  } catch (error) {
    console.error("Không thể tải dữ liệu:", error);
    return defaultData();
  }
}

const state = {
  activeIndex: 0,
  data: loadData()
};

const elements = {
  brandTitle: document.getElementById("brandTitle"),
  storyKicker: document.getElementById("storyKicker"),
  storyTitle: document.getElementById("storyTitle"),
  schoolName: document.getElementById("schoolName"),
  schoolYears: document.getElementById("schoolYears"),
  storyDescription: document.getElementById("storyDescription"),
  memoryNumber: document.getElementById("memoryNumber"),
  memoryTitleMeta: document.getElementById("memoryTitleMeta"),
  memoryStage: document.getElementById("memoryStage"),
  filmstrip: document.getElementById("filmstrip"),
  toast: document.getElementById("toast"),
  shareButton: document.getElementById("shareButton")
};

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2200);
}

function createPlaceholder(type, gradient) {
  return `
    <div class="placeholder" style="--placeholder-gradient:${gradient}">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 8.5A2.5 2.5 0 1 0 7 3.5a2.5 2.5 0 0 0 0 5Zm10 10H7c-1.66 0-3-1.34-3-3v-7l4.04-3.46a1.5 1.5 0 0 1 1.96.04l2.57 2.28 1.83-1.51a1.5 1.5 0 0 1 2.08.1L20 9v6.5c0 1.66-1.34 3-3 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M14 15.5h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M17 12.5v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <strong>${type === "video" ? "Thêm video" : "Thêm ảnh"}</strong>
      <span>${type === "video" ? "MP4" : "JPG, PNG, WEBP"}</span>
    </div>
  `;
}

function createCardMarkup(card, memoryIndex, cardIndex, layout) {
  const gradient = placeholderGradients[memoryIndex % placeholderGradients.length];
  const delay = `${cardIndex * 0.08}s`;
  const caption = card.caption || (card.type === "video" ? "Một thước phim nhỏ" : "Một điều thật đẹp");
  const mediaMarkup = card.src
    ? card.type === "video"
      ? `
        <video src="${card.src}" muted loop playsinline autoplay></video>
        <div class="video-badge">▶</div>
      `
      : `<img src="${card.src}" alt="${caption}">`
    : createPlaceholder(card.type, gradient);

  return `
    <article class="memory-card" style="--rotation:${layout.rotation};--x:${layout.x};--y:${layout.y};--delay:${delay}">
      <div class="card-media">${mediaMarkup}</div>
    </article>
    <div class="caption-group" style="--rotation:${layout.rotation};--x:${layout.x};--y:${layout.y};--delay:${delay}">
      <div class="caption-text">${caption}</div>
      <svg class="caption-arrow" viewBox="0 0 100 30" aria-hidden="true">
        <path d="M3 4c18 0 28 7 40 20 6-9 20-13 50-14"></path>
        <path d="M88 7l5 3-4 4"></path>
      </svg>
    </div>
  `;
}

function buildScenes() {
  const layouts = window.innerWidth <= 780 ? mobileLayouts : desktopLayouts;
  elements.memoryStage.innerHTML = state.data.memories.map((memory, memoryIndex) => {
    const cards = memory.cards.slice(0, 6).map((card, cardIndex) => {
      const layout = layouts[cardIndex % layouts.length];
      return createCardMarkup(card, memoryIndex, cardIndex, layout);
    }).join("");

    return `
      <section class="memory-scene ${memoryIndex === state.activeIndex ? "active" : ""}" data-memory-index="${memoryIndex}">
        ${cards}
      </section>
    `;
  }).join("");
}

function renderFilmstrip() {
  elements.filmstrip.innerHTML = state.data.memories.map((memory, index) => {
    const cover = memory.cards.find(card => card.src) || memory.cards[0] || { type: "photo", src: "" };
    const thumb = cover.src
      ? cover.type === "video"
        ? `<video src="${cover.src}" muted loop playsinline autoplay></video>`
        : `<img src="${cover.src}" alt="${memory.title || `Kỷ niệm ${index + 1}`}">`
      : `<div class="placeholder" style="--placeholder-gradient:${placeholderGradients[index % placeholderGradients.length]};border-width:1.5px"><strong style="font-size:.9rem">${cover.type === "video" ? "Thêm video" : "Thêm ảnh"}</strong></div>`;

    return `
      <button class="filmstrip-btn" type="button" data-index="${index}" aria-current="${index === state.activeIndex}">
        <div class="film-frame">
          <div class="film-thumb">${thumb}</div>
        </div>
        <div class="film-label">
          <span>${memory.title || `Kỷ niệm ${index + 1}`}</span>
          <span>${String(index + 1).padStart(2, "0")}</span>
        </div>
      </button>
    `;
  }).join("");
}

function renderStoryPanel() {
  const active = state.data.memories[state.activeIndex];
  document.title = state.data.siteTitle || "Những Năm Tháng Cấp 3";
  elements.brandTitle.textContent = state.data.siteTitle || "Những Năm Tháng Cấp 3";
  elements.storyKicker.textContent = active.title || `Kỷ niệm ${state.activeIndex + 1}`;
  elements.storyTitle.textContent = state.data.siteTitle || "Những Năm Tháng Cấp 3";
  elements.schoolName.textContent = state.data.schoolName || "Tên trường sẽ hiện ở đây";
  elements.schoolYears.textContent = state.data.years || "Năm học sẽ hiện ở đây";
  elements.storyDescription.textContent = active.description || "Viết mô tả trong trang admin để kể thêm về khoảnh khắc này.";
  elements.memoryNumber.textContent = String(state.activeIndex + 1).padStart(2, "0");
  elements.memoryTitleMeta.textContent = active.title || `Kỷ niệm ${state.activeIndex + 1}`;
}

function render() {
  buildScenes();
  renderFilmstrip();
  renderStoryPanel();
}

function setActiveMemory(index) {
  state.activeIndex = index;
  document.querySelectorAll(".memory-scene").forEach((scene, sceneIndex) => {
    scene.classList.toggle("active", sceneIndex === index);
  });
  document.querySelectorAll(".filmstrip-btn").forEach((button, buttonIndex) => {
    button.setAttribute("aria-current", buttonIndex === index ? "true" : "false");
  });
  renderStoryPanel();
}

window.addEventListener("storage", event => {
  if (event.key === STORAGE_KEY) {
    state.data = loadData();
    state.activeIndex = Math.min(state.activeIndex, state.data.memories.length - 1);
    render();
  }
});

window.addEventListener("resize", () => {
  clearTimeout(window.__memoryResizeTimer);
  window.__memoryResizeTimer = setTimeout(() => render(), 120);
});

elements.filmstrip.addEventListener("click", event => {
  const button = event.target.closest(".filmstrip-btn");
  if (!button) {
    return;
  }
  setActiveMemory(Number(button.dataset.index));
  document.getElementById("memoryStage").scrollIntoView({ behavior: "smooth", block: "center" });
});

elements.shareButton.addEventListener("click", async () => {
  const shareUrl = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: state.data.siteTitle || "Memory Lane",
        text: "Xem lại những kỷ niệm của tụi mình nhé.",
        url: shareUrl
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    showToast("Đã sao chép liên kết");
  } catch (error) {
    showToast("Không thể chia sẻ lúc này");
  }
});

render();
