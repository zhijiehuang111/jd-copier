const translations = {
  "zh-TW": {
    description: "複製選取內容，自動補上標題與連結",
    step1: "選取網頁上的職缺內容",
    step2: "點擊滑鼠右鍵",
    step3: "選擇 <b>Copy with Title and Link</b>",
    reportIssue: "回報問題",
  },
  "zh-CN": {
    description: "复制选取内容，自动补上标题与链接",
    step1: "选取网页上的职缺内容",
    step2: "点击鼠标右键",
    step3: "选择 <b>Copy with Title and Link</b>",
    reportIssue: "反馈问题",
  },
  en: {
    description: "Copy selection with title and link automatically",
    step1: "Select job description content on a webpage",
    step2: "Right-click with your mouse",
    step3: "Select <b>Copy with Title and Link</b>",
    reportIssue: "Report Issue",
  },
};

type Lang = keyof typeof translations;

function detectLanguage(): Lang {
  const lang = navigator.language;

  if (lang === "zh-TW" || lang === "zh-Hant") return "zh-TW";
  if (lang.startsWith("zh")) return "zh-CN";
  return "en";
}

function applyTranslations() {
  const lang = detectLanguage();
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n") as keyof typeof t;
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });
}

document.addEventListener("DOMContentLoaded", applyTranslations);
