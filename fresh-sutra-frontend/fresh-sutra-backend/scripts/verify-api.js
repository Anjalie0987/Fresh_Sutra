// Native fetch is available in Node 18+
// If node-fetch isn't there and node < 18, this might fail. But modern node has fetch.
// Let's try native fetch first by not importing anything.

const BASE_URL = 'http://localhost:5000/api/stores';

async function verify() {
    try {
        console.log('1. Health Check...');
        const healthRes = await fetch('http://localhost:5000/health');
        console.log('Health:', await healthRes.json());

        console.log('\n2. Creating Stores...');
        const store1 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Connaught Place', latitude: 28.6304, longitude: 77.2177 })
        });
        console.log('Store 1:', await store1.json());

        const store2 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Dwarka Sector 10', latitude: 28.5921, longitude: 77.0460 })
        });
        console.log('Store 2:', await store2.json());

        const store3 = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Far Away Store', latitude: 12.9716, longitude: 77.5946 }) // Bangalore
        });
        console.log('Store 3:', await store3.json());

        console.log('\n3. Getting All Stores...');
        const allStores = await fetch(BASE_URL);
        console.log('Count:', (await allStores.json()).length);

        console.log('\n4. Getting Nearby Stores (Radius 10km from CP)...');
        const nearby = await fetch(`${BASE_URL}/nearby?lat=28.63&lng=77.21&radius=10`);
        const nearbyData = await nearby.json();
        console.log('Nearby Count:', nearbyData.length);
        console.log('Nearby Stores:', nearbyData.map(s => `${s.name} (${s.distanceKm.toFixed(2)} km)`));

    } catch (e) {
        console.error('Verification failed:', e);
    }
}

verify();
