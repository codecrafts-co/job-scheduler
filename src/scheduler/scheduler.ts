type Unit = 'milliseconds' | 'seconds' | 'minutes' | 'hours';

class ScheduledJob {
    private intervalId: NodeJS.Timeout;
    private cb: () => void;

    constructor(cb: () => void, timeout: { interval: number; unit: Unit }) {
        this.cb = cb;

        let intervalInMilliseconds;
        switch (timeout.unit) {
            case 'milliseconds':
                intervalInMilliseconds = timeout.interval;
                break;
            case 'seconds':
                intervalInMilliseconds = timeout.interval * 1000;
                break;
            case 'minutes':
                intervalInMilliseconds = timeout.interval * 1000 * 60;
                break;
            case 'hours':
                intervalInMilliseconds = timeout.interval * 1000 * 60 * 60;
                break;
        }

        this.intervalId = setInterval(this.cb, intervalInMilliseconds);
    }

    invoke() {
        this.cb();
    }

    cancel() {
        clearInterval(this.intervalId);
    }
}

export class JobScheduler {
    private jobMap: Record<string, ScheduledJob>;

    constructor() {
        this.jobMap = {};
    }

    schedule(jobName: string, timeout: { interval: number; unit: Unit }, cb: () => void) {
        if (this.jobMap[jobName]) {
            console.warn(`A job named ${jobName} already exists.`);
            return;
        }

        this.jobMap[jobName] = new ScheduledJob(cb, timeout);
    }

    cancel(jobName: string) {
        if (!this.jobMap[jobName]) {
            console.warn(`No job named ${jobName} found.`);
            return;
        }

        this.jobMap[jobName].cancel();
    }

    invoke(jobName: string) {
        if (!this.jobMap[jobName]) {
            console.warn(`No job named ${jobName} found.`);
            return;
        }

        this.jobMap[jobName].invoke();
    }

    destroy() {
        Object.keys(this.jobMap).forEach((jobName) => {
            this.jobMap[jobName].cancel();
        });

        this.jobMap = {};
    }
}
