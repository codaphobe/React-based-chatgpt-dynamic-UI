import { createRoot } from "react-dom/client";
import ThreadView from "../components/ThreadView.jsx";
import React from "react";

let threadViewRoot = null;
let isThreadViewEnabled = false;

export function enableThreadView(container) {

    if (!container) {
        console.error("Container is not available.");
        return;
    }

    if (isThreadViewEnabled) {
        console.warn("Thread view is already enabled.");
        return;
    }

    container.textContent = "";
    const threadViewEl = document.createElement("div");
    threadViewEl.setAttribute("id", "thread-view-root");
    container.appendChild(threadViewEl);

    threadViewRoot = createRoot(threadViewEl);
    threadViewRoot.render(React.createElement(ThreadView, null));

    isThreadViewEnabled = true;
}