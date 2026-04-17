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

function normalizeSiteData() {
  const fallback = {
    siteTitle: "Những Năm Tháng Cấp 3",
    schoolName: "Tên trường",
    years: "2021 - 2024",
    memories: []
  };

  if (typeof siteData !== "object" || !siteData) {
    return fallback;
  }

  return {
    ...fallback,
    ...siteData,
    memories: Array.isArray(siteData.memories) ? siteData.memories.map((memory, index) => ({
      title: memory.title || `Kỷ niệm ${index + 1}`,
      description: memory.description || "Thêm mô tả trong data.js để kể lại khoảnh khắc này.",
      cards: Array.isArray(memory.cards) ? memory.cards.slice(0, 6).map(card => ({
        type: card.type === "video" ? "video" : "photo",
        src: card.src || "",
        caption: card.caption || ""
      })) : []
    })) : []
  };
}

const state = {
  activeIndex: 0,
  data: normalizeSiteData()
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
  sliderTitle: document.getElementById("sliderTitle"),
  sliderSubtitle: document.getElementById("sliderSubtitle"),
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
      <span>${type === "video" ? "videos/ten-video.mp4" : "photos/ten-anh.jpg"}</span>
    </div>
  `;
}

function createMediaMarkup(card, gradient, caption) {
  if (!card.src) {
    return createPlaceholder(card.type, gradient);
  }

  if (card.type === "video") {
    return `
      <video src="${card.src}" muted loop playsinline autoplay preload="metadata"></video>
      <div class="video-badge">▶</div>
    `;
  }

  return `<img src="${card.src}" alt="${caption}">`;
}

function createCardMarkup(card, memoryIndex, cardIndex, layout) {
  const gradient = placeholderGradients[memoryIndex % placeholderGradients.length];
  const delay = `${cardIndex * 0.08}s`;
  const caption = card.caption || (card.type === "video" ? "Một thước phim nhỏ" : "Một điều thật đẹp");

  return `
    <article class="memory-card" style="--rotation:${layout.rotation};--x:${layout.x};--y:${layout.y};--delay:${delay}">
      <div class="card-media">
        ${createMediaMarkup(card, gradient, caption)}
      </div>
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

  elements.memoryStage.innerHTML = state.data.memories.map((memory, memoryIndex) => `
    <section class="memory-scene ${memoryIndex === state.activeIndex ? "active" : ""}" data-memory-index="${memoryIndex}">
      ${memory.cards.slice(0, 6).map((card, cardIndex) => createCardMarkup(card, memoryIndex, cardIndex, layouts[cardIndex % layouts.length])).join("")}
    </section>
  `).join("");
}

function renderFilmstrip() {
  elements.filmstrip.innerHTML = state.data.memories.map((memory, index) => {
    const cover = memory.cards.find(card => card.src) || memory.cards[0] || { type: "photo", src: "" };
    const thumb = cover.src
      ? cover.type === "video"
        ? `<video src="${cover.src}" muted loop playsinline autoplay preload="metadata"></video>`
        : `<img src="${cover.src}" alt="${memory.title}">`
      : `<div class="placeholder film-placeholder" style="--placeholder-gradient:${placeholderGradients[index % placeholderGradients.length]}"><strong>${cover.type === "video" ? "Thêm video" : "Thêm ảnh"}</strong></div>`;

    return `
      <button class="filmstrip-btn" type="button" data-index="${index}" aria-current="${index === state.activeIndex}">
        <div class="film-frame">
          <div class="film-thumb">${thumb}</div>
        </div>
        <div class="film-label">
          <span>${memory.title}</span>
          <span>${String(index + 1).padStart(2, "0")}</span>
        </div>
      </button>
    `;
  }).join("");
}

function renderStoryPanel() {
  const active = state.data.memories[state.activeIndex];
  document.title = state.data.siteTitle;
  elements.brandTitle.textContent = state.data.siteTitle;
  elements.storyKicker.textContent = active.title;
  elements.sliderTitle.textContent = active.title;
  elements.sliderSubtitle.textContent = "Lướt để chuyển kỷ niệm";
  elements.storyTitle.textContent = state.data.siteTitle;
  elements.schoolName.textContent = state.data.schoolName;
  elements.schoolYears.textContent = state.data.years;
  elements.storyDescription.textContent = active.description;
  elements.memoryNumber.textContent = String(state.activeIndex + 1).padStart(2, "0");
  elements.memoryTitleMeta.textContent = active.title;
}

function focusActiveThumbnail() {
  const activeButton = elements.filmstrip.querySelector(`.filmstrip-btn[data-index="${state.activeIndex}"]`);
  if (!activeButton) {
    return;
  }

  activeButton.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });
}

function goToRelativeMemory(direction) {
  const total = state.data.memories.length;
  if (!total) {
    return;
  }

  const nextIndex = (state.activeIndex + direction + total) % total;
  setActiveMemory(nextIndex);
  focusActiveThumbnail();
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

function renderEmptyState() {
  elements.memoryStage.innerHTML = `
    <section class="memory-scene active">
      ${createCardMarkup({ type: "photo", src: "", caption: "Thêm nội dung trong data.js" }, 0, 0, desktopLayouts[0])}
      ${createCardMarkup({ type: "video", src: "", caption: "Đặt file vào videos/" }, 1, 1, desktopLayouts[3])}
    </section>
  `;

  elements.filmstrip.innerHTML = `
    <button class="filmstrip-btn" type="button" aria-current="true">
      <div class="film-frame">
        <div class="film-thumb">
          <div class="placeholder film-placeholder" style="--placeholder-gradient:${placeholderGradients[0]}">
            <strong>Mở data.js</strong>
          </div>
        </div>
      </div>
      <div class="film-label">
        <span>Chưa có dữ liệu</span>
        <span>00</span>
      </div>
    </button>
  `;

  elements.storyKicker.textContent = "Bắt đầu";
  elements.sliderTitle.textContent = "Mở data.js";
  elements.sliderSubtitle.textContent = "Thêm dữ liệu để bắt đầu";
  elements.storyTitle.textContent = state.data.siteTitle;
  elements.schoolName.textContent = state.data.schoolName;
  elements.schoolYears.textContent = state.data.years;
  elements.storyDescription.textContent = "Hãy mở file data.js để thêm kỷ niệm, tiêu đề, đường dẫn ảnh và video.";
  elements.memoryNumber.textContent = "00";
  elements.memoryTitleMeta.textContent = "Chưa có kỷ niệm";
}

function render() {
  if (!state.data.memories.length) {
    renderEmptyState();
    return;
  }

  buildScenes();
  renderFilmstrip();
  renderStoryPanel();
}

window.addEventListener("resize", () => {
  clearTimeout(window.__memoryResizeTimer);
  window.__memoryResizeTimer = setTimeout(() => render(), 120);
});

window.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") {
    goToRelativeMemory(1);
  }

  if (event.key === "ArrowLeft") {
    goToRelativeMemory(-1);
  }
});

elements.filmstrip.addEventListener("click", event => {
  const button = event.target.closest(".filmstrip-btn");
  if (!button || button.dataset.index === undefined) {
    return;
  }

  setActiveMemory(Number(button.dataset.index));
  focusActiveThumbnail();
});

elements.memoryStage.addEventListener("wheel", event => {
  if (Math.abs(event.deltaY) < 12 && Math.abs(event.deltaX) < 12) {
    return;
  }

  event.preventDefault();
  clearTimeout(elements.memoryStage.__wheelTimer);
  elements.memoryStage.__wheelTimer = setTimeout(() => {
    goToRelativeMemory(event.deltaY > 0 || event.deltaX > 0 ? 1 : -1);
  }, 40);
}, { passive: false });

let touchStartX = 0;
let touchStartY = 0;

elements.memoryStage.addEventListener("touchstart", event => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

elements.memoryStage.addEventListener("touchend", event => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }

  goToRelativeMemory(deltaX < 0 ? 1 : -1);
}, { passive: true });

elements.shareButton.addEventListener("click", async () => {
  const shareUrl = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: state.data.siteTitle,
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
focusActiveThumbnail();
