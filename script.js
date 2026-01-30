function updateProgress() {
  const statuses = document.querySelectorAll(".status");
  let total = statuses.length;
  let nilai = 0;

  statuses.forEach(s => {
    nilai += parseFloat(s.value);
  });

  let persen = Math.round((nilai / total) * 100);

  document.getElementById("progress-bar").style.width = persen + "%";
  document.getElementById("progress-text").innerText =
    "Progress: " + persen + "%";

  localStorage.setItem(
    "statusData",
    JSON.stringify([...statuses].map(s => s.value))
  );

  const catatan = document.getElementById("catatan");
  if (catatan) {
    localStorage.setItem("catatan", catatan.value);
  }
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("statusData"));
  const catatan = localStorage.getItem("catatan");

  if (data) {
    const statuses = document.querySelectorAll(".status");
    statuses.forEach((s, i) => {
      if (data[i] !== undefined) s.value = data[i];
    });
  }

  if (catatan && document.getElementById("catatan")) {
    document.getElementById("catatan").value = catatan;
  }

  updateProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  const tanggal = document.getElementById("tanggal");
  if (tanggal) {
    tanggal.innerText = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  loadData();
});
