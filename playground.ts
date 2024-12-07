import { JobScheduler } from './src/scheduler/scheduler';

const jobScheduler = new JobScheduler();

jobScheduler.schedule('test', { interval: 10, unit: 'seconds' }, () => {
    console.log('called');
    throw new Error('Hello');
});

jobScheduler.schedule('test2', { interval: 5, unit: 'seconds' }, () => {
    console.log('called 2');
});

setTimeout(() => {
    console.log('here');
    try {
        jobScheduler.invoke('test');
    } catch (err) {
        console.log(err);
    }
}, 1000);

setTimeout(() => {
    console.log('here2');
    jobScheduler.cancel('test2');
}, 6000);
