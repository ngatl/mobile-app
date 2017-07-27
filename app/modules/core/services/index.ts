import { DrawerService } from './drawer.service';
import { LocaleService } from './locale.service';
import { NSAppService } from './ns-app.service';
import { ProgressService } from './progress.service';
import { TNSStorageService } from './tns-storage.service';
import { WindowService } from './window.service';

export const CORE_PROVIDERS: any[] = [
  DrawerService,
  LocaleService,
  NSAppService,
  ProgressService,
  TNSStorageService,
  WindowService,
];

export * from './drawer.service';
export * from './locale.service';
export * from './ns-app.service';
export * from './progress.service';
export * from './tns-storage.service';
export * from './window.service';