function runScheduler() {
    const processListInput = document.getElementById('processes').value.split(',').map(str => str.trim());
    const burstTimesInput = document.getElementById('burstTimes').value.split(',').map(Number);
    const timeQuantumInput = parseInt(document.getElementById('quantumTime').value, 10);

    if (processListInput.length !== burstTimesInput.length) {
      alert('Please enter the same number of processes and burst times.');
      return;
    }

    const processes = processListInput.map((process, index) => ({
      processId: process,
      burstTime: burstTimesInput[index]
    }));

    roundRobinScheduler(processes, timeQuantumInput);
  }

  function roundRobinScheduler(processes, timeQuantum) {
    const n = processes.length;
    const remainingTime = processes.map(process => process.burstTime);
    let currentTime = 0;

    while (true) {
      let allProcessesComplete = true;

      for (let i = 0; i < n; i++) {
        if (remainingTime[i] > 0) {
          allProcessesComplete = false;

          // Execute the process for the given time quantum or until it completes
          const executionTime = Math.min(remainingTime[i], timeQuantum);
          remainingTime[i] -= executionTime;
          currentTime += executionTime;

          const outputDiv = document.getElementById('list');
          outputDiv.innerHTML += `<p>${processes[i].processId} eksekusi selama ${executionTime} quantum time. Current time: ${currentTime}</p>`;
        }
      }

      // If all processes are complete, break out of the loop
      if (allProcessesComplete) {
        break;
      }
    }
  }