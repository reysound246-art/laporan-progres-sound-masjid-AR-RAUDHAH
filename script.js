function updateProgress() {
  const boxes = document.querySelectorAll("#taskTable input[type=checkbox]");
  let total = boxes.length;
  let checked = 0;
  boxes.forEach(b => { if(b.checked) checked++; });
  let persen = Math.round((checked/total)*100);
  document.getElementById("progress-bar").style.width = persen+"%";
  document.getElementById("progress-text").innerText = "Progress: "+persen+"%";
  localStorage.setItem("statusData", JSON.stringify([...boxes].map(b=>b.checked)));
  localStorage.setItem("catatan", document.getElementById("catatan").value);
}

function loadData() {
  const boxes = document.querySelectorAll("#taskTable input[type=checkbox]");
  const data = JSON.parse(localStorage.getItem("statusData"));
  if(data) boxes.forEach((b,i)=>b.checked=data[i]);
  const note = localStorage.getItem("catatan");
  if(note) document.getElementById("catatan").value=note;
  updateProgress();
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("tanggal").innerText = new Date().toLocaleDateString("id-ID", {weekday:"long", year:"numeric", month:"long", day:"numeric"});
  loadData();
  document.querySelectorAll("#taskTable input[type=checkbox]").forEach(b=>b.addEventListener("change", updateProgress));
  document.getElementById("catatan").addEventListener("input", updateProgress);
});
