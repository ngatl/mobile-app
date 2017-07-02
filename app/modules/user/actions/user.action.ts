import { Action } from '@ngrx/store';
// app
import { type } from '../../helpers';
import { SystemUser } from '../../../backend/models';
import { UserState } from '../states/user.state';

export namespace UserActions {
    const CATEGORY: string = 'User';

    export interface IUserActions {
        INIT: string;
        EMAIL_SUBSCRIBE: string;
        UPDATE: string;
        LOGIN: string;
        LOGIN_SUCCESS: string;
        LOGIN_FAILURE: string;
        FORGOT_PASSWORD: string;
        MODIFY_PASSWORD: string;
        MODIFY_PASSWORD_VERIFICATION_SUCCESS: string;
        LOGOUT: string;
        SEARCH: string;
        CHECK_EMAIL: string;
        CREATE: string;
        CREATE_FINISH: string;
        DELETE: string;
        EMAIL_CONNECT: string;
        SOCIAL_CONNECT: string;
        API_ERROR: string;
        CHANGED: string;
    }

    export const ActionTypes: IUserActions = {
        INIT:                                 type(`${CATEGORY} Init`),
        EMAIL_SUBSCRIBE:                      type(`${CATEGORY} Email Subscribe`),
        UPDATE:                               type(`${CATEGORY} Update`),
        LOGIN:                                type(`${CATEGORY} Login`),
        LOGIN_SUCCESS:                        type(`${CATEGORY} Login Success`),
        LOGIN_FAILURE:                        type(`${CATEGORY} Login Failure`),
        FORGOT_PASSWORD:                      type(`${CATEGORY} Forgot Password`),
        MODIFY_PASSWORD:                      type(`${CATEGORY} Modify Password`),
        MODIFY_PASSWORD_VERIFICATION_SUCCESS: type(`${CATEGORY} Modify Password Verification Success`),
        LOGOUT:                               type(`${CATEGORY} Logout`),
        SEARCH:                               type(`${CATEGORY} Search`),
        CHECK_EMAIL:                          type(`${CATEGORY} Check Email Availability`),
        CREATE:                               type(`${CATEGORY} Create`),
        CREATE_FINISH:                        type(`${CATEGORY} Create Finish`),
        DELETE:                               type(`${CATEGORY} Delete`),
        EMAIL_CONNECT:                        type(`${CATEGORY} Email Connect`),
        SOCIAL_CONNECT:                       type(`${CATEGORY} Social Connect`),
        API_ERROR:                            type(`${CATEGORY} Api Error`),
        CHANGED:                              type(`${CATEGORY} Changed`),
    };

    export class InitAction implements Action {
        type = ActionTypes.INIT;
        payload: string = null;
    }

    /**
     * Register email for newsletter
     */
    export class EmailSubscribeAction implements Action {
        type = ActionTypes.EMAIL_SUBSCRIBE;

        /**
         * @param payload Email
         */
        constructor(public payload: string) { }
    }

    /**
     * Update user
     */
    export class UpdateAction implements Action {
        type = ActionTypes.UPDATE;

        constructor(public payload: SystemUser) { }
    }

    export class LoginAction implements Action {
        type = ActionTypes.LOGIN;

        /**
         * @param payload Optional token
         */
        constructor(public payload?: string) { }
    }

    export class LoginSuccessAction implements Action {
        type = ActionTypes.LOGIN_SUCCESS;

        /**
         * @param payload user object
         */
        constructor(public payload: SystemUser) { }
    }

    export class LoginFailedAction implements Action {
        type = ActionTypes.LOGIN_FAILURE;

        /**
         * @param payload error
         */
        constructor(public payload: any) { }
    }

    /**
     * Send forgot password request to send email with link to reset.
     */
    export class ForgotPasswordAction implements Action {
        type = ActionTypes.FORGOT_PASSWORD;

        /**
         * @param payload email address
         */
        constructor(public payload: string) { }
    }

    export class ModifyPasswordAction implements Action {
        type = ActionTypes.MODIFY_PASSWORD;

        /**
         * @param payload { oldPassword: string, newPassword: string }
         */
        constructor(public payload: { oldPassword: string, newPassword: string }) { }
    }

    export class ModifyPasswordVerificationSuccessAction implements Action {
        type = ActionTypes.MODIFY_PASSWORD_VERIFICATION_SUCCESS;

        /**
         * @param payload new password
         */
        constructor(public payload: string) { }
    }

    export class LogoutAction implements Action {
        type = ActionTypes.LOGOUT;
        payload = null;
    }

    /**
     * Search for existing emails already registered to users.
     * You generally will not use this, and instead should
     * use the more powerful CheckEmailAction as it includes
     * the ability to reduce repetitive api calls to same email check.
     * This exists in the event you may want to force search
     * disregarding previous or repetitive searches.
     * Resulting state affected ---
     *  checkedEmails: [string, string, etc.], // list of emails checked
     *  emailAvailable: null | string // if an available email is found
     */
    export class SearchAction implements Action {
        type = ActionTypes.SEARCH;

        /**
         * @param payload Email as username
         */
        constructor(public payload: string) { }
    }

    /**
     * Check for email availability against already registered users.
     * Offers a little more power over SearchAction
     * This will reduce repetitive api calls to search
     * for same email over/over again.
     * Resulting state affected ---
     *  checkedEmails: [string, string, etc.], // list of emails checked
     *  emailAvailable: null | string // if an available email is found
     */
    export class CheckEmailAction implements Action {
        type = ActionTypes.CHECK_EMAIL;

        /**
         * @param payload email to check is available
         */
        constructor(public payload: string) { }
    }

    /**
     * Create user
     */
    export class CreateAction implements Action {
        type = ActionTypes.CREATE;

        /**
         * @param payload user data
         */
        constructor(public payload: SystemUser) { }
    }

    export class CreateFinishAction implements Action {
        type = ActionTypes.CREATE_FINISH;

        /**
         * @param payload user data
         */
        constructor(public payload: SystemUser) { }
    }

    export class EmailConnectAction implements Action {
        type = ActionTypes.EMAIL_CONNECT;

        /**
         * @param payload { username: string, password: string }
         */
        constructor(public payload: { username: string, password: string }) { }
    }

    /**
     * Connect firebase account via google, facebook, etc.
     */
    export class SocialConnectAction implements Action {
        type = ActionTypes.SOCIAL_CONNECT;

        /**
         * @param payload Firebase token
         */
        constructor(public payload: string) { }
    }

    /**
     * Delete a user account
     */
    export class DeleteAction implements Action {
        type = ActionTypes.DELETE;

        /**
         * @param payload user id
         */
        constructor(public payload: string) { }
    }

    export class ApiErrorAction implements Action {
        type = ActionTypes.API_ERROR;

        /**
         * @param payload error
         */
        constructor(public payload: any) { }
    }

    /**
     * User has changed; register changes in AppStore
     * Not intended to be used directly.
     */
    export class ChangedAction implements Action {
        type = ActionTypes.CHANGED;

        /**
         * @param payload Changes to user
         */
        constructor(public payload: UserState.IState) { }
    }

    export type Actions
        =
        InitAction
        | SearchAction
        | EmailSubscribeAction
        | UpdateAction
        | LoginAction
        | LoginSuccessAction
        | LoginFailedAction
        | ForgotPasswordAction
        | ModifyPasswordAction
        | ModifyPasswordVerificationSuccessAction
        | LogoutAction
        | CreateAction
        | CreateFinishAction
        | CheckEmailAction
        | EmailConnectAction
        | SocialConnectAction
        | DeleteAction
        | ApiErrorAction
        | ChangedAction;
}
