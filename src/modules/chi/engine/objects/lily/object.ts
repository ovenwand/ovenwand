import type { GameObjectInstance } from '$modules/chi/engine';
import type { LilyState } from './model';
import { config } from './config';
import { createInstance } from './instance';

import lilypads from '$modules/chi/static/lily-pads.svg?raw';

export const lily = {
    id: 'lily',
    name: 'Lily',
    description: 'Some pretty lily',
    icon: lilypads,
    price(amount: number): number {
        return config.price * (amount + 1);
    },
    stock(): number {
        return config.stock;
    },
    createInstance(state: LilyState): GameObjectInstance<LilyState> {
        return createInstance(lily, state);
    },
};