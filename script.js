// LOGIN
function unlock() {
  if (document.getElementById("pass").value === "1234") {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }
}

// NAV
function show(page) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("analytics").classList.add("hidden");
  document.getElementById("settings").classList.add("hidden");

  document.getElementById(page).classList.remove("hidden");
}

// SETTINGS
let settings = { temp: 80, volt: 250, curr: 15 };

function saveSettings() {
  settings.temp = +maxTemp.value;
  settings.volt = +maxVolt.value;
  settings.curr = +maxCurr.value;
  alert("Saved");
}

// DATA
let t=65,v=230,c=10;

function smooth(x,r){ return x + (Math.random()*r - r/2); }

// CHARTS
const mainChart = new Chart(document.getElementById("mainChart"), {
  type: "line",
  data: { labels: [], datasets: [{ label:"Temp", data:[] }] }
});

const tempChart = new Chart(document.getElementById("tempChart"), {
  type: "line",
  data: { labels: [], datasets: [{ data:[] }] },
  options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}}}
});

const voltChart = new Chart(document.getElementById("voltChart"), {
  type: "line",
  data: { labels: [], datasets: [{ data:[] }] },
  options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}}}
});

const currChart = new Chart(document.getElementById("currChart"), {
  type: "line",
  data: { labels: [], datasets: [{ data:[] }] },
  options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}}}
});

// UPDATE LOOP
function update(){
  t=smooth(t,1.5);
  v=smooth(v,2);
  c=smooth(c,1);

  document.getElementById("temp").innerText = t.toFixed(1)+"°C";
  document.getElementById("volt").innerText = v.toFixed(1)+"V";
  document.getElementById("curr").innerText = c.toFixed(1)+"A";

  let time = new Date().toLocaleTimeString();

  [mainChart,tempChart,voltChart,currChart].forEach(ch=>{
    ch.data.labels.push(time);
  });

  mainChart.data.datasets[0].data.push(t);
  tempChart.data.datasets[0].data.push(t);
  voltChart.data.datasets[0].data.push(v);
  currChart.data.datasets[0].data.push(c);

  if(mainChart.data.labels.length>15){
    [mainChart,tempChart,voltChart,currChart].forEach(ch=>{
      ch.data.labels.shift();
      ch.data.datasets.forEach(d=>d.data.shift());
    });
  }

  mainChart.update();
  tempChart.update();
  voltChart.update();
  currChart.update();
}

setInterval(update,2000);
