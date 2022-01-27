import type { GameObjectInstance } from '$modules/chi/engine';
import type { GardenState } from './model';
import { config } from './config';
import { createInstance } from './instance';
import seedling from '$modules/chi/static/seedling.svg?raw';

export const garden = {
    id: 'garden',
    name: 'Garden',
    description: 'Some fancy garden',
    icon: seedling,
    price(amount: number): number {
        return Math.max(config.price, amount * Math.pow(1.25, amount));
    },
    stock(amount: number): number {
        return Math.max(0, config.stock - amount);
    },
    createInstance(state: GardenState): GameObjectInstance<GardenState> {
        return createInstance(garden, state);
    },
};