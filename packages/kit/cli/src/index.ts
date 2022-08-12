#!/usr/bin/env node
import { argv } from 'node:process';

import { createKitCLI } from './kit';

const kit = createKitCLI();

kit.then((run) => run(argv));
