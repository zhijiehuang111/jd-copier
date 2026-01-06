export function getCleanLinkedInUrl(originalUrl: string): string {
  if (
    !originalUrl.includes("linkedin.com") ||
    !originalUrl.includes("currentJobId")
  ) {
    return originalUrl;
  }

  const jobIdMatch = originalUrl.match(/currentJobId=(\d+)/);
  if (!jobIdMatch) {
    return originalUrl;
  }

  return `https://www.linkedin.com/jobs/view/${jobIdMatch[1]}`;
}
export function generateCopyFormats(
  title: string,
  url: string,
  selectedHtml: string,
  selectedText: string
): { html: string; plain: string } {
  const html = `
      <h1><a href="${url}">${title}</a></h1>
      <div>${selectedHtml}</div>
    `;

  const plain = `[${title}](${url})\n\n${selectedText}`;

  return { html, plain };
}
