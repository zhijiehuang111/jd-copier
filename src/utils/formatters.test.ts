import { describe, it, expect } from "vitest";
import { getCleanLinkedInUrl, generateCopyFormats } from "./formatters";

describe("LinkedIn URL Cleaner", () => {
  it("should extract the clean Job URL from complex query parameters", () => {
    const dirtyUrl =
      "https://www.linkedin.com/jobs/search/?currentJobId=123456789&keywords=frontend";
    const expected = "https://www.linkedin.com/jobs/view/123456789";

    expect(getCleanLinkedInUrl(dirtyUrl)).toBe(expected);
  });

  it("should return the original URL if it is not a LinkedIn job URL", () => {
    const google = "https://google.com";
    expect(getCleanLinkedInUrl(google)).toBe(google);
  });

  it("should return empty string if input is empty", () => {
    expect(getCleanLinkedInUrl("")).toBe("");
  });
});

describe("Copy Format Generator", () => {
  it("should generate correct Markdown and HTML formats", () => {
    const title = "Senior Software Engineer";
    const url = "https://linkedin.com/jobs/view/123";
    const selHtml = "<b>Job Description</b>";
    const selText = "Job Description";

    const result = generateCopyFormats(title, url, selHtml, selText);

    expect(result.plain).toBe(
      `[Senior Software Engineer](https://linkedin.com/jobs/view/123)\n\nJob Description`
    );

    expect(result.html).toContain(`<h1><a href="${url}">${title}</a></h1>`);
    expect(result.html).toContain(`<div>${selHtml}</div>`);
  });
});
