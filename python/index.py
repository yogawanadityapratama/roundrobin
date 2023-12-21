def round_robin(processes, burst_time, quantum):
    n = len(processes)
    remaining_time = list(burst_time)
    waiting_time = [0] * n
    turnaround_time = [0] * n
    time = 0

    while any(remaining_time):
        for i in range(n):
            if remaining_time[i] > 0:
                if remaining_time[i] <= quantum:
                    time += remaining_time[i]
                    turnaround_time[i] = time
                    remaining_time[i] = 0
                else:
                    time += quantum
                    remaining_time[i] -= quantum
                waiting_time[i] = time - burst_time[i]

    print("Proses\tBurst Time\tWaiting Time\tTurnaround Time")
    for i in range(n):
        print(f"{processes[i]}\t{burst_time[i]}\t\t{waiting_time[i]}\t\t{turnaround_time[i]}")

processes = input("Enter processes (comma-separated): ").split(',')
burst_time = list(map(int, input("Enter burst times (comma-separated): ").split(',')))
quantum_time = int(input("Enter quantum time: "))

round_robin(processes, burst_time, quantum_time)