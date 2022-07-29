import { createKitCLI } from './kit.js';

const kit = createKitCLI();

kit.then((run) => run(process.argv));
