chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "jd-copier",
    title: "Copy with Title and Link",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "jd-copier" && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: "EXECUTE_COPY",
      payload: {
        title: tab.title || "No Title",
        url: tab.url || "",
      },
    });
  }
});
