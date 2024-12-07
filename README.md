
# @hyperflake/job-scheduler

A simple and effective job scheduling module for Node.js, designed to manage and execute tasks based on cron-like schedules. This module utilizes `node-schedule` for precise timing and flexibility, making it ideal for applications that require specific timing tasks.

## Features

- **Dynamic Job Management:** Dynamically add, cancel, and invoke scheduled jobs.
- **Graceful Shutdown:** Includes a method to gracefully shut down all scheduled jobs, ensuring no tasks are left hanging.

## Installation

Install the package using npm:

```bash
npm install @hyperflake/job-scheduler
```

## Usage

### Basic Setup

#### Create a Scheduler Instance

```javascript
import { JobScheduler } from '@hyperflake/job-scheduler';

const jobScheduler = new JobScheduler();
```

#### Schedule Jobs

Schedule a job to run every 10 seconds:

```javascript
jobScheduler.schedule('test', { interval: 10, unit: 'seconds' }, () => {
    console.log('Job test called');
});
```

Schedule another job to run every 5 minutes:

```javascript
jobScheduler.schedule('test2', { interval: 10, unit: 'minutes' }, () => {
    console.log('Job test2 called');
});
```

#### Manually Invoke a Job

```javascript
setTimeout(() => {
    jobScheduler.invoke('test');
}, 1000);
```

#### Cancel a Job

```javascript
setTimeout(() => {
    jobScheduler.cancel('test2');
}, 6000);
```

#### Destroy the Scheduler

```javascript
jobScheduler.destroy();
```

### API

- **schedule(jobName: string, timeout: { interval: number; unit: Unit }, cb: Function)**: Schedules a new job.
- **cancel(jobName: string)**: Cancels a scheduled job.
- **invoke(jobName: string)**: Manually triggers a scheduled job.
- **destroy()**: Gracefully shuts down all scheduled jobs and clears the job map.

## Examples

Here's a complete example of setting up the scheduler, scheduling jobs, and then cleaning up:

```javascript
const scheduler = new JobScheduler();

scheduler.schedule('minuteJob', { interval: 1, unit: 'minutes' }, () => {
    console.log('This job runs every minute.');
});

setTimeout(() => {
    scheduler.invoke('minuteJob');
}, 5000);

setTimeout(() => {
    scheduler.cancel('minuteJob');
    scheduler.destroy();
}, 10000);
```

## Repository

Find the source code and contribute on [GitHub](https://github.com/codecrafts-co/job-scheduler).

## License

This project is licensed under the ISC License - see the LICENSE file for details.
