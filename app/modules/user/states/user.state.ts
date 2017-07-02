import { SystemUser } from '../../backend/models';

export namespace UserState {
    export interface IState {
        /**
         * Current Authenticated User
         */
        current?: SystemUser;
        anonymousEmail?: string;
        /**
         * An available email for user to signup with.
         */
        emailAvailable?: string;
        /**
         * Reserved emails which are already taken.
         * User signup attempts trying to find available email.
         * Use cases:
         *   - Determine if a user already exists and prompt them for a password.
         *   - Simply track which emails are already taken for analytics purposes.
         *     Cases may arise where bunk accounts are created
         *     with people's actual emails. Reporting these in analytics
         *     could help track this problematic case down. A user could
         *     be attempting several times to register their own email address however
         *     somebody could have created a bunk account with it. Seeing this pattern
         *     via analytics can help determine an appropriate resolution.
         */
        reservedEmails?: Array<string>;
        /**
         * Whether a forgot password request has been sent.
         */
        forgotPasswordSent?: boolean;

        /**
         * User api errors that have occurred during user session.
         */
        errors?: Array<any>
    }

    export const initialState: IState = {
        current: null,
        errors: []
    };
}
