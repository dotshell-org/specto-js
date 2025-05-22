import { SpectoClient } from './dist/index.js';

async function runTests() {
    const client = new SpectoClient({
        baseUrl: 'http://localhost:8989',
        apiKey: 'R6cYNnJePTiPfzUEQMK32ij9sQZLbKNrVy6jquCL',
        password: 'azerty',
    });

    try {

        // Add three different logs in the page with id cmawok52q000z13ptwbngr0e4
        const pageId = 'cmawok52q000z13ptwbngr0e4';
        const logsToAdd = [
            { message: 'First test log', severity: 'info', pageId },
            { message: 'Second log, warning alert', severity: 'warning', pageId },
            { message: 'Critical error detected', severity: 'error', pageId },
        ];
        for (const log of logsToAdd) {
            const created = await client.createLog(log);
            console.log('Log created:', created);
        }
        console.log('Successfully added logs to the page');
    
    } catch (err) {
        console.error('Failed to get logs:', err);
    }
}

runTests();
