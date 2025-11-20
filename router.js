const contentEl = document.getElementById("content");
const navlinks = document.querySelectorAll("#navlinks a");

const routes = {
  "/": "home.html",
  "/about": "about.html",
  "/skills": "skills.html",
  "/projects": "projects.html",
  "/contact": "contact.html"
};

function setActiveLink(path) {
  navlinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-route") === path);
  });
}

async function loadPage(pageFile) {
  try {
    const res = await fetch(`pages/${pageFile}?v=${Date.now()}`);
    const html = await res.text();
    contentEl.innerHTML = html;
  } catch {
    contentEl.innerHTML = "<h2>Page not found</h2>";
  }
}

function parseHash() {
  const hash = location.hash.replace("#", "") || "/";
  const parts = hash.split("/").filter(Boolean);
  return parts.length === 0 ? "/" : `/${parts[0]}`;
}

function onRouteChange() {
  const path = parseHash();
  loadPage(routes[path] || "home.html");
  setActiveLink(path);
}

window.addEventListener("hashchange", onRouteChange);
window.addEventListener("load", onRouteChange);
