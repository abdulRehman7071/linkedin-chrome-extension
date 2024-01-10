const linkedInListViewUrl = "https://www.linkedin.com/jobs/collections";
const linkedinDetailView = "https://www.linkedin.com/jobs/view";

console.log("background Working");
function grabJobDescriptionClassName(url) {
  console.log("🚀 ~ file: background.js:6 ~ url:", url);
  return url.startsWith(linkedInListViewUrl)
    ? "jobs-search__job-details--container"
    : "jobs-description-content__text";
}

function grabJobDescription(className) {
  console.log("🚀 ~ file: background.js:13 ~ className:", className);
  const jobDetailsContainer = document.querySelector(`.${className}`);
  const jobDetails = jobDetailsContainer.textContent;
  const cleanedJobDetails = jobDetails.replace(/\s\s+/g, " ");
  console.log(
    "🚀 ~ file: background.js:14 ~ cleanedJobDetails:",
    cleanedJobDetails
  );
  return cleanedJobDetails;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("addListener");
  if (changeInfo.status === "complete" && tab.active) {
    console.log(
      "🚀 ~ file: background.js:27 ~ tab.url:",
      tab.url?.startsWith(linkedInListViewUrl) ||
        tab.url?.startsWith(linkedinDetailView)
    );
    if (
      tab.url?.startsWith(linkedInListViewUrl) ||
      tab.url?.startsWith(linkedinDetailView)
    ) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          func: grabJobDescription,
          args: [grabJobDescriptionClassName(tab.url)],
        })
        .then((queryResult) => {
          chrome.storage.local.set({
            test: queryResult[0].result,
          });
        });
    }
  }
});
