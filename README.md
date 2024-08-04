
# Custom Job Scheduler

A simple and effective job scheduling module for Node.js, designed to manage and execute tasks based on cron-like schedules.

## Features

- Schedule tasks to run at specific times or intervals using cron syntax.
- Dynamically add and cancel scheduled jobs.
- Invoke jobs manually at any time.
- Utilize node-schedule for precise timing and flexibility.

## Installation

Ensure you have Node.js installed on your system, then run:

```bash
npm install node-schedule
```

Include this custom scheduler in your project by importing the `JobScheduler` class from its location in your project files.

## Usage

### Basic Setup

#### Create a Scheduler Instance

```javascript
import { JobScheduler } from '@codecrafts/scheduler'; // Adjust the path as necessary

const jobScheduler = new JobScheduler();
```

#### Schedule Jobs

```javascript
// Schedule a job to run every 10 seconds
jobScheduler.schedule('test', '*/10 * * * * *', () => {
    console.log('Job test called');
});

// Schedule another job to run every 5 seconds
jobScheduler.schedule('test2', '*/5 * * * * *', () => {
    console.log('Job test2 called');
});
```

#### Manually Invoke a Job

```javascript
// Invoke the job 'test' manually after 1 second
setTimeout(() => {
    jobScheduler.invoke('test');
}, 1000);
```

#### Cancel a Job

```javascript
// Cancel the job 'test2' after 6 seconds
setTimeout(() => {
    jobScheduler.cancel('test2');
}, 6000);
```

### API

#### `schedule(jobName: string, spec: string, cb: Function)`

Schedules a new job.

- **jobName:** Unique identifier for the job.
- **spec:** Cron-like schedule string (e.g., '*/5 * * * * *' to run every 5 seconds).
- **cb:** Callback function to run each time the job is triggered.

#### `cancel(jobName: string)`

Cancels a scheduled job.

- **jobName:** Unique identifier for the job to be cancelled.

#### `invoke(jobName: string)`

Manually triggers a scheduled job.

- **jobName:** Unique identifier for the job to invoke.

## Examples

```javascript
// Creating an instance of the scheduler
const scheduler = new JobScheduler();

// Scheduling a simple job to run every minute
scheduler.schedule('minuteJob', '0 * * * * *', () => {
    console.log('This job runs every minute.');
});

// Cancel and manually trigger jobs as demonstrated above
```

This job scheduler offers a powerful and straightforward way to handle repetitive tasks in Node.js applications, providing flexibility and control over when jobs are executed.
