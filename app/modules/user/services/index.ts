import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

export const USER_PROVIDERS: any[] = [
    AuthGuard,
    UserService,
];

export * from './auth.guard';
export * from './user.service';
