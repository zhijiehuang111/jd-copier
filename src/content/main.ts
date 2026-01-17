import { getCleanLinkedInUrl, generateCopyFormats } from "../utils/formatters";

function processLinkedInJobPage(
  originalUrl: string,
  originalTitle: string,
): { url: string; title: string } {
  const cleanUrl = getCleanLinkedInUrl(originalUrl);

  // If URL wasn't changed, it's not a LinkedIn job page we can process
  if (cleanUrl === originalUrl) {
    return { url: originalUrl, title: originalTitle };
  }

  const jobTitleElement = document.querySelector(
    "div.job-details-jobs-unified-top-card__job-title h1",
  );
  const companyNameElement = document.querySelector(
    "div.job-details-jobs-unified-top-card__company-name",
  );

  const jobTitle = jobTitleElement?.textContent?.trim() || "";
  const companyName = companyNameElement?.textContent?.trim() || "";

  const newTitle =
    jobTitle && companyName
      ? `${jobTitle} | ${companyName} | LinkedIn`
      : originalTitle;

  return { url: cleanUrl, title: newTitle };
}

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "EXECUTE_COPY") {
    let { title, url } = message.payload;

    const processed = processLinkedInJobPage(url, title);
    url = processed.url;
    title = processed.title;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      console.warn("JD Copier: No selection found");
      return;
    }

    const range = selection.getRangeAt(0);
    const div = document.createElement("div");
    div.appendChild(range.cloneContents());

    const rawHtml = div.innerHTML;
    const rawText = selection.toString();

    const { html: finalHtmlStr, plain: finalPlainStr } = generateCopyFormats(
      title,
      url,
      rawHtml,
      rawText,
    );

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([finalHtmlStr], { type: "text/html" }),
          "text/plain": new Blob([finalPlainStr], { type: "text/plain" }),
        }),
      ]);
    } catch (err) {
      console.error("Copy Failed:", err);
    }
  }
});
