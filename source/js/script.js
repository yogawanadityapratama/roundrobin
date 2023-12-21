function roundRobin(processes, burstTime, quantum) {
    const n = processes.length;
    let remainingTime = [...burstTime];
    let waitingTime = Array(n).fill(0);
    let turnaroundTime = Array(n).fill(0);
    let time = 0;

    while (remainingTime.some(time => time > 0)) {
        for (let i = 0; i < n; i++) {
            if (remainingTime[i] > 0) {
                if (remainingTime[i] <= quantum) {
                    time += remainingTime[i];
                    turnaroundTime[i] = time;
                    remainingTime[i] = 0;
                } else {
                    time += quantum;
                    remainingTime[i] -= quantum;
                }
                waitingTime[i] = time - burstTime[i];
            }
        }
    }

    let outputHTML = "<table><tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>";
    for (let i = 0; i < n; i++) {
        outputHTML += `<tr><td>${processes[i]}</td><td>${burstTime[i]}</td><td>${waitingTime[i]}</td><td>${turnaroundTime[i]}</td></tr>`;
    }
    outputHTML += "</table>";

    document.getElementById("output").innerHTML = outputHTML;
}

function runRoundRobin() {
    const processesInput = document.getElementById("processes").value.split(',');
    const burstTimesInput = document.getElementById("burstTimes").value.split(',').map(Number);
    const quantumTimeInput = Number(document.getElementById("quantumTime").value);

    roundRobin(processesInput, burstTimesInput, quantumTimeInput);
}