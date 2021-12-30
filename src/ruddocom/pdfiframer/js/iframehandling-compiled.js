function stopIframesInProgress() {
  scripts = document.getElementsByTagName('script');
  index = scripts.length - 1;
  myScript = scripts[index];
  myBase = myScript.src.split("/").slice(0,-1).join("/");
  iconSrc = myBase + "/download-pdf-icon.svg";
  iframes = document.getElementsByTagName("iframe");
  noembed = [
    "Chrome.*Mobile",
    "Mobile.*Firefox"
  ];
  noembedRe = new RegExp(noembed.join("|"), "i");
  if (noembedRe.test(navigator.userAgent)) {
    for (i = 0; i < iframes.length; ++i) {
      iframe = iframes[i];
      src = iframe.getAttribute("src");
      if (src.endsWith(".pdf")) {
        window.frames[i].stop();
        iframedoc = iframe.contentWindow.document;
        a = document.createElement("a")
        a.setAttribute("href", src);
        img = iframedoc.createElement("img");
        img.setAttribute("style", "max-width: 100%; max-height: 90vh; margin-left: auto; margin-right: auto; display: block;");
        img.setAttribute("src", iconSrc);
        a.appendChild(img)
        body = iframedoc.createElement("body")
        body.setAttribute("style", "margin: 0; padding: 0;");
        body.appendChild(a);
        html = iframedoc.createElement("html");
        html.appendChild(body);
        iframe.setAttribute("srcdoc", "<html>" + html.innerHTML + "</html>");
      }
    }
  }
}
stopIframesInProgress();
