import * as migration_20250609_174746 from './20250609_174746';
import * as migration_20250609_175957 from './20250609_175957';
import * as migration_20250610_135258 from './20250610_135258';
import * as migration_20250610_142601 from './20250610_142601';
import * as migration_20250610_180529 from './20250610_180529';
import * as migration_20250610_203705 from './20250610_203705';
import * as migration_20250610_203938 from './20250610_203938';

export const migrations = [
  {
    up: migration_20250609_174746.up,
    down: migration_20250609_174746.down,
    name: '20250609_174746',
  },
  {
    up: migration_20250609_175957.up,
    down: migration_20250609_175957.down,
    name: '20250609_175957',
  },
  {
    up: migration_20250610_135258.up,
    down: migration_20250610_135258.down,
    name: '20250610_135258',
  },
  {
    up: migration_20250610_142601.up,
    down: migration_20250610_142601.down,
    name: '20250610_142601',
  },
  {
    up: migration_20250610_180529.up,
    down: migration_20250610_180529.down,
    name: '20250610_180529',
  },
  {
    up: migration_20250610_203705.up,
    down: migration_20250610_203705.down,
    name: '20250610_203705',
  },
  {
    up: migration_20250610_203938.up,
    down: migration_20250610_203938.down,
    name: '20250610_203938'
  },
];
