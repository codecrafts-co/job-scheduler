import { JobScheduler } from './src/scheduler/scheduler';

const jobScheduler = new JobScheduler();

jobScheduler.schedule('test', '*/10 * * * * *', () => {
    console.log('called');
});

jobScheduler.schedule('test2', '*/5 * * * * *', () => {
    console.log('called 2');
});

setTimeout(() => {
    jobScheduler.invoke('test');
}, 1000);

setTimeout(() => {
    jobScheduler.cancel('test2');
}, 6000);
