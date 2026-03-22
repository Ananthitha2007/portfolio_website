// view_logs.mjs
// Run this with "node view_logs.mjs" to see messages in your terminal
import https from 'https';

const projectId = "portfolio-website-a3557";
const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/messages`;

console.log('--- Fetching Messages from Firebase Terminal ---');

// Helper to extract values from Firestore's REST structure
const getValue = (field) => {
    if (!field) return 'N/A';
    if (field.stringValue !== undefined) return field.stringValue;
    if (field.timestampValue !== undefined) return new Date(field.timestampValue).toLocaleString();
    if (field.integerValue !== undefined) return field.integerValue;
    if (field.booleanValue !== undefined) return field.booleanValue;
    return JSON.stringify(field);
};

https.get(url, (res) => {
    let data = '';

    if (res.statusCode !== 200) {
        console.error(`Error: Received status code ${res.statusCode}`);
        if (res.statusCode === 404) console.error('Possible reason: Collection "messages" does not exist yet.');
        return;
    }

    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log(`--- Total Messages: ${json.documents.length} ---\n`);

            json.documents.forEach((doc, index) => {
                const fields = doc.fields || {};
                const docId = doc.name.split('/').pop(); // Extract ID from full name

                console.log(`[Message #${index + 1}] ID: ${docId}`);
                console.log(`  Name:    ${getValue(fields.name) || '[Empty]'}`);
                console.log(`  Email:   ${getValue(fields.email) || '[Empty]'}`);
                console.log(`  Message: ${getValue(fields.message) || '[Empty]'}`);
                console.log(`  Time:    ${getValue(fields.timestamp)}`);
                console.log('  -----------------------------------------');
            });
            console.log('\n--- End of Messages ---');
        } catch (e) {
            console.error('Failed to parse database response:', e.message);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching data from Firebase:', err.message);
});
