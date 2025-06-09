import * as migration_20250609_174746 from './20250609_174746';
import * as migration_20250609_175957 from './20250609_175957';

export const migrations = [
  {
    up: migration_20250609_174746.up,
    down: migration_20250609_174746.down,
    name: '20250609_174746',
  },
  {
    up: migration_20250609_175957.up,
    down: migration_20250609_175957.down,
    name: '20250609_175957'
  },
];
