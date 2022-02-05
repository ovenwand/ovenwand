import type { GameObject } from '$modules/chi/engine';
import type { LilyState } from './model';
import { config } from './config';
import { createInstance } from './instance';

import lilypads from '$modules/chi/static/lily-pads.svg?raw';

export const lily: GameObject<LilyState> = {
    id: 'lily',
    name: 'Lily',
    description: 'Some pretty lily',
    icon: lilypads,
    price(player, amount) {
        return config.price * (amount + 1);
    },
    stock(player) {
        return config.stock;
    },
    createInstance(player, state?) {
        return createInstance(player, lily, state);
    },
};