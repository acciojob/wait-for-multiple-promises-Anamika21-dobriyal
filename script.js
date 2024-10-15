//your JS code here. If required.
// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(promiseName) {
    return new Promise((resolve) => {
        const timeTaken = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ name: promiseName, time: parseFloat(timeTaken) });
        }, timeTaken * 1000); // Convert to milliseconds
    });
}

// Function to populate the table
function populateTable(results, totalTime) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear the "Loading..." row

    results.forEach((result, index) => {
        const row = `<tr>
            <td>Promise ${index + 1}</td>
            <td>${result.time} s</td>
        </tr>`;
        output.innerHTML += row;
    });

    // Add the final row for the total time
    const totalRow = `<tr>
        <td>Total</td>
        <td>${totalTime.toFixed(3)} s</td>
    </tr>`;
    output.innerHTML += totalRow;
}

// Main function to create promises, wait for them to resolve, and update the table
async function runPromises() {
    const output = document.getElementById('output');
    // Display the loading row with id="loading"
    output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

    const promises = [
        createPromise('Promise 1'),
        createPromise('Promise 2'),
        createPromise('Promise 3'),
    ];

    const startTime = performance.now(); // Capture start time
    const results = await Promise.all(promises);
    const endTime = performance.now(); // Capture end time

    const totalTime = (endTime - startTime) / 1000; // Convert to seconds
    populateTable(results, totalTime);
}

// Call the function to run the promises and populate the table
runPromises();
