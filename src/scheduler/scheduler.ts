import schedule from 'node-schedule';

export class JobScheduler {
    private jobMap: Record<string, schedule.Job>;

    constructor() {
        this.jobMap = {};
    }

    schedule(jobName: string, spec: schedule.Spec, cb: () => void) {
        this.jobMap[jobName] = schedule.scheduleJob(spec, cb);
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
        this.jobMap = {};

        schedule.gracefulShutdown();
    }
}
