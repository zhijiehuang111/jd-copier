function processLinkedInJobPage(
  originalUrl: string,
  originalTitle: string
): { url: string; title: string } {
  if (
    !originalUrl.includes("linkedin.com") ||
    !originalUrl.includes("currentJobId")
  ) {
    return { url: originalUrl, title: originalTitle };
  }

  const jobIdMatch = originalUrl.match(/currentJobId=(\d+)/);
  if (!jobIdMatch) {
    return { url: originalUrl, title: originalTitle };
  }

  const currentJobId = jobIdMatch[1];
  const cleanUrl = `https://www.linkedin.com/jobs/view/${currentJobId}`;

  const jobTitleElement = document.querySelector(
    "div.job-details-jobs-unified-top-card__job-title h1"
  );
  const companyNameElement = document.querySelector(
    "div.job-details-jobs-unified-top-card__company-name"
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

    const finalHtmlStr = `
      <h1><a href="${url}">${title}</a></h1>
      <div>${rawHtml}</div>
    `;

    const finalPlainStr = `[${title}](${url})\n\n${rawText}`;

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
