/**
 * Origial Code:
 * https://github.com/vue-avengers/vue-composable-utils/blob/main/src/useResize.js
 * Repo:
 * https://github.com/vue-avengers/vue-composable-utils
 */

import { onMounted, onUnmounted, reactive, toRefs } from 'vue';

const useResize = (el = null) => {
    let state = reactive({
        screenWidth: 0,
        screenHeight: 0,
        ratiowh: 0,
        ratiohw: 0,
        rect: undefined,
    });

    const onResize = event => {
        state.screenWidth = window.innerWidth;
        state.screenHeight = window.innerHeight;
        state.ratiowh = state.screenWidth / state.screenHeight;
        state.ratiohw = state.screenHeight / state.screenWidth;

        if (el && el.value) {
            const clientRect = el.value.getBoundingClientRect();
            state.rect = {
                width: clientRect.width,
                height: clientRect.height,
                left: clientRect.left,
                right: clientRect.right,
                top: clientRect.top,
                bottom: clientRect.bottom,
            };
        }
    };

    onMounted(() => {
        window.addEventListener('resize', onResize, false);
        onResize();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', onResize, false);
    });

    return { ...toRefs(state) };
};

export default useResize;