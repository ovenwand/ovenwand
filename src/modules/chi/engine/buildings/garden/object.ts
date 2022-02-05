import type { GameObject } from '$modules/chi/engine';
import type { GardenState } from './model';
import { config } from './config';
import { createInstance } from './instance';
import seedling from '$modules/chi/static/seedling.svg?raw';

export const garden: GameObject<GardenState> = {
    id: 'garden',
    name: 'Garden',
    description: 'Some fancy garden',
    icon: seedling,
    price() {
        return config.price;
    },
    stock(player, amount) {
        return Math.max(0, config.stock - amount);
    },
    createInstance(player, state) {
        return createInstance(player, garden, state);
    },
};