const fs = require('fs');
const { reviveFromBase64Representation, replaceJsonWithBase64 } = require('@neshca/json-replacer-reviver');
const { IncrementalCache } = require('@neshca/cache-handler');
const { createClient } = require('redis');
require('dotenv').config({ path: '.env.local' });

const REVALIDATED_TAGS_KEY = 'sharedRevalidatedTags';

const password = encodeURIComponent(process.env['PASSWORD_REDIS']);

const config = {
    url: `rediss://:${password}${process.env['ADRESS_REDIS']}`,
    socket: {
        tls: true,
        rejectUnauthorized: true,
        ca: [fs.readFileSync(process.env['PATH_REDIS']).toString()],
    }
};

const client = createClient(config);
console.log('PATH_REDIS:', process.env['PATH_REDIS']);

client.on('connect', () => {
    console.log('connection Redis'); // I see this in console
});
client.on('error', (err) => {
    console.error('connection error Redis:', err);
});

client.connect().catch(console.error);

IncrementalCache.onCreation(async () => {

    const useTtl = false;
    // await client.connect();

    if (!client.isOpen) {
        console.warn('Redis client is not connected.');
        return;
    }

    const l  = await client.keys('*', (err, keys) => {
        if (err) throw err;
        keys.forEach((key) => {

        });
    });
    console.log(l)

    await client.del('/dashboard/price', (err, reply) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Ключ удален: ${reply}`);
        }
    });

    // Получение значения по ключу
    // const aa  = await  client.get('f04b0fc3d66350350f6791a936fbc3edb6f1e8b1091658f9e29dd39466da39d4', (err, value) => {
    //     if (err) throw err;
    // });
    // const bb = JSON.parse(aa, reviveFromBase64Representation)
    // const encodedBody = bb.value.data.body;
    // const decodedBody = Buffer.from(encodedBody, 'base64').toString('utf-8');
    //
    // console.log(decodedBody);

    // const encodedBody = JSON.parse(aa, reviveFromBase64Representation)
    // console.log(encodedBody)
    // console.log(JSON.parse(encodedBody, reviveFromBase64Representation))
    // const decodedBody = Buffer.from(encodedBody, 'base64').toString('utf-8');
    // console.log(decodedBody)



    return {
        useFileSystem: !useTtl,
        // useFileSystem: false,
        cache: {
            async get(key) {
                try {
                    const result = (await client.get(key)) ?? null;

                    if (!result) {
                        return null;
                    }

                    // use reviveFromBase64Representation to restore binary data from Base64
                    return JSON.parse(result, reviveFromBase64Representation);
                } catch (error) {
                    console.error('cache.get', error);
                    return null;
                }
            },
            async set(key, value, ttl) {
                try {
                    await client.set(
                        key,
                        // use replaceJsonWithBase64 to store binary data in Base64 and save space
                        JSON.stringify(value, replaceJsonWithBase64),
                        useTtl && typeof ttl === 'number' ? { EX: ttl } : undefined,
                    );
                } catch (error) {
                    console.error('cache.set', error);
                }
            },
            async getRevalidatedTags() {
                try {
                    const sharedRevalidatedTags = await client.hGetAll(REVALIDATED_TAGS_KEY);

                    const entries = Object.entries(sharedRevalidatedTags);

                    const revalidatedTags = Object.fromEntries(
                        entries.map(([tag, revalidatedAt]) => [tag, Number(revalidatedAt)]),
                    );

                    return revalidatedTags;
                } catch (error) {
                    console.error('cache.getRevalidatedTags', error);
                }
            },
            async revalidateTag(tag, revalidatedAt) {
                try {
                    await client.hSet(REVALIDATED_TAGS_KEY, {
                        [tag]: revalidatedAt,
                    });
                } catch (error) {
                    console.error('cache.revalidateTag', error);
                }
            },
        },
    };
});

module.exports = IncrementalCache;



