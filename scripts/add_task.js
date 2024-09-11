document.addEventListener("DOMContentLoaded", function () {
  const handle = document.querySelector(".resize-handle");
  const textarea = document.querySelector(".resizable-textarea");
  const container = document.querySelector(".resizable-container");

  if (handle && textarea && container) {
    handle.addEventListener("mousedown", function (e) {
      e.preventDefault();

      function onMouseMove(e) {
        const containerRect = container.getBoundingClientRect();
        const newHeight = e.clientY - containerRect.top;
        if (newHeight > 136 && newHeight < 200) {
          // Maximalhöhe
          textarea.style.height = newHeight + "px";
          container.style.height = newHeight + "px"; // Container-Höhe anpassen
        }
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  } else {
    console.error("Elemente nicht gefunden!");
  }
});

// Funktion, die beim Klicken auf eine div aufgerufen wird
function activateBox(boxId, activeClass) {
  // Zuerst alle deaktivieren
  deactivateAll();

  // Dann die angeklickte div aktivieren
  const box = document.getElementById(boxId);
  box.classList.remove("aT_set_prio");
  box.classList.add(activeClass);
}

// Funktion, um alle divs inaktiv zu machen
function deactivateAll() {
  document.getElementById("boxUrgent").classList.remove("urgent_box_active");
  document.getElementById("boxUrgent").classList.add("aT_set_prio");

  document.getElementById("boxMedium").classList.remove("medium_box_active");
  document.getElementById("boxMedium").classList.add("aT_set_prio");

  document.getElementById("boxLow").classList.remove("low_box_active");
  document.getElementById("boxLow").classList.add("aT_set_prio");
}
