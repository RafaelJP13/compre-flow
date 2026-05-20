import {
    Injectable,
    OnModuleDestroy,
} from '@nestjs/common';

@Injectable()
export class ReplayCache implements OnModuleDestroy {
    private readonly cache = new Map<string, number>();

    private interval: NodeJS.Timeout;

    constructor() {
        this.interval = setInterval(
            () => this.cleanup(),
            5 * 60 * 1000,
        );
    }

    onModuleDestroy() {
        clearInterval(this.interval);
    }

    has(jti: string, ttlSeconds: number = 120): boolean {
        const now = Date.now();

        const entry = this.cache.get(jti);

        if (entry !== undefined && entry > now) {
            return true;
        }

        this.cache.set(
            jti,
            now + ttlSeconds * 1000,
        );

        return false;
    }

    private cleanup(): void {
        const now = Date.now();

        for (const [jti, expiry] of this.cache.entries()) {
            if (expiry <= now) {
                this.cache.delete(jti);
            }
        }
    }
}