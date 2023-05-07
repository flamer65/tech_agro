const broker = document.getElementById("broker");
const port = document.getElementById("port");
const tempTopic = document.getElementById("tempTopic");
const soilTopic = document.getElementById("soilTopic");
const phTopic = document.getElementById("phTopic");

const tempChartCtx = document.getElementById("tempChart").getContext("2d");
const soilChartCtx = document.getElementById("soilChart").getContext("2d");
const phChartCtx = document.getElementById("phChart").getContext("2d");

const tempChartData = { labels: [], datasets: [{ data: [], label: "Temperature" }] };
const soilChartData = { labels: [], datasets: [{ data: [], label: "Soil Moisture" }] };
const phChartData = { labels: [], datasets: [{ data: [], label: "pH" }] };

const tempChart = new Chart(tempChartCtx, { type: "line", data: tempChartData });
const soilChart = new Chart(soilChartCtx, { type: "line", data: soilChartData });
const phChart = new Chart(phChartCtx, { type: "line", data: phChartData });

function connect() {
    const client = mqtt.connect(`ws://\${broker.value}:\${port.value}`);

    client.on("connect", () => {
        client.subscribe(tempTopic.value);
        client.subscribe(soilTopic.value);
        client.subscribe(phTopic.value);
    });

    client.on("message", (topic, message) => {
        const value = parseFloat(message.toString());
        const timestamp = new Date().toLocaleTimeString();

        if (topic === tempTopic.value) {
            updateChart(tempChart, tempChartData, value, timestamp);
        } else if (topic === soilTopic.value) {
            updateChart(soilChart, soilChartData, value, timestamp);
        } else if (topic === phTopic.value) {
            updateChart(phChart, phChartData, value, timestamp);
        }
    });
}

function updateChart(chart, chartData, value, timestamp) {
    chartData.labels.push(timestamp);
    chartData.datasets[0].data.push(value);

    if (chartData.labels.length > 10) {
        chartData.labels.shift();
        chartData.datasets[0].data.shift();
    }

    chart.update();
}