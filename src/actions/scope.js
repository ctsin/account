import { signU2F } from '../helpers/u2f';
import toActions from '../helpers/toActions';
import { authInfo } from 'frontend-commons/src/crypto/srp';
import { toState } from '../helpers/stateFormatter';

/**
 * @link{https://github.com/developit/unistore#usage}
 */
export default (store) => {

    /**
     * initializate the unscope process.
     * @param state
     * @returns {Promise<void>}
     */
    async function unscopeInit(state) {
        if (!state.scope.response) {
            const authData = await authInfo(state.auth.Name);
            store.setState(toState(state, 'scope', { response: authData, creds: {} }));
        }
    }

    /**
     * Sets the password (and the twoFactorCode, if given)
     * @param state
     * @param {Object} opt
     * @param {string} opt.password - the password
     * @param {?string} twoFactorCode - the 2FA code (TOTP or recovery code).
     */
    async function unscopePassword(state, { password, twoFactorCode = null }) {
        store.setState(toState(state, 'scope', toState(state.scope, 'creds', { password, twoFactorCode })));
    }

    /**
     * sends and store a sign request to the U2F API.
     * @param state
     * @returns {Promise<void>}
     */
    async function unscopeU2F(state) {
        const response = await signU2F(state.scope.response['2FA'].U2F);
        store.setState(toState(state, 'scope', toState(state.scope, 'creds', { U2F: response })));
    }

    /**
     * reset the two factor data (code and U2F).
     * @param state
     */
    async function unscopeResetTwoFactor(state) {
        return store.setState(toState(state, 'scope', {
            creds: {
                password: state.scope.creds.password
            }
        }));
    }

    /**
     * reset the state for the scope
     * @param state
     */
    async function resetScopeState(state) {
        store.setState({ scope: {} });
    }

    return toActions({
        unscopeInit,
        unscopePassword,
        unscopeU2F,
        resetScopeState,
        unscopeResetTwoFactor
    });
};
