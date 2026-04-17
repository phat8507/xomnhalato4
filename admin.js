const STORAGE_KEY = "memoryLaneData";
const ADMIN_PASSWORD = "capba2024";
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];

function createDefaultMemories() {
  return Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    title: `Kỷ niệm ${index + 1}`,
    description: "",
    cards: Array.from({ length: 3 }, (__, cardIndex) => ({
      type: cardIndex === 1 ? "video" : "photo",
      src: "",
      caption: ""
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
        ? parsed.memories.slice(0, 5).map((memory, index) => ({
            ...fallback.memories[index],
            ...memory,
            cards: Array.isArray(memory.cards) && memory.cards.length
              ? memory.cards.slice(0, 6).map(card => ({
                  type: card.type === "video" ? "video" : "photo",
                  src: card.src || "",
                  caption: card.caption || ""
                }))
              : fallback.memories[index].cards
          }))
        : fallback.memories
    };
  } catch (error) {
    console.error("Không thể tải dữ liệu", error);
    return defaultData();
  }
}

const state = {
  data: loadData()
};

const elements = {
  loginOverlay: document.getElementById("loginOverlay"),
  loginCard: document.getElementById("loginCard"),
  loginForm: document.getElementById("loginForm"),
  passwordInput: document.getElementById("passwordInput"),
  loginError: document.getElementById("loginError"),
  adminShell: document.getElementById("adminShell"),
  stickyBar: document.getElementById("stickyBar"),
  siteTitle: document.getElementById("siteTitle"),
  schoolName: document.getElementById("schoolName"),
  schoolYears: document.getElementById("schoolYears"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  memoryList: document.getElementById("memoryList"),
  saveAllBtn: document.getElementById("saveAllBtn"),
  previewSiteBtn: document.getElementById("previewSiteBtn"),
  exportGuideBtn: document.getElementById("exportGuideBtn"),
  modalOverlay: document.getElementById("modalOverlay"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  toast: document.getElementById("toast")
};

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function syncSettingsInputs() {
  elements.siteTitle.value = state.data.siteTitle || "";
  elements.schoolName.value = state.data.schoolName || "";
  elements.schoolYears.value = state.data.years || "";
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function updateSettingsFromInputs() {
  state.data.siteTitle = elements.siteTitle.value.trim() || "Những Năm Tháng Cấp 3";
  state.data.schoolName = elements.schoolName.value.trim();
  state.data.years = elements.schoolYears.value.trim();
}

function inferTypeFromFile(file) {
  return file.type === "video/mp4" ? "video" : "photo";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Không thể đọc file"));
    reader.readAsDataURL(file);
  });
}

async function applyFileToSlot(file, memoryIndex, cardIndex) {
  if (!allowedTypes.includes(file.type)) {
    showToast("Chỉ hỗ trợ JPG, PNG, WEBP hoặc MP4");
    return;
  }
  const dataUrl = await readFileAsDataUrl(file);
  const slot = state.data.memories[memoryIndex].cards[cardIndex];
  slot.src = dataUrl;
  slot.type = inferTypeFromFile(file);
  renderMemories(memoryIndex);
}

function previewMarkup(card, fallbackText) {
  if (!card.src) {
    return "";
  }
  return card.type === "video"
    ? `<video src="${card.src}" controls muted playsinline></video>`
    : `<img src="${card.src}" alt="${fallbackText}">`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderMemories(openIndex = 0) {
  elements.memoryList.innerHTML = state.data.memories.map((memory, memoryIndex) => `
    <article class="memory-panel ${memoryIndex === openIndex ? "open" : ""}" data-memory-index="${memoryIndex}">
      <button class="memory-header" type="button">
        <div>
          <strong>${memory.title || `Kỷ niệm ${memoryIndex + 1}`}</strong>
          <span>${memory.cards.length} ô media</span>
        </div>
        <div class="memory-chevron">⌄</div>
      </button>
      <div class="memory-body">
        <div class="field">
          <label for="memory-title-${memoryIndex}">Tên kỷ niệm</label>
          <input id="memory-title-${memoryIndex}" type="text" data-field="title" data-memory-index="${memoryIndex}" value="${escapeHtml(memory.title || "")}" placeholder="Ví dụ: Ngày khai giảng đầu tiên">
        </div>
        <div class="field">
          <label for="memory-description-${memoryIndex}">Mô tả kỷ niệm</label>
          <textarea id="memory-description-${memoryIndex}" rows="4" data-field="description" data-memory-index="${memoryIndex}" placeholder="Viết vài dòng mô tả ngắn...">${escapeHtml(memory.description || "")}</textarea>
        </div>
        <div class="media-list">
          ${memory.cards.map((card, cardIndex) => `
            <section class="media-slot" data-memory-index="${memoryIndex}" data-card-index="${cardIndex}">
              <div class="slot-topline">
                <span>Ô media ${cardIndex + 1}</span>
                <span>${card.type === "video" ? "Video" : "Ảnh"}</span>
              </div>
              <label class="upload-box" data-memory-index="${memoryIndex}" data-card-index="${cardIndex}">
                <input type="file" accept=".jpg,.jpeg,.png,.webp,.mp4" data-memory-index="${memoryIndex}" data-card-index="${cardIndex}">
                <div class="upload-copy">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 16V5m0 0-3.5 3.5M12 5l3.5 3.5M5 15.5v2A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <strong>Kéo thả ảnh/video vào đây hoặc bấm để chọn</strong>
                  <span>Hỗ trợ: JPG, PNG, WEBP, MP4</span>
                </div>
              </label>
              <div class="preview ${card.src ? "active" : ""}">${previewMarkup(card, card.caption || `Preview ${cardIndex + 1}`)}</div>
              <div class="field">
                <label for="caption-${memoryIndex}-${cardIndex}">Chú thích</label>
                <input id="caption-${memoryIndex}-${cardIndex}" type="text" data-field="caption" data-memory-index="${memoryIndex}" data-card-index="${cardIndex}" value="${escapeHtml(card.caption || "")}" placeholder="Dòng chữ viết tay trên website">
              </div>
              <div style="display:flex; justify-content:flex-end">
                <button class="btn btn-danger" type="button" data-action="remove-slot" data-memory-index="${memoryIndex}" data-card-index="${cardIndex}">Xóa</button>
              </div>
            </section>
          `).join("")}
        </div>
        <div>
          <button class="btn btn-secondary" type="button" data-action="add-slot" data-memory-index="${memoryIndex}">Thêm ô media</button>
        </div>
      </div>
    </article>
  `).join("");
}

function unlockAdmin() {
  elements.loginOverlay.classList.add("hidden");
  elements.adminShell.classList.add("ready");
  elements.stickyBar.classList.add("ready");
  syncSettingsInputs();
  renderMemories();
}

elements.loginForm.addEventListener("submit", event => {
  event.preventDefault();
  if (elements.passwordInput.value === ADMIN_PASSWORD) {
    unlockAdmin();
    return;
  }
  elements.loginError.textContent = "Sai mật khẩu";
  elements.loginCard.classList.remove("shake");
  void elements.loginCard.offsetWidth;
  elements.loginCard.classList.add("shake");
});

elements.passwordInput.addEventListener("input", () => {
  elements.loginError.textContent = "";
});

elements.saveSettingsBtn.addEventListener("click", () => {
  updateSettingsFromInputs();
  saveToStorage();
  showToast("✅ Đã lưu! Website đã được cập nhật.");
});

elements.memoryList.addEventListener("click", event => {
  const header = event.target.closest(".memory-header");
  if (header) {
    header.closest(".memory-panel")?.classList.toggle("open");
    return;
  }

  const addBtn = event.target.closest('[data-action="add-slot"]');
  if (addBtn) {
    const memoryIndex = Number(addBtn.dataset.memoryIndex);
    const cards = state.data.memories[memoryIndex].cards;
    if (cards.length >= 6) {
      showToast("Mỗi kỷ niệm chỉ tối đa 6 ô media");
      return;
    }
    cards.push({ type: "photo", src: "", caption: "" });
    renderMemories(memoryIndex);
    return;
  }

  const removeBtn = event.target.closest('[data-action="remove-slot"]');
  if (removeBtn) {
    const memoryIndex = Number(removeBtn.dataset.memoryIndex);
    const cardIndex = Number(removeBtn.dataset.cardIndex);
    state.data.memories[memoryIndex].cards.splice(cardIndex, 1);
    if (!state.data.memories[memoryIndex].cards.length) {
      state.data.memories[memoryIndex].cards.push({ type: "photo", src: "", caption: "" });
    }
    renderMemories(memoryIndex);
  }
});

elements.memoryList.addEventListener("input", event => {
  const target = event.target;
  const memoryIndex = Number(target.dataset.memoryIndex);
  const field = target.dataset.field;

  if (!field || Number.isNaN(memoryIndex)) {
    return;
  }

  if (field === "title" || field === "description") {
    state.data.memories[memoryIndex][field] = target.value;
  } else if (field === "caption") {
    const cardIndex = Number(target.dataset.cardIndex);
    state.data.memories[memoryIndex].cards[cardIndex].caption = target.value;
  }
});

elements.memoryList.addEventListener("change", async event => {
  const input = event.target.closest('input[type="file"]');
  if (!input || !input.files?.[0]) {
    return;
  }
  const memoryIndex = Number(input.dataset.memoryIndex);
  const cardIndex = Number(input.dataset.cardIndex);
  await applyFileToSlot(input.files[0], memoryIndex, cardIndex);
});

elements.memoryList.addEventListener("dragover", event => {
  const box = event.target.closest(".upload-box");
  if (!box) {
    return;
  }
  event.preventDefault();
  box.classList.add("dragging");
});

elements.memoryList.addEventListener("dragleave", event => {
  const box = event.target.closest(".upload-box");
  if (box) {
    box.classList.remove("dragging");
  }
});

elements.memoryList.addEventListener("drop", async event => {
  const box = event.target.closest(".upload-box");
  if (!box) {
    return;
  }
  event.preventDefault();
  box.classList.remove("dragging");
  const file = event.dataTransfer?.files?.[0];
  if (!file) {
    return;
  }
  await applyFileToSlot(file, Number(box.dataset.memoryIndex), Number(box.dataset.cardIndex));
});

elements.saveAllBtn.addEventListener("click", () => {
  updateSettingsFromInputs();
  saveToStorage();
  showToast("✅ Đã lưu! Website đã được cập nhật.");
});

elements.previewSiteBtn.addEventListener("click", () => {
  updateSettingsFromInputs();
  saveToStorage();
  window.open("./index.html", "_blank");
});

elements.exportGuideBtn.addEventListener("click", () => {
  elements.modalOverlay.classList.remove("hidden");
});

elements.closeModalBtn.addEventListener("click", () => {
  elements.modalOverlay.classList.add("hidden");
});

elements.modalOverlay.addEventListener("click", event => {
  if (event.target === elements.modalOverlay) {
    elements.modalOverlay.classList.add("hidden");
  }
});
