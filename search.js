const p = document.getElementById("content");
const searchButton = document.getElementById("searchbutton");
const input = document.getElementById("input");

// Search Highlight များကို ရှင်းလင်းပါ
function clearHighlights() {
  const marks = p.querySelectorAll("mark[data-search-highlight]");

  marks.forEach(mark => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });

  p.normalize();
}

// RegExp special characters များကို Escape လုပ်ပါ
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Text node တစ်ခုကို Highlight လုပ်ပါ
function highlightTextNode(node, regex) {
  const text = node.nodeValue;
  const fragment = document.createDocumentFragment();

  let lastIndex = 0;
  let match;

  regex.lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    // Match မတိုင်မီ စာသား
    fragment.appendChild(
      document.createTextNode(text.slice(lastIndex, match.index))
    );

    // Highlight လုပ်မည့် စာသား
    const mark = document.createElement("mark");
    mark.dataset.searchHighlight = "true";
    mark.textContent = match[0];

    fragment.appendChild(mark);

    lastIndex = match.index + match[0].length;

    // Infinite loop မဖြစ်စေရန်
    if (match[0].length === 0) {
      regex.lastIndex++;
    }
  }

  // နောက်ဆုံးကျန်ရှိသော စာသား
  fragment.appendChild(
    document.createTextNode(text.slice(lastIndex))
  );

  node.replaceWith(fragment);
}

// DOM-based Search Highlight
function searchAndHighlight() {
  const searchtext = input.value.trim();

  // ယခင် Highlight များကို အရင်ရှင်းပါ
  clearHighlights();

  if (searchtext === "") {
    return;
  }

  const regex = new RegExp(escapeRegExp(searchtext), "gi");

  // Text node များကိုသာ ရှာဖွေပါ
  const walker = document.createTreeWalker(
    p,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!parent || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        // Code နှင့် form elements များအတွင်း မရှာပါ
        if (
          parent.closest(
            "script, style, noscript, textarea, input, select, option"
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  // DOM ပြောင်းလဲမှုမပြုမီ Text node များကို စုထားပါ
  const textNodes = [];
  let node;

  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  // ကိုက်ညီသော စာသားများကို Highlight လုပ်ပါ
  textNodes.forEach(node => {
    if (regex.test(node.nodeValue)) {
      regex.lastIndex = 0;
      highlightTextNode(node, regex);
    }
  });
}

// Search Button
searchButton.addEventListener("click", searchAndHighlight);

// Enter နှိပ်၍လည်း Search လုပ်နိုင်ပါသည်
input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchAndHighlight();
  }
});