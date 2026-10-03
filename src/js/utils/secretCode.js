/**
 * Secret code:magic
 * @type {string[]}
 */
const SECRET_SEQUENCE = ['i', 'd', 'd', 'q', 'd']

/**
 * Subscribes to the secret key sequence.
 * Calls `callback` when the full sequence is entered.
 * @param {() => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onSecretCode(callback) {
    let index = 0

    /** @param {KeyboardEvent} event */
    function handler(event) {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key

        if (key === SECRET_SEQUENCE[index]) {
            index += 1
            if (index === SECRET_SEQUENCE.length) {
                index = 0
                callback()
            }
        } else {
            // reset, but allow the current key to start a new attempt
            index = key === SECRET_SEQUENCE[0] ? 1 : 0
        }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
}