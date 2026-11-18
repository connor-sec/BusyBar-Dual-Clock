const APP_ID = "app.user.dualclock";

function pad(n) {
  return n < 10 ? "0" + n : String(n);
}

function formatHms(hours, minutes, seconds) {
  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function formatLocal(d) {
  return formatHms(d.getHours(), d.getMinutes(), d.getSeconds());
}

function formatUtc(d) {
  return formatHms(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
}

function main() {
  let stopped = false;
  let drawing = false;
  let shownFrame = "";
  let timerId;

  async function updateDisplay() {
    if (stopped || drawing) {
      return;
    }

    drawing = true;

    try {
      const now = new Date();
      const localText = "LOC " + formatLocal(now);
      const utcText = "UTC " + formatUtc(now);
      const next = localText + "|" + utcText;

      if (next === shownFrame) {
        return;
      }

      const body = {
        application_name: APP_ID,
        elements: [
          {
            id: "local",
            type: "text",
            display: "front",
            text: localText,
            x: 2,
            y: 1,
            font: "small",
            color: "#FFFFFFFF",
            width: 70,
            timeout: 0
          },
          {
            id: "utc",
            type: "text",
            display: "front",
            text: utcText,
            x: 2,
            y: 8,
            font: "small",
            color: "#AAFF00FF",
            width: 70,
            timeout: 0
          }
        ]
      };

      const resp = await fetch("http://localhost/api/display/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (resp.ok) {
        shownFrame = next;
      }
    } catch (e) {
      console.log("clock error", e);
    } finally {
      drawing = false;
    }
  }

  function stop() {
    if (stopped) {
      return;
    }

    stopped = true;

    if (timerId !== undefined) {
      clearInterval(timerId);
    }

    // Removing the last listener closes the app after this handler returns.
    setTimeout(unbind, 0);
  }

  const unbind = listen("input", function (event) {
    if (event.key === "back" && event.action === "short") {
      stop();
    }
  });

  updateDisplay();
  timerId = setInterval(updateDisplay, 1000);
}

main();
