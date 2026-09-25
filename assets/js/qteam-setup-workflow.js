(function () {
  "use strict";

  const prompt = document.querySelector("#qteam-setup-prompt pre code");
  const button = document.getElementById("qteam-copy-setup");
  const status = document.getElementById("qteam-copy-status");
  if (!prompt || !button || !status) return;

  function selectForManualCopy() {
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(prompt);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Clipboard unavailable. Prompt selected: press Cmd+C / Ctrl+C, or use your device's Copy action.";
    } else {
      status.textContent = "Clipboard unavailable. Select the prompt and copy it manually.";
    }
  }

  button.hidden = false;
  button.addEventListener("click", async function () {
    button.disabled = true;
    status.textContent = "Copying…";
    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        selectForManualCopy();
        return;
      }
      await navigator.clipboard.writeText(prompt.textContent);
      status.textContent = "Setup prompt copied. Replace the goal before sending.";
    } catch (error) {
      selectForManualCopy();
    } finally {
      button.disabled = false;
    }
  });
})();
