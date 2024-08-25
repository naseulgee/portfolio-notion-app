/** NOTE: store 를 이용하여 상태를 관리하는 구성 파일
 * [참고] https://vuex.vuejs.org/
 * 내보내지는 store 플러그인 -> main.js 에서 사용된다.
 */
import { createStore } from 'vuex'
import notion from './notion'
import about from './about'
import slogans from './slogans'
import themeColor from './themeColor'

export default createStore({
    // 상태를 관리하는 파일을 따로 생성하고 해당 파일에 모듈로 등록한다
    modules: {
        notion,
        about,
        slogans,
        themeColor,
    }
})