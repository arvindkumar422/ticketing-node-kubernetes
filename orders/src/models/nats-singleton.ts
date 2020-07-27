// create and export singleton whose properties can be changed
// similar to {mongoose}
import nats, { Stan } from 'node-nats-streaming';

class NatsUtil {
    private _client?: Stan;

    get client() {
        if (!this._client) { throw new Error('Cannot access NATS') }
        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connection to NATS succesful!');
                resolve();
            });
            this.client.on('error', (error) => {
                console.log('Error encountered while connecting to NATS!');
                reject(error);
            });
        });
    }
}

export const natsUtil = new NatsUtil;