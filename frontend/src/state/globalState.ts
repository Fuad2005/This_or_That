import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    userData: {
        id: 0,
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        token: '',

    }
});

export {setGlobalState, useGlobalState};