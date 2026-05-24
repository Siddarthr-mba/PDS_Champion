import type { Module } from '@/types/content';
import { productSenseModule } from './product-sense';
import { experimentationModule } from './experimentation';
import { statisticsModule } from './statistics';
import { sqlModule } from './sql';

export const modules: Module[] = [
  productSenseModule,
  experimentationModule,
  statisticsModule,
  sqlModule,
];
