const countdown = document.querySelector("[data-event-date]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });
}

if (countdown) {
  const eventTime = new Date(countdown.dataset.eventDate).getTime();
  const parts = {
    days: countdown.querySelector("[data-days]"),
    hours: countdown.querySelector("[data-hours]"),
    minutes: countdown.querySelector("[data-minutes]"),
    seconds: countdown.querySelector("[data-seconds]"),
  };

  const pad = (value) => String(value).padStart(2, "0");

  const updateCountdown = () => {
    const remaining = Math.max(0, eventTime - Date.now());
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    parts.days.textContent = pad(days);
    parts.hours.textContent = pad(hours);
    parts.minutes.textContent = pad(minutes);
    parts.seconds.textContent = pad(seconds);
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    document.querySelectorAll("[data-tab]").forEach((button) => {
      const isActive = button === tab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    document.querySelectorAll("[data-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === target);
    });
  });
});

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.getAttribute("aria-expanded") === "true";
    item.setAttribute("aria-expanded", String(!isOpen));
  });
});
